import { TAU, fitCanvas, pixelRatio, type Color } from './core';

/**
 * 線・円・点だけを描くベクターレンダラー。
 * 同じ図形データ（PrimList）を WebGPU と Canvas 2D のどちらでも描けるため、
 * WebGPU が使えない環境では Canvas 2D に切り替えるだけで同じ見た目になる。
 */

/** 0: 模様の金 / 1: アクセントの金 / 2: 光る点の金 */
export type Tone = 0 | 1 | 2;

export interface VectorPalette {
  background: Color;
  tones: readonly [Color, Color, Color];
}

const Kind = { Segment: 0, Ring: 1, Disc: 2 } as const;

// lib.dom は GPUBufferUsage / GPUShaderStage の定数を宣言していないため、仕様の値を使う
const BufferUsage = { COPY_DST: 0x0008, UNIFORM: 0x0040, STORAGE: 0x0080 } as const;
const ShaderStage = { VERTEX: 0x1, FRAGMENT: 0x2 } as const;

/** 1 図形 = 12 floats: kind, x0, y0, x1|r, y1, width, alpha, tone, a0, a1, dash, 0 */
const FLOATS = 12;

export class PrimList {
  data = new Float32Array(FLOATS * 1024);
  count = 0;

  reset(): void {
    this.count = 0;
  }

  /** 線分。f0..f1 は描く範囲（0..1）、dash は破線の周期（px、0 で実線） */
  segment(x0: number, y0: number, x1: number, y1: number, width: number, alpha: number, tone: Tone, f0 = 0, f1 = 1, dash = 0): void {
    if (alpha > 0.004 && f1 > f0) this.push(Kind.Segment, x0, y0, x1, y1, width, alpha, tone, f0, f1, dash);
  }

  /** 円周。start から時計回りに sweep（ラジアン）だけ描く */
  ring(cx: number, cy: number, r: number, width: number, alpha: number, tone: Tone, start = 0, sweep = TAU, dash = 0): void {
    if (alpha > 0.004 && sweep > 0.001 && r > 0.3) this.push(Kind.Ring, cx, cy, r, 0, width, alpha, tone, start, sweep, dash);
  }

  disc(cx: number, cy: number, r: number, alpha: number, tone: Tone): void {
    if (alpha > 0.004) this.push(Kind.Disc, cx, cy, r, 0, 1, alpha, tone, 0, 0, 0);
  }

  private push(...values: number[]): void {
    if ((this.count + 1) * FLOATS > this.data.length) {
      const next = new Float32Array(this.data.length * 2);
      next.set(this.data);
      this.data = next;
    }
    this.data.set(values, this.count * FLOATS);
    this.count++;
  }
}

export interface VectorRenderer {
  readonly kind: 'webgpu' | 'canvas2d';
  frame(prims: PrimList): void;
  destroy(): void;
}

// 各図形を包む四角形をインスタンス描画し、フラグメントシェーダで距離関数からアンチエイリアスする
const WGSL = /* wgsl */ `
struct U { res: vec2f, dpr: f32, pad: f32, c0: vec4f, c1: vec4f, c2: vec4f };
@group(0) @binding(0) var<uniform> u: U;
struct Prim { a: vec4f, b: vec4f, c: vec4f };
@group(0) @binding(1) var<storage, read> prims: array<Prim>;

struct VO {
  @builtin(position) pos: vec4f,
  @location(0) local: vec2f,
  @location(1) @interpolate(flat) id: u32,
};

@vertex
fn vs(@builtin(vertex_index) vi: u32, @builtin(instance_index) ii: u32) -> VO {
  var corners = array<vec2f, 6>(vec2f(0.0, 0.0), vec2f(1.0, 0.0), vec2f(0.0, 1.0), vec2f(0.0, 1.0), vec2f(1.0, 0.0), vec2f(1.0, 1.0));
  let q = corners[vi];
  let pr = prims[ii];
  let p0 = pr.a.yz;
  let pad = pr.b.y * 0.5 + 2.0;
  var pos = p0;
  if (pr.a.x < 0.5) {
    let d = vec2f(pr.a.w, pr.b.x) - p0;
    let len = max(length(d), 0.001);
    let t = d / len;
    let nrm = vec2f(-t.y, t.x);
    pos = p0 + t * (q.x * (len + 2.0 * pad) - pad) + nrm * (q.y * 2.0 - 1.0) * pad;
  } else {
    pos = p0 + (q * 2.0 - 1.0) * (pr.a.w + pad);
  }
  var o: VO;
  o.pos = vec4f(pos.x / u.res.x * 2.0 - 1.0, 1.0 - pos.y / u.res.y * 2.0, 0.0, 1.0);
  o.local = pos;
  o.id = ii;
  return o;
}

fn toneColor(t: f32) -> vec3f {
  if (t < 0.5) { return u.c0.rgb; }
  if (t < 1.5) { return u.c1.rgb; }
  return u.c2.rgb;
}

@fragment
fn fs(i: VO) -> @location(0) vec4f {
  let pr = prims[i.id];
  let p = i.local;
  let p0 = pr.a.yz;
  var d = 0.0;
  var keep = 1.0;
  if (pr.a.x < 0.5) {
    let seg = vec2f(pr.a.w, pr.b.x) - p0;
    let len2 = max(dot(seg, seg), 0.000001);
    let s = dot(p - p0, seg) / len2;
    d = length(p - p0 - seg * clamp(s, pr.c.x, pr.c.y));
    if (pr.c.z > 0.0) { keep = step(0.5, fract(s * sqrt(len2) / pr.c.z)); }
  } else if (pr.a.x < 1.5) {
    let v = p - p0;
    d = abs(length(v) - pr.a.w);
    let rel = fract((atan2(v.y, v.x) - pr.c.x) / 6.2831853) * 6.2831853;
    keep = select(0.0, 1.0, rel <= pr.c.y);
    if (pr.c.z > 0.0) { keep = keep * step(0.5, fract(rel * pr.a.w / pr.c.z)); }
  } else {
    d = max(length(p - p0) - pr.a.w, 0.0);
  }
  let a = clamp((pr.b.y * 0.5 - d) * u.dpr + 0.5, 0.0, 1.0) * keep * pr.b.z;
  if (a < 0.002) { discard; }
  return vec4f(toneColor(pr.b.w) * a, a);
}
`;

export async function createWebGpuRenderer(
  canvas: HTMLCanvasElement,
  palette: VectorPalette,
  onLost: () => void
): Promise<VectorRenderer> {
  if (!('gpu' in navigator) || !navigator.gpu) throw new Error('WebGPU is not available');
  const adapter = await navigator.gpu.requestAdapter();
  if (!adapter) throw new Error('No GPU adapter');
  const device = await adapter.requestDevice();
  let destroyed = false;
  void device.lost.then(() => {
    if (!destroyed) onLost();
  });

  const context = canvas.getContext('webgpu') as GPUCanvasContext | null;
  if (!context) throw new Error('WebGPU canvas context is unavailable');
  const format = navigator.gpu.getPreferredCanvasFormat();
  context.configure({ device, format, alphaMode: 'opaque' });

  const module = device.createShaderModule({ code: WGSL });
  const info = await module.getCompilationInfo();
  const errors = info.messages.filter((m) => m.type === 'error');
  if (errors.length) throw new Error(errors.map((m) => `${m.lineNum}:${m.linePos} ${m.message}`).join(' / '));

  device.pushErrorScope('validation');
  const uniforms = device.createBuffer({ size: 64, usage: BufferUsage.UNIFORM | BufferUsage.COPY_DST });
  const layout = device.createBindGroupLayout({
    entries: [
      { binding: 0, visibility: ShaderStage.VERTEX | ShaderStage.FRAGMENT, buffer: { type: 'uniform' } },
      { binding: 1, visibility: ShaderStage.VERTEX | ShaderStage.FRAGMENT, buffer: { type: 'read-only-storage' } },
    ],
  });
  const blend: GPUBlendComponent = { srcFactor: 'one', dstFactor: 'one-minus-src-alpha', operation: 'add' };
  const pipeline = device.createRenderPipeline({
    layout: device.createPipelineLayout({ bindGroupLayouts: [layout] }),
    vertex: { module, entryPoint: 'vs' },
    fragment: { module, entryPoint: 'fs', targets: [{ format, blend: { color: blend, alpha: blend } }] },
    primitive: { topology: 'triangle-list' },
  });
  let capacity = 0;
  let storage: GPUBuffer | null = null;
  let group: GPUBindGroup | null = null;
  const ensureCapacity = (count: number) => {
    if (count <= capacity && storage && group) return;
    capacity = Math.max(1024, 2 ** Math.ceil(Math.log2(count)));
    storage?.destroy();
    storage = device.createBuffer({ size: capacity * FLOATS * 4, usage: BufferUsage.STORAGE | BufferUsage.COPY_DST });
    group = device.createBindGroup({
      layout,
      entries: [
        { binding: 0, resource: { buffer: uniforms } },
        { binding: 1, resource: { buffer: storage } },
      ],
    });
  };
  ensureCapacity(1024);
  const validation = await device.popErrorScope();
  if (validation) throw new Error(validation.message);

  const header = new Float32Array(16);
  const [bgR, bgG, bgB] = palette.background.rgb;

  return {
    kind: 'webgpu',
    frame(prims) {
      fitCanvas(canvas);
      const ratio = pixelRatio();
      header.set([canvas.width / ratio, canvas.height / ratio, ratio, 0]);
      palette.tones.forEach((tone, i) => header.set([...tone.rgb, 1], 4 + i * 4));
      device.queue.writeBuffer(uniforms, 0, header);
      if (prims.count) {
        ensureCapacity(prims.count);
        if (storage) device.queue.writeBuffer(storage, 0, prims.data, 0, prims.count * FLOATS);
      }
      const encoder = device.createCommandEncoder();
      const pass = encoder.beginRenderPass({
        colorAttachments: [{
          view: context.getCurrentTexture().createView(),
          clearValue: { r: bgR, g: bgG, b: bgB, a: 1 },
          loadOp: 'clear',
          storeOp: 'store',
        }],
      });
      if (prims.count && group) {
        pass.setPipeline(pipeline);
        pass.setBindGroup(0, group);
        pass.draw(6, prims.count);
      }
      pass.end();
      device.queue.submit([encoder.finish()]);
    },
    destroy() {
      destroyed = true;
      try {
        context.unconfigure();
      } catch {
        // コンテキストがすでに失われている場合は何もしない
      }
      device.destroy();
    },
  };
}

export function createCanvas2dRenderer(canvas: HTMLCanvasElement, palette: VectorPalette): VectorRenderer {
  const context = canvas.getContext('2d', { alpha: false });
  if (!context) throw new Error('Canvas 2D is unavailable');
  const ctx = context;

  return {
    kind: 'canvas2d',
    frame(prims) {
      fitCanvas(canvas);
      const ratio = pixelRatio();
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      ctx.globalAlpha = 1;
      ctx.setLineDash([]);
      ctx.fillStyle = palette.background.css;
      ctx.fillRect(0, 0, canvas.width / ratio, canvas.height / ratio);

      // 色・透明度・線幅が同じ図形をまとめて描き、状態の切り替えを減らす
      const batches = new Map<string, { path: Path2D; fill: boolean; tone: number; alpha: number; width: number; dash: number }>();
      const d = prims.data;
      for (let i = 0; i < prims.count; i++) {
        const o = i * FLOATS;
        const kind = d[o], tone = d[o + 7] | 0, width = d[o + 5], dash = d[o + 10];
        const alphaStep = Math.max(1, Math.round(d[o + 6] * 20));
        const key = kind === Kind.Disc ? `f${tone}|${alphaStep}` : `s${tone}|${alphaStep}|${width}|${dash}`;
        let batch = batches.get(key);
        if (!batch) {
          batch = { path: new Path2D(), fill: kind === Kind.Disc, tone, alpha: alphaStep / 20, width, dash };
          batches.set(key, batch);
        }
        const x0 = d[o + 1], y0 = d[o + 2];
        if (kind === Kind.Segment) {
          const x1 = d[o + 3], y1 = d[o + 4], f0 = d[o + 8], f1 = d[o + 9];
          batch.path.moveTo(x0 + (x1 - x0) * f0, y0 + (y1 - y0) * f0);
          batch.path.lineTo(x0 + (x1 - x0) * f1, y0 + (y1 - y0) * f1);
        } else if (kind === Kind.Ring) {
          const r = d[o + 3], start = d[o + 8], sweep = d[o + 9];
          batch.path.moveTo(x0 + Math.cos(start) * r, y0 + Math.sin(start) * r);
          batch.path.arc(x0, y0, r, start, start + sweep);
        } else {
          const r = d[o + 3];
          batch.path.moveTo(x0 + r, y0);
          batch.path.arc(x0, y0, r, 0, TAU);
        }
      }
      ctx.lineCap = 'round';
      for (const batch of batches.values()) {
        const color = palette.tones[batch.tone]?.css ?? palette.tones[0].css;
        ctx.globalAlpha = batch.alpha;
        if (batch.fill) {
          ctx.fillStyle = color;
          ctx.fill(batch.path);
        } else {
          ctx.strokeStyle = color;
          ctx.lineWidth = batch.width;
          ctx.setLineDash(batch.dash ? [batch.dash / 2, batch.dash / 2] : []);
          ctx.stroke(batch.path);
        }
      }
      ctx.globalAlpha = 1;
      ctx.setLineDash([]);
    },
    destroy() {},
  };
}
