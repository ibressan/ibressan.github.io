import { Language } from './strings';

export type LocalizedText = string | { pt: string; en: string };

export const localize = (
  value: LocalizedText | undefined,
  language: Language,
): string => {
  if (!value) return '';
  if (typeof value === 'string') return value;
  return value[language] ?? value.pt ?? value.en ?? '';
};
