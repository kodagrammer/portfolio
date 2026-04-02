import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

// ── 유틸 ──────────────────────────────────────────────
const withBase = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;

const resolveImgSrc = (src) =>
  !src || src.startsWith('http') ? src : withBase(src.replace(/^(\.\.\/)+/, ''));

const stripMd = (text) => text.replace(/\*+/g, '').replace(/`/g, '').trim();

const slugify = (text) =>
  stripMd(text).toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-가-힣]/g, '');

const childrenToText = (children) => {
  if (typeof children === 'string') return children;
  if (Array.isArray(children))
    return children.map((c) => (typeof c === 'string' ? c : c?.props?.children ?? '')).join('');
  return String(children ?? '');
};

const extractHeadings = (md) =>
  md.split('\n')
    .map((line) => line.match(/^(#{1,3})\s+(.+)/))
    .filter(Boolean)
    .map(([, hashes, text]) => ({ level: hashes.length, text: stripMd(text), id: slugify(text) }));

// ── 서브 컴포넌트 ──────────────────────────────────────
const Heading = ({ level, children }) => {
  const Tag = `h${level}`;
  return <Tag id={slugify(childrenToText(children))}>{children}</Tag>;
};

const TOC_ITEM_CLASS = {
  1: 'font-semibold text-sm',
  2: 'text-sm',
  3: 'pl-3 text-xs',
};

function TableOfContents({ headings }) {
  if (!headings.length) return null;

  return (
    <aside className="hidden lg:block sticky top-8 bg-card border border-border rounded-2xl p-5">
      <p className="subsection-label mb-3">목차</p>
      <nav className="flex flex-col gap-1">
        {headings.map((h) => (
          <button
            key={h.id}
            onClick={() => document.getElementById(h.id)?.scrollIntoView({ behavior: 'smooth' })}
            className={`text-left text-text-light hover:text-primary transition-colors leading-snug py-0.5 cursor-pointer ${TOC_ITEM_CLASS[h.level]}`}
          >
            {h.text}
          </button>
        ))}
      </nav>
    </aside>
  );
}

const mdComponents = {
  h1: ({ children }) => <Heading level={1}>{children}</Heading>,
  h2: ({ children }) => <Heading level={2}>{children}</Heading>,
  h3: ({ children }) => <Heading level={3}>{children}</Heading>,
  img: ({ src, alt, style }) => (
    <img src={resolveImgSrc(src)} alt={alt} style={style} className="rounded-xl border border-border w-full" />
  ),
};

// ── 메인 컴포넌트 ──────────────────────────────────────
export default function PostViewer({ postPath }) {
  const [content, setContent] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!postPath) return;
    fetch(withBase(postPath))
      .then((res) => { if (!res.ok) throw new Error(); return res.text(); })
      .then(setContent)
      .catch(() => setError(true));
  }, [postPath]);

  const headings = content ? extractHeadings(content) : [];

  return (
    <div className="min-h-screen bg-bg px-4 sm:px-8 py-12 sm:py-16">
      <div className="max-w-[720px] lg:max-w-[1060px] mx-auto">
        <a
          href={window.location.origin + window.location.pathname}
          className="post-back-link mb-10 sm:mb-12"
        >
          ← 포트폴리오로 돌아가기
        </a>

        {error && (
          <p className="text-text-light text-sm text-center py-20">포스트를 불러올 수 없습니다.</p>
        )}
        {!error && content === null && (
          <p className="text-text-light text-sm text-center py-20">불러오는 중...</p>
        )}

        {!error && content !== null && (
          <div className="lg:grid lg:grid-cols-[200px_1fr] lg:gap-10 lg:items-start">
            <TableOfContents headings={headings} />
            <article className="prose-post">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={mdComponents}
              >
                {content}
              </ReactMarkdown>
            </article>
          </div>
        )}
      </div>
    </div>
  );
}