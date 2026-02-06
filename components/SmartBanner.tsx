'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';

type DeviceType = 'ios' | 'android' | 'desktop';

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

    const APP_STORE_URL = 'https://apps.apple.com/app/id6739992078';
    const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.dreamboat.journal';

    // QR Code that links to a smart link (could be a Linktr.ee, Branch.io, or custom redirect)
    // For now, using a placeholder QR - in production use a real QR generator
    const QR_CODE_URL = 'https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=https://dreamboatjournal.com/download';

    const getStoreLink = () => {
        if (device === 'ios') return APP_STORE_URL;
        if (device === 'android') return PLAY_STORE_URL;
        return APP_STORE_URL; // Default for desktop
    };

    const getButtonText = () => {
        if (device === 'ios') return 'App Store';
        if (device === 'android') return 'Google Play';
        return 'Download';
    };

    // Context-aware copy
    const getCopy = () => {
        if (symbol) {
            return t('bannerSymbolCopy', { symbol }) || `Rüyadaki "${symbol}" sembolünün senin için özel anlamını öğren.`;
        }
        return t('bannerDefaultCopy') || 'Rüyalarının gerçek anlamını keşfet.';
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

                        {/* CTA Button */}
                        <a
                            href={getStoreLink()}
                            target="_blank"
                            rel="noreferrer"
                            className="shrink-0 px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl text-xs font-bold hover:from-amber-400 hover:to-orange-400 transition-all shadow-lg"
                        >
                            {t('openInApp') || 'Uygulamada Aç'}
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    // Desktop Banner with QR Code (Sidebar style)
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

                {/* QR Code */}
                <div className="flex flex-col items-center">
                    <div className="bg-white p-2 rounded-lg mb-2">
                        <img
                            src={QR_CODE_URL}
                            alt="Scan to Download"
                            className="w-20 h-20"
                        />
                    </div>
                    <p className="text-[10px] text-slate-400 text-center">
                        {t('scanToDownload') || 'Telefonunuzla tarayın'}
                    </p>
                </div>

                {/* Store Buttons */}
                <div className="flex gap-2 mt-3">
                    <a
                        href={APP_STORE_URL}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 py-2 bg-white/5 border border-white/10 text-white rounded-lg text-[10px] font-medium text-center hover:bg-white/10 transition-colors"
                    >
                        iOS
                    </a>
                    <a
                        href={PLAY_STORE_URL}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 py-2 bg-white/5 border border-white/10 text-white rounded-lg text-[10px] font-medium text-center hover:bg-white/10 transition-colors"
                    >
                        Android
                    </a>
                </div>
            </div>
        </div>
    );
}
