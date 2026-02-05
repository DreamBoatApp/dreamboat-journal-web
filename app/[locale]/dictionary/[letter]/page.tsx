import { Link } from '@/i18n/routing';
import dictionary from '@/scripts/data/source_dictionary';
import { notFound } from 'next/navigation';

// --- Types ---
type Props = {
    params: {
        locale: string;
        letter: string;
    };
};

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

// --- SSG ---
export async function generateStaticParams() {
    const locales = ['en', 'tr', 'de', 'es', 'pt'];
    const paths = [];

    for (const locale of locales) {
        for (const letter of ALPHABET) {
            paths.push({
                locale,
                letter: letter.toLowerCase(),
            });
        }
    }

    return paths;
}

export default function DictionaryLetterPage({ params }: Props) {
    const letter = params.letter.toUpperCase();

    if (!ALPHABET.includes(letter)) notFound();

    // Filter dictionary items starting with the letter
    const keys = Object.keys(dictionary).filter(key =>
        key.toUpperCase().startsWith(letter)
    ).sort();

    return (
        <div className="min-h-screen bg-[#030014] text-white">
            <main className="container mx-auto px-4 py-12 md:py-24 max-w-6xl">

                {/* Header */}
                <div className="mb-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-100 to-purple-200 mb-6">
                        Dream Dictionary
                    </h1>
                    <p className="text-indigo-200/60 max-w-2xl mx-auto">
                        Explore the deeper meanings of your dreams through our comprehensive Jungian archive.
                    </p>
                </div>

                {/* Alphabet Navigation */}
                <nav className="flex flex-wrap justify-center gap-2 mb-16">
                    {ALPHABET.map((char) => {
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

                {/* Results Grid */}
                {keys.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {keys.map((key) => {
                            // Slugify logic must match MeaningPage
                            const slug = key.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');

                            return (
                                <Link
                                    key={key}
                                    href={`/meaning/${slug}`}
                                    className="group block p-6 rounded-xl bg-white/5 border border-white/5 hover:border-indigo-500/30 hover:bg-white/10 transition-all duration-300"
                                >
                                    <h3 className="text-lg font-semibold text-white group-hover:text-indigo-300 transition-colors">
                                        {key}
                                    </h3>
                                </Link>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <div className="text-6xl mb-4">🌑</div>
                        <p className="text-xl text-indigo-200/50">
                            No symbols found starting with "<span className="text-white">{letter}</span>"
                        </p>
                    </div>
                )}

            </main>
        </div>
    );
}
