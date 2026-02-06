import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from 'next-intl';

export default function Header() {
    const locale = useLocale();

    return (
        <header className="absolute top-0 left-0 z-50 p-6 pointer-events-none">
            <div className="pointer-events-auto inline-block">
                <Link
                    href={`/${locale}`}
                    className="flex items-center gap-3 group hover:opacity-80 transition-opacity"
                >
                    <span className="text-white font-bold text-xl tracking-tight hidden sm:block font-sans drop-shadow-lg">
                        Dreamboat Journal
                    </span>
                    <div className="relative w-10 h-10">
                        {/* Using logo.png, forcing it to white for dark background */}
                        <Image
                            src="/images/logo.png"
                            alt="Dreamboat Journal Logo"
                            fill
                            className="object-contain filter brightness-0 invert"
                        />
                    </div>
                </Link>
            </div>
        </header>
    );
}
