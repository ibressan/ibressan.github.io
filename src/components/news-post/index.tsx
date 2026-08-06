import { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import GithubSlugger from 'github-slugger';
import { PiArrowLeft, PiListBullets } from 'react-icons/pi';
import { useLanguage } from '../../i18n/LanguageContext';
import { splitEditionByLanguage } from '../../i18n/newsMarkdown';

const REPO = 'ibressan/salesforce-news';
const RAW_BASE = `https://raw.githubusercontent.com/${REPO}/main/editions/`;

interface TocItem {
  level: number;
  text: string;
  slug: string;
}

// Mirrors what rehype-slug assigns to each heading, in document order, so
// these links land on the exact same ids react-markdown renders.
const extractToc = (markdown: string): TocItem[] => {
  const slugger = new GithubSlugger();
  const items: TocItem[] = [];
  const headingRegex = /^(#{3,4})\s+(.+)$/gm;
  let match;
  while ((match = headingRegex.exec(markdown)) !== null) {
    const text = match[2].trim();
    items.push({
      level: match[1].length,
      text,
      slug: slugger.slug(text),
    });
  }
  return items;
};

const NewsPost = () => {
  const { date } = useParams<{ date: string }>();
  const { language, setLanguage, t } = useLanguage();
  const [rawContent, setRawContent] = useState<string | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!date) return;

    setRawContent(null);
    setError(false);

    fetch(`${RAW_BASE}${date}.md`)
      .then((res) => {
        if (!res.ok) throw new Error('Not found');
        return res.text();
      })
      .then((text) => {
        // Resolves relative image paths (e.g. cover-2026-07-23.jpg) against
        // the raw GitHub folder, since this page isn't served from there.
        const resolved = text.replace(
          /!\[([^\]]*)\]\((?!https?:\/\/)([^)]+)\)/g,
          (_match, alt, src) => `![${alt}](${RAW_BASE}${src})`,
        );
        setRawContent(resolved);
      })
      .catch(() => setError(true));
  }, [date]);

  const content = useMemo(() => {
    if (rawContent === null) return null;
    const { title, body } = splitEditionByLanguage(rawContent, language);
    return `# ${title}\n\n${body}`;
  }, [rawContent, language]);

  const toc = useMemo(() => (content ? extractToc(content) : []), [content]);

  return (
    <div className="min-h-screen bg-base-100 newspaper">
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <Link to="/" className="btn btn-ghost btn-sm gap-2">
            <PiArrowLeft /> {t('back')}
          </Link>

          <div className="join">
            <button
              className={`join-item btn btn-sm ${
                language === 'pt' ? 'btn-primary' : 'btn-ghost'
              }`}
              onClick={() => setLanguage('pt')}
              aria-label="Português"
            >
              🇧🇷 PT
            </button>
            <button
              className={`join-item btn btn-sm ${
                language === 'en' ? 'btn-primary' : 'btn-ghost'
              }`}
              onClick={() => setLanguage('en')}
              aria-label="English"
            >
              🇺🇸 EN
            </button>
          </div>
        </div>

        <div className="newspaper-masthead text-center border-b-4 border-double border-base-content/70 pb-3 mb-8">
          <div className="text-3xl sm:text-4xl">Salesforce News</div>
        </div>

        {error && (
          <p className="text-base-content opacity-60">
            {t('editionLoadError')}
          </p>
        )}

        {!error && content === null && (
          <p className="text-base-content opacity-60">{t('loading')}</p>
        )}

        {!error && content !== null && toc.length > 0 && (
          <nav className="not-prose card bg-base-200 border border-base-300 mb-8">
            <div className="card-body p-5">
              <div className="flex items-center gap-2 font-semibold text-sm opacity-70 mb-2">
                <PiListBullets className="text-lg" />
                {t('inThisEdition')}
              </div>
              <ul className="text-sm space-y-1">
                {toc.map((item, index) => (
                  <li
                    key={index}
                    className={item.level === 4 ? 'ml-4' : 'font-medium'}
                  >
                    <a
                      href={`#${item.slug}`}
                      className="link link-hover text-base-content/80"
                      onClick={(e) => {
                        // Plain hash navigation would be swallowed by the
                        // app's HashRouter (it treats the URL hash as the
                        // route), blanking the page — scroll manually instead.
                        e.preventDefault();
                        document
                          .getElementById(item.slug)
                          ?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      {item.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        )}

        {!error && content !== null && (
          <article className="prose max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeSlug]}
            >
              {content}
            </ReactMarkdown>
          </article>
        )}
      </div>
    </div>
  );
};

export default NewsPost;
