import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { getPopularSymbols } from '@/lib/popularity';

type Props = {
    params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
    const { locale } = await params;
    const t = await getTranslations('HomePage');

    // Get dynamic popular symbols (randomized subset per request)
    const popularSymbols = getPopularSymbols(5);

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-8 text-center relative overflow-hidden">

            {/* Central Nebula Glow - The "Soul" of the page */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-[120px] -z-10 pointer-events-none" />

            <div className="max-w-4xl w-full flex flex-col items-center z-10 space-y-8">

                {/* Hero Text */}
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white drop-shadow-lg">
                    {t('title')}
                </h1>

                <p className="text-xl md:text-2xl text-slate-300 max-w-2xl font-light tracking-wide leading-relaxed">
                    {t('subtitle')}
                </p>

                {/* Premium Search Bar */}
                <form action={`/${locale}/search`} className="w-full max-w-lg mt-8 relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-pink-600 rounded-full opacity-30 group-hover:opacity-70 blur transition duration-500"></div>
                    <input
                        name="q"
                        type="text"
                        placeholder={t('searchPlaceholder')}
                        className="relative w-full px-8 py-5 rounded-full bg-[#0a0a16] border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:ring-0 focus:border-white/20 transition-all text-lg shadow-xl"
                    />
                </form>

                {/* Categories */}
                <div className="flex flex-wrap justify-center gap-3 text-sm text-indigo-200/70">
                    <span>{t('popular')}:</span>
                    {popularSymbols.map(symbol => (
                        <Link key={symbol.slug} href={`/meaning/${symbol.slug}`} className="hover:text-white underline decoration-indigo-500/30 hover:decoration-indigo-400 transition-all">
                            {symbol.name}
                        </Link>
                    ))}
                </div>



            </div>

            {/* Floating Elements (Subtle Stars/Fireflies could go here) */}
        </main>
    );
}
