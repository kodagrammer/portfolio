import { parseBold } from '../utils/parseMarkdown'
const profileImg = `${import.meta.env.BASE_URL}images/profile.jpg`

const DESCRIPTION_EMOJIS = ['💻', '🚀', '💭', '💡']

export default function About({ about, profile }) {
  return (
    <section id="about" className="py-24 px-8 bg-bg-alt">
      <div className="max-w-[1100px] mx-auto">
        {/* 섹션 헤더 */}
        <p className="text-2xl font-bold tracking-[0.15em] uppercase text-primary mb-3 text-center">
          About Me
        </p>
        <h2 className="font-sans text-[clamp(1rem,2vw,1.25rem)] text-text-mid mb-12 leading-snug text-center">
          "{about.slogan.split('\n').map((line, i, arr) => (
            <span key={i}>{parseBold(line)}{i < arr.length - 1 && <br />}</span>
          ))}"
        </h2>
      </div>

      <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-[4fr_6fr] gap-8 items-start">

        {/* 좌측: 프로필 사진 + Contact 링크 */}
        <div className="flex flex-col items-center gap-6">
          <div className="w-full max-w-[240px] md:max-w-[340px] aspect-square rounded-2xl overflow-hidden bg-bg border border-border">
            <img
              src={profileImg}
              alt={profile.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-row flex-wrap gap-2 w-full max-w-[340px] justify-center">
            <a
              href={profile.contacts.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-1 px-4 py-2 rounded-xl border border-border bg-card text-xs font-medium text-text-mid hover:border-primary hover:text-primary hover:shadow-sm transition-all duration-200 cursor-pointer"
            >
              Resume
              <span className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200 text-xs">↗</span>
            </a>
            <a
              href={`mailto:${profile.contacts.email}`}
              className="group flex items-center justify-center gap-1 px-4 py-2 rounded-xl border border-border bg-card text-xs font-medium text-text-mid hover:border-primary hover:text-primary hover:shadow-sm transition-all duration-200 cursor-pointer"
            >
              Email
              <span className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200 text-xs">↗</span>
            </a>
            <a
              href={`https://${profile.contacts.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-1 px-4 py-2 rounded-xl border border-border bg-card text-xs font-medium text-text-mid hover:border-primary hover:text-primary hover:shadow-sm transition-all duration-200 cursor-pointer"
            >
              GitHub
              <span className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200 text-xs">↗</span>
            </a>
          </div>
        </div>

        {/* 우측: 소개 텍스트 */}
        <div>
          <div className="flex flex-wrap gap-2">
            {about.tags.map((tag, idx) => (
                <span
                    key={idx}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                        tag.accent
                            ? 'bg-primary-pale text-primary-dark'
                            : 'bg-card border border-border text-text-mid'
                    }`}
                >
                {tag.label}
              </span>
            ))}
          </div>

          <div className="flex flex-col gap-4 mt-8 mb-8">
            {about.description.map((para, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <span className="text-base shrink-0 mt-0.5">
                  {DESCRIPTION_EMOJIS[idx]}
                </span>
                <p className="text-text-mid leading-relaxed text-sm md:text-base">
                  {parseBold(para)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
