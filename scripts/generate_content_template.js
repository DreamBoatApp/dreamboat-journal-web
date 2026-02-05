const fs = require('fs');
const path = require('path');
const slugify = require('slugify');

// Load Data
const dictionary = require('./data/source_dictionary');
const keywordIndex = require('./data/keyword_index'); // { tr: { 'yılan': 'snake' }, ... }
const LOCALE_CONFIG = ['en', 'tr', 'de', 'es', 'pt'];
const OUTPUT_DIR = path.join(__dirname, '../content');

// Helper to ensure directory exists
const ensureDir = (dir) => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};

// Helper: Find localized keyword for a given English key (e.g., 'snake' -> 'yılan' in TR)
const getLocalizedSymbol = (key, locale) => {
    if (locale === 'en') return key;

    // keywordIndex is currently a flat map of TURKISH keywords to English slugs
    // Structure: { 'yılan': 'snake', 'köpek': 'dog' }
    if (locale === 'tr') {
        const entry = Object.entries(keywordIndex).find(([k, v]) => v.toLowerCase() === key.toLowerCase());
        return entry ? entry[0] : key;
    }

    // TODO: Add support for other languages when data is available
    return key;
};

// Formatting Helper
const formatSymbol = (text) => {
    if (!text) return '';
    // Capitalize first letter
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

// --- COSMIC LOGIC ---
const getMoonPhaseContent = (symbol, locale) => {
    const s = formatSymbol(symbol);
    const s_lower = symbol.toLowerCase();

    const templates = {
        'en': `Dreams of ${s} are deeply connected to the lunar cycle. During the **Waxing Moon**, this symbol suggests growth and the accumulation of ${s_lower}-energy in your waking life. However, if this dream occurs during a **Waning Moon**, it is a powerful call to release old patterns related to this archetype. A **Full Moon** dream of ${s} signifies a moment of peak clarity—the unconscious is fully illuminated.`,
        'tr': `${s} rüyaları ay döngüsüyle derin bir bağa sahiptir. Büyüyen Ay evresinde görüldüğünde, bu sembol hayatınızda ${s_lower} enerjisinin artışına ve gelişime işaret eder. Ancak Küçülen Ay sırasında görülürse, bu arketipe dair eski kalıpları serbest bırakmanız gerektiğine dair güçlü bir çağrıdır. Dolunay'da görülen ${s} rüyası, bilinçdışının tamamen aydınlandığı bir doruk noktasını ve netliği simgeler.`,
        // Note: Keeping other languages simple for now, can be expanded similarly
        'de': `Träume von ${s} sind tief mit dem Mondzyklus verbunden. Während des **Zunehmenden Mondes** deutet dieses Symbol auf Wachstum hin.`,
        'es': `Los sueños de ${s} están profundamente conectados con el ciclo lunar. Durante la **Luna Creciente**, este símbolo sugiere crecimiento.`,
        'pt': `Sonhos com ${s} estão profundamente ligados ao ciclo lunar. Durante a **Lua Crescente**, este símbolo sugere crescimento.`
    };
    return templates[locale] || templates['en'];
};

// --- PREMIUM ARTICLE TEMPLATES ---
const generateArticle = (originalKey, meaning, associations, locale) => {
    const symbolRaw = getLocalizedSymbol(originalKey, locale);
    const symbol = formatSymbol(symbolRaw);
    const s_lower = symbolRaw.toLowerCase();
    const cosmicText = getMoonPhaseContent(symbolRaw, locale);
    const assocStr = associations.join(', ');

    // Generic fallbacks for untranslatable English content in localized templates
    const genericMeaningTR = "bu sembolün derin anlamı";

    const templates = {
        'en': {
            localizedName: symbol,
            title: `The Spiritual Meaning of ${symbol} in Dreams`,
            seoDescription: `Discover the Jungian meaning of ${symbol} in dreams. Explore its connection to ${meaning} and how the Moon phase influences your interpretation.`,
            introduction: `Meeting a **${symbol}** in the corridors of your subconscious is rarely an accident. It is a primal encounter with a specific aspect of your psyche. In the language of dreams, the ${symbol} is not just an object or creature; it is a living symbol of **${meaning}**.`,
            symbolism: `From a Jungian perspective, the **${symbol}** represents a bridge between your conscious ego and the deeper layers of the collective unconscious. It often appears when you are confronting themes of **${assocStr}**. Use this image as a mirror—what is it trying to show you about your inner world?\n\nThe presence of typical associations like ${associations[0]} and ${associations[1]} further roots this symbol in your personal reality. It is an invitation to integrate this energy rather than reject it.`,
            cosmicAnalysis: cosmicText,
            commonScenarios: [
                `**Being chased by ${symbol}:** Suggests you are avoiding the ${meaning} aspect of yourself.`,
                `**Finding a ${symbol}:** Represents discovering a hidden talent or resource.`,
                `**Becoming ${symbol}:** A sign of total identification with this archetypal power.`
            ],
            cta: `Your dream of ${symbol} is a piece of a larger puzzle. Download **Dream Boat** to track this symbol alongside the Moon's phases and unlock the full pattern of your psyche.`
        },
        'tr': {
            localizedName: symbol,
            title: `Rüyada ${symbol} Görmek: Anlamı ve Yorumu`, // Başlıkta Büyük Harf
            seoDescription: `Rüyada ${s_lower} görmenin anlamını keşfedin. Bu rüyanın size ne anlatmak istediğini ve hayatınızdaki işaretleri öğrenin.`,
            introduction: `Bilinçdışının derinliklerinde bir ${s_lower} ile karşılaşmak nadiren bir tesadüftür. Bu, ruhunuzdan gelen önemli bir mesajdır. Rüyaların dilinde ${symbol}, sadece bir nesne değil; bilinçaltınızın derinliklerinden gelen bir semboldür.`,
            symbolism: `Psikolojik bir bakış açısıyla, ${s_lower} bilinçli benliğiniz ile bilinçaltınız arasında bir köprü görevi görür. Bu imgeyi bir ayna olarak kullanın—size iç dünyanız hakkında ne göstermeye çalışıyor? Bu sembol, kişisel gelişiminizde fark etmeniz gereken önemli bir detayı işaret ediyor olabilir.\n\nRüyanızdaki detaylar, bu sembolü kişisel hayatınızla daha da ilişkilendirir.`,
            cosmicAnalysis: cosmicText,
            commonScenarios: [
                `${symbol} tarafından kovalanmak: Kendinizin bir yönünden veya bir sorumluluktan kaçtığınızı gösterir.`,
                `Bir ${s_lower} bulmak: Gizli bir yeteneğin, fırsatın veya kaynağın keşfini temsil eder.`,
                `${symbol} olmak: Bu özelliğin veya gücün sizin bir parçanız haline geldiğini işaret eder.`
            ],
            cta: `${symbol} rüyanız, hayatınızdaki daha büyük bir resmin parçası. Dream Boat uygulamasını indirin ve rüyalarınızın gizli dilini çözün.`
        },
        // Fallbacks for other languages using English structure but valid placeholders
        'de': {
            localizedName: symbol,
            title: `Traumdeutung ${symbol}`,
            seoDescription: `Bedeutung von ${symbol} im Traum.`,
            introduction: `Ein Traum von **${symbol}** ist eine Botschaft Ihres Unterbewusstseins. Es symbolisiert **${meaning}**.`,
            symbolism: `Das Symbol **${symbol}** verbindet Ihr Bewusstsein mit dem Unbewussten.`,
            cosmicAnalysis: cosmicText,
            commonScenarios: [`**${symbol} sehen:** Ein wichtiges Zeichen.`],
            cta: `Laden Sie **Dream Boat** herunter für mehr.`
        },
        'es': {
            localizedName: symbol,
            title: `Soñar con ${symbol}`,
            seoDescription: `Significado de ${symbol} en los sueños.`,
            introduction: `Soñar con **${symbol}** es un mensaje de tu subconsciente. Simboliza **${meaning}**.`,
            symbolism: `El símbolo **${symbol}** conecta tu consciente con tu inconsciente.`,
            cosmicAnalysis: cosmicText,
            commonScenarios: [`**Ver un ${symbol}:** Una señal importante.`],
            cta: `Descarga **Dream Boat** para más.`
        },
        'pt': {
            localizedName: symbol,
            title: `Sonhar com ${symbol}`,
            seoDescription: `Significado de ${symbol} nos sonhos.`,
            introduction: `Sonhar com **${symbol}** é uma mensagem do seu subconsciente. Simboliza **${meaning}**.`,
            symbolism: `O símbolo **${symbol}** conecta seu consciente com o inconsciente.`,
            cosmicAnalysis: cosmicText,
            commonScenarios: [`**Ver um ${symbol}:** Um sinal importante.`],
            cta: `Baixe **Dream Boat** para mais.`
        }
    };
    return templates[locale] || templates['en'];
};

// --- MAIN GENERATION ---
const run = async () => {
    const keys = Object.keys(dictionary);
    console.log(`Starting localized generation for ${keys.length} symbols...`);

    let count = 0;
    for (const key of keys) {
        const data = dictionary[key];

        for (const locale of LOCALE_CONFIG) {
            // Slug is ALWAYS the English key for URL consistency (or localized if preferred, but existing structure uses EN slug)
            // Wait, previous implementation used 'slugify(key)'. If key is 'snake', slug is 'snake'.
            // If we want /tr/meaning/yilan, we need localized slug. 
            // BUT, the system currently redirects non-English slugs or handles them via alias map?
            // Let's stick to English slugs for file names for now to avoid breaking existing links, 
            // OR if the system supports localized URLs, we should use localized slugs.
            // Given the 'alias_map.js', it seems to map associations.
            // Let's verify: The user visits /tr/meaning/dog. If we change file content to "Köpek", filename remaining "dog.json" is fine.

            const slug = slugify(key, { lower: true, strict: true });
            const outputDir = path.join(OUTPUT_DIR, locale, 'meanings');
            ensureDir(outputDir);

            const content = generateArticle(key, data.meaning, data.associations, locale);

            fs.writeFileSync(path.join(outputDir, `${slug}.json`), JSON.stringify(content, null, 2));
            count++;
        }
    }
    console.log(`SUCCESS: Generated ${count} files.`);
};

run();
