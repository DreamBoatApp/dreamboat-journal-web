import { getTranslations } from 'next-intl/server';
import Breadcrumb from '@/components/Breadcrumb';

type Props = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
    const { locale } = await params;
    const titles: Record<string, string> = {
        en: 'Privacy Policy — Dreamboat Journal',
        tr: 'Gizlilik Politikası — Dreamboat Journal',
        de: 'Datenschutzrichtlinie — Dreamboat Journal',
        es: 'Política de Privacidad — Dreamboat Journal',
        pt: 'Política de Privacidade — Dreamboat Journal',
    };

    return {
        title: titles[locale] || titles.en,
        alternates: { canonical: `https://dreamboatjournal.com/${locale}/privacy` },
    };
}

const content: Record<string, { title: string; lastUpdated: string; sections: { heading: string; text: string }[] }> = {
    en: {
        title: 'Privacy Policy',
        lastUpdated: 'Last updated: February 2026',
        sections: [
            { heading: 'Information We Collect', text: 'Dreamboat Journal is a content website that does not require user registration. We do not collect personal information directly. However, we use standard web analytics tools to understand how visitors interact with our site, including page views, session duration, and referral sources. This data is anonymized and used solely to improve our content and user experience.' },
            { heading: 'Cookies', text: 'We use essential cookies to ensure the proper functioning of our website, including language preference storage. Third-party analytics services may also set cookies. You can control cookie settings through your browser preferences.' },
            { heading: 'Third-Party Services', text: 'Our website may contain links to the Dream Boat mobile application and app stores. These third-party services have their own privacy policies and data collection practices. We encourage you to review their respective privacy policies.' },
            { heading: 'Data Retention', text: 'Analytics data is retained for a maximum of 26 months. We do not sell, trade, or otherwise transfer personal information to outside parties.' },
            { heading: 'Content Disclaimer', text: 'All dream interpretations provided on this website are for informational and entertainment purposes only. They should not be considered as professional psychological, medical, or therapeutic advice. If you are experiencing concerning dreams or sleep issues, please consult a qualified healthcare professional.' },
            { heading: 'Contact', text: 'If you have questions about this privacy policy, you can reach us at privacy@dreamboatjournal.com.' },
        ],
    },
    tr: {
        title: 'Gizlilik Politikası',
        lastUpdated: 'Son güncelleme: Şubat 2026',
        sections: [
            { heading: 'Topladığımız Bilgiler', text: 'Dreamboat Journal, kullanıcı kaydı gerektirmeyen bir içerik web sitesidir. Doğrudan kişisel bilgi toplamıyoruz. Ancak ziyaretçilerin sitemizle nasıl etkileşime girdiğini anlamak için standart web analiz araçları kullanıyoruz. Bu veriler anonimleştirilmiş olup yalnızca içeriğimizi ve kullanıcı deneyimimizi geliştirmek için kullanılmaktadır.' },
            { heading: 'Çerezler', text: 'Web sitemizin düzgün çalışmasını sağlamak için temel çerezler kullanıyoruz. Üçüncü taraf analiz hizmetleri de çerezler yerleştirebilir. Çerez ayarlarını tarayıcı tercihleriniz üzerinden kontrol edebilirsiniz.' },
            { heading: 'Üçüncü Taraf Hizmetler', text: 'Web sitemiz Dream Boat mobil uygulaması ve uygulama mağazalarına bağlantılar içerebilir. Bu üçüncü taraf hizmetlerin kendi gizlilik politikaları bulunmaktadır.' },
            { heading: 'Veri Saklama', text: 'Analiz verileri en fazla 26 ay süreyle saklanır. Kişisel bilgilerinizi dış taraflara satmıyor, takas etmiyor veya başka bir şekilde aktarmıyoruz.' },
            { heading: 'İçerik Feragatnamesi', text: 'Bu web sitesinde sunulan tüm rüya tabirleri yalnızca bilgilendirme ve eğlence amaçlıdır. Profesyonel psikolojik, tıbbi veya terapötik tavsiye olarak değerlendirilmemelidir. Endişe verici rüyalar veya uyku sorunları yaşıyorsanız, lütfen nitelikli bir sağlık uzmanına başvurun.' },
            { heading: 'İletişim', text: 'Bu gizlilik politikası hakkında sorularınız varsa bize privacy@dreamboatjournal.com adresinden ulaşabilirsiniz.' },
        ],
    },
    de: {
        title: 'Datenschutzrichtlinie',
        lastUpdated: 'Letzte Aktualisierung: Februar 2026',
        sections: [
            { heading: 'Erhobene Informationen', text: 'Dreamboat Journal ist eine Inhaltswebsite, die keine Benutzerregistrierung erfordert. Wir erheben keine personenbezogenen Daten direkt. Wir verwenden jedoch Standard-Webanalysetools, um zu verstehen, wie Besucher mit unserer Website interagieren.' },
            { heading: 'Cookies', text: 'Wir verwenden wesentliche Cookies, um die ordnungsgemäße Funktion unserer Website sicherzustellen. Sie können Cookie-Einstellungen über Ihre Browser-Einstellungen steuern.' },
            { heading: 'Inhaltshinweis', text: 'Alle auf dieser Website bereitgestellten Traumdeutungen dienen ausschließlich zu Informations- und Unterhaltungszwecken. Sie sollten nicht als professionelle psychologische, medizinische oder therapeutische Beratung betrachtet werden.' },
            { heading: 'Kontakt', text: 'Bei Fragen zu dieser Datenschutzrichtlinie erreichen Sie uns unter privacy@dreamboatjournal.com.' },
        ],
    },
    es: {
        title: 'Política de Privacidad',
        lastUpdated: 'Última actualización: Febrero 2026',
        sections: [
            { heading: 'Información que Recopilamos', text: 'Dreamboat Journal es un sitio web de contenido que no requiere registro de usuario. No recopilamos información personal directamente. Sin embargo, utilizamos herramientas de análisis web estándar para comprender cómo los visitantes interactúan con nuestro sitio.' },
            { heading: 'Cookies', text: 'Utilizamos cookies esenciales para garantizar el correcto funcionamiento de nuestro sitio web. Puede controlar la configuración de cookies a través de las preferencias de su navegador.' },
            { heading: 'Aviso de Contenido', text: 'Todas las interpretaciones de sueños proporcionadas en este sitio web son solo para fines informativos y de entretenimiento. No deben considerarse como asesoramiento profesional psicológico, médico o terapéutico.' },
            { heading: 'Contacto', text: 'Si tiene preguntas sobre esta política de privacidad, contáctenos en privacy@dreamboatjournal.com.' },
        ],
    },
    pt: {
        title: 'Política de Privacidade',
        lastUpdated: 'Última atualização: Fevereiro 2026',
        sections: [
            { heading: 'Informações que Coletamos', text: 'O Dreamboat Journal é um site de conteúdo que não requer registro de usuário. Não coletamos informações pessoais diretamente. No entanto, utilizamos ferramentas padrão de análise web para entender como os visitantes interagem com nosso site.' },
            { heading: 'Cookies', text: 'Utilizamos cookies essenciais para garantir o funcionamento adequado do nosso site. Você pode controlar as configurações de cookies através das preferências do seu navegador.' },
            { heading: 'Aviso de Conteúdo', text: 'Todas as interpretações de sonhos fornecidas neste site são apenas para fins informativos e de entretenimento. Não devem ser consideradas como aconselhamento profissional psicológico, médico ou terapêutico.' },
            { heading: 'Contato', text: 'Se tiver dúvidas sobre esta política de privacidade, entre em contato conosco em privacy@dreamboatjournal.com.' },
        ],
    },
};

export default async function PrivacyPage({ params }: Props) {
    const { locale } = await params;
    const t_nav = await getTranslations('Navigation');
    const c = content[locale] || content.en;

    const breadcrumbItems = [
        { label: t_nav('home'), href: `/${locale}` },
        { label: c.title, href: `/${locale}/privacy` },
    ];

    return (
        <div className="min-h-screen bg-[#030014] text-white">
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-purple-900/20 to-transparent"></div>
            </div>

            <main className="relative z-10 container mx-auto px-4 py-12 md:py-24 max-w-3xl">
                <Breadcrumb items={breadcrumbItems} locale={locale} />

                <header className="mb-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-100 to-indigo-200 mb-4">
                        {c.title}
                    </h1>
                    <p className="text-sm text-slate-400">{c.lastUpdated}</p>
                    <div className="w-24 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent mx-auto rounded-full mt-4"></div>
                </header>

                <article className="prose prose-invert prose-lg max-w-none space-y-8">
                    {c.sections.map((section, i) => (
                        <section key={i}>
                            <h2 className="text-xl font-bold text-indigo-300 mb-3 flex items-center gap-3">
                                <span className="w-6 h-[1px] bg-indigo-500"></span>
                                {section.heading}
                            </h2>
                            <p className="text-slate-300 leading-relaxed">{section.text}</p>
                        </section>
                    ))}
                </article>
            </main>
        </div>
    );
}
