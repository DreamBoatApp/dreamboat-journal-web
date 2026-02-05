'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';

export default function AppStoreBanner() {
    const t = useTranslations('Common');
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Show banner after a small delay
        const timer = setTimeout(() => setIsVisible(true), 2000);
        return () => clearTimeout(timer);
    }, []);

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-slide-up">
            <div className="mx-auto max-w-4xl rounded-2xl border border-white/10 bg-[#0a0a16]/90 backdrop-blur-xl p-4 shadow-2xl flex items-center justify-between gap-4">

                {/* App Info */}
                <div className="flex items-center gap-4">
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-white/10 shadow-lg bg-indigo-900">
                        {/* Simple Icon Placeholder or Actual Image */}
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xl">
                            ⛵
                        </div>
                    </div>
                    <div>
                        <h4 className="font-semibold text-white text-sm md:text-base">Dream Boat: Journal & AI</h4>
                        <div className="flex text-yellow-400 text-xs gap-0.5">
                            <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                            <span className="text-gray-400 ml-1">(4.9)</span>
                        </div>
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex items-center gap-2">
                    <a
                        href="https://apps.apple.com/app/id6739992078"
                        target="_blank"
                        rel="noreferrer"
                        className="hidden sm:block px-4 py-2 bg-white text-indigo-950 rounded-lg text-xs font-bold hover:bg-gray-100 transition-colors"
                    >
                        {t('downloadIOS')}
                    </a>
                    <a
                        href="https://play.google.com/store/apps/details?id=com.dreamboat.journal"
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs font-bold hover:bg-indigo-500 transition-colors"
                    >
                        GET THE APP
                    </a>
                    <button
                        onClick={() => setIsVisible(false)}
                        className="ml-2 h-8 w-8 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10"
                    >
                        ✕
                    </button>
                </div>

            </div>
        </div>
    );
}
