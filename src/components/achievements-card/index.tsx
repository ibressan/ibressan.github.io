import { PiTrophyBold } from 'react-icons/pi';
import { LocalizedText } from '../../interfaces/sanitized-config';
import { skeleton } from '../../utils';
import { useLanguage } from '../../i18n/LanguageContext';
import { localize } from '../../i18n/localize';

const AchievementsCard = ({
  achievements,
  loading,
}: {
  achievements: LocalizedText[];
  loading: boolean;
}) => {
  const { t, language } = useLanguage();

  const renderSkeleton = () => {
    const array = [];
    for (let index = 0; index < 4; index++) {
      array.push(
        <div key={index} className="flex gap-3 py-2">
          {skeleton({ widthCls: 'w-5', heightCls: 'h-5', shape: '' })}
          {skeleton({ widthCls: 'w-full', heightCls: 'h-4' })}
        </div>,
      );
    }
    return array;
  };

  return (
    <div className="card shadow-lg card-sm bg-base-100">
      <div className="card-body">
        <div className="mx-3">
          <h5 className="card-title">
            {loading ? (
              skeleton({ widthCls: 'w-40', heightCls: 'h-8' })
            ) : (
              <span className="text-base-content opacity-70">
                {t('achievements')}
              </span>
            )}
          </h5>
        </div>
        <div className="mt-2">
          {loading ? (
            renderSkeleton()
          ) : (
            <ul className="space-y-3">
              {achievements.map((achievement, index) => (
                <li key={index} className="flex gap-3 items-start">
                  <PiTrophyBold className="text-primary text-lg mt-0.5 shrink-0" />
                  <span className="text-base-content/80 text-sm leading-relaxed">
                    {localize(achievement, language)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default AchievementsCard;
