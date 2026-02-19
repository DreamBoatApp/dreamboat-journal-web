'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

type Props = {
    locale: string;
    placeholder: string;
    defaultValue?: string;
    className?: string;
};

type SearchEntry = [string, string]; // [slug, localizedName]

export default function SearchBar({ locale, placeholder, defaultValue = '', className = '' }: Props) {
    const router = useRouter();
    const [query, setQuery] = useState(defaultValue);
    const [results, setResults] = useState<SearchEntry[]>([]);
    const [index, setIndex] = useState<SearchEntry[] | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedIdx, setSelectedIdx] = useState(-1);
    const [isLoading, setIsLoading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Lazy-load the search index on first focus
    const loadIndex = useCallback(async () => {
        if (index) return;
        setIsLoading(true);
        try {
            const res = await fetch('/data/search-index.json');
            const data = await res.json();
            setIndex(data[locale] || data['en'] || []);
        } catch {
            setIndex([]);
        }
        setIsLoading(false);
    }, [index, locale]);

    // Filter results as user types
    useEffect(() => {
        if (!index || !query.trim()) {
            setResults([]);
            setIsOpen(false);
            return;
        }

        const q = query.toLowerCase().trim();
        const filtered: SearchEntry[] = [];
        const exactMatches: SearchEntry[] = [];
        const startMatches: SearchEntry[] = [];
        const containMatches: SearchEntry[] = [];

        for (const entry of index) {
            const [slug, name] = entry;
            const slugLower = slug.toLowerCase();
            const nameLower = name.toLowerCase();

            if (slugLower === q || nameLower === q) {
                exactMatches.push(entry);
            } else if (slugLower.startsWith(q) || nameLower.startsWith(q)) {
                startMatches.push(entry);
            } else if (slugLower.includes(q) || nameLower.includes(q)) {
                containMatches.push(entry);
            }
        }

        filtered.push(...exactMatches, ...startMatches, ...containMatches);
        setResults(filtered.slice(0, 8)); // Show top 8 results
        setIsOpen(filtered.length > 0);
        setSelectedIdx(-1);
    }, [query, index]);

    // Close dropdown on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target as Node) &&
                inputRef.current &&
                !inputRef.current.contains(e.target as Node)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const navigateToResult = (slug: string) => {
        setIsOpen(false);
        setQuery('');
        router.push(`/${locale}/meaning/${slug}`);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (!isOpen || results.length === 0) {
            if (e.key === 'Enter' && query.trim()) {
                e.preventDefault();
                // Fallback: navigate to server-side search
                router.push(`/${locale}/search?q=${encodeURIComponent(query.trim())}`);
            }
            return;
        }

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIdx(prev => Math.min(prev + 1, results.length - 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIdx(prev => Math.max(prev - 1, -1));
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (selectedIdx >= 0 && selectedIdx < results.length) {
                navigateToResult(results[selectedIdx][0]);
            } else if (results.length > 0) {
                // Navigate to the first result
                navigateToResult(results[0][0]);
            } else {
                // Fallback to server search
                router.push(`/${locale}/search?q=${encodeURIComponent(query.trim())}`);
            }
        } else if (e.key === 'Escape') {
            setIsOpen(false);
        }
    };

    return (
        <div className={`relative w-full ${className}`}>
            <div className="relative group w-full">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 to-pink-600 rounded-full opacity-30 group-hover:opacity-70 blur transition duration-500"></div>
                <input
                    ref={inputRef}
                    name="q"
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={loadIndex}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    autoComplete="off"
                    className="relative w-full px-6 py-4 rounded-full bg-[#0a0a16] border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:ring-0 focus:border-white/20 transition-all text-base shadow-xl"
                />
                <button
                    type="button"
                    onClick={() => {
                        if (results.length > 0) {
                            navigateToResult(results[0][0]);
                        } else if (query.trim()) {
                            router.push(`/${locale}/search?q=${encodeURIComponent(query.trim())}`);
                        }
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-indigo-600/80 hover:bg-indigo-500 rounded-full text-white transition-colors"
                    aria-label="Search"
                >
                    {isLoading ? (
                        <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeDasharray="30 70" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                    )}
                </button>
            </div>

            {/* Autocomplete Dropdown */}
            {isOpen && results.length > 0 && (
                <div
                    ref={dropdownRef}
                    className="absolute z-50 w-full mt-2 rounded-2xl bg-[#0d0d1f]/95 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden"
                >
                    {results.map(([slug, name], i) => (
                        <button
                            key={slug}
                            onClick={() => navigateToResult(slug)}
                            onMouseEnter={() => setSelectedIdx(i)}
                            className={`w-full text-left px-5 py-3 flex items-center gap-3 transition-all duration-150 ${i === selectedIdx
                                    ? 'bg-indigo-600/30 text-white'
                                    : 'text-slate-300 hover:bg-white/5'
                                }`}
                        >
                            <span className="text-indigo-400 text-sm">✦</span>
                            <span className="font-medium">{name}</span>
                            {slug !== name.toLowerCase() && (
                                <span className="text-xs text-slate-500 ml-auto">{slug}</span>
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
