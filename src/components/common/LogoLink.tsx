import { useCallback, useEffect, useRef, useState } from 'react';

const LABELS = ['Saedgewell', 'セージウェル', 'Akimasa Sugai'] as const;
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*';
const JAPANESE_CHARS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';

function isJapanese(text: string): boolean {
  return /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/.test(text);
}

function getRandomChar(forJapanese: boolean): string {
  const charSet = forJapanese ? JAPANESE_CHARS : CHARS;
  return charSet[Math.floor(Math.random() * charSet.length)];
}

export function LogoLink() {
  const [displayText, setDisplayText] = useState<string>(LABELS[0]);
  const [isHovering, setIsHovering] = useState(false);
  const labelIndexRef = useRef(0);
  const animationRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);

  const scramble = useCallback((targetText: string, onComplete?: () => void) => {
    const length = targetText.length;
    const duration = 1200;
    const frameRate = 30;
    const totalFrames = Math.floor(duration / (1000 / frameRate));
    let frame = 0;

    const useJapaneseChars = isJapanese(targetText);

    const animate = () => {
      frame++;
      const progress = frame / totalFrames;

      const result = targetText
        .split('')
        .map((char, i) => {
          if (char === ' ') return ' ';
          const revealPoint = i / length;
          if (progress > revealPoint + 0.4) {
            return char;
          }
          return getRandomChar(useJapaneseChars);
        })
        .join('');

      setDisplayText(result);

      if (frame < totalFrames) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayText(targetText);
        onComplete?.();
      }
    };

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    animationRef.current = requestAnimationFrame(animate);
  }, []);

  const cycleLabels = useCallback(() => {
    labelIndexRef.current = (labelIndexRef.current + 1) % LABELS.length;
    const nextLabel = LABELS[labelIndexRef.current];

    scramble(nextLabel, () => {
      if (isHovering) {
        timeoutRef.current = window.setTimeout(cycleLabels, 1500);
      }
    });
  }, [isHovering, scramble]);

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    labelIndexRef.current = 0;
    scramble(LABELS[0]);
  }, [scramble]);

  useEffect(() => {
    if (isHovering) {
      timeoutRef.current = window.setTimeout(cycleLabels, 100);
    }
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isHovering, cycleLabels]);

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <a
      href="/"
      className="logo-link inline-block text-xl font-bold select-none"
      aria-label="Saedgewell"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
    >
      <span
        className="inline-block min-w-[140px] font-mono tracking-tight"
        aria-hidden="true"
      >
        {displayText}
      </span>
      <span className="sr-only">Saedgewell</span>
    </a>
  );
}

export default LogoLink;
