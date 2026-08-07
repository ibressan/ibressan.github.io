import { useState } from 'react';
import { PiBuildingsBold, PiCaretDownBold } from 'react-icons/pi';
import { SanitizedExperience } from '../../interfaces/sanitized-config';
import { skeleton } from '../../utils';
import { useLanguage } from '../../i18n/LanguageContext';
import { localize } from '../../i18n/localize';

const ExperienceCard = ({
  experiences,
  loading,
}: {
  experiences: SanitizedExperience[];
  loading: boolean;
}) => {
  const { t, language } = useLanguage();
  const [expanded, setExpanded] = useState<number | null>(0);

  const renderSkeleton = () => {
    const array = [];
    for (let index = 0; index < 2; index++) {
      array.push(
        <div key={index} className="py-4 px-1">
          {skeleton({
            widthCls: 'w-6/12',
            heightCls: 'h-4',
            className: 'mb-2',
          })}
          {skeleton({ widthCls: 'w-4/12', heightCls: 'h-3' })}
        </div>,
      );
    }

    return array;
  };

  return (
    <div className="card shadow-lg card-sm bg-base-100">
      <div className="card-body">
        <div className="mx-3 text-center">
          <h5 className="card-title justify-center">
            {loading ? (
              skeleton({ widthCls: 'w-32', heightCls: 'h-8' })
            ) : (
              <span className="text-base-content opacity-70">
                {t('experience')}
              </span>
            )}
          </h5>
          {!loading && (
            <p className="text-sm text-base-content/50 mt-1">
              {t('experienceSubtitle')}
            </p>
          )}
        </div>
        <div className="mt-2">
          {loading ? (
            renderSkeleton()
          ) : (
            <div className="divide-y divide-base-300">
              {experiences.map((experience, index) => {
                const isOpen = expanded === index;
                const highlights = experience.highlights || [];
                return (
                  <div key={index}>
                    <button
                      className="w-full flex items-start gap-3 py-4 px-1 text-left"
                      onClick={() => setExpanded(isOpen ? null : index)}
                    >
                      <PiBuildingsBold className="text-lg mt-0.5 text-base-content/50 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold">
                          {localize(experience.position, language)}
                        </div>
                        <div className="text-sm text-base-content/60">
                          {experience.company}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0 text-xs text-base-content/50 whitespace-nowrap">
                        {localize(experience.from, language)} -{' '}
                        {localize(experience.to, language)}
                        {highlights.length > 0 && (
                          <PiCaretDownBold
                            className={`transition-transform ${
                              isOpen ? 'rotate-180' : ''
                            }`}
                          />
                        )}
                      </div>
                    </button>
                    {isOpen && highlights.length > 0 && (
                      <ul className="pb-4 pl-9 pr-2 space-y-2 text-sm text-base-content/70">
                        {highlights.map((highlight, hIndex) => (
                          <li key={hIndex} className="flex gap-2">
                            <span className="text-primary shrink-0">•</span>
                            <span>{localize(highlight, language)}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;
