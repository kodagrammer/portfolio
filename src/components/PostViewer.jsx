import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

const withBase = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;

// md 파일 내 상대경로(../images/foo.png)를 BASE_URL 기준으로 변환
const resolveImgSrc = (src) => {
  if (!src || src.startsWith('http')) return src
  return withBase(src.replace(/^(\.\.\/)+/, ''))
}

export default function PostViewer({ postPath }) {
    const [content, setContent] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!postPath) return;

        fetch(withBase(postPath))
            .then((res) => {
                if (!res.ok) throw new Error('Failed to fetch post');
                return res.text();
            })
            .then(setContent)
            .catch(() => setError(true));
    }, [postPath]);

    // 공통 메시지 렌더러
    const Message = ({ children }) => (
        <p className="text-text-light text-sm text-center py-20">{children}</p>
    );

    return (
        <div className="min-h-screen bg-bg px-4 sm:px-8 py-12 sm:py-16">
            <div className="max-w-[720px] mx-auto">
                <a
                    href={window.location.origin + window.location.pathname}
                    className="inline-flex items-center gap-1 text-xs sm:text-sm text-text-light hover:text-primary transition-colors mb-10 sm:mb-12"
                >
                    ← 포트폴리오로 돌아가기
                </a>

                {error && <Message>포스트를 불러올 수 없습니다.</Message>}
                {!error && content === null && <Message>불러오는 중...</Message>}

                {!error && content !== null && (
                    /* Typography 플러그인(prose)을 사용하여
                       개별 컴포넌트 선언 없이 마크다운 스타일을 일괄 적용
                    */
                    <article className="prose-post">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeRaw]}
                            components={{
                                img: ({ src, alt }) => (
                                    <img src={resolveImgSrc(src)} alt={alt} className="rounded-xl border border-border w-full" />
                                )
                            }}
                        >
                            {content}
                        </ReactMarkdown>
                    </article>
                )}
            </div>
        </div>
    );
}