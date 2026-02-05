'use client';

import { useTranslations } from 'next-intl';

type Props = {
    symbol: string;
};

export default function InlineCTA({ symbol }: Props) {
    const t = useTranslations('InlineCTA');

    return (
        <div className="my-10 p-8 md:p-10 rounded-2xl bg-gradient-to-br from-indigo-950 to-[#0a0a16] border border-white/10 text-center relative overflow-hidden group shadow-2xl">

            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

            <div className="relative z-10 max-w-2xl mx-auto">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
                    {t('title')}
                </h3>
                <div className="text-indigo-100/80 mb-2 space-y-4 text-left leading-relaxed text-lg">
                    <p className="whitespace-pre-line">{t('description')}</p>
                </div>
            </div>
        </div>
    );
}
