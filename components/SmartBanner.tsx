'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';

type DeviceType = 'ios' | 'android' | 'desktop';

const STORE_LINKS = {
    android: 'https://play.google.com/store/apps/details?id=com.dreamboat.mobile',
    ios: 'https://apps.apple.com/app/id6756622594',
};

interface SmartBannerProps {
    symbol?: string; // The dream symbol for context-aware copy
}

export default function SmartBanner({ symbol }: SmartBannerProps) {
    const t = useTranslations('Common');
    const [device, setDevice] = useState<DeviceType>('desktop');

    useEffect(() => {
        const userAgent = navigator.userAgent.toLowerCase();
        if (/iphone|ipad|ipod/.test(userAgent)) {
            setDevice('ios');
        } else if (/android/.test(userAgent)) {
            setDevice('android');
        } else {
            setDevice('desktop');
        }
    }, []);

    // Context-aware copy
    const getCopy = () => {
        if (symbol) {
            return t('bannerSymbolCopy', { symbol }) || `Rüyadaki "${symbol}" sembolünün senin için özel anlamını öğren.`;
        }
        return t('bannerDefaultCopy') || 'Rüyalarının gerçek anlamını keşfet.';
    };

    const getStoreLink = () => {
        return device === 'ios' ? STORE_LINKS.ios : STORE_LINKS.android;
    };

    const getButtonText = () => {
        if (device === 'ios') return t('downloadOnAppStore') || 'App Store';
        if (device === 'android') return t('downloadOnGooglePlay') || 'Google Play';
        return t('downloadApp') || 'Download';
    };

    // Mobile Banner
    if (device === 'ios' || device === 'android') {
        return (
            <div className="fixed bottom-0 left-0 right-0 z-[100] p-3 animate-slide-up">
                <div className="mx-auto max-w-lg rounded-2xl border border-white/10 bg-[#0a0a16]/95 backdrop-blur-lg p-4 shadow-2xl">

                    <div className="flex items-center gap-3">
                        {/* App Icon */}
                        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-white/10 shadow-lg">
                            <img
                                src="/images/app_icon.png"
                                alt="Dream Boat"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Text */}
                        <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-white text-sm">DreamBoat</h4>
                            <p className="text-xs text-slate-300 line-clamp-2 mt-0.5">
                                {getCopy()}
                            </p>
                            <div className="flex text-yellow-400 text-[10px] gap-0.5 mt-1">
                                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                                <span className="text-slate-400 ml-1">4.9</span>
                            </div>
                        </div>

                        {/* Download Button */}
                        <a
                            href={getStoreLink()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="shrink-0 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-colors"
                        >
                            {getButtonText()}
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    // Desktop Banner with Store Links
    return (
        <div className="fixed bottom-4 right-4 z-[100] hidden lg:block">
            <div className="w-64 rounded-2xl border border-white/10 bg-[#0a0a16]/95 backdrop-blur-lg p-4 shadow-2xl">

                {/* Header */}
                <div className="flex items-center gap-3 mb-3">
                    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xl border border-white/10">
                        <img
                            src="/images/app_icon.png"
                            alt="Dream Boat"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div>
                        <h4 className="font-semibold text-white text-sm">DreamBoat</h4>
                        <div className="flex text-yellow-400 text-[10px] gap-0.5">
                            <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                        </div>
                    </div>
                </div>

                {/* Context Copy */}
                <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                    {getCopy()}
                </p>

                {/* Store Buttons */}
                <div className="flex flex-col gap-2">
                    <a
                        href={STORE_LINKS.ios}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-lg text-xs font-bold transition-colors"
                    >
                        🍎 App Store
                    </a>
                    <a
                        href={STORE_LINKS.android}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-lg text-xs font-bold transition-colors"
                    >
                        ▶️ Google Play
                    </a>
                </div>
            </div>
        </div>
    );
}
