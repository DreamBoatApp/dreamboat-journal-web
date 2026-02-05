'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

type Props = {
    title: string;
    analysisText: string;
};

const CosmicConnectionSection = ({ title, analysisText }: Props) => {
    const t = useTranslations('Common');
    const [phase, setPhase] = useState<'New' | 'Waxing' | 'Full' | 'Waning' | 'Dark'>('Full');

    useEffect(() => {
        // Moon Phase Calculation
        const date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        const day = date.getDate();

        let c = 0;
        let e = 0;
        let jd = 0;
        let b = 0;

        if (month < 3) {
            year--;
            month += 12;
        }

        ++month;
        c = 365.25 * year;
        e = 30.6 * month;
        jd = c + e + day - 694039.09;
        jd /= 29.5305882;
        b = parseInt(jd.toString());
        jd -= b;
        b = Math.round(jd * 8);

        if (b >= 8) b = 0;

        switch (b) {
            case 0: setPhase('New'); break;
            case 1:
            case 2:
            case 3: setPhase('Waxing'); break;
            case 4: setPhase('Full'); break;
            case 5:
            case 6:
            case 7: setPhase('Waning'); break;
            default: setPhase('Full');
        }
    }, []);

    const getPhaseIcon = () => {
        switch (phase) {
            case 'New': return '🌑';
            case 'Waxing': return '🌓';
            case 'Full': return '🌕';
            case 'Waning': return '🌗';
            default: return '🌕';
        }
    };

    return (
        <section className="mb-12 p-6 rounded-xl bg-indigo-950/60 border border-purple-500/20 relative overflow-hidden shadow-2xl shadow-indigo-900/20">
            <h2 className="text-xl md:text-2xl font-bold mb-4 flex flex-wrap items-center gap-2 text-white">
                {title} <span className="text-indigo-200 font-normal text-base md:text-lg">({t('moonPhasePrefix')}{t(`phases.${phase}`)} {getPhaseIcon()})</span>
            </h2>

            <div className="relative">
                <p className="text-indigo-100/90 italic leading-relaxed whitespace-pre-line text-lg">
                    "{analysisText}"
                </p>

                {/* Blur Overlay & CTA */}
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#030014] to-transparent flex items-end justify-center pb-0">
                    {/* Gradient covers text, buttons below */}
                </div>
            </div>

            {/* Gated Content CTA */}
            <div className="mt-4 p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md text-center max-w-md mx-auto relative z-10">
                <p className="text-indigo-100 font-medium mb-4">
                    {t('blurCTA')}
                </p>
                <div className="flex flex-row gap-3 justify-center">
                    <a
                        href="https://apps.apple.com/app/id6739992078"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-2.5 bg-white text-indigo-950 rounded-full text-sm font-bold hover:bg-indigo-50 transition-all shadow-lg shadow-white/10"
                    >
                        {t('downloadIOS')}
                    </a>
                    <a
                        href="https://play.google.com/store/apps/details?id=com.dreamboat.journal"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-2.5 border border-white/30 bg-transparent text-white rounded-full text-sm font-bold hover:bg-white/10 transition-all"
                    >
                        {t('downloadAndroid')}
                    </a>
                </div>
            </div>
        </section>
    );
};

export default CosmicConnectionSection;
