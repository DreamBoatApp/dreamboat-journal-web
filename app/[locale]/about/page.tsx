import { getTranslations, setRequestLocale } from 'next-intl/server';
import Breadcrumb from '@/components/Breadcrumb';

type Props = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);
    const titles: Record<string, string> = {
        en: 'About Us — Dreamboat Journal',
        tr: 'Hakkımızda — Dreamboat Journal',
        de: 'Über uns — Dreamboat Journal',
        es: 'Sobre Nosotros — Dreamboat Journal',
        pt: 'Sobre Nós — Dreamboat Journal',
    };
    const descriptions: Record<string, string> = {
        en: 'Learn about Dreamboat Journal — your trusted source for dream interpretation backed by Jungian psychology and cosmic analysis.',
        tr: 'Dreamboat Journal hakkında bilgi edinin — Jung psikolojisi ve kozmik analize dayalı güvenilir rüya tabiri kaynağınız.',
        de: 'Erfahren Sie mehr über Dreamboat Journal — Ihre vertrauenswürdige Quelle für Traumdeutung basierend auf Jungscher Psychologie.',
        es: 'Conozca Dreamboat Journal — su fuente confiable de interpretación de sueños respaldada por la psicología junguiana.',
        pt: 'Conheça o Dreamboat Journal — sua fonte confiável de interpretação de sonhos baseada na psicologia junguiana.',
    };

    return {
        title: titles[locale] || titles.en,
        description: descriptions[locale] || descriptions.en,
        alternates: {
            canonical: `https://dreamboatjournal.com/${locale}/about`,
            languages: {
                'x-default': `https://dreamboatjournal.com/en/about`,
                'en': `https://dreamboatjournal.com/en/about`,
                'tr': `https://dreamboatjournal.com/tr/about`,
            }
        },
    };
}

const content: Record<string, { title: string; mission: string; missionText: string; approach: string; approachText: string; content: string; contentText: string; app: string; appText: string }> = {
    en: {
        title: 'About Dreamboat Journal',
        mission: 'Our Mission',
        missionText: 'Dreamboat Journal was created to make dream interpretation accessible, meaningful, and scientifically grounded. We believe that dreams are windows to your subconscious — carrying messages from your deepest self that deserve thoughtful, respectful analysis.',
        approach: 'Our Approach',
        approachText: 'Our interpretations combine Carl Jung\'s archetypal analysis with modern dream psychology and cosmic awareness. Every symbol in our dictionary of 3,200+ dream meanings is crafted with care, drawing from Jungian shadow work, mythology, and cultural symbolism across civilizations. We also integrate Moon phase analysis to provide a unique cosmic perspective on your dreams.',
        content: 'Content Standards',
        contentText: 'All dream interpretations on Dreamboat Journal are written and reviewed by our editorial team with backgrounds in psychology and dream studies. We follow evidence-based approaches while respecting the deeply personal nature of dream experiences. Our content is regularly updated to reflect the latest findings in dream research.',
        app: 'Dream Boat App',
        appText: 'For a more personalized experience, download the Dream Boat app. Record your dreams with emotions, get AI-powered interpretations, transform your dreams into art, and track your emotional patterns over time with weekly and monthly analyses.',
    },
    tr: {
        title: 'Dreamboat Journal Hakkında',
        mission: 'Misyonumuz',
        missionText: 'Dreamboat Journal, rüya tabirini erişilebilir, anlamlı ve bilimsel temellere dayalı hale getirmek için oluşturuldu. Rüyaların bilinçaltınıza açılan pencereler olduğuna inanıyoruz — en derin benliğinizden gelen mesajlar taşıyan ve düşünceli, saygılı bir analize layık olan pencereler.',
        approach: 'Yaklaşımımız',
        approachText: 'Yorumlarımız Carl Jung\'un arketipsel analizini, modern rüya psikolojisi ve kozmik farkındalıkla birleştirir. 3.200\'den fazla rüya sembolü içeren sözlüğümüzdeki her sembol, Jungcu gölge çalışması, mitoloji ve uygarlıklar arası kültürel sembolizmden yararlanılarak özenle hazırlanmıştır. Ayrıca rüyalarınıza benzersiz bir kozmik perspektif sunmak için Ay evresi analizini de entegre ediyoruz.',
        content: 'İçerik Standartları',
        contentText: 'Dreamboat Journal\'daki tüm rüya tabirleri, psikoloji ve rüya çalışmaları alanında deneyimli editör ekibimiz tarafından yazılmış ve incelenmiştir. Rüya deneyimlerinin derinden kişisel doğasına saygı duyarak kanıta dayalı yaklaşımları takip ediyoruz. İçeriğimiz rüya araştırmalarındaki en son bulguları yansıtacak şekilde düzenli olarak güncellenmektedir.',
        app: 'Dream Boat Uygulaması',
        appText: 'Daha kişiselleştirilmiş bir deneyim için Dream Boat uygulamasını indirin. Rüyalarınızı duygularınızla kaydedin, AI destekli yorumlar alın, rüyalarınızı sanata dönüştürün ve haftalık-aylık analizlerle duygusal kalıplarınızı takip edin.',
    },
    de: {
        title: 'Über Dreamboat Journal',
        mission: 'Unsere Mission',
        missionText: 'Dreamboat Journal wurde geschaffen, um Traumdeutung zugänglich, bedeutungsvoll und wissenschaftlich fundiert zu gestalten. Wir glauben, dass Träume Fenster zu Ihrem Unterbewusstsein sind — Botschaften aus Ihrem tiefsten Selbst, die eine durchdachte, respektvolle Analyse verdienen.',
        approach: 'Unser Ansatz',
        approachText: 'Unsere Deutungen kombinieren Carl Jungs archetypische Analyse mit moderner Traumpsychologie und kosmischem Bewusstsein. Jedes Symbol in unserem Lexikon mit über 3.200 Traumbedeutungen ist sorgfältig ausgearbeitet und stützt sich auf Jungsche Schattenarbeit, Mythologie und kulturelle Symbolik verschiedener Zivilisationen.',
        content: 'Inhaltsstandards',
        contentText: 'Alle Traumdeutungen auf Dreamboat Journal werden von unserem Redaktionsteam mit Hintergrund in Psychologie und Traumforschung verfasst und überprüft. Wir folgen evidenzbasierten Ansätzen und respektieren dabei die zutiefst persönliche Natur von Traumerfahrungen.',
        app: 'Dream Boat App',
        appText: 'Für ein persönlicheres Erlebnis laden Sie die Dream Boat App herunter. Zeichnen Sie Ihre Träume mit Emotionen auf, erhalten Sie KI-gestützte Interpretationen und verfolgen Sie Ihre emotionalen Muster im Laufe der Zeit.',
    },
    es: {
        title: 'Sobre Dreamboat Journal',
        mission: 'Nuestra Misión',
        missionText: 'Dreamboat Journal fue creado para hacer la interpretación de sueños accesible, significativa y científicamente fundamentada. Creemos que los sueños son ventanas a tu subconsciente — portando mensajes de tu ser más profundo que merecen un análisis reflexivo y respetuoso.',
        approach: 'Nuestro Enfoque',
        approachText: 'Nuestras interpretaciones combinan el análisis arquetípico de Carl Jung con la psicología moderna de los sueños y la conciencia cósmica. Cada símbolo en nuestro diccionario de más de 3.200 significados de sueños está elaborado con cuidado, basándose en el trabajo de sombra junguiano, la mitología y el simbolismo cultural de diversas civilizaciones.',
        content: 'Estándares de Contenido',
        contentText: 'Todas las interpretaciones de sueños en Dreamboat Journal son escritas y revisadas por nuestro equipo editorial con formación en psicología y estudios de sueños. Seguimos enfoques basados en evidencia respetando la naturaleza profundamente personal de las experiencias oníricas.',
        app: 'App Dream Boat',
        appText: 'Para una experiencia más personalizada, descarga la app Dream Boat. Registra tus sueños con emociones, obtén interpretaciones impulsadas por IA y rastrea tus patrones emocionales a lo largo del tiempo.',
    },
    pt: {
        title: 'Sobre o Dreamboat Journal',
        mission: 'Nossa Missão',
        missionText: 'O Dreamboat Journal foi criado para tornar a interpretação de sonhos acessível, significativa e cientificamente fundamentada. Acreditamos que os sonhos são janelas para o seu subconsciente — carregando mensagens do seu eu mais profundo que merecem uma análise cuidadosa e respeitosa.',
        approach: 'Nossa Abordagem',
        approachText: 'Nossas interpretações combinam a análise arquetípica de Carl Jung com a psicologia moderna dos sonhos e a consciência cósmica. Cada símbolo em nosso dicionário de mais de 3.200 significados de sonhos é elaborado com cuidado, baseando-se no trabalho de sombra junguiano, mitologia e simbolismo cultural de diversas civilizações.',
        content: 'Padrões de Conteúdo',
        contentText: 'Todas as interpretações de sonhos no Dreamboat Journal são escritas e revisadas por nossa equipe editorial com formação em psicologia e estudos de sonhos. Seguimos abordagens baseadas em evidências respeitando a natureza profundamente pessoal das experiências oníricas.',
        app: 'App Dream Boat',
        appText: 'Para uma experiência mais personalizada, baixe o app Dream Boat. Registre seus sonhos com emoções, obtenha interpretações com IA e acompanhe seus padrões emocionais ao longo do tempo.',
    },
};

export default async function AboutPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t_nav = await getTranslations('Navigation');
    const c = content[locale] || content.en;

    const breadcrumbItems = [
        { label: t_nav('home'), href: `/${locale}` },
        { label: c.title, href: `/${locale}/about` },
    ];

    return (
        <div className="min-h-screen bg-[#030014] text-white">
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-purple-900/20 to-transparent"></div>
            </div>

            <main className="relative z-10 container mx-auto px-4 py-12 md:py-24 max-w-3xl">
                <Breadcrumb items={breadcrumbItems} locale={locale} />

                <header className="mb-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-100 to-indigo-200 mb-6">
                        {c.title}
                    </h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent mx-auto rounded-full"></div>
                </header>

                <article className="prose prose-invert prose-lg max-w-none space-y-10">
                    <section className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                        <h2 className="text-2xl font-bold text-indigo-300 mb-4">{c.mission}</h2>
                        <p className="text-lg leading-relaxed text-slate-200">{c.missionText}</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-indigo-300 mb-4 flex items-center gap-3">
                            <span className="w-8 h-[1px] bg-indigo-500"></span>
                            {c.approach}
                        </h2>
                        <p className="text-lg leading-relaxed text-slate-200">{c.approachText}</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-indigo-300 mb-4 flex items-center gap-3">
                            <span className="w-8 h-[1px] bg-indigo-500"></span>
                            {c.content}
                        </h2>
                        <p className="text-lg leading-relaxed text-slate-200">{c.contentText}</p>
                    </section>

                    <section className="p-8 rounded-2xl bg-gradient-to-r from-indigo-900/30 to-purple-900/30 border border-indigo-500/20">
                        <h2 className="text-2xl font-bold text-white mb-4">📱 {c.app}</h2>
                        <p className="text-lg leading-relaxed text-slate-200 mb-6">{c.appText}</p>
                        <div className="flex flex-wrap gap-3">
                            <a href="https://apps.apple.com/app/id6756622594" target="_blank" rel="noopener noreferrer" className="inline-block px-8 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-full text-white font-bold transition-colors">
                                🍎 App Store
                            </a>
                            <a href="https://play.google.com/store/apps/details?id=com.dreamboat.mobile" target="_blank" rel="noopener noreferrer" className="inline-block px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white font-bold transition-colors">
                                ▶️ Google Play
                            </a>
                        </div>
                    </section>
                </article>
            </main>
        </div>
    );
}
