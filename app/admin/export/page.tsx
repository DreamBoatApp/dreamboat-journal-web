'use client';

import { useState } from 'react';

const LOCALES = [
    { code: 'tr', label: '🇹🇷 Türkçe', count: '3,210' },
    { code: 'en', label: '🇬🇧 English', count: '3,209' },
    { code: 'es', label: '🇪🇸 Español', count: '738' },
    { code: 'de', label: '🇩🇪 Deutsch', count: '738' },
    { code: 'pt', label: '🇧🇷 Português', count: '738' },
];

export default function ExportPage() {
    const [downloading, setDownloading] = useState<string | null>(null);

    const handleDownload = async (locale?: string) => {
        const key = locale || 'all';
        setDownloading(key);
        try {
            const url = locale
                ? `/api/export-csv?locale=${locale}`
                : '/api/export-csv';
            const link = document.createElement('a');
            link.href = url;
            link.download = locale
                ? `dreamboat_symbols_${locale}.csv`
                : 'dreamboat_symbols_all.csv';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } finally {
            setTimeout(() => setDownloading(null), 2000);
        }
    };

    return (
        <div className="min-h-screen bg-[#030014] text-white font-sans">
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-purple-900/20 to-transparent"></div>
                <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] rounded-full bg-indigo-600/8 blur-[100px]"></div>
            </div>

            <main className="relative z-10 container mx-auto px-4 py-16 max-w-2xl">
                {/* Header */}
                <header className="mb-12 text-center">
                    <div className="inline-block mb-4 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium tracking-wider text-purple-300 uppercase">
                        ⚙️ Admin
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-100 to-indigo-200 mb-3">
                        Rüya Verileri — CSV Export
                    </h1>
                    <p className="text-slate-400">
                        Tüm rüya sembollerini pazarlama için CSV olarak indir.
                    </p>
                    <div className="w-24 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent mx-auto rounded-full mt-6"></div>
                </header>

                {/* All Languages Button */}
                <div className="mb-8">
                    <button
                        onClick={() => handleDownload()}
                        disabled={downloading !== null}
                        className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500/90 to-orange-500/90 hover:from-amber-400 hover:to-orange-400 text-white font-bold text-lg transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-wait"
                    >
                        {downloading === 'all' ? (
                            <span className="animate-pulse">⏳ İndiriliyor...</span>
                        ) : (
                            <>
                                📥 Tüm Diller — Tek CSV İndir
                                <span className="text-sm font-normal opacity-80">(~8,600 sembol)</span>
                            </>
                        )}
                    </button>
                </div>

                {/* Per-Language Buttons */}
                <div className="space-y-3">
                    <h2 className="text-lg font-semibold text-indigo-300 mb-4 flex items-center gap-2">
                        <span className="w-8 h-[1px] bg-indigo-500"></span>
                        Dil Bazında İndir
                    </h2>
                    {LOCALES.map(({ code, label, count }) => (
                        <button
                            key={code}
                            onClick={() => handleDownload(code)}
                            disabled={downloading !== null}
                            className="w-full py-3 px-6 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium transition-all flex items-center justify-between disabled:opacity-50 disabled:cursor-wait"
                        >
                            <span className="flex items-center gap-3">
                                {downloading === code ? (
                                    <span className="animate-pulse">⏳</span>
                                ) : (
                                    <span>📄</span>
                                )}
                                {label}
                            </span>
                            <span className="text-sm text-slate-400">{count} sembol</span>
                        </button>
                    ))}
                </div>

                {/* CSV Format Info */}
                <div className="mt-10 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                    <h3 className="text-sm font-semibold text-white mb-3">📋 CSV Formatı</h3>
                    <div className="text-sm text-slate-400 space-y-1">
                        <div className="flex gap-2"><span className="text-indigo-300">1.</span> Symbol Name — Sembolün adı</div>
                        <div className="flex gap-2"><span className="text-indigo-300">2.</span> Language — Dil kodu (TR, EN, ES, DE, PT)</div>
                        <div className="flex gap-2"><span className="text-indigo-300">3.</span> Short Description — Kısa özet</div>
                        <div className="flex gap-2"><span className="text-indigo-300">4.</span> Full Content — Tüm detaylı yorum metni</div>
                    </div>
                    <div className="mt-4 text-xs text-slate-500">
                        UTF-8 + BOM — Excel&apos;de Türkçe karakterler doğru görünür.
                    </div>
                </div>
            </main>
        </div>
    );
}
