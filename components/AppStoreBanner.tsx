'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';

const STORE_LINKS = {
    android: 'https://play.google.com/store/apps/details?id=com.dreamboat.mobile',
    ios: 'https://apps.apple.com/app/id6756622594',
};

export default function AppStoreBanner() {
    const t = useTranslations('Common');
    const [isIOS, setIsIOS] = useState(false);

    useEffect(() => {
        setIsIOS(/iphone|ipad|ipod/i.test(navigator.userAgent));
    }, []);

    return (
        <div className="fixed bottom-0 left-0 right-0 z-[100] p-4">
            <div className="mx-auto max-w-4xl rounded-2xl border border-white/10 bg-[#0a0a16] p-4 shadow-2xl flex items-center justify-between gap-4">

                {/* App Info */}
                <div className="flex items-center gap-4">
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-white/10 shadow-lg bg-indigo-900">
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xl">
                            ⛵
                        </div>
                    </div>
                    <div>
                        <h4 className="font-semibold text-white text-sm md:text-base">Dream Boat</h4>
                        <div className="flex text-yellow-400 text-xs gap-0.5">
                            <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                        </div>
                    </div>
                </div>

                {/* Download Buttons */}
                <div className="flex items-center gap-2">
                    <a
                        href={isIOS ? STORE_LINKS.ios : STORE_LINKS.android}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full text-xs font-bold transition-colors"
                    >
                        {t('downloadApp')} 📲
                    </a>
                </div>

            </div>
        </div>
    );
}
