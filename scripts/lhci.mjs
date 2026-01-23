import { spawn } from 'node:child_process';
import { existsSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const tempDir = resolve('.lighthouseci/tmp');
mkdirSync(tempDir, { recursive: true });

const env = {
  ...process.env,
  LHCI_TEMP_DIR: tempDir,
  TEMP: tempDir,
  TMP: tempDir,
  TMPDIR: tempDir,
};
const candidateNames =
  process.platform === 'win32'
    ? ['lhci.exe', 'lhci.cmd', 'lhci']
    : ['lhci'];
const binPath = candidateNames
  .map((name) => resolve('node_modules/.bin', name))
  .find((path) => existsSync(path));
const command = binPath ?? candidateNames[0];
const args = ['autorun', '--no-cleanup'];

const useShell =
  process.platform === 'win32' && !command.toLowerCase().endsWith('.exe');

const child = spawn(command, args, {
  stdio: 'inherit',
  env,
  shell: useShell,
});

child.on('error', (error) => {
  console.error(error);
  process.exit(1);
});

child.on('exit', (code) => {
  process.exit(code ?? 1);
});
