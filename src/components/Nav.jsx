import { useState } from 'react'

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Work', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education'}
]

export default function Nav() {
  const [open, setOpen] = useState(false)

  const handleLinkClick = () => setOpen(false)

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-border">
        <div className="max-w-[1100px] mx-auto px-8 h-16 flex items-center justify-between">
          <a href="#" className="font-dm-serif text-xl text-text">
            <span className="text-primary">kodagrammer</span>
          </a>

          {/* 데스크탑 메뉴 */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-text-mid hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* 모바일 햄버거 버튼 */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setOpen(true)}
            aria-label="메뉴 열기"
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <span className="block w-5 h-0.5 bg-text" />
            <span className="block w-5 h-0.5 bg-text" />
            <span className="block w-5 h-0.5 bg-text" />
          </button>
        </div>
      </header>

      {/* 모바일 오버레이 */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/30"
          onClick={() => setOpen(false)}
        />
      )}

      {/* 모바일 슬라이드인 패널 */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="내비게이션 메뉴"
        className={`fixed top-0 right-0 z-50 h-full w-[280px] bg-card shadow-xl transform transition-transform duration-300 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-6 h-16 border-b border-border">
          <span className="font-dm-serif text-lg text-text">
            Contents
          </span>
          <button
            onClick={() => setOpen(false)}
            aria-label="메뉴 닫기"
            className="text-text-mid hover:text-text transition-colors text-xl"
          >
            ✕
          </button>
        </div>
        <nav className="flex flex-col px-6 py-6 gap-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleLinkClick}
              className="text-base text-text-mid hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  )
}
