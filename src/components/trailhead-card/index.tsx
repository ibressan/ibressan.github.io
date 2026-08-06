import { useEffect, useState } from 'react';
import { skeleton } from '../../utils';
import { useLanguage } from '../../i18n/LanguageContext';

interface TrailheadStats {
  rankTitle: string;
  rankImageUrl: string;
  badges: number;
  points: number;
  trails: number;
  profileUrl: string;
}

const TrailheadCard = ({ loading: parentLoading }: { loading: boolean }) => {
  const { t } = useLanguage();
  const [stats, setStats] = useState<TrailheadStats | null>(null);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}trailhead.json`)
      .then((res) => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then(setStats)
      .catch(() => setStats(null))
      .finally(() => setFetching(false));
  }, []);

  const loading = parentLoading || fetching;

  if (!loading && !stats) return null;

  return (
    <div className="card shadow-lg card-sm bg-base-100">
      <div className="card-body items-center text-center">
        <div className="mx-3 self-start">
          <h5 className="card-title">
            {loading ? (
              skeleton({ widthCls: 'w-32', heightCls: 'h-8' })
            ) : (
              <span className="text-base-content opacity-70">Trailhead</span>
            )}
          </h5>
        </div>

        {loading || !stats ? (
          <div className="my-4">
            {skeleton({ widthCls: 'w-32', heightCls: 'h-32', shape: '' })}
          </div>
        ) : (
          <img
            src={stats.rankImageUrl}
            alt={stats.rankTitle}
            className="w-32 h-32 my-2"
          />
        )}

        {!loading && stats && (
          <div className="flex justify-center gap-6 mt-2 mb-1">
            <div>
              <div className="text-xl font-bold text-success">
                {stats.badges}
              </div>
              <div className="text-xs opacity-60">Badges</div>
            </div>
            <div>
              <div className="text-xl font-bold text-success">
                {stats.points.toLocaleString()}
              </div>
              <div className="text-xs opacity-60">Points</div>
            </div>
            <div>
              <div className="text-xl font-bold text-success">
                {stats.trails}
              </div>
              <div className="text-xs opacity-60">Trails</div>
            </div>
          </div>
        )}

        {!loading && stats && (
          <>
            <div className="border-t border-base-300 w-full mt-3"></div>
            <a
              href={stats.profileUrl}
              target="_blank"
              rel="noreferrer"
              className="text-primary text-sm font-medium mt-3"
            >
              {t('goToTrailhead')}
            </a>
          </>
        )}
      </div>
    </div>
  );
};

export default TrailheadCard;
