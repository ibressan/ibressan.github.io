import { FaGithub, FaLinkedin, FaMapMarkerAlt } from 'react-icons/fa';
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
}

const Hero: React.FC<HeroProps> = ({
  profile,
  loading,
  github,
  social,
  resumeFileUrl,
}) => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="site-section pt-16 pb-14">
      <div className="flex justify-end mb-8">
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

      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shrink-0 shadow-sm">
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

        <div className="text-center sm:text-left flex-1">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {loading || !profile
              ? skeleton({ widthCls: 'w-48', heightCls: 'h-9' })
              : profile.name}
          </h1>

          <p className="mt-3 text-base-content/70 max-w-xl">
            {loading || !profile
              ? skeleton({ widthCls: 'w-64', heightCls: 'h-5' })
              : profile.bio}
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center sm:justify-start gap-4 text-sm text-base-content/60">
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
    </div>
  );
};

export default Hero;
