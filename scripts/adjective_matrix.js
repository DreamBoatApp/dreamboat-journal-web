/**
 * Adjective Matrix Content Generator
 * 
 * Generates "Adjective + Symbol" combination pages
 * Example: "Red Snake", "Dead Snake", "Giant Snake"
 * 
 * Target: Top 50 symbols × 10 adjectives × 5 languages = 2,500 new pages (controlled start)
 */

const fs = require('fs');
const path = require('path');
const dictionary = require('./data/source_dictionary');

// Top 50 most searched dream symbols (ordered by traffic potential)
const TOP_SYMBOLS = [
    'SNAKE', 'TEETH FALLING OUT', 'FLYING', 'DEATH', 'WATER',
    'SPIDER', 'DOG', 'CAT', 'BABY', 'HOUSE',
    'CAR', 'FISH', 'BIRD', 'HORSE', 'WOLF',
    'FIRE', 'BLOOD', 'MONEY', 'WEDDING', 'PREGNANT',
    'LION', 'BEAR', 'SHARK', 'ELEPHANT', 'DRAGON',
    'GHOST', 'ZOMBIE', 'VAMPIRE', 'DEMON', 'ANGEL',
    'KEY', 'DOOR', 'STAIRS', 'BRIDGE', 'MOUNTAIN',
    'OCEAN', 'RIVER', 'RAIN', 'STORM', 'SNOW',
    'KNIFE', 'GUN', 'BLOOD', 'WOUND', 'CRYING',
    'RUNNING', 'FALLING', 'SWIMMING', 'DANCING', 'FIGHTING'
];

// 10 common dream adjectives with translations
const ADJECTIVES = {
    en: {
        red: { adj: 'Red', meaning: 'passion, anger, or vital energy' },
        black: { adj: 'Black', meaning: 'the unknown, hidden fears, or the shadow self' },
        white: { adj: 'White', meaning: 'purity, innocence, or spiritual awakening' },
        dead: { adj: 'Dead', meaning: 'endings, transformation, or letting go' },
        giant: { adj: 'Giant', meaning: 'overwhelming emotions or inflated importance' },
        small: { adj: 'Small', meaning: 'feeling diminished or overlooked' },
        flying: { adj: 'Flying', meaning: 'freedom, transcendence, or ego inflation' },
        chasing: { adj: 'Chasing', meaning: 'pursuit of goals or running from fears' },
        attacking: { adj: 'Attacking', meaning: 'confronting aggression or inner conflict' },
        talking: { adj: 'Talking', meaning: 'messages from the unconscious' }
    },
    tr: {
        red: { adj: 'Kırmızı', meaning: 'tutku, öfke veya hayati enerji' },
        black: { adj: 'Siyah', meaning: 'bilinmeyen, gizli korkular veya gölge benlik' },
        white: { adj: 'Beyaz', meaning: 'saflık, masumiyet veya ruhani uyanış' },
        dead: { adj: 'Ölü', meaning: 'sonlar, dönüşüm veya bırakma' },
        giant: { adj: 'Dev', meaning: 'bunaltıcı duygular veya abartılmış önem' },
        small: { adj: 'Küçük', meaning: 'küçümsenmiş veya göz ardı edilmiş hissetmek' },
        flying: { adj: 'Uçan', meaning: 'özgürlük, aşkınlık veya ego şişmesi' },
        chasing: { adj: 'Kovalayan', meaning: 'hedeflerin peşinde koşma veya korkulardan kaçma' },
        attacking: { adj: 'Saldıran', meaning: 'saldırganlıkla yüzleşme veya iç çatışma' },
        talking: { adj: 'Konuşan', meaning: 'bilinçaltından gelen mesajlar' }
    },
    de: {
        red: { adj: 'Rote', meaning: 'Leidenschaft, Wut oder Lebensenergie' },
        black: { adj: 'Schwarze', meaning: 'das Unbekannte, verborgene Ängste oder der Schattenaspekt' },
        white: { adj: 'Weiße', meaning: 'Reinheit, Unschuld oder spirituelles Erwachen' },
        dead: { adj: 'Tote', meaning: 'Enden, Transformation oder Loslassen' },
        giant: { adj: 'Riesige', meaning: 'überwältigende Gefühle oder aufgeblähte Bedeutung' },
        small: { adj: 'Kleine', meaning: 'sich vermindert oder übersehen fühlen' },
        flying: { adj: 'Fliegende', meaning: 'Freiheit, Transzendenz oder Ego-Inflation' },
        chasing: { adj: 'Jagende', meaning: 'Verfolgung von Zielen oder Flucht vor Ängsten' },
        attacking: { adj: 'Angreifende', meaning: 'Konfrontation mit Aggression oder innerem Konflikt' },
        talking: { adj: 'Sprechende', meaning: 'Botschaften aus dem Unbewussten' }
    },
    es: {
        red: { adj: 'Roja', meaning: 'pasión, ira o energía vital' },
        black: { adj: 'Negra', meaning: 'lo desconocido, miedos ocultos o el yo sombra' },
        white: { adj: 'Blanca', meaning: 'pureza, inocencia o despertar espiritual' },
        dead: { adj: 'Muerta', meaning: 'finales, transformación o soltar' },
        giant: { adj: 'Gigante', meaning: 'emociones abrumadoras o importancia inflada' },
        small: { adj: 'Pequeña', meaning: 'sentirse disminuido o ignorado' },
        flying: { adj: 'Voladora', meaning: 'libertad, trascendencia o inflación del ego' },
        chasing: { adj: 'Perseguidora', meaning: 'persecución de metas o huir de miedos' },
        attacking: { adj: 'Atacante', meaning: 'confrontar la agresión o conflicto interno' },
        talking: { adj: 'Parlante', meaning: 'mensajes del inconsciente' }
    },
    pt: {
        red: { adj: 'Vermelha', meaning: 'paixão, raiva ou energia vital' },
        black: { adj: 'Preta', meaning: 'o desconhecido, medos ocultos ou o eu sombra' },
        white: { adj: 'Branca', meaning: 'pureza, inocência ou despertar espiritual' },
        dead: { adj: 'Morta', meaning: 'finais, transformação ou deixar ir' },
        giant: { adj: 'Gigante', meaning: 'emoções avassaladoras ou importância inflada' },
        small: { adj: 'Pequena', meaning: 'sentir-se diminuído ou ignorado' },
        flying: { adj: 'Voadora', meaning: 'liberdade, transcendência ou inflação do ego' },
        chasing: { adj: 'Perseguidora', meaning: 'perseguição de objetivos ou fugir de medos' },
        attacking: { adj: 'Atacante', meaning: 'confrontar agressão ou conflito interno' },
        talking: { adj: 'Falante', meaning: 'mensagens do inconsciente' }
    }
};

// Symbol translations for popular symbols
const SYMBOL_TRANSLATIONS = {
    'SNAKE': { en: 'Snake', tr: 'Yılan', de: 'Schlange', es: 'Serpiente', pt: 'Cobra' },
    'SPIDER': { en: 'Spider', tr: 'Örümcek', de: 'Spinne', es: 'Araña', pt: 'Aranha' },
    'DOG': { en: 'Dog', tr: 'Köpek', de: 'Hund', es: 'Perro', pt: 'Cachorro' },
    'CAT': { en: 'Cat', tr: 'Kedi', de: 'Katze', es: 'Gato', pt: 'Gato' },
    'WOLF': { en: 'Wolf', tr: 'Kurt', de: 'Wolf', es: 'Lobo', pt: 'Lobo' },
    'LION': { en: 'Lion', tr: 'Aslan', de: 'Löwe', es: 'León', pt: 'Leão' },
    'BEAR': { en: 'Bear', tr: 'Ayı', de: 'Bär', es: 'Oso', pt: 'Urso' },
    'HORSE': { en: 'Horse', tr: 'At', de: 'Pferd', es: 'Caballo', pt: 'Cavalo' },
    'BIRD': { en: 'Bird', tr: 'Kuş', de: 'Vogel', es: 'Pájaro', pt: 'Pássaro' },
    'FISH': { en: 'Fish', tr: 'Balık', de: 'Fisch', es: 'Pez', pt: 'Peixe' },
    'DRAGON': { en: 'Dragon', tr: 'Ejderha', de: 'Drache', es: 'Dragón', pt: 'Dragão' },
    'SHARK': { en: 'Shark', tr: 'Köpekbalığı', de: 'Hai', es: 'Tiburón', pt: 'Tubarão' },
    'ELEPHANT': { en: 'Elephant', tr: 'Fil', de: 'Elefant', es: 'Elefante', pt: 'Elefante' },
    // Add more as needed...
};

const LOCALES = ['en', 'tr', 'de', 'es', 'pt'];

const slugify = (str) => str.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');

// Templates for each language
const TEMPLATES = {
    en: (adj, symbol, adjMeaning, symbolMeaning) => ({
        title: `Dreaming of a ${adj} ${symbol}: Meaning & Interpretation`,
        seoDescription: `Discover what dreaming of a ${adj.toLowerCase()} ${symbol.toLowerCase()} means. In-depth Jungian analysis of ${adj.toLowerCase()} ${symbol.toLowerCase()} dreams and their psychological significance.`,
        introduction: `When a ${symbol.toLowerCase()} appears in your dreams colored by the quality of "${adj.toLowerCase()}", its message becomes more specific and urgent. The combination reveals a powerful message from your unconscious mind.`,
        symbolism: `The ${adj.toLowerCase()} quality adds the dimension of ${adjMeaning} to the core symbolism of ${symbol.toLowerCase()}, which represents ${symbolMeaning}.\n\nThis combination suggests your psyche is processing something with both the archetypal energy of the ${symbol.toLowerCase()} AND the emotional charge of "${adj.toLowerCase()}". Pay attention to how this made you feel in the dream.`,
        cosmicAnalysis: `${adj} ${symbol} dreams are particularly potent during certain moon phases. A Full Moon amplifies the emotional intensity, while a New Moon suggests this symbol is emerging from deep within your unconscious for the first time.`,
        commonScenarios: [
            `A ${adj.toLowerCase()} ${symbol.toLowerCase()} approaching you - confrontation with this energy is imminent`,
            `Multiple ${adj.toLowerCase()} ${symbol.toLowerCase()}s - the message is being repeated for emphasis`,
            `Transforming into a ${adj.toLowerCase()} ${symbol.toLowerCase()} - you are integrating this archetype`,
            `Running from a ${adj.toLowerCase()} ${symbol.toLowerCase()} - avoidance of this aspect of yourself`
        ],
        cta: `Every dream symbol carries personal meaning. Track your ${adj.toLowerCase()} ${symbol.toLowerCase()} dreams over time to uncover deeper patterns.`
    }),
    tr: (adj, symbol, adjMeaning, symbolMeaning) => ({
        title: `Rüyada ${adj} ${symbol} Görmek: Anlamı ve Yorumu`,
        seoDescription: `Rüyada ${adj.toLowerCase()} ${symbol.toLowerCase()} görmenin anlamını keşfedin. ${adj} ${symbol.toLowerCase()} rüyalarının derinlemesine Jungiyan analizi.`,
        introduction: `Rüyanızda "${adj.toLowerCase()}" niteliğiyle renklenen bir ${symbol.toLowerCase()} göründüğünde, mesajı daha spesifik ve acil hale gelir. Bu kombinasyon bilinçaltınızdan güçlü bir mesaj ortaya koyar.`,
        symbolism: `"${adj}" niteliği, ${symbolMeaning} anlatan ${symbol.toLowerCase()} sembolizmine ${adjMeaning} boyutunu ekler.\n\nBu kombinasyon, psikenizin hem ${symbol.toLowerCase()}'nın arketipsel enerjisini hem de "${adj.toLowerCase()}" duygusal yükünü işlediğini gösterir.`,
        cosmicAnalysis: `${adj} ${symbol} rüyaları, belirli ay evrelerinde özellikle güçlüdür. Dolunay duygusal yoğunluğu artırırken, Yeni Ay bu sembolün bilinçaltınızın derinliklerinden ilk kez ortaya çıktığını gösterir.`,
        commonScenarios: [
            `Size yaklaşan ${adj.toLowerCase()} bir ${symbol.toLowerCase()} - bu enerjiyle yüzleşme yakındır`,
            `Birden fazla ${adj.toLowerCase()} ${symbol.toLowerCase()} - mesaj vurgu için tekrarlanıyor`,
            `${adj} bir ${symbol.toLowerCase()}'a dönüşmek - bu arketipi entegre ediyorsunuz`,
            `${adj} bir ${symbol.toLowerCase()}'dan kaçmak - kendinizin bu yönünden kaçınma`
        ],
        cta: `Her rüya sembolü kişisel anlam taşır. ${adj} ${symbol.toLowerCase()} rüyalarınızı zamanla takip ederek daha derin kalıpları ortaya çıkarın.`
    }),
    de: (adj, symbol, adjMeaning, symbolMeaning) => ({
        title: `${adj} ${symbol} im Traum: Bedeutung & Interpretation`,
        seoDescription: `Entdecken Sie, was es bedeutet, von einer ${adj.toLowerCase()}en ${symbol.toLowerCase()} zu träumen. Jung'sche Analyse von ${adj.toLowerCase()} ${symbol.toLowerCase()} Träumen.`,
        introduction: `Wenn eine ${symbol.toLowerCase()} in Ihren Träumen erscheint, gefärbt durch die Qualität "${adj.toLowerCase()}", wird ihre Botschaft spezifischer und dringender.`,
        symbolism: `Die ${adj.toLowerCase()} Qualität fügt der Kernsymbolik der ${symbol.toLowerCase()}, die ${symbolMeaning} repräsentiert, die Dimension von ${adjMeaning} hinzu.\n\nDiese Kombination deutet darauf hin, dass Ihre Psyche etwas mit sowohl der archetypischen Energie der ${symbol.toLowerCase()} ALS AUCH der emotionalen Ladung von "${adj.toLowerCase()}" verarbeitet.`,
        cosmicAnalysis: `${adj} ${symbol} Träume sind während bestimmter Mondphasen besonders kraftvoll. Ein Vollmond verstärkt die emotionale Intensität, während ein Neumond darauf hindeutet, dass dieses Symbol zum ersten Mal aus Ihrem tiefen Unbewussten auftaucht.`,
        commonScenarios: [
            `Eine ${adj.toLowerCase()} ${symbol.toLowerCase()}, die sich Ihnen nähert - Konfrontation mit dieser Energie steht bevor`,
            `Mehrere ${adj.toLowerCase()} ${symbol.toLowerCase()}en - die Botschaft wird zur Betonung wiederholt`,
            `Sich in eine ${adj.toLowerCase()} ${symbol.toLowerCase()} verwandeln - Sie integrieren diesen Archetyp`,
            `Vor einer ${adj.toLowerCase()}en ${symbol.toLowerCase()} weglaufen - Vermeidung dieses Aspekts von sich selbst`
        ],
        cta: `Jedes Traumsymbol trägt persönliche Bedeutung. Verfolgen Sie Ihre ${adj.toLowerCase()} ${symbol.toLowerCase()} Träume, um tiefere Muster zu entdecken.`
    }),
    es: (adj, symbol, adjMeaning, symbolMeaning) => ({
        title: `Soñar con ${symbol} ${adj}: Significado e Interpretación`,
        seoDescription: `Descubre qué significa soñar con una ${symbol.toLowerCase()} ${adj.toLowerCase()}. Análisis jungiano profundo de los sueños de ${symbol.toLowerCase()} ${adj.toLowerCase()}.`,
        introduction: `Cuando una ${symbol.toLowerCase()} aparece en tus sueños coloreada por la cualidad "${adj.toLowerCase()}", su mensaje se vuelve más específico y urgente.`,
        symbolism: `La cualidad ${adj.toLowerCase()} añade la dimensión de ${adjMeaning} al simbolismo central de la ${symbol.toLowerCase()}, que representa ${symbolMeaning}.\n\nEsta combinación sugiere que tu psique está procesando algo con tanto la energía arquetípica de la ${symbol.toLowerCase()} COMO la carga emocional de "${adj.toLowerCase()}".`,
        cosmicAnalysis: `Los sueños de ${symbol} ${adj} son particularmente potentes durante ciertas fases lunares. Una Luna Llena amplifica la intensidad emocional, mientras que una Luna Nueva sugiere que este símbolo está emergiendo desde lo profundo de tu inconsciente por primera vez.`,
        commonScenarios: [
            `Una ${symbol.toLowerCase()} ${adj.toLowerCase()} acercándose - la confrontación con esta energía es inminente`,
            `Múltiples ${symbol.toLowerCase()}s ${adj.toLowerCase()}s - el mensaje se repite para énfasis`,
            `Transformándote en una ${symbol.toLowerCase()} ${adj.toLowerCase()} - estás integrando este arquetipo`,
            `Huyendo de una ${symbol.toLowerCase()} ${adj.toLowerCase()} - evitación de este aspecto de ti mismo`
        ],
        cta: `Cada símbolo onírico lleva un significado personal. Rastrea tus sueños de ${symbol.toLowerCase()} ${adj.toLowerCase()} para descubrir patrones más profundos.`
    }),
    pt: (adj, symbol, adjMeaning, symbolMeaning) => ({
        title: `Sonhar com ${symbol} ${adj}: Significado e Interpretação`,
        seoDescription: `Descubra o que significa sonhar com uma ${symbol.toLowerCase()} ${adj.toLowerCase()}. Análise junguiana profunda dos sonhos de ${symbol.toLowerCase()} ${adj.toLowerCase()}.`,
        introduction: `Quando uma ${symbol.toLowerCase()} aparece em seus sonhos colorida pela qualidade "${adj.toLowerCase()}", sua mensagem se torna mais específica e urgente.`,
        symbolism: `A qualidade ${adj.toLowerCase()} adiciona a dimensão de ${adjMeaning} ao simbolismo central da ${symbol.toLowerCase()}, que representa ${symbolMeaning}.\n\nEssa combinação sugere que sua psique está processando algo com tanto a energia arquetípica da ${symbol.toLowerCase()} QUANTO a carga emocional de "${adj.toLowerCase()}".`,
        cosmicAnalysis: `Sonhos com ${symbol} ${adj} são particularmente potentes durante certas fases da lua. Uma Lua Cheia amplifica a intensidade emocional, enquanto uma Lua Nova sugere que este símbolo está emergindo das profundezas do seu inconsciente pela primeira vez.`,
        commonScenarios: [
            `Uma ${symbol.toLowerCase()} ${adj.toLowerCase()} se aproximando - confronto com essa energia é iminente`,
            `Múltiplas ${symbol.toLowerCase()}s ${adj.toLowerCase()}s - a mensagem está sendo repetida para ênfase`,
            `Transformando-se em uma ${symbol.toLowerCase()} ${adj.toLowerCase()} - você está integrando esse arquétipo`,
            `Fugindo de uma ${symbol.toLowerCase()} ${adj.toLowerCase()} - evitação deste aspecto de si mesmo`
        ],
        cta: `Cada símbolo de sonho carrega significado pessoal. Rastreie seus sonhos de ${symbol.toLowerCase()} ${adj.toLowerCase()} para descobrir padrões mais profundos.`
    })
};

// Main generation function
function generateAdjectiveMatrix() {
    let totalGenerated = 0;
    const errors = [];

    console.log('🌙 Starting Adjective Matrix Generation...\n');

    for (const locale of LOCALES) {
        const outputDir = path.join(process.cwd(), 'content', locale, 'meanings');

        // Ensure directory exists
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        for (const symbolKey of TOP_SYMBOLS) {
            const symbolData = dictionary[symbolKey];
            if (!symbolData) {
                errors.push(`Symbol not found: ${symbolKey}`);
                continue;
            }

            // Get translated symbol name or fallback to English
            const symbolName = SYMBOL_TRANSLATIONS[symbolKey]?.[locale] || symbolKey;

            for (const [adjKey, adjData] of Object.entries(ADJECTIVES[locale])) {
                const slug = slugify(`${adjKey}-${symbolKey}`);
                const filePath = path.join(outputDir, `${slug}.json`);

                // Skip if already exists
                if (fs.existsSync(filePath)) {
                    continue;
                }

                try {
                    const content = TEMPLATES[locale](
                        adjData.adj,
                        symbolName,
                        adjData.meaning,
                        symbolData.meaning.toLowerCase()
                    );

                    fs.writeFileSync(filePath, JSON.stringify(content, null, 2), 'utf-8');
                    totalGenerated++;
                } catch (err) {
                    errors.push(`Error generating ${slug} (${locale}): ${err.message}`);
                }
            }
        }

        console.log(`✓ ${locale.toUpperCase()}: Generated files in content/${locale}/meanings/`);
    }

    console.log(`\n🎉 Generation Complete!`);
    console.log(`   Total new pages: ${totalGenerated}`);

    if (errors.length > 0) {
        console.log(`\n⚠️ Errors (${errors.length}):`);
        errors.slice(0, 10).forEach(e => console.log(`   - ${e}`));
        if (errors.length > 10) console.log(`   ... and ${errors.length - 10} more`);
    }

    return { totalGenerated, errors };
}

// Run if called directly
if (require.main === module) {
    generateAdjectiveMatrix();
}

module.exports = { generateAdjectiveMatrix, TOP_SYMBOLS, ADJECTIVES };
