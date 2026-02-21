// Dream Personality Quiz — Data & Scoring Logic
// 12 questions × 4 options, 8 profiles, Euclidean distance matching

export type QuizQuestion = {
    id: number;
    dimension: string; // which vector dimension this maps to
    question: { tr: string; en: string };
    options: { tr: string; en: string }[];
};

export type DreamProfile = {
    id: number;
    name: { tr: string; en: string };
    emoji: string;
    tagline: { tr: string; en: string };
    description: { tr: string; en: string };
    traits: { tr: string[]; en: string[] };
    element: string; // cosmic element
    color: string; // CSS gradient class
    targetVector: number[]; // 12-dimensional answer vector
};

// ─── 12 Questions ──────────────────────────────────────────────────

export const QUIZ_QUESTIONS: QuizQuestion[] = [
    // Q1 — Dream Frequency (from mobile)
    {
        id: 1,
        dimension: 'frequency',
        question: {
            tr: 'Rüyalarını ne sıklıkla hatırlarsın?',
            en: 'How often do you remember your dreams?',
        },
        options: [
            { tr: 'Neredeyse hiç', en: 'Almost never' },
            { tr: 'Ayda birkaç kez', en: 'A few times a month' },
            { tr: 'Haftada birkaç kez', en: '1–2 times a week' },
            { tr: 'Neredeyse her gece', en: 'Almost every night' },
        ],
    },
    // Q2 — Dream Tone (from mobile)
    {
        id: 2,
        dimension: 'tone',
        question: {
            tr: 'Rüyalarının genel havası nasıl?',
            en: 'What is the general atmosphere of your dreams?',
        },
        options: [
            { tr: 'Huzurlu ve sakin', en: 'Peaceful and calm' },
            { tr: 'Karışık ve değişken', en: 'Mixed and unpredictable' },
            { tr: 'Gergin ve heyecanlı', en: 'Tense and thrilling' },
            { tr: 'Karanlık ve korkutucu', en: 'Dark and frightening' },
        ],
    },
    // Q3 — Dream Role/Feeling (from mobile)
    {
        id: 3,
        dimension: 'role',
        question: {
            tr: 'Rüyalarında kendini genelde nasıl hissedersin?',
            en: 'How do you usually feel in your dreams?',
        },
        options: [
            {
                tr: 'Her şeyi kontrol ediyorum', en: 'I\'m in full control'
            },
            {
                tr: 'Sadece izliyorum', en: 'I\'m just watching'
            },
            {
                tr: 'Bir şeylerden kaçıyorum', en: 'I\'m running from something'
            },
            { tr: 'Yeni yerler keşfediyorum', en: 'I\'m exploring new places' },
        ],
    },
    // Q4 — Recurring Dreams
    {
        id: 4,
        dimension: 'recurring',
        question: {
            tr: 'Tekrarlayan rüyalar görür müsün?',
            en: 'Do you have recurring dreams?',
        },
        options: [
            { tr: 'Hiç görmedim', en: 'Never' },
            { tr: 'Nadiren, ama oldu', en: 'Rarely, but it happens' },
            { tr: 'Evet, belirli temalar tekrar eder', en: 'Yes, certain themes repeat' },
            { tr: 'Sürekli aynı rüyayı görürüm', en: 'I keep having the same dream' },
        ],
    },
    // Q5 — Dream Recall Detail
    {
        id: 5,
        dimension: 'recall',
        question: {
            tr: 'Uyandığında rüyanı ne kadar detaylı hatırlarsın?',
            en: 'How much detail do you recall when you wake up?',
        },
        options: [
            { tr: 'Sadece bir his kalır', en: 'Just a vague feeling' },
            { tr: 'Ana olayları hatırlarım', en: 'I remember the main events' },
            { tr: 'Detayları, renkleri hatırlarım', en: 'I recall details and colors' },
            { tr: 'Diyalogları bile hatırlarım', en: 'I even remember conversations' },
        ],
    },
    // Q6 — Lucidity Awareness
    {
        id: 6,
        dimension: 'lucidity',
        question: {
            tr: 'Rüyanda olduğunu fark ettiğin oldu mu?',
            en: 'Have you ever realized you were dreaming?',
        },
        options: [
            { tr: 'Hiçbir zaman', en: 'Never' },
            { tr: 'Bir iki kez olmuş olabilir', en: 'Maybe once or twice' },
            { tr: 'Evet, birkaç kez fark ettim', en: 'Yes, a few times' },
            { tr: 'Sık sık fark ederim', en: 'I notice it quite often' },
        ],
    },
    // Q7 — Dream Environment
    {
        id: 7,
        dimension: 'environment',
        question: {
            tr: 'Rüyalarında en çok ne tür mekanlar görürsün?',
            en: 'What kind of places do you see most in your dreams?',
        },
        options: [
            { tr: 'Tanıdık yerler (ev, okul, iş)', en: 'Familiar places (home, school, work)' },
            { tr: 'Fantastik dünyalar', en: 'Fantastical worlds' },
            { tr: 'Doğa ve açık alanlar', en: 'Nature and open landscapes' },
            { tr: 'Labirent gibi kapalı alanlar', en: 'Maze-like enclosed spaces' },
        ],
    },
    // Q8 — Emotional Processing
    {
        id: 8,
        dimension: 'emotional',
        question: {
            tr: 'Rüyandan uyandığında genelde ne hissedersin?',
            en: 'How do you usually feel when you wake from a dream?',
        },
        options: [
            { tr: 'Rahatlamış', en: 'Relieved' },
            { tr: 'Meraklı — ne anlama geliyordu?', en: 'Curious — what did it mean?' },
            { tr: 'Tedirgin veya huzursuz', en: 'Uneasy or anxious' },
            { tr: 'İlham dolu', en: 'Inspired' },
        ],
    },
    // Q9 — Social Presence in Dreams
    {
        id: 9,
        dimension: 'social',
        question: {
            tr: 'Rüyalarında yanında başkaları olur mu?',
            en: 'Are there other people in your dreams?',
        },
        options: [
            {
                tr: 'Genelde yalnızımdır', en: 'I\'m usually alone'
            },
            { tr: 'Tanıdık insanlar olur', en: 'Familiar people appear' },
            { tr: 'Yabancılar ve gizemli figürler', en: 'Strangers and mysterious figures' },
            { tr: 'Kalabalıklar ve topluluklar', en: 'Crowds and gatherings' },
        ],
    },
    // Q10 — Sleep Pattern (from mobile)
    {
        id: 10,
        dimension: 'sleep',
        question: {
            tr: 'Uyku düzenini nasıl tanımlarsın?',
            en: 'How would you describe your sleep pattern?',
        },
        options: [
            { tr: 'Çok düzensiz', en: 'Very irregular' },
            { tr: 'Biraz düzensiz', en: 'Somewhat irregular' },
            { tr: 'Genelde düzenli', en: 'Usually regular' },
            { tr: 'Çok düzenli', en: 'Very regular' },
        ],
    },
    // Q11 — Dream Symbolism
    {
        id: 11,
        dimension: 'symbolism',
        question: {
            tr: 'Rüyalarında sembolik imgeler dikkatini çeker mi?',
            en: 'Do you notice symbolic imagery in your dreams?',
        },
        options: [
            { tr: 'Hayır, rüyalarım sıradan', en: 'No, my dreams feel ordinary' },
            { tr: 'Bazen ilginç imgeler oluyor', en: 'Sometimes there are odd images' },
            { tr: 'Evet, dikkatimi çeken semboller var', en: 'Yes, noticeable symbols appear' },
            { tr: 'Rüyalarım baştan sona sembolik', en: 'My dreams are entirely symbolic' },
        ],
    },
    // Q12 — Dream & Waking Life Connection
    {
        id: 12,
        dimension: 'connection',
        question: {
            tr: 'Rüyaların gerçek hayatınla bağlantılı mı?',
            en: 'Do your dreams connect to your waking life?',
        },
        options: [
            { tr: 'Hiç bağlantı görmüyorum', en: 'I see no connection' },
            { tr: 'Bazen benzerlikler fark ediyorum', en: 'I sometimes notice similarities' },
            { tr: 'Sıklıkla hayatımla örtüşür', en: 'They often overlap with my life' },
            { tr: 'Rüyalarım geleceğe ışık tutar gibi', en: 'My dreams seem to illuminate the future' },
        ],
    },
];

// ─── 8 Profiles ────────────────────────────────────────────────────

export const DREAM_PROFILES: DreamProfile[] = [
    {
        id: 1,
        name: { tr: 'Hayalci Gezgin', en: 'Dreamer Voyager' },
        emoji: '🧭',
        tagline: {
            tr: 'Rüyaların seni bilinmeyene çağırıyor.',
            en: 'Your dreams are calling you into the unknown.',
        },
        description: {
            tr: 'Rüyalarında keşif, anlam arayışı ve duygusal farkındalık öne çıkıyor. Bilinçaltın sana sık sık sembollerle konuşuyor. Hayatındaki küçük detayların aslında büyük anlamlar taşıdığını hissediyorsun. Rüyalarını kaydettikçe iç dünyanı daha net görmeye başlayacaksın.',
            en: 'Exploration, meaning, and emotional awareness define your dream life. Your subconscious speaks to you through symbols constantly. The small details in your life carry deeper meanings than you realize. Recording your dreams will help you see your inner world more clearly.',
        },
        traits: {
            tr: ['Meraklı', 'Sezgisel', 'Anlam arayan'],
            en: ['Curious', 'Intuitive', 'Meaning-seeker'],
        },
        element: '🌍',
        color: 'from-violet-500 to-indigo-600',
        targetVector: [2, 0, 3, 1, 2, 1, 1, 1, 1, 2, 2, 1],
    },
    {
        id: 2,
        name: { tr: 'Sessiz Gözlemci', en: 'Silent Observer' },
        emoji: '👁️',
        tagline: {
            tr: 'Rüyalarında sessizce izliyor, derinden anlıyorsun.',
            en: 'You watch silently and understand deeply.',
        },
        description: {
            tr: 'Rüyalarında olayların içindesin ama kontrol sende değil gibi hissediyorsun. Bilinçaltın yaşadıklarını sindirmeye çalışıyor. Günlük hayattaki düşüncelerin rüyalarına yumuşak geçişlerle sızıyor. Rüyalarını yazmak, zihninin yükünü hafifletebilir.',
            en: 'You are present in your dream events, but you don\'t feel in control. Your subconscious is digesting your experiences. Daily thoughts gently seep into your dreams. Writing them down can lighten the weight on your mind.',
        },
        traits: {
            tr: ['Düşünceli', 'İçe dönük', 'Analitik'],
            en: ['Thoughtful', 'Introspective', 'Analytical'],
        },
        element: '💨',
        color: 'from-slate-400 to-blue-500',
        targetVector: [1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1],
    },
    {
        id: 3,
        name: { tr: 'Duygusal Kaşif', en: 'Emotional Explorer' },
        emoji: '🔥',
        tagline: {
            tr: 'İç dünyanın en derin katmanlarına dalıyorsun.',
            en: 'You dive into the deepest layers of your inner world.',
        },
        description: {
            tr: 'Rüyaların yoğun, detaylı ve duygusal olarak güçlü. Bilinçaltın sana kendini tanıman için sahneler sunuyor. İç dünyanla güçlü bir bağın var. Rüyalarını takip etmek sana ciddi içgörüler kazandırabilir.',
            en: 'Your dreams are intense, detailed, and emotionally powerful. Your subconscious stages scenes for you to understand yourself better. You have a strong connection with your inner world. Tracking your dreams will bring serious insights.',
        },
        traits: {
            tr: ['Empatik', 'Derin hisseden', 'Cesur'],
            en: ['Empathetic', 'Deep-feeler', 'Courageous'],
        },
        element: '🌊',
        color: 'from-rose-500 to-orange-500',
        targetVector: [3, 2, 3, 2, 2, 1, 2, 2, 1, 2, 1, 2],
    },
    {
        id: 4,
        name: { tr: 'Zihinsel Savaşçı', en: 'Mental Warrior' },
        emoji: '⚔️',
        tagline: {
            tr: 'Bilinçaltın sana mücadele alanları sunuyor.',
            en: 'Your subconscious sets battle arenas for you.',
        },
        description: {
            tr: 'Rüyalarında baskı, kaçış ve mücadele temaları öne çıkıyor. Günlük streslerin rüyalarına yansıyor olabilir. Bilinçaltın sana "yavaşla" sinyali veriyor. Rüyalarını yazmak zihinsel rahatlama sağlayabilir.',
            en: 'Themes of pressure, escape, and struggle dominate your dreams. Daily stresses may be reflecting into your dream world. Your subconscious is signaling you to slow down. Writing your dreams can offer mental relief.',
        },
        traits: {
            tr: ['Dayanıklı', 'Kararlı', 'Stres altında güçlü'],
            en: ['Resilient', 'Determined', 'Strong under pressure'],
        },
        element: '🗡️',
        color: 'from-red-600 to-amber-500',
        targetVector: [2, 2, 2, 1, 1, 0, 3, 2, 0, 1, 1, 1],
    },
    {
        id: 5,
        name: { tr: 'Kontrolcü Mimar', en: 'Controller Architect' },
        emoji: '🏛️',
        tagline: {
            tr: 'Rüyalarında bile düzen kuruyorsun.',
            en: 'You build order even in your dreams.',
        },
        description: {
            tr: 'Rüyalarında yönlendirme ve bilinçli hâkimiyet hissi var. Planlı, organize ve farkındalığı yüksek bir yapın olabilir. Rüyalar senin için bir oyun alanı gibi çalışıyor. Lucid rüya potansiyelin yüksek.',
            en: 'There\'s a sense of direction and conscious control in your dreams. You likely have a planned, organized, and highly aware nature. Dreams function as a playground for you. Your lucid dreaming potential is extremely high.',
        },
        traits: {
            tr: ['Stratejist', 'Organize', 'Lider'],
            en: ['Strategist', 'Organized', 'Leader'],
        },
        element: '⚡',
        color: 'from-cyan-400 to-blue-600',
        targetVector: [3, 0, 0, 0, 3, 3, 0, 3, 0, 3, 0, 0],
    },
    {
        id: 6,
        name: { tr: 'Derin Dalgıç', en: 'Deep Diver' },
        emoji: '🫧',
        tagline: {
            tr: 'Bilinçaltının en karanlık sularına dalıyorsun.',
            en: 'You plunge into the darkest waters of the subconscious.',
        },
        description: {
            tr: 'Rüyaların yoğun ve bazen rahatsız edici olabiliyor. Bilinçaltın bastırılmış duyguları sahneye taşıyor. Bu kötü bir şey değil; bir arınma süreci olarak düşün. Rüyalarını yazmak içsel yüklerini hafifletebilir.',
            en: 'Your dreams are intense and sometimes disturbing. Your subconscious brings repressed emotions to the stage. Think of it as a cleansing process. Writing down your dreams can lighten your internal burdens.',
        },
        traits: {
            tr: ['Cesur', 'İçsel', 'Dönüşümcü'],
            en: ['Brave', 'Introspective', 'Transformative'],
        },
        element: '🌑',
        color: 'from-purple-700 to-indigo-900',
        targetVector: [1, 3, 2, 2, 1, 0, 3, 2, 0, 0, 2, 2],
    },
    {
        id: 7,
        name: { tr: 'Rüya Gezgini', en: 'Dream Traveler' },
        emoji: '🌙',
        tagline: {
            tr: 'Rüya dünyan sükunet ve akış dolu.',
            en: 'Your dream world flows with peace and wonder.',
        },
        description: {
            tr: 'Rüyalarında bir sükunet ve akış hali var. Hayatı uzaktan izleyen, duyguları derinden yaşayan birisin. Rüyalar senin için zihinsel bir dinlenme alanı. Rüya günlüğü seni daha da güçlendirir.',
            en: 'There\'s a state of serenity and flow in your dreams. You observe life from a distance and experience emotions deeply. Dreams function as a mental sanctuary for you. A dream journal strengthens you even further.',
        },
        traits: {
            tr: ['Huzurlu', 'Akışta', 'Farkındalığı yüksek'],
            en: ['Serene', 'In flow', 'Highly aware'],
        },
        element: '🌿',
        color: 'from-emerald-400 to-teal-600',
        targetVector: [2, 0, 1, 1, 2, 2, 2, 0, 0, 2, 1, 1],
    },
    {
        id: 8,
        name: { tr: 'Bilinç Eşiği Yolcusu', en: 'Threshold Voyager' },
        emoji: '🌀',
        tagline: {
            tr: 'Bilinç ile bilinçaltı arasında gidip geliyorsun.',
            en: 'You drift between consciousness and the subconscious.',
        },
        description: {
            tr: 'Rüyaların çok canlı ama bazen yorucu. Bilinç ile bilinçaltı arasında gidip geliyorsun. Lucid rüya görmeye en yakın profillerden birisin. Biraz denge ile rüyalarını bilinçli olarak yönetebilirsin.',
            en: 'Your dreams are vivid but sometimes exhausting. You move back and forth between consciousness and the subconscious. You\'re one of the profiles closest to lucid dreaming. With a little balance, you can manage your dreams consciously.',
        },
        traits: {
            tr: ['Uyanık rüyacı', 'Sınır aşıcı', 'Vizyon sahibi'],
            en: ['Lucid dreamer', 'Boundary-breaker', 'Visionary'],
        },
        element: '✨',
        color: 'from-fuchsia-500 to-violet-600',
        targetVector: [3, 1, 0, 3, 3, 3, 1, 3, 2, 1, 3, 3],
    },
];

// ─── Scoring ───────────────────────────────────────────────────────

export function calculateProfile(answers: number[]): DreamProfile {
    let bestProfile = DREAM_PROFILES[0];
    let minDistance = Infinity;

    for (const profile of DREAM_PROFILES) {
        let distance = 0;
        for (let i = 0; i < 12; i++) {
            const diff = (answers[i] ?? 0) - profile.targetVector[i];
            distance += diff * diff;
        }
        distance = Math.sqrt(distance);

        if (distance < minDistance) {
            minDistance = distance;
            bestProfile = profile;
        }
    }

    return bestProfile;
}
