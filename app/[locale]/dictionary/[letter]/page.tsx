import { Link } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';
import fs from 'fs';
import path from 'path';
import { notFound, redirect } from 'next/navigation';
import Breadcrumb from '@/components/Breadcrumb';
import InlineCTA from '@/components/InlineCTA';

// SSG: pre-render all letter pages at build time
export async function generateStaticParams() {
    const locales = ['en', 'tr'];
    const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
    const params: { locale: string; letter: string }[] = [];
    for (const locale of locales) {
        for (const letter of letters) {
            params.push({ locale, letter });
        }
    }
    return params;
}

// --- Types ---
type Props = {
    params: {
        locale: string;
        letter: string;
    };
};

// Turkish-specific alphabet for proper ordering
const TR_ALPHABET = 'ABCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVYZ'.split('');
const EN_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const DE_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÜ'.split('');
const PT_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const ES_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZÑ'.split('');

function getAlphabet(locale: string): string[] {
    switch (locale) {
        case 'tr': return TR_ALPHABET;
        case 'de': return DE_ALPHABET;
        case 'es': return ES_ALPHABET;
        case 'pt': return PT_ALPHABET;
        default: return EN_ALPHABET;
    }
}

// Normalize letter for comparison (handle Turkish İ/I specifics)
function normalizeFirstChar(name: string, locale: string): string {
    if (!name) return '';
    const ch = name.charAt(0);
    if (locale === 'tr') {
        // Turkish-specific normalization
        if (ch === 'i' || ch === 'İ') return 'İ';
        if (ch === 'ı' || ch === 'I') return 'I';
        return ch.toLocaleUpperCase('tr');
    }
    return ch.toUpperCase();
}

type SymbolEntry = {
    slug: string;
    name: string;
};

function getSymbolsForLetter(locale: string, letter: string): SymbolEntry[] {
    const meaningsDir = path.join(process.cwd(), 'content', locale, 'meanings');
    const enDir = path.join(process.cwd(), 'content', 'en', 'meanings');

    // Use locale-specific content, fallback to English
    const dir = fs.existsSync(meaningsDir) ? meaningsDir : enDir;
    if (!fs.existsSync(dir)) return [];

    const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
    const symbols: SymbolEntry[] = [];

    for (const file of files) {
        try {
            const content = JSON.parse(fs.readFileSync(path.join(dir, file), 'utf8'));
            const localizedName = content.localizedName || file.replace('.json', '');
            const firstChar = normalizeFirstChar(localizedName, locale);

            if (firstChar === letter.toLocaleUpperCase(locale === 'tr' ? 'tr' : undefined)) {
                symbols.push({
                    slug: file.replace('.json', ''),
                    name: localizedName,
                });
            }
        } catch {
            // Skip malformed files
        }
    }

    // Sort by localized name
    return symbols.sort((a, b) =>
        a.name.localeCompare(b.name, locale)
    );
}

export default async function DictionaryLetterPage({ params }: Props) {
    const { locale, letter: rawLetter } = await params;
    const alphabet = getAlphabet(locale);
    // Decode URI-encoded Turkish chars (e.g., %C3%A7 → ç)
    const decodedLetter = decodeURIComponent(rawLetter);
    const letter = decodedLetter.toLocaleUpperCase(locale === 'tr' ? 'tr' : undefined);

    // Allow letters from the locale's alphabet
    if (!alphabet.includes(letter)) {
        // Fallback: map Turkish special chars to Latin equivalents (e.g., Ç→C when switching from TR to EN)
        const TR_TO_LATIN: Record<string, string> = {
            'Ç': 'C', 'Ğ': 'G', 'İ': 'I', 'I': 'I',
            'Ö': 'O', 'Ş': 'S', 'Ü': 'U',
            'Ä': 'A', 'Ñ': 'N', // DE/ES fallback too
        };
        const fallback = TR_TO_LATIN[letter];
        if (fallback && alphabet.includes(fallback)) {
            redirect(`/${locale}/dictionary/${fallback.toLowerCase()}`);
        }
        notFound();
    }

    const t = await getTranslations('Navigation');
    const symbols = getSymbolsForLetter(locale, letter);

    const breadcrumbItems = [
        { label: t('home'), href: `/${locale}` },
        { label: t('dictionary'), href: `/${locale}/dictionary/${alphabet[0].toLowerCase()}` },
        { label: letter, href: `/${locale}/dictionary/${rawLetter}` },
    ];

    // Localized texts
    const titles: Record<string, string> = {
        tr: 'Rüya Tabirleri Sözlüğü',
        en: 'Dream Dictionary',
        de: 'Traumlexikon',
        es: 'Diccionario de Sueños',
        pt: 'Dicionário dos Sonhos',
    };
    const subtitles: Record<string, string> = {
        tr: 'Kapsamlı Jungian arşivimizle rüyalarınızın derin anlamlarını keşfedin.',
        en: 'Explore the deeper meanings of your dreams through our comprehensive Jungian archive.',
        de: 'Entdecken Sie die tieferen Bedeutungen Ihrer Träume in unserem umfassenden Jungianischen Archiv.',
        es: 'Explore los significados más profundos de sus sueños a través de nuestro archivo junguiano.',
        pt: 'Explore os significados mais profundos dos seus sonhos através do nosso arquivo junguiano.',
    };
    const emptyTexts: Record<string, string> = {
        tr: 'ile başlayan sembol bulunamadı',
        en: 'No symbols found starting with',
        de: 'Keine Symbole gefunden, die mit beginnen',
        es: 'No se encontraron símbolos que empiecen con',
        pt: 'Nenhum símbolo encontrado começando com',
    };

    return (
        <div className="min-h-screen bg-[#030014] text-white">
            <main className="container mx-auto px-4 py-12 md:py-24 max-w-6xl">

                <Breadcrumb items={breadcrumbItems} locale={locale} />

                {/* Header */}
                <div className="mb-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-100 to-purple-200 mb-6">
                        {titles[locale] || titles.en}
                    </h1>
                    <p className="text-indigo-200/60 max-w-2xl mx-auto">
                        {subtitles[locale] || subtitles.en}
                    </p>
                </div>

                {/* Alphabet Navigation */}
                <nav className="flex flex-wrap justify-center gap-2 mb-16">
                    {alphabet.map((char) => {
                        const isActive = char === letter;
                        return (
                            <Link
                                key={char}
                                href={`/dictionary/${char.toLowerCase()}`}
                                className={`w-10 h-10 flex items-center justify-center rounded-lg font-mono text-sm transition-all duration-300 ${isActive
                                    ? 'bg-indigo-600 text-white shadow-[0_0_15px_rgba(79,70,229,0.5)] scale-110'
                                    : 'bg-white/5 text-indigo-200/50 hover:bg-white/10 hover:text-white'
                                    }`}
                            >
                                {char}
                            </Link>
                        );
                    })}
                </nav>

                {/* Results Grid — Full Width, Centered */}
                {symbols.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center">
                        {symbols.map(({ slug, name }) => (
                            <Link
                                key={slug}
                                href={`/meaning/${slug}`}
                                className="group block p-6 rounded-xl bg-white/5 border border-white/5 hover:border-indigo-500/30 hover:bg-white/10 transition-all duration-300 text-center"
                            >
                                <h3 className="text-lg font-semibold text-white group-hover:text-indigo-300 transition-colors capitalize">
                                    {name}
                                </h3>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <div className="text-6xl mb-4">🌑</div>
                        <p className="text-xl text-indigo-200/50">
                            &quot;<span className="text-white">{letter}</span>&quot; {emptyTexts[locale] || emptyTexts.en}
                        </p>
                    </div>
                )}

            </main>
        </div>
    );
}
