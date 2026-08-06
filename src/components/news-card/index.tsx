import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LazyImage from '../lazy-image';
import { PiNewspaper } from 'react-icons/pi';
import { formatDistance } from 'date-fns';
import { ga, skeleton } from '../../utils';
import { useLanguage } from '../../i18n/LanguageContext';
import { splitEditionByLanguage } from '../../i18n/newsMarkdown';

const REPO = 'ibressan/salesforce-news';
const EDITIONS_PATH = 'editions';
const LIMIT = 5;

interface NewsEditionRaw {
  rawContent: string;
  thumbnail?: string;
  link: string;
  publishedAt: Date;
}

interface NewsEdition {
  title: string;
  description: string;
  thumbnail?: string;
  link: string;
  publishedAt: Date;
}

interface GitHubContentEntry {
  name: string;
  download_url: string;
}

const stripMarkdown = (text: string): string =>
  text
    .replace(/\*\*/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[📅🔗🚀💡📖🇧🇷🇺🇸]/gu, '')
    .trim();

const NewsCard = ({
  loading: parentLoading,
  googleAnalyticsId,
}: {
  loading: boolean;
  googleAnalyticsId?: string;
}) => {
  const [rawEditions, setRawEditions] = useState<NewsEditionRaw[]>([]);
  const [fetching, setFetching] = useState(true);
  const navigate = useNavigate();
  const { language, t } = useLanguage();

  useEffect(() => {
    const fetchEditions = async () => {
      try {
        const res = await fetch(
          `https://api.github.com/repos/${REPO}/contents/${EDITIONS_PATH}`,
        );
        const files: GitHubContentEntry[] = await res.json();

        const mdFiles = files
          .filter((f) => f.name.endsWith('.md'))
          .sort((a, b) => b.name.localeCompare(a.name))
          .slice(0, LIMIT);

        const coverByDate = new Map(
          files
            .filter((f) => f.name.startsWith('cover-'))
            .map((f) => [
              f.name.replace('cover-', '').replace('.jpg', ''),
              f.download_url,
            ]),
        );

        const parsed = await Promise.all(
          mdFiles.map(async (file) => {
            const dateStr = file.name.replace('.md', '');
            const contentRes = await fetch(file.download_url);
            const rawContent = await contentRes.text();

            return {
              rawContent,
              thumbnail: coverByDate.get(dateStr),
              link: `/news/${dateStr}`,
              publishedAt: new Date(dateStr),
            };
          }),
        );

        setRawEditions(parsed);
      } catch (error) {
        console.error(error);
      } finally {
        setFetching(false);
      }
    };

    fetchEditions();
  }, []);

  const editions: NewsEdition[] = rawEditions.map((edition) => {
    const { title, body } = splitEditionByLanguage(
      edition.rawContent,
      language,
    );
    const bulletMatch = body.match(/^- (.+)$/m);
    let description = bulletMatch ? stripMarkdown(bulletMatch[1]) : '';
    if (description.length > 180) {
      description = description.slice(0, 180) + '…';
    }

    return {
      title: stripMarkdown(title),
      description,
      thumbnail: edition.thumbnail,
      link: edition.link,
      publishedAt: edition.publishedAt,
    };
  });

  const loading = parentLoading || fetching;

  const renderSkeleton = () => {
    const array = [];
    for (let index = 0; index < LIMIT; index++) {
      array.push(
        <div className="card shadow-md card-sm bg-base-100" key={index}>
          <div className="p-8 h-full w-full">
            <div className="flex items-center flex-col md:flex-row">
              <div className="avatar mb-5 md:mb-0">
                <div className="w-24 h-24 mask mask-squircle">
                  {skeleton({
                    widthCls: 'w-full',
                    heightCls: 'h-full',
                    shape: '',
                  })}
                </div>
              </div>
              <div className="w-full">
                <div className="flex items-start px-4">
                  <div className="w-full">
                    <h2>
                      {skeleton({
                        widthCls: 'w-full',
                        heightCls: 'h-8',
                        className: 'mb-2 mx-auto md:mx-0',
                      })}
                    </h2>
                    {skeleton({
                      widthCls: 'w-24',
                      heightCls: 'h-3',
                      className: 'mx-auto md:mx-0',
                    })}
                    <div className="mt-3">
                      {skeleton({
                        widthCls: 'w-full',
                        heightCls: 'h-4',
                        className: 'mx-auto md:mx-0',
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>,
      );
    }

    return array;
  };

  const renderEditions = () => {
    return editions && editions.length ? (
      editions.map((edition, index) => (
        <a
          className="card shadow-md card-sm bg-base-100 cursor-pointer"
          key={index}
          href={edition.link}
          onClick={(e) => {
            e.preventDefault();

            try {
              if (googleAnalyticsId) {
                ga.event('Click News Edition', {
                  post: edition.title,
                });
              }
            } catch (error) {
              console.error(error);
            }

            navigate(edition.link);
          }}
        >
          <div className="p-8 h-full w-full">
            <div className="flex items-center flex-col md:flex-row">
              <div className="avatar mb-5 md:mb-0 opacity-90">
                <div className="w-24 h-24 mask mask-squircle">
                  {edition.thumbnail ? (
                    <LazyImage
                      src={edition.thumbnail}
                      alt={'thumbnail'}
                      placeholder={skeleton({
                        widthCls: 'w-full',
                        heightCls: 'h-full',
                        shape: '',
                      })}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-base-300">
                      <PiNewspaper className="text-3xl opacity-50" />
                    </div>
                  )}
                </div>
              </div>
              <div className="w-full">
                <div className="flex items-start px-4">
                  <div className="text-center md:text-left w-full">
                    <h2 className="font-medium text-base-content opacity-60">
                      {edition.title}
                    </h2>
                    <p className="text-base-content opacity-50 text-xs">
                      {formatDistance(edition.publishedAt, new Date(), {
                        addSuffix: true,
                      })}
                    </p>
                    <p className="mt-3 text-base-content text-sm">
                      {edition.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </a>
      ))
    ) : (
      <div className="text-center mb-6">
        <PiNewspaper className="mx-auto h-12 w-12 opacity-30" />
        <p className="mt-1 text-sm opacity-50 text-base-content">
          {t('noRecentEdition')}
        </p>
      </div>
    );
  };

  return (
    <div className="col-span-1 lg:col-span-2">
      <div className="card bg-base-200 shadow-xl border border-base-300">
        <div className="card-body p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div className="flex items-center space-x-3">
              {loading ? (
                skeleton({
                  widthCls: 'w-12',
                  heightCls: 'h-12',
                  className: 'rounded-xl',
                })
              ) : (
                <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl">
                  <PiNewspaper className="text-2xl" />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <h3 className="text-base sm:text-lg font-bold text-base-content truncate">
                  {loading
                    ? skeleton({ widthCls: 'w-28', heightCls: 'h-8' })
                    : t('salesforceNews')}
                </h3>
                <div className="text-base-content/60 text-xs sm:text-sm mt-1 truncate">
                  {loading
                    ? skeleton({ widthCls: 'w-32', heightCls: 'h-4' })
                    : t('recentEditions')}
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6">
            {loading ? renderSkeleton() : renderEditions()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
