import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { PiArrowLeft } from 'react-icons/pi';

const REPO = 'ibressan/salesforce-news';
const RAW_BASE = `https://raw.githubusercontent.com/${REPO}/main/editions/`;

const NewsPost = () => {
  const { date } = useParams<{ date: string }>();
  const [content, setContent] = useState<string | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!date) return;

    setContent(null);
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
        setContent(resolved);
      })
      .catch(() => setError(true));
  }, [date]);

  return (
    <div className="min-h-screen bg-base-100">
      <div className="max-w-3xl mx-auto px-4 py-10">
        <Link to="/" className="btn btn-ghost btn-sm mb-6 gap-2">
          <PiArrowLeft /> Voltar
        </Link>

        {error && (
          <p className="text-base-content opacity-60">
            Não foi possível carregar esta edição.
          </p>
        )}

        {!error && content === null && (
          <p className="text-base-content opacity-60">Carregando…</p>
        )}

        {!error && content !== null && (
          <article className="prose max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {content}
            </ReactMarkdown>
          </article>
        )}
      </div>
    </div>
  );
};

export default NewsPost;
