'use client';

import { useTranslations } from 'next-intl';

type Props = {
    symbol: string;
};

export default function InlineCTA({ symbol }: Props) {
    const t = useTranslations('InlineCTA');

    return (
        <div className="my-12 py-8 px-6 md:px-0 text-center relative overflow-hidden border-t border-white/10">

            {/* Background Decor - Subtle & Blended */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"></div>
            <div className="absolute -top-24 left-1/2 w-96 h-96 bg-indigo-900/10 rounded-full blur-[100px] -translate-x-1/2 pointer-events-none"></div>

            <div className="relative z-10 max-w-2xl mx-auto">
                <h3 className="text-xl font-bold text-indigo-200 mb-4 tracking-wide uppercase text-sm">
                    {t('title')}
                </h3>
                <div className="text-slate-400 space-y-4 text-left leading-relaxed text-sm md:text-base font-light">
                    <p className="whitespace-pre-line text-center">{t('description')}</p>
                </div>
            </div>
        </div>
    );
}
