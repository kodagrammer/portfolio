// src/components/Footer.jsx
// App.jsx에서: <Footer profile={data.profile} />

export default function Footer({ profile }) {
  const { contacts } = profile

  return (
    <footer className="bg-primary text-white pt-20 pb-10 relative overflow-hidden">

<div className="max-w-5xl mx-auto px-6 sm:px-10">

        {/* 메시지 */}
        <div>
          <h2 className="font-dm-serif text-3xl sm:text-4xl text-white leading-tight tracking-tight mb-5">
            Structure over{' '}
            <em className="italic text-white/60">Complexity</em>
          </h2>

          <p className="text-white/70 text-[0.95rem] leading-[1.9] mb-6">
            복잡한 문제를 구조로 단순화하고,<br />
            제약 환경에서도 실행 가능한 설계를 선택합니다.
          </p>
        </div>

        {/* 링크 */}
        <div className="mt-8 flex flex-row gap-6 flex-wrap text-sm">
          <a
              href={`mailto:${contacts.email}`}
              className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2"/>
              <path d="M2 7l10 7 10-7"/>
            </svg>
            {contacts.email}
          </a>
          <a
              href={`https://${contacts.github}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
            </svg>
            {contacts.github}
          </a>
        </div>

        {/* 하단: 카피라이트 */}
        <div className="mt-4 pt-6 border-t border-white/20 flex flex-col items-center gap-3 text-xs">
          <span className="text-white/40 text-center">© 2026 고다영. Built with React + Vite.</span>
        </div>

      </div>
    </footer>
  )
}
