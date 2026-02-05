'use client';

import { useTranslations } from 'next-intl';

type Props = {
    symbol: string;
};

export default function InlineCTA({ symbol }: Props) {
    const t = useTranslations('InlineCTA');

    // Format symbol (SNAKE -> Snake)
    const formattedSymbol = symbol.charAt(0).toUpperCase() + symbol.slice(1).toLowerCase();

    return (
        <div className="my-10 p-6 md:p-8 rounded-2xl bg-gradient-to-r from-indigo-900/40 to-purple-900/40 border border-indigo-500/30 text-center relative overflow-hidden group">

            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-indigo-500/20 transition-all duration-700"></div>

            <div className="relative z-10">
                <p className="text-indigo-200 uppercase tracking-widest text-xs font-bold mb-3">
                    {t('eyebrow')}
                </p>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
                    {t.rich('title', {
                        symbol: formattedSymbol,
                        strong: (chunks) => <strong className="text-indigo-300">{chunks}</strong>
                    })}
                </h3>
                <p className="text-indigo-100/80 mb-6 max-w-xl mx-auto">
                    {t.rich('description', {
                        strong: (chunks) => <strong className="text-white">{chunks}</strong>
                    })}
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <a href="https://onelink.to/dreamboat" className="inline-block px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 rounded-full text-white font-bold transition-all shadow-lg shadow-indigo-500/25">
                        {t('button', { symbol: formattedSymbol })}
                    </a>
                </div>
            </div>
        </div>
    );
}
