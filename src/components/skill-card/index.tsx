import { skeleton } from '../../utils';
import { useLanguage } from '../../i18n/LanguageContext';

const DEVICON_BASE =
  'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';

// Maps a skill label to its icon URL. Skills with no devicon entry (mostly
// Salesforce-specific tools) fall back to a plain text badge.
const SKILL_ICONS: Record<string, string> = {
  Salesforce: `${DEVICON_BASE}/salesforce/salesforce-original.svg`,
  Apex: `${DEVICON_BASE}/apex/apex-original.svg`,
  LWC: 'https://raw.githubusercontent.com/ibressan/ibressan/main/assets/lwc.png',
  HTML: `${DEVICON_BASE}/html5/html5-original.svg`,
  CSS: `${DEVICON_BASE}/css3/css3-original.svg`,
  JavaScript: `${DEVICON_BASE}/javascript/javascript-original.svg`,
  Git: `${DEVICON_BASE}/git/git-original.svg`,
};

const SkillCard = ({
  loading,
  skills,
}: {
  loading: boolean;
  skills: string[];
}) => {
  const { t } = useLanguage();

  const renderSkeleton = () => {
    const array = [];
    for (let index = 0; index < 12; index++) {
      array.push(
        <div key={index} className="flex flex-col items-center gap-2 w-16">
          {skeleton({ widthCls: 'w-12', heightCls: 'h-12', shape: '' })}
          {skeleton({ widthCls: 'w-10', heightCls: 'h-3' })}
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
              skeleton({ widthCls: 'w-32', heightCls: 'h-8' })
            ) : (
              <span className="text-base-content opacity-70">
                {t('techStack')}
              </span>
            )}
          </h5>
        </div>
        <div className="p-3 flow-root">
          <div className="-m-1 flex flex-wrap justify-center gap-4">
            {loading
              ? renderSkeleton()
              : skills.map((skill, index) => {
                  const icon = SKILL_ICONS[skill];
                  return icon ? (
                    <div
                      key={index}
                      className="flex flex-col items-center gap-2 w-16"
                    >
                      <div className="w-12 h-12 rounded-full bg-base-200 flex items-center justify-center p-2.5">
                        <img
                          src={icon}
                          alt={skill}
                          title={skill}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <span className="text-xs text-center text-base-content/70">
                        {skill}
                      </span>
                    </div>
                  ) : (
                    <div key={index} className="badge badge-primary badge-sm">
                      {skill}
                    </div>
                  );
                })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillCard;
