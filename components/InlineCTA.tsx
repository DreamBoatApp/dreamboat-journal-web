'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

type Props = {
    symbol?: string;
};

export default function InlineCTA({ symbol }: Props) {
    const t = useTranslations('InlineCTA');
    const tc = useTranslations('Common');

    const copy = symbol
        ? tc('bannerSymbolCopy', { symbol })
        : tc('bannerDefaultCopy');

    return (
        <section className="my-12 relative overflow-hidden rounded-2xl border border-indigo-500/20">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/60 via-purple-900/40 to-fuchsia-900/30 pointer-events-none" />
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] pointer-events-none" />

            <div className="relative z-10 p-8 md:p-10 flex flex-col md:flex-row items-center gap-8">
                {/* App Icon */}
                <div className="flex-shrink-0">
                    <Image
                        src="/images/app_icon.png"
                        alt="DreamBoat"
                        width={80}
                        height={80}
                        className="rounded-2xl shadow-lg shadow-purple-500/20"
                    />
                </div>

                {/* Content */}
                <div className="flex-1 text-center md:text-left">
                    <h3 className="text-lg md:text-xl font-bold text-white mb-2">
                        {t('title')}
                    </h3>
                    <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-4 max-w-lg">
                        {copy}
                    </p>

                    {/* Download Links */}
                    <div className="flex flex-wrap gap-3">
                        <a href="https://apps.apple.com/app/id6756622594" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-full text-white font-semibold text-sm transition-colors">
                            🍎 App Store
                        </a>
                        <a href="https://play.google.com/store/apps/details?id=com.dreamboat.mobile" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white font-semibold text-sm transition-colors">
                            ▶️ Google Play
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
