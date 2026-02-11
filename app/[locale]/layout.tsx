import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import SmartBanner from '@/components/SmartBanner';
import LanguageSelector from '@/components/LanguageSelector';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    metadataBase: new URL('https://dreamboatjournal.com'),
    title: {
        default: 'Dreamboat Journal — Dream Interpretation & Meaning',
        template: '%s | Dreamboat Journal',
    },
    description: 'Unlock the secrets of your subconscious. Explore 3,200+ dream symbols with psychological and cosmic analysis.',
    openGraph: {
        type: 'website',
        siteName: 'Dreamboat Journal',
        images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
    },
    twitter: {
        card: 'summary_large_image',
    },
    verification: {
        google: 'rQx1osexu-IggWPerZr9o8BymXF_E4rxzPSaC6zckVs',
    },
};

export default async function RootLayout({
    children,
    params
}: Readonly<{
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}>) {
    // Ensure that the incoming `locale` is valid
    // (Await params in Next.js 15+, but let's be safe)
    const { locale } = await params;

    if (!routing.locales.includes(locale as any)) {
        notFound();
    }

    // Providing all messages to the client
    // side is the easiest way to get started
    const messages = await getMessages();

    return (
        <html lang={locale}>
            <body className={`${inter.className} bg-slate-950 text-slate-200 antialiased`}>
                {/* Global JSON-LD: WebSite + Organization */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify([
                            {
                                '@context': 'https://schema.org',
                                '@type': 'WebSite',
                                name: 'Dreamboat Journal',
                                url: 'https://dreamboatjournal.com',
                                potentialAction: {
                                    '@type': 'SearchAction',
                                    target: `https://dreamboatjournal.com/${locale}/search?q={search_term_string}`,
                                    'query-input': 'required name=search_term_string',
                                },
                            },
                            {
                                '@context': 'https://schema.org',
                                '@type': 'Organization',
                                name: 'Dream Boat Journal',
                                url: 'https://dreamboatjournal.com',
                                logo: 'https://dreamboatjournal.com/images/logo.png',
                                sameAs: [
                                    'https://apps.apple.com/app/dream-boat/id6478015838',
                                ],
                            },
                        ]),
                    }}
                />
                <NextIntlClientProvider messages={messages}>
                    <LanguageSelector />
                    <Header />
                    {children}
                    <Footer />
                    <SmartBanner />
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
