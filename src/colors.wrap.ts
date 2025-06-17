import { LogLevel } from './types.js';

const wrapInGreen = (txt: string): string => {
  return `\u001B[32m${txt}\u001B[0m`;
};

const wrapInRed = (txt: string): string => {
  return `\u001B[31m${txt}\u001B[0m`;
};

const wrapInYellow = (txt: string): string => {
  return `\u001B[33m${txt}\u001B[0m`;
};

const wrapInMagenta = (txt: string): string => {
  return `\u001B[35m${txt}\u001B[0m`;
};

export const colors: Record<LogLevel, (text: string) => string> = {
  error: (text: string) => wrapInRed(text),
  debug: (text: string) => wrapInMagenta(text),
  info: (text: string) => wrapInGreen(text),
  warn: (text: string) => wrapInYellow(text),
};
