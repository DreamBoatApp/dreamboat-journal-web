import Link from 'next/link';

type Props = {
    symbols: { slug: string; name: string }[];
    locale: string;
    title: string;
};

export default function RelatedSymbols({ symbols, locale, title }: Props) {
    if (!symbols || symbols.length === 0) return null;

    return (
        <section className="mb-12">
            <h2 className="text-2xl font-semibold text-white flex items-center gap-3 mb-6">
                <span className="w-8 h-[1px] bg-indigo-500"></span>
                {title}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {symbols.map((symbol) => (
                    <Link
                        key={symbol.slug}
                        href={`/${locale}/meaning/${symbol.slug}`}
                        className="group block p-4 rounded-xl bg-white/5 border border-white/5 hover:border-indigo-500/30 hover:bg-white/10 transition-all duration-300 text-center"
                    >
                        <span className="text-sm font-medium text-slate-300 group-hover:text-indigo-300 transition-colors capitalize">
                            {symbol.name}
                        </span>
                    </Link>
                ))}
            </div>
        </section>
    );
}
