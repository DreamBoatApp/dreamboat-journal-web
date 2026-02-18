import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { getPopularSymbols } from '@/lib/popularity';
import SearchBar from '@/components/SearchBar';

type Props = {
    params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations('HomePage');

    // Get dynamic popular symbols (randomized subset per request)
    const popularSymbols = getPopularSymbols(5, locale);

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-8 text-center relative overflow-hidden">

            {/* Central Nebula Glow - The "Soul" of the page */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-[120px] -z-10 pointer-events-none" />

            <div className="max-w-4xl w-full flex flex-col items-center z-10 space-y-8">



                <p className="text-xl md:text-2xl text-slate-300 max-w-2xl font-light tracking-wide leading-relaxed">
                    {t('subtitle')}
                </p>

                {/* Premium Search Bar */}
                <div className="w-full max-w-lg mt-8 relative">
                    <SearchBar locale={locale} placeholder={t('searchPlaceholder')} />
                </div>

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
