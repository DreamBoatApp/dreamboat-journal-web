'use client';

import Link from 'next/link';

type BreadcrumbItem = {
    label: string;
    href: string;
};

type Props = {
    items: BreadcrumbItem[];
    locale: string;
};

export default function Breadcrumb({ items, locale }: Props) {
    // Build JSON-LD structured data
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.label,
            item: `https://dreamboatjournal.com${item.href}`,
        })),
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <nav aria-label="Breadcrumb" className="mb-6">
                <ol className="flex flex-wrap items-center gap-1.5 text-sm text-slate-400">
                    {items.map((item, index) => {
                        const isLast = index === items.length - 1;
                        return (
                            <li key={item.href} className="flex items-center gap-1.5">
                                {index > 0 && (
                                    <span className="text-slate-600" aria-hidden="true">›</span>
                                )}
                                {isLast ? (
                                    <span className="text-indigo-300 font-medium truncate max-w-[200px]" aria-current="page">
                                        {item.label}
                                    </span>
                                ) : (
                                    <Link
                                        href={item.href}
                                        className="hover:text-indigo-300 transition-colors truncate max-w-[150px]"
                                    >
                                        {item.label}
                                    </Link>
                                )}
                            </li>
                        );
                    })}
                </ol>
            </nav>
        </>
    );
}
