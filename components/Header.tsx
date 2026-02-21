import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import LanguageSelector from './LanguageSelector';

export default function Header() {
    const locale = useLocale();

    return (
        <header className="sticky top-0 z-50 w-full bg-slate-950/80 backdrop-blur-lg border-b border-white/5">
            <div className="flex items-center justify-between px-4 py-3 md:px-6">
                <Link
                    href={`/${locale}`}
                    className="flex items-center gap-2 group hover:opacity-80 transition-opacity shrink-0"
                >
                    <div className="relative w-8 h-8 md:w-10 md:h-10">
                        <Image
                            src="/images/logo.png"
                            alt="DreamBoat Journal Logo"
                            fill
                            className="object-contain filter brightness-0 invert"
                        />
                    </div>
                    <span className="text-white font-bold text-base md:text-xl tracking-tight hidden sm:block font-sans drop-shadow-lg">
                        DreamBoat Journal
                    </span>
                </Link>
                <LanguageSelector />
            </div>
        </header>
    );
}
