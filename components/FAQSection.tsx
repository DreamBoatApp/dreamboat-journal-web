type FAQItem = {
    question: string;
    answer: string;
};

type Props = {
    faqs: FAQItem[];
    title: string;
};

export default function FAQSection({ faqs, title }: Props) {
    // Build FAQ schema
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
            },
        })),
    };

    return (
        <section className="mb-12">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <h2 className="text-2xl font-semibold text-white flex items-center gap-3 mb-6">
                <span className="w-8 h-[1px] bg-indigo-500"></span>
                {title}
            </h2>
            <div className="space-y-3">
                {faqs.map((faq, i) => (
                    <details
                        key={i}
                        className="group rounded-xl bg-white/5 border border-white/5 hover:border-indigo-500/30 transition-all overflow-hidden"
                    >
                        <summary className="flex items-center justify-between p-5 cursor-pointer select-none text-white font-medium text-lg list-none">
                            <span>{faq.question}</span>
                            <span className="text-indigo-400 transition-transform group-open:rotate-45 text-xl ml-4 shrink-0">
                                +
                            </span>
                        </summary>
                        <div className="px-5 pb-5 text-slate-300 leading-relaxed border-t border-white/5 pt-4">
                            {faq.answer}
                        </div>
                    </details>
                ))}
            </div>
        </section>
    );
}
