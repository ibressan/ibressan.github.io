import { FaGithub, FaLinkedin, FaMapMarkerAlt } from 'react-icons/fa';
import { PiSunBold, PiMoonBold } from 'react-icons/pi';
import { FALLBACK_IMAGE } from '../../constants';
import { Profile } from '../../interfaces/profile';
import {
  SanitizedExperience,
  SanitizedGithub,
  SanitizedSocial,
} from '../../interfaces/sanitized-config';
import { skeleton } from '../../utils';
import LazyImage from '../lazy-image';
import { useLanguage } from '../../i18n/LanguageContext';
import { localize } from '../../i18n/localize';

interface HeroProps {
  profile: Profile | null;
  loading: boolean;
  github: SanitizedGithub;
  social: SanitizedSocial;
  resumeFileUrl?: string;
  currentExperience?: SanitizedExperience;
  theme: string;
  onToggleTheme: () => void;
}

const Hero: React.FC<HeroProps> = ({
  profile,
  loading,
  github,
  social,
  resumeFileUrl,
  currentExperience,
  theme,
  onToggleTheme,
}) => {
  const { language, setLanguage, t } = useLanguage();

  const subtitle = currentExperience
    ? language === 'pt'
      ? `${localize(currentExperience.position, language)} na ${currentExperience.company}`
      : `${localize(currentExperience.position, language)} at ${currentExperience.company}`
    : '';

  return (
    <div className="site-section pt-6 pb-2">
      <div className="flex justify-end items-center gap-3 mb-4">
        <button
          className="btn btn-ghost btn-sm btn-circle"
          onClick={onToggleTheme}
          aria-label="Toggle theme"
        >
          {theme === 'modern-dark' ? <PiSunBold /> : <PiMoonBold />}
        </button>
        <div className="join">
          <button
            className={`join-item btn btn-sm ${
              language === 'pt' ? 'btn-primary' : 'btn-ghost'
            }`}
            onClick={() => setLanguage('pt')}
            aria-label="Português"
          >
            PT
          </button>
          <button
            className={`join-item btn btn-sm ${
              language === 'en' ? 'btn-primary' : 'btn-ghost'
            }`}
            onClick={() => setLanguage('en')}
            aria-label="English"
          >
            EN
          </button>
        </div>
      </div>

      <div className="card bg-base-100 shadow-md border border-base-300 overflow-visible pt-14">
        <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden shrink-0 ring-4 ring-base-100 shadow-sm mx-auto -mt-24">
          {loading || !profile ? (
            skeleton({ widthCls: 'w-full', heightCls: 'h-full', shape: '' })
          ) : (
            <LazyImage
              src={profile.avatar ? profile.avatar : FALLBACK_IMAGE}
              alt={profile.name}
              placeholder={skeleton({
                widthCls: 'w-full',
                heightCls: 'h-full',
                shape: '',
              })}
            />
          )}
        </div>

        <div className="card-body items-center text-center pt-4 pb-8 px-6 sm:px-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {loading || !profile
              ? skeleton({ widthCls: 'w-48', heightCls: 'h-8' })
              : profile.name}
          </h1>

          {subtitle && <p className="mt-1 text-base-content/70">{subtitle}</p>}

          {profile?.location && (
            <p className="mt-1 flex items-center gap-1.5 text-sm text-base-content/60">
              <FaMapMarkerAlt /> {profile.location}
            </p>
          )}

          <div className="mt-3 flex items-center gap-3">
            <a
              href={`https://github.com/${github.username}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-neutral text-neutral-content hover:opacity-90"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
            {social?.linkedin && (
              <a
                href={`https://www.linkedin.com/in/${social.linkedin}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#0A66C2] text-white hover:opacity-90"
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </a>
            )}
          </div>

          {resumeFileUrl && (
            <a
              href={resumeFileUrl}
              target="_blank"
              rel="noreferrer"
              download
              className="btn btn-primary btn-sm mt-5"
            >
              {t('downloadResume')}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
