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

const SocialBadge: React.FC<{
  href: string;
  label: string;
  children: React.ReactNode;
}> = ({ href, label, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    aria-label={label}
    className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-base-200 text-base-content/70 hover:bg-base-300 hover:text-base-content transition-colors"
  >
    {children}
  </a>
);

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

      <div className="card bg-base-100 shadow-md border border-base-300 overflow-visible pt-16">
        <div className="w-36 h-36 sm:w-40 sm:h-40 rounded-full overflow-hidden shrink-0 ring-4 ring-base-100 shadow-sm mx-auto -mt-28">
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

        <div className="card-body items-center text-center pt-5 pb-8 px-6 sm:px-10">
          <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-wide">
            {loading || !profile
              ? skeleton({ widthCls: 'w-48', heightCls: 'h-8' })
              : profile.name}
          </h1>

          <div className="mt-2 flex flex-wrap items-center justify-center gap-4 text-sm text-base-content/60">
            {subtitle && <span>{subtitle}</span>}
            {profile?.location && (
              <span className="flex items-center gap-1.5">
                <FaMapMarkerAlt /> {profile.location}
              </span>
            )}
          </div>

          {profile?.bio && (
            <p className="mt-4 max-w-2xl text-base-content/70 leading-relaxed">
              {profile.bio}
            </p>
          )}

          {resumeFileUrl && (
            <a
              href={resumeFileUrl}
              target="_blank"
              rel="noreferrer"
              download
              className="btn btn-primary btn-sm mt-6"
            >
              {t('downloadResume')}
            </a>
          )}

          <div className="mt-6 flex items-center gap-2">
            <SocialBadge
              href={`https://github.com/${github.username}`}
              label="GitHub"
            >
              <FaGithub />
            </SocialBadge>
            {social?.linkedin && (
              <SocialBadge
                href={`https://www.linkedin.com/in/${social.linkedin}`}
                label="LinkedIn"
              >
                <FaLinkedin />
              </SocialBadge>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
