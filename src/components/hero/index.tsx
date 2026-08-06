import { useState } from 'react';
import { FaLinkedin, FaMapMarkerAlt } from 'react-icons/fa';
import { PiSunBold, PiMoonBold, PiCopyBold, PiCheckBold } from 'react-icons/pi';
import { SiSalesforce } from 'react-icons/si';
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

const TRAILHEAD_PROFILE_URL = 'https://www.salesforce.com/trailblazer/ibressan';

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
  social,
  resumeFileUrl,
  currentExperience,
  theme,
  onToggleTheme,
}) => {
  const { language, setLanguage, t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const subtitle = currentExperience
    ? language === 'pt'
      ? `${localize(currentExperience.position, language)} na ${currentExperience.company}`
      : `${localize(currentExperience.position, language)} at ${currentExperience.company}`
    : '';

  const copyTrailheadUrl = () => {
    navigator.clipboard.writeText(TRAILHEAD_PROFILE_URL);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

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

      <div className="card bg-base-100 shadow-md border border-base-300 overflow-hidden">
        <div className="card-body p-6 sm:p-8">
          <div className="flex items-start gap-5">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden shrink-0 ring-2 ring-base-200">
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

            <div className="flex-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                {loading || !profile
                  ? skeleton({ widthCls: 'w-48', heightCls: 'h-8' })
                  : profile.name}
              </h1>

              {subtitle && (
                <p className="mt-1 text-base-content/70">{subtitle}</p>
              )}

              {profile?.location && (
                <p className="mt-1 flex items-center gap-1.5 text-sm text-base-content/60">
                  <FaMapMarkerAlt /> {profile.location}
                </p>
              )}

              {social?.linkedin && (
                <a
                  href={`https://www.linkedin.com/in/${social.linkedin}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#0A66C2] text-white hover:opacity-90"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin />
                </a>
              )}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-base-300 flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={copyTrailheadUrl}
              className="btn btn-ghost btn-sm gap-2 normal-case font-normal text-base-content/70"
            >
              <SiSalesforce className="text-primary" />
              salesforce.com/trailblazer/ibressan
              {copied ? <PiCheckBold className="text-success" /> : <PiCopyBold />}
            </button>

            {resumeFileUrl && (
              <a
                href={resumeFileUrl}
                target="_blank"
                rel="noreferrer"
                download
                className="btn btn-primary btn-sm"
              >
                {t('downloadResume')}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
