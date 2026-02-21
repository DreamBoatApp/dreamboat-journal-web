import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';

export default function Footer() {
    const t = useTranslations('Footer');
    const t_nav = useTranslations('Navigation');
    const locale = useLocale();
    const year = new Date().getFullYear();

    const popularSymbols = [
        { slug: 'snake', name: locale === 'tr' ? 'Yılan' : locale === 'de' ? 'Schlange' : locale === 'es' ? 'Serpiente' : locale === 'pt' ? 'Cobra' : 'Snake' },
        { slug: 'falling', name: locale === 'tr' ? 'Düşmek' : locale === 'de' ? 'Fallen' : locale === 'es' ? 'Caer' : locale === 'pt' ? 'Cair' : 'Falling' },
        { slug: 'water', name: locale === 'tr' ? 'Su' : locale === 'de' ? 'Wasser' : locale === 'es' ? 'Agua' : locale === 'pt' ? 'Água' : 'Water' },
        { slug: 'death', name: locale === 'tr' ? 'Ölüm' : locale === 'de' ? 'Tod' : locale === 'es' ? 'Muerte' : locale === 'pt' ? 'Morte' : 'Death' },
        { slug: 'cat', name: locale === 'tr' ? 'Kedi' : locale === 'de' ? 'Katze' : locale === 'es' ? 'Gato' : locale === 'pt' ? 'Gato' : 'Cat' },
        { slug: 'baby', name: locale === 'tr' ? 'Bebek' : locale === 'de' ? 'Baby' : locale === 'es' ? 'Bebé' : locale === 'pt' ? 'Bebê' : 'Baby' },
    ];

    const letterLinks = locale === 'tr'
        ? 'ABCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVYZ'.split('')
        : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    return (
        <footer className="relative border-t border-white/10 bg-[#020010]">
            <div className="container mx-auto px-4 py-12 max-w-6xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

                    {/* Column 1: Dictionary */}
                    <div>
                        <h3 className="text-white font-semibold text-lg mb-4">{t('dictionary')}</h3>
                        <div className="flex flex-wrap gap-1.5 mb-4">
                            {letterLinks.map((letter) => (
                                <Link
                                    key={letter}
                                    href={`/${locale}/dictionary/${letter.toLowerCase()}`}
                                    className="w-8 h-8 flex items-center justify-center rounded-md bg-white/5 text-xs text-slate-400 hover:bg-indigo-600/30 hover:text-white transition-colors font-mono"
                                >
                                    {letter}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Column 2: Popular Symbols */}
                    <div>
                        <h3 className="text-white font-semibold text-lg mb-4">{t('popularSymbols')}</h3>
                        <ul className="space-y-2">
                            {popularSymbols.map((symbol) => (
                                <li key={symbol.slug}>
                                    <Link
                                        href={`/${locale}/meaning/${symbol.slug}`}
                                        className="text-slate-400 hover:text-indigo-300 transition-colors text-sm"
                                    >
                                        {symbol.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: About & Legal */}
                    <div>
                        <h3 className="text-white font-semibold text-lg mb-4">DreamBoat Journal</h3>
                        <ul className="space-y-2 mb-4">
                            <li>
                                <Link href={`/${locale}`} className="text-slate-400 hover:text-indigo-300 transition-colors text-sm">
                                    {t_nav('home')}
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${locale}/guide/dream-interpretation-guide`} className="text-slate-400 hover:text-indigo-300 transition-colors text-sm">
                                    {locale === 'tr' ? 'Rüya Tabiri Rehberi' : 'Dream Interpretation Guide'}
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${locale}/guide/lucid-dreaming-guide`} className="text-slate-400 hover:text-indigo-300 transition-colors text-sm">
                                    {locale === 'tr' ? 'Lucid Rüya Rehberi' : 'Lucid Dreaming Guide'}
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${locale}/blog`} className="text-slate-400 hover:text-indigo-300 transition-colors text-sm">
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${locale}/quiz`} className="text-slate-400 hover:text-indigo-300 transition-colors text-sm">
                                    {locale === 'tr' ? 'Rüya Kişiliği Testi' : locale === 'de' ? 'Traumpersönlichkeitstest' : locale === 'es' ? 'Test de Personalidad' : locale === 'pt' ? 'Teste de Personalidade' : 'Dream Personality Quiz'}
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${locale}/about`} className="text-slate-400 hover:text-indigo-300 transition-colors text-sm">
                                    {t('about')}
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${locale}/privacy`} className="text-slate-400 hover:text-indigo-300 transition-colors text-sm">
                                    {t('privacy')}
                                </Link>
                            </li>
                        </ul>
                        <a
                            href="https://onelink.to/dreamboat"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full text-white text-sm font-medium hover:from-indigo-500 hover:to-purple-500 transition-all"
                        >
                            <span className="flex items-center gap-2">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                {t('downloadApp')}
                            </span>
                        </a>
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-10 pt-6 border-t border-white/5 text-center">
                    <p className="text-xs text-slate-500 mb-2">
                        {t('disclaimer')}
                    </p>
                    <p className="text-xs text-slate-600">
                        {t('copyright', { year: String(year) })}
                    </p>
                </div>
            </div>
        </footer>
    );
}
