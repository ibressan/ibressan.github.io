import { useState } from 'react';
import { PiCaretDownBold } from 'react-icons/pi';
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

// Skills grouped under the "Salesforce" tile — kept out of the main grid,
// revealed when that tile is expanded.
const SALESFORCE_GROUP = [
  'Sales Cloud',
  'Service Cloud',
  'Experience Cloud',
  'Marketing Cloud',
  'Apex',
  'LWC',
  'Aura Components',
  'Visualforce',
  'SOQL',
  'REST APIs',
  'SOAP APIs',
  'Flow',
];

const SkillTile = ({
  skill,
  small,
}: {
  skill: string;
  small?: boolean;
}) => {
  const icon = SKILL_ICONS[skill];
  return (
    <div
      className={`aspect-square rounded-xl bg-base-200 border border-base-300 flex flex-col items-center justify-center gap-2 ${
        small ? 'p-2' : 'p-3'
      }`}
    >
      {icon ? (
        <img
          src={icon}
          alt=""
          className={small ? 'w-7 h-7 object-contain' : 'w-9 h-9 object-contain'}
        />
      ) : (
        <div
          className={`rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-sm ${
            small ? 'w-7 h-7' : 'w-9 h-9'
          }`}
        >
          {skill.slice(0, 2).toUpperCase()}
        </div>
      )}
      <span className="text-xs text-center text-base-content/70 leading-tight">
        {skill}
      </span>
    </div>
  );
};

const SkillCard = ({
  loading,
  skills,
}: {
  loading: boolean;
  skills: string[];
}) => {
  const { t } = useLanguage();
  const [expanded, setExpanded] = useState(false);

  const salesforceSubSkills = skills.filter((skill) =>
    SALESFORCE_GROUP.includes(skill),
  );
  const mainSkills = skills.filter(
    (skill) => !SALESFORCE_GROUP.includes(skill),
  );

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
              : mainSkills.map((skill, index) =>
                  skill === 'Salesforce' && salesforceSubSkills.length > 0 ? (
                    <button
                      key={index}
                      onClick={() => setExpanded((current) => !current)}
                      className="aspect-square rounded-xl bg-base-200 border border-primary/40 flex flex-col items-center justify-center gap-2 p-3 relative"
                    >
                      <img
                        src={SKILL_ICONS.Salesforce}
                        alt=""
                        className="w-9 h-9 object-contain"
                      />
                      <span className="text-xs text-center text-base-content/70 leading-tight">
                        Salesforce
                      </span>
                      <PiCaretDownBold
                        className={`absolute top-2 right-2 text-primary text-xs transition-transform ${
                          expanded ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  ) : (
                    <SkillTile key={index} skill={skill} />
                  ),
                )}
          </div>

          {!loading && expanded && salesforceSubSkills.length > 0 && (
            <div className="mt-4 pt-4 border-t border-base-300">
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {salesforceSubSkills.map((skill, index) => (
                  <SkillTile key={index} skill={skill} small />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SkillCard;
