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
        <section className="mb-12 relative group rounded-2xl overflow-hidden border border-white/5 bg-[#030014]">
            {/* Ambient Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="relative p-6 md:p-8">
                <h2 className="text-2xl font-bold mb-6 flex flex-wrap items-center gap-3 text-amber-300 relative z-10">
                    {title} <span className="text-amber-200/60 text-lg font-normal">({t('moonPhasePrefix')}{t(`phases.${phase}`)} {getPhaseIcon()})</span>
                </h2>

                <div className="relative">
                    {/* Text Content - Rendered fully but masked */}
                    {/* We add fake extra text to better demonstrate the fade effect if analysis is short */}
                    <p className="text-slate-300 italic leading-loose text-lg whitespace-pre-line pb-4 opacity-90">
                        "{analysisText}
                        {'\n\n'}
                        Bu evrede rüyalarınızın size fısıldadığı sırlar, sadece bilinçaltınızın derinliklerinde değil, aynı zamanda kozmik bir hizalanmanın da işaretidir. Ay'ın bu konumu, içsel rehberliğinizin en güçlü olduğu..."
                    </p>

                    {/* Seamless Fade Out Overlay */}
                    {/* Uses the exact page background color #030014 for seamless blend */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-[#030014]/90 to-transparent z-20 flex flex-col items-center justify-end pb-8">

                        {/* CTA Container - Floating in the fade */}
                        <div className="text-center transform translate-y-2">
                            <p className="text-indigo-200 font-medium mb-6 px-4 drop-shadow-lg text-lg">
                                {t('blurCTA')}
                            </p>

                            <div className="flex flex-row gap-4 justify-center">
                                <a
                                    href="https://apps.apple.com/app/id6739992078"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-8 py-3 bg-white text-indigo-950 rounded-full text-sm font-bold hover:bg-gray-100 transition-all shadow-xl hover:shadow-white/20 hover:-translate-y-0.5"
                                >
                                    {t('downloadIOS')}
                                </a>
                                <a
                                    href="https://play.google.com/store/apps/details?id=com.dreamboat.journal"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-8 py-3 bg-white text-indigo-950 rounded-full text-sm font-bold hover:bg-gray-100 transition-all shadow-xl hover:shadow-white/20 hover:-translate-y-0.5"
                                >
                                    {t('downloadAndroid')}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CosmicConnectionSection;
