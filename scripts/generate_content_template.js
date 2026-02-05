const fs = require('fs');
const path = require('path');
const slugify = require('slugify');

// Load Dictionary
const dictionary = require('./data/source_dictionary');
const LOCALE_CONFIG = ['en', 'tr', 'de', 'es', 'pt'];
const OUTPUT_DIR = path.join(__dirname, '../content');

// Helper to ensure directory exists
const ensureDir = (dir) => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};

// --- COSMIC LOGIC ---
const getMoonPhaseContent = (symbol, locale) => {
    const templates = {
        'en': `Dreams of ${symbol} are deeply connected to the lunar cycle. During the **Waxing Moon**, this symbol suggests growth and the accumulation of ${symbol.toLowerCase()}-energy in your waking life. However, if this dream occurs during a **Waning Moon**, it is a powerful call to release old patterns related to this archetype. A **Full Moon** dream of ${symbol} signifies a moment of peak clarity—the unconscious is fully illuminated.`,
        'tr': `${symbol} rüyaları ay döngüsüyle derin bir bağa sahiptir. **Büyüyen Ay** evresinde görüldüğünde, bu sembol hayatınızda ${symbol.toLowerCase()} enerjisinin artışına ve gelişime işaret eder. Ancak **Küçülen Ay** sırasında görülürse, bu arketipe dair eski kalıpları serbest bırakmanız gerektiğine dair güçlü bir çağrıdır. **Dolunay**'da görülen ${symbol} rüyası, bilinçdışının tamamen aydınlandığı bir doruk noktasını ve netliği simgeler.`,
        'de': `Träume von ${symbol} sind tief mit dem Mondzyklus verbunden. Während des **Zunehmenden Mondes** deutet dieses Symbol auf Wachstum und die Ansammlung von Energie in Bezug auf ${symbol} hin. Wenn dieser Traum jedoch während eines **Abnehmenden Mondes** auftritt, ist dies ein kraftvoller Aufruf, alte Muster loszulassen. Ein Traum von ${symbol} bei **Vollmond** bedeutet einen Moment höchster Klarheit – das Unbewusste ist vollständig beleuchtet.`,
        'es': `Los sueños de ${symbol} están profundamente conectados con el ciclo lunar. Durante la **Luna Creciente**, este símbolo sugiere crecimiento y la acumulación de energía relacionada con ${symbol.toLowerCase()}. Sin embargo, si este sueño ocurre durante la **Luna Menguante**, es un llamado poderoso para liberar viejos patrones. Un sueño de ${symbol} durante la **Luna Llena** significa un momento de máxima claridad: el inconsciente está completamente iluminado.`,
        'pt': `Sonhos com ${symbol} estão profundamente ligados ao ciclo lunar. Durante a **Lua Crescente**, este símbolo sugere crescimento e o acúmulo de energia de ${symbol.toLowerCase()}. No entanto, se este sonho ocorrer durante a **Lua Minguante**, é um chamado poderoso para liberar velhos padrões relacionados a este arquétipo. Um sonho com ${symbol} na **Lua Cheia** significa um momento de clareza máxima — o inconsciente está totalmente iluminado.`
    };
    return templates[locale] || templates['en'];
};

// --- PREMIUM ARTICLE TEMPLATES ---
const generateArticle = (symbol, meaning, associations, locale) => {
    const cosmicText = getMoonPhaseContent(symbol, locale);
    const assocStr = associations.join(', ');

    const templates = {
        'en': {
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
            title: `Rüyada ${symbol} Görmek: Derin Analiz ve Anlamı`,
            seoDescription: `Rüyada ${symbol} görmenin Jungiyen ve spritüel anlamını keşfedin. ${meaning} ile olan bağını ve Ay evresinin bu rüyayı nasıl etkilediğini öğrenin.`,
            introduction: `Bilinçdışının koridorlarında bir **${symbol}** ile karşılaşmak nadiren bir tesadüftür. Bu, ruhunuzun derinliklerinden gelen ilkel bir mesajdır. Rüyaların dilinde ${symbol}, sadece bir nesne veya varlık değil; **${meaning}** kavramının yaşayan bir sembolüdür.`,
            symbolism: `Jungiyen bir bakış açısıyla, **${symbol}** bilinçli egonuz ile kolektif bilinçdışının derin katmanları arasında bir köprü görevi görür. Genellikle **${assocStr}** gibi temalarla yüzleştiğinizde ortaya çıkar. Bu imgeyi bir ayna olarak kullanın—size iç dünyanız hakkında ne göstermeye çalışıyor?\n\n${associations[0]} ve ${associations[1]} gibi tipik çağrışımların varlığı, bu sembolü kişisel gerçekliğinize daha da kökler. Bu, bu enerjiyi reddetmek yerine onu bütünleştirmeniz için bir davettir.`,
            cosmicAnalysis: cosmicText,
            commonScenarios: [
                `**${symbol} tarafından kovalanmak:** Kendinizin ${meaning} yönünden kaçtığınızı gösterir.`,
                `**Bir ${symbol} bulmak:** Gizli bir yeteneğin veya kaynağın keşfini temsil eder.`,
                `**${symbol} olmak:** Bu arketipsel güçle tam bir özdeşleşme işaretidir.`
            ],
            cta: `${symbol} rüyanız, çok daha büyük bir yapbozun parçası. **Dream Boat** uygulamasını indirin, rüyanızı Ay evreleriyle birlikte takip edin ve ruhunuzun gizli desenlerini çözün.`
        },
        'de': {
            title: `Traumdeutung ${symbol}: Spirituelle Bedeutung`,
            seoDescription: `Entdecken Sie die psychologische Bedeutung von ${symbol} im Traum. Erfahren Sie mehr über die Verbindung zu ${meaning} und den Einfluss der Mondphase.`,
            introduction: `Die Begegnung mit einem **${symbol}** in den Korridoren Ihres Unterbewusstseins ist selten ein Zufall. Es ist eine primäre Begegnung mit einem spezifischen Aspekt Ihrer Psyche. In der Sprache der Träume ist der ${symbol} nicht nur ein Objekt; er ist ein lebendiges Symbol für **${meaning}**.`,
            symbolism: `Aus C.G. Jungs Perspektive repräsentiert der **${symbol}** eine Brücke zwischen Ihrem bewussten Ego und den tieferen Schichten des kollektiven Unbewussten. Er erscheint oft, wenn Sie sich mit Themen wie **${assocStr}** auseinandersetzen.\n\nDie Anwesenheit typischer Assoziationen wie ${associations[0]} und ${associations[1]} verwurzelt dieses Symbol weiter in Ihrer persönlichen Realität.`,
            cosmicAnalysis: cosmicText,
            commonScenarios: [
                `**Von ${symbol} verfolgt werden:** Deutet darauf hin, dass Sie den Aspekt ${meaning} in sich selbst meiden.`,
                `**Einen ${symbol} finden:** Steht für die Entdeckung eines verborgenen Talents.`,
                `**Zu ${symbol} werden:** Ein Zeichen totaler Identifikation mit dieser archetypischen Kraft.`
            ],
            cta: `Ihr Traum von ${symbol} ist Teil eines größeren Puzzles. Laden Sie **Dream Boat** herunter, um dieses Symbol zusammen mit den Mondphasen zu verfolgen.`
        },
        'es': {
            title: `El Significado Espiritual de Soñar con ${symbol}`,
            seoDescription: `Descubre el significado junguiano de ${symbol} en los sueños. Explora su conexión con ${meaning} y cómo la fase lunar influye en tu interpretación.`,
            introduction: `Encontrar un **${symbol}** en los pasillos de tu subconsciente rara vez es un accidente. Es un encuentro primordial con un aspecto específico de tu psique. En el lenguaje de los sueños, el ${symbol} no es solo un objeto; es un símbolo vivo de **${meaning}**.`,
            symbolism: `Desde una perspectiva junguiana, el **${symbol}** representa un puente entre tu ego consciente y las capas más profundas del inconsciente colectivo. A menudo aparece cuando te enfrentas a temas como **${assocStr}**. Usa esta imagen como un espejo: ¿qué intenta mostrarte sobre tu mundo interior?\n\nLa presencia de asociaciones típicas como ${associations[0]} y ${associations[1]} enraíza aún más este símbolo en tu realidad personal.`,
            cosmicAnalysis: cosmicText,
            commonScenarios: [
                `**Ser perseguido por ${symbol}:** Sugiere que estás evitando el aspecto de ${meaning} de ti mismo.`,
                `**Encontrar un ${symbol}:** Representa descubrir un talento o recurso oculto.`,
                `**Convertirse en ${symbol}:** Una señal de identificación total con este poder arquetípico.`
            ],
            cta: `Tu sueño con ${symbol} es una pieza de un rompecabezas más grande. Descarga **Dream Boat** para rastrear este símbolo junto con las fases de la Luna y desbloquear el patrón completo de tu psique.`
        },
        'pt': {
            title: `O Significado Espiritual de Sonhar com ${symbol}`,
            seoDescription: `Descubra o significado junguiano de ${symbol} nos sonhos. Explore sua conexão com ${meaning} e como a fase da Lua influencia sua interpretação.`,
            introduction: `Encontrar um **${symbol}** nos corredores do seu subconsciente raramente é um acidente. É um encontro primordial com um aspecto específico da sua psique. Na linguagem dos sonhos, o ${symbol} não é apenas um objeto; é um símbolo vivo de **${meaning}**.`,
            symbolism: `De uma perspectiva junguiana, o **${symbol}** representa uma ponte entre seu ego consciente e as camadas mais profundas do inconsciente coletivo. Muitas vezes aparece quando você está confrontando temas como **${assocStr}**. Use esta imagem como um espelho — o que ela está tentando lhe mostrar sobre seu mundo interior?\n\nA presença de associações típicas como ${associations[0]} e ${associations[1]} enraíza ainda mais este símbolo em sua realidade pessoal.`,
            cosmicAnalysis: cosmicText,
            commonScenarios: [
                `**Ser perseguido por ${symbol}:** Sugere que você está evitando o aspecto de ${meaning} de si mesmo.`,
                `**Encontrar um ${symbol}:** Representa descobrir um talento ou recurso oculto.`,
                `**Tornar-se ${symbol}:** Um sinal de identificação total com este poder arquetípico.`
            ],
            cta: `Seu sonho com ${symbol} é uma peça de um quebra-cabeça maior. Baixe o **Dream Boat** para rastrear este símbolo junto com as fases da Lua e desbloquear o padrão completo da sua psique.`
        }
    };

    return templates[locale] || templates['en'];
};

// --- MAIN GENERATION ---
const run = async () => {
    const keys = Object.keys(dictionary);
    console.log(`Starting generation for ${keys.length} symbols across ${LOCALE_CONFIG.length} languages...`);

    let count = 0;
    for (const key of keys) {
        const data = dictionary[key];

        for (const locale of LOCALE_CONFIG) {
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
