import { Language } from './strings';

const PT_HEADER = /^##\s+🇧🇷.*$/m;
const EN_HEADER = /^##\s+🇺🇸.*$/m;

interface SplitEdition {
  title: string;
  body: string;
}

/**
 * Editions are authored as a single bilingual markdown file with a
 * "## 🇧🇷 Português" section followed by a "## 🇺🇸 English" section.
 * This extracts only the section matching the given language.
 */
export const splitEditionByLanguage = (
  content: string,
  language: Language,
): SplitEdition => {
  const titleLine = content.match(/^#\s+(.+)$/m)?.[1] ?? '';
  const [ptTitle, enTitle] = titleLine.split(/\s*\/\s*/);
  const title = language === 'en' ? enTitle || titleLine : ptTitle || titleLine;

  const ptStart = content.search(PT_HEADER);
  const enStart = content.search(EN_HEADER);

  let body = content;
  if (ptStart !== -1 && enStart !== -1) {
    body =
      language === 'pt'
        ? content.slice(ptStart, enStart)
        : content.slice(enStart);
    // Drops the "## 🇧🇷 Português" / "## 🇺🇸 English" header line itself,
    // since the caller already renders its own title above the body.
    body = body.replace(/^##\s+.*$\n*/, '');
  }

  return { title, body: body.trim() };
};
