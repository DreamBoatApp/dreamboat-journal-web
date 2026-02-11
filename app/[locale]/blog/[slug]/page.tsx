import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import FAQSection from '@/components/FAQSection';
import RelatedSymbols from '@/components/RelatedSymbols';

export const dynamic = 'force-dynamic';

type BlogSection = {
    heading: string;
    content: string;
};

type BlogPostContent = {
    title: string;
    seoDescription: string;
    excerpt: string;
    date: string;
    readTime: string;
    category: string;
    author: string;
    sections: BlogSection[];
    relatedSymbols?: string[];
    faqs?: { question: string; answer: string }[];
};

type Props = {
    params: Promise<{ locale: string; slug: string }>;
};

function getBlogPost(locale: string, slug: string): BlogPostContent | null {
    try {
        const localePath = path.join(process.cwd(), 'content', locale, 'blog', `${slug}.json`);
        const enPath = path.join(process.cwd(), 'content', 'en', 'blog', `${slug}.json`);
        const filePath = fs.existsSync(localePath) ? localePath : (fs.existsSync(enPath) ? enPath : null);
        if (!filePath) return null;
        return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    } catch {
        return null;
    }
}

function getLocalizedSymbolName(locale: string, slug: string): string {
    try {
        const filePath = path.join(process.cwd(), 'content', locale, 'meanings', `${slug}.json`);
        if (!fs.existsSync(filePath)) return slug.charAt(0).toUpperCase() + slug.slice(1);
        const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        return content.localizedName || slug.charAt(0).toUpperCase() + slug.slice(1);
    } catch {
        return slug.charAt(0).toUpperCase() + slug.slice(1);
    }
}

export async function generateMetadata({ params }: Props) {
    const { locale, slug } = await params;
    const post = getBlogPost(locale, slug);
    if (!post) return { title: 'Not Found' };

    const canonicalUrl = `https://dreamboatjournal.com/${locale}/blog/${slug}`;

    return {
        title: post.title,
        description: post.seoDescription,
        alternates: { canonical: canonicalUrl },
        openGraph: {
            title: post.title,
            description: post.seoDescription,
            url: canonicalUrl,
            type: 'article',
            locale,
        },
        twitter: {
            card: 'summary_large_image' as const,
            title: post.title,
            description: post.seoDescription,
        },
    };
}

function renderMarkdown(text: string) {
    return text.split(/(\*\*.*?\*\*|\*[^*]+?\*)/g).map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={i} className="text-white font-semibold">{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith('*') && part.endsWith('*')) {
            return <em key={i} className="text-indigo-200 italic">{part.slice(1, -1)}</em>;
        }
        return part;
    });
}

export default async function BlogPostPage({ params }: Props) {
    const { locale, slug } = await params;
    const post = getBlogPost(locale, slug);
    if (!post) notFound();

    const t_nav = await getTranslations('Navigation');

    const breadcrumbItems = [
        { label: t_nav('home'), href: `/${locale}` },
        { label: t_nav('blog'), href: `/${locale}/blog` },
        { label: post.title, href: `/${locale}/blog/${slug}` },
    ];

    const relatedSymbolsData = (post.relatedSymbols || []).map(s => ({
        slug: s,
        name: getLocalizedSymbolName(locale, s),
    }));

    return (
        <div className="min-h-screen bg-[#030014] text-white font-sans selection:bg-purple-500/30">
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-purple-900/20 to-transparent"></div>
            </div>

            {/* JSON-LD: BlogPosting */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'BlogPosting',
                        headline: post.title,
                        description: post.seoDescription,
                        image: 'https://dreamboatjournal.com/og-image.jpg',
                        author: { '@type': 'Organization', name: 'Dream Boat Journal', url: 'https://dreamboatjournal.com' },
                        publisher: { '@type': 'Organization', name: 'Dream Boat Journal', logo: { '@type': 'ImageObject', url: 'https://dreamboatjournal.com/images/logo.png' } },
                        datePublished: post.date,
                        dateModified: post.date,
                        mainEntityOfPage: { '@type': 'WebPage', '@id': `https://dreamboatjournal.com/${locale}/blog/${slug}` },
                    }),
                }}
            />

            <main className="relative z-10 container mx-auto px-4 py-12 md:py-24 max-w-3xl">
                <Breadcrumb items={breadcrumbItems} locale={locale} />

                <header className="mb-12">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-indigo-600/20 text-indigo-300">
                            {post.category}
                        </span>
                        <span className="text-xs text-slate-500">{post.date}</span>
                        <span className="text-xs text-slate-500">· {post.readTime} read</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-100 to-indigo-200 mb-4">
                        {post.title}
                    </h1>
                    <p className="text-lg text-slate-400">{post.excerpt}</p>
                    <div className="w-24 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent rounded-full mt-6"></div>
                </header>

                <article className="prose prose-invert prose-lg max-w-none space-y-10">
                    {post.sections.map((section, i) => (
                        <section key={i}>
                            <h2 className="text-2xl font-bold text-indigo-300 mb-4 flex items-center gap-3">
                                <span className="w-8 h-[1px] bg-indigo-500"></span>
                                {section.heading}
                            </h2>
                            <div className="text-lg leading-relaxed text-slate-200 whitespace-pre-line">
                                {renderMarkdown(section.content)}
                            </div>
                        </section>
                    ))}

                    {relatedSymbolsData.length > 0 && (
                        <RelatedSymbols
                            symbols={relatedSymbolsData}
                            locale={locale}
                            title="Related Dream Symbols"
                        />
                    )}

                    {post.faqs && post.faqs.length > 0 && (
                        <FAQSection
                            title="Frequently Asked Questions"
                            faqs={post.faqs}
                        />
                    )}

                    {/* Back to Blog */}
                    <div className="text-center pt-6">
                        <Link
                            href={`/${locale}/blog`}
                            className="inline-block px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white text-sm font-medium transition-colors"
                        >
                            ← Back to Blog
                        </Link>
                    </div>
                </article>
            </main>
        </div>
    );
}
