import { skeleton } from '../../utils';
import { useLanguage } from '../../i18n/LanguageContext';

const DEVICON_BASE =
  'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';

// Maps a skill label to its icon URL. Skills with no devicon entry (mostly
// Salesforce-specific tools) fall back to a plain text tile.
const SKILL_ICONS: Record<string, string> = {
  Salesforce: `${DEVICON_BASE}/salesforce/salesforce-original.svg`,
  Apex: `${DEVICON_BASE}/apex/apex-original.svg`,
  LWC: 'https://raw.githubusercontent.com/ibressan/ibressan/main/assets/lwc.png',
  HTML: `${DEVICON_BASE}/html5/html5-original.svg`,
  CSS: `${DEVICON_BASE}/css3/css3-original.svg`,
  JavaScript: `${DEVICON_BASE}/javascript/javascript-original.svg`,
  Java: `${DEVICON_BASE}/java/java-original.svg`,
  Git: `${DEVICON_BASE}/git/git-original.svg`,
  Oracle: `${DEVICON_BASE}/oracle/oracle-original.svg`,
  MySQL: `${DEVICON_BASE}/mysql/mysql-original.svg`,
  PostgreSQL: `${DEVICON_BASE}/postgresql/postgresql-original.svg`,
  'SQL Server': `${DEVICON_BASE}/microsoftsqlserver/microsoftsqlserver-plain.svg`,
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
    for (let index = 0; index < 11; index++) {
      array.push(
        <div
          key={index}
          className="aspect-square rounded-xl bg-base-200 flex items-center justify-center"
        >
          {skeleton({ widthCls: 'w-10', heightCls: 'h-10', shape: '' })}
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
                {t('techStack')}
              </span>
            )}
          </h5>
          {!loading && (
            <p className="text-sm text-base-content/50 mt-1">
              {t('techStackSubtitle')}
            </p>
          )}
        </div>
        <div className="p-3">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
            {loading
              ? renderSkeleton()
              : skills.map((skill, index) => {
                  const icon = SKILL_ICONS[skill];
                  return (
                    <div
                      key={index}
                      className="aspect-square rounded-xl bg-base-200 border border-base-300 flex flex-col items-center justify-center gap-2 p-3"
                    >
                      {icon ? (
                        <img
                          src={icon}
                          alt=""
                          className="w-9 h-9 object-contain"
                        />
                      ) : (
                        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                          {skill.slice(0, 2).toUpperCase()}
                        </div>
                      )}
                      <span className="text-xs text-center text-base-content/70 leading-tight">
                        {skill}
                      </span>
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
