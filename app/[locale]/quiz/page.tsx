import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import QuizClient from '@/components/QuizClient';
import './quiz.css';

type Props = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;

    const titles: Record<string, string> = {
        tr: 'Rüya Kişiliği Testi — Sen Nasıl Bir Rüyacısın? | DreamBoat',
        en: 'Dream Personality Quiz — What Kind of Dreamer Are You? | DreamBoat',
        de: 'Traumpersönlichkeitstest — Was für ein Träumer bist du? | DreamBoat',
        es: 'Test de Personalidad de Sueños — ¿Qué Tipo de Soñador Eres? | DreamBoat',
        pt: 'Teste de Personalidade de Sonhos — Que Tipo de Sonhador Você É? | DreamBoat',
    };

    const descriptions: Record<string, string> = {
        tr: '12 soruluk testle rüya kişiliğini keşfet. Bilinçaltının sana her gece gönderdiği mesajları çöz. Hayalci Gezgin misin, Derin Dalgıç mı? Hemen öğren!',
        en: 'Discover your dream personality with this 12-question quiz. Decode the nightly messages from your subconscious. Are you a Dreamer Voyager or a Deep Diver? Find out now!',
        de: 'Entdecke deine Traumpersönlichkeit mit diesem 12-Fragen-Quiz. Entschlüssele die nächtlichen Botschaften deines Unterbewusstseins.',
        es: 'Descubre tu personalidad de sueños con este test de 12 preguntas. Descifra los mensajes nocturnos de tu subconsciente.',
        pt: 'Descubra sua personalidade de sonhos com este teste de 12 perguntas. Decifre as mensagens noturnas do seu subconsciente.',
    };

    return {
        title: titles[locale] || titles.en,
        description: descriptions[locale] || descriptions.en,
        alternates: {
            canonical: `https://dreamboatjournal.com/${locale}/quiz`,
            languages: {
                'tr': 'https://dreamboatjournal.com/tr/quiz',
                'en': 'https://dreamboatjournal.com/en/quiz',
            },
        },
        openGraph: {
            title: titles[locale] || titles.en,
            description: descriptions[locale] || descriptions.en,
            url: `https://dreamboatjournal.com/${locale}/quiz`,
            siteName: 'DreamBoat Journal',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: titles[locale] || titles.en,
            description: descriptions[locale] || descriptions.en,
        },
    };
}

export default async function QuizPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Quiz',
        name: locale === 'tr' ? 'Rüya Kişiliği Testi' : 'Dream Personality Quiz',
        description: locale === 'tr'
            ? '12 soruluk testle rüya kişiliğini keşfet.'
            : 'Discover your dream personality with 12 questions.',
        provider: {
            '@type': 'Organization',
            name: 'DreamBoat Journal',
            url: 'https://dreamboatjournal.com',
        },
        educationalLevel: 'beginner',
        numberOfQuestions: 12,
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <main>
                <QuizClient locale={locale} />
            </main>
        </>
    );
}
