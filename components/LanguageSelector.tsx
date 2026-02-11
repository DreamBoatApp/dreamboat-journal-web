'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';

const locales = [
    { code: 'en', label: '🇬🇧 EN' },
    { code: 'tr', label: '🇹🇷 TR' },
    // DE, ES, PT hidden until fully localized
];

export default function LanguageSelector() {
    const locale = useLocale();
    const pathname = usePathname();
    const router = useRouter();

    const handleChange = (newLocale: string) => {
        // Replace the current locale in the pathname with the new one
        const segments = pathname.split('/');
        segments[1] = newLocale;
        router.push(segments.join('/'));
    };

    return (
        <div className="fixed top-4 right-4 z-[90]">
            <select
                value={locale}
                onChange={(e) => handleChange(e.target.value)}
                className="bg-white/5 backdrop-blur-lg border border-white/10 text-white text-sm rounded-lg px-3 py-2 cursor-pointer hover:bg-white/10 transition-colors focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
                {locales.map((loc) => (
                    <option key={loc.code} value={loc.code} className="bg-slate-900 text-white">
                        {loc.label}
                    </option>
                ))}
            </select>
        </div>
    );
}
