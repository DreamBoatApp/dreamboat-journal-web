import Link from 'next/link';
import { ReactNode } from 'react';

/**
 * Injects contextual internal links into text content.
 * Scans for known dream symbol names and wraps them as links
 * to their meaning pages. Limits to maxLinks to avoid over-optimization.
 */

type Props = {
    text: string;
    locale: string;
    currentSlug: string;
    symbolMap: Record<string, string>; // slug -> localizedName
    maxLinks?: number;
};

export default function ContextualLinks({
    text,
    locale,
    currentSlug,
    symbolMap,
    maxLinks = 5,
}: Props) {
    if (!text || Object.keys(symbolMap).length === 0) {
        return <>{text}</>;
    }

    // Build a lookup: lowercase name -> slug (skip current page)
    const nameToSlug: Record<string, string> = {};
    for (const [slug, name] of Object.entries(symbolMap)) {
        if (slug === currentSlug) continue;
        const lowerName = name.toLowerCase();
        // Only link words with 3+ characters to avoid false positives
        if (lowerName.length >= 3) {
            nameToSlug[lowerName] = slug;
        }
    }

    // Sort by name length descending to match longer names first
    const sortedNames = Object.keys(nameToSlug).sort((a, b) => b.length - a.length);

    if (sortedNames.length === 0) {
        return <>{text}</>;
    }

    // Build regex pattern that matches whole words
    const escapedNames = sortedNames.map(n => n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    const pattern = new RegExp(`\\b(${escapedNames.join('|')})\\b`, 'gi');

    let linkCount = 0;
    const linkedSlugs = new Set<string>();
    const parts: ReactNode[] = [];
    let lastIndex = 0;

    // Find all matches
    let match;
    while ((match = pattern.exec(text)) !== null) {
        const matchedText = match[0];
        const matchedSlug = nameToSlug[matchedText.toLowerCase()];

        // Skip if we've reached max links or already linked this symbol
        if (!matchedSlug || linkCount >= maxLinks || linkedSlugs.has(matchedSlug)) {
            continue;
        }

        // Add text before match
        if (match.index > lastIndex) {
            parts.push(text.slice(lastIndex, match.index));
        }

        // Add linked text
        parts.push(
            <Link
                key={`${matchedSlug}-${match.index}`}
                href={`/${locale}/meaning/${matchedSlug}`}
                className="text-indigo-300 hover:text-indigo-200 underline decoration-indigo-500/30 hover:decoration-indigo-400/60 transition-colors"
            >
                {matchedText}
            </Link>
        );

        lastIndex = match.index + matchedText.length;
        linkCount++;
        linkedSlugs.add(matchedSlug);
    }

    // Add remaining text
    if (lastIndex < text.length) {
        parts.push(text.slice(lastIndex));
    }

    // If no links were injected, return plain text
    if (parts.length === 0) {
        return <>{text}</>;
    }

    return <>{parts}</>;
}
