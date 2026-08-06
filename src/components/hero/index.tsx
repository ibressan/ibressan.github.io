import { FaGithub, FaLinkedin, FaMapMarkerAlt } from 'react-icons/fa';
import { PiSunBold, PiMoonBold } from 'react-icons/pi';
import { FALLBACK_IMAGE } from '../../constants';
import { Profile } from '../../interfaces/profile';
import {
  SanitizedGithub,
  SanitizedSocial,
} from '../../interfaces/sanitized-config';
import { skeleton } from '../../utils';
import LazyImage from '../lazy-image';
import { useLanguage } from '../../i18n/LanguageContext';

interface HeroProps {
  profile: Profile | null;
  loading: boolean;
  github: SanitizedGithub;
  social: SanitizedSocial;
  resumeFileUrl?: string;
  theme: string;
  onToggleTheme: () => void;
}

const Hero: React.FC<HeroProps> = ({
  profile,
  loading,
  github,
  social,
  resumeFileUrl,
  theme,
  onToggleTheme,
}) => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="site-section pt-10 pb-8">
      <div className="flex justify-end items-center gap-3 mb-8">
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
            🇧🇷 PT
          </button>
          <button
            className={`join-item btn btn-sm ${
              language === 'en' ? 'btn-primary' : 'btn-ghost'
            }`}
            onClick={() => setLanguage('en')}
            aria-label="English"
          >
            🇺🇸 EN
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center text-center">
        <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden shadow-sm ring-4 ring-base-100">
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

        <h1 className="mt-5 text-3xl sm:text-4xl font-extrabold tracking-tight">
          {loading || !profile
            ? skeleton({ widthCls: 'w-48', heightCls: 'h-9' })
            : profile.name}
        </h1>

        <p className="mt-3 text-base-content/70 max-w-xl">
          {loading || !profile
            ? skeleton({ widthCls: 'w-64', heightCls: 'h-5' })
            : profile.bio}
        </p>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm text-base-content/60">
          {profile?.location && (
            <span className="inline-flex items-center gap-1.5">
              <FaMapMarkerAlt /> {profile.location}
            </span>
          )}
          <a
            href={`https://github.com/${github.username}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-primary"
          >
            <FaGithub /> {github.username}
          </a>
          {social?.linkedin && (
            <a
              href={`https://www.linkedin.com/in/${social.linkedin}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-primary"
            >
              <FaLinkedin /> LinkedIn
            </a>
          )}
        </div>

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
      </div>
    </div>
  );
};

export default Hero;
