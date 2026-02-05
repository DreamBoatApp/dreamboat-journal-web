'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

const MoonPhaseWidget = () => {
    const t = useTranslations('Common');
    const [phase, setPhase] = useState<'New' | 'Waxing' | 'Full' | 'Waning' | 'Dark'>('Full');

    useEffect(() => {
        // Simple Moon Phase Calculation (Approximation)
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

        // 0 = New Moon, 4 = Full Moon
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
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all hover:border-white/20 hover:bg-white/10">
            {/* Glow Effect */}
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-indigo-500/20 blur-3xl"></div>

            <div className="relative z-10 flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-white">
                        {t('moonPhaseTitle')} <span className="text-indigo-300">({t(`phases.${phase}`)})</span>
                    </h3>
                    <p className="mt-2 text-sm text-indigo-200/80">
                        {t('moonPhaseDesc')}
                    </p>
                </div>
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-white/10 text-4xl shadow-[0_0_15px_rgba(139,92,246,0.3)]">
                    {getPhaseIcon()}
                </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                    href="https://apps.apple.com/app/id6739992078"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 rounded-xl bg-white text-indigo-950 px-4 py-2 text-center text-sm font-semibold hover:bg-indigo-50 transition-colors"
                >
                    {t('downloadIOS')}
                </a>
                <a
                    href="https://play.google.com/store/apps/details?id=com.dreamboat.journal"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 rounded-xl border border-white/20 bg-transparent px-4 py-2 text-center text-sm font-semibold text-white hover:bg-white/10 transition-colors"
                >
                    {t('downloadAndroid')}
                </a>
            </div>
        </div>
    );
};

export default MoonPhaseWidget;
