import React from 'react';

type Props = {
    locale: string;
    placeholder: string;
    defaultValue?: string;
    className?: string;
};

export default function SearchBar({ locale, placeholder, defaultValue = '', className = '' }: Props) {
    return (
        <form action={`/${locale}/search`} className={`relative group w-full ${className}`}>
            <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 to-pink-600 rounded-full opacity-30 group-hover:opacity-70 blur transition duration-500"></div>
            <input
                name="q"
                type="text"
                defaultValue={defaultValue}
                placeholder={placeholder}
                className="relative w-full px-6 py-4 rounded-full bg-[#0a0a16] border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:ring-0 focus:border-white/20 transition-all text-base shadow-xl"
            />
            <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-indigo-600/80 hover:bg-indigo-500 rounded-full text-white transition-colors"
                aria-label="Search"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
            </button>
        </form>
    );
}
