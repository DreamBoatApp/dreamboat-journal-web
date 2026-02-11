// Script to generate a clean 500-symbol list with NO duplicates
const d = require('./data/source_dictionary.js');
const existingKeys = new Set(Object.keys(d));
const existingSlugs = new Set(Object.keys(d).map(k => k.toLowerCase().replace(/\s+/g, '-').replace(/_/g, '-')));

// Also check existing content files
const fs = require('fs');
const path = require('path');
const trFiles = new Set(fs.readdirSync('content/tr/meanings').map(f => path.basename(f, '.json')));

function isNew(key, slug) {
    return !existingKeys.has(key) && !existingSlugs.has(slug) && !trFiles.has(slug);
}

// Master list — ONLY truly new symbols, all single-word
const ALL_CANDIDATES = [
    // ═══ EMOTIONS ═══
    { key: "ANXIETY", tr: "Kaygı", en: "Anxiety" },
    { key: "JEALOUSY", tr: "Kıskançlık", en: "Jealousy" },
    { key: "SHAME", tr: "Utanç", en: "Shame" },
    { key: "GUILT", tr: "Suçluluk", en: "Guilt" },
    { key: "LONELINESS", tr: "Yalnızlık", en: "Loneliness" },
    { key: "EUPHORIA", tr: "Coşku", en: "Euphoria" },
    { key: "NOSTALGIA", tr: "Nostalji", en: "Nostalgia" },
    { key: "GRIEF", tr: "Yas", en: "Grief" },
    { key: "RESENTMENT", tr: "Hınç", en: "Resentment" },
    { key: "ECSTASY", tr: "Vecit", en: "Ecstasy" },
    { key: "FURY", tr: "Hiddet", en: "Fury" },
    { key: "DESPAIR", tr: "Umutsuzluk", en: "Despair" },
    { key: "BLISS", tr: "Huzur", en: "Bliss" },
    { key: "DREAD", tr: "Dehşet", en: "Dread" },
    { key: "ENVY", tr: "Haset", en: "Envy" },
    { key: "APATHY", tr: "Kayıtsızlık", en: "Apathy" },
    { key: "MELANCHOLY", tr: "Melankoli", en: "Melancholy" },
    { key: "SERENITY", tr: "Dinginlik", en: "Serenity" },
    { key: "AGONY", tr: "Azap", en: "Agony" },
    { key: "YEARNING", tr: "Özlem", en: "Yearning" },
    { key: "REMORSE", tr: "Pişmanlık", en: "Remorse" },
    { key: "RAPTURE", tr: "Huşu", en: "Rapture" },
    { key: "ANGUISH", tr: "Elem", en: "Anguish" },
    { key: "ELATION", tr: "Sevinç", en: "Elation" },
    { key: "BOREDOM", tr: "Can Sıkıntısı", en: "Boredom" },
    { key: "VERTIGO", tr: "Vertigo", en: "Vertigo" },
    { key: "PARANOIA", tr: "Paranoya", en: "Paranoia" },
    { key: "HYSTERIA", tr: "Histeri", en: "Hysteria" },
    { key: "TORPOR", tr: "Uyuşukluk", en: "Torpor" },
    { key: "FERVOR", tr: "Şevk", en: "Fervor" },

    // ═══ NATURE ═══
    { key: "CORAL", tr: "Mercan", en: "Coral" },
    { key: "MOSS", tr: "Yosun", en: "Moss" },
    { key: "FERN", tr: "Eğrelti", en: "Fern" },
    { key: "THORN", tr: "Diken", en: "Thorn" },
    { key: "PEBBLE", tr: "Çakıl", en: "Pebble" },
    { key: "CLIFF", tr: "Yar", en: "Cliff" },
    { key: "CREEK", tr: "Dere", en: "Creek" },
    { key: "MARSH", tr: "Bataklık", en: "Marsh" },
    { key: "BOULDER", tr: "Kaya", en: "Boulder" },
    { key: "EMBER", tr: "Kor", en: "Ember" },
    { key: "GLACIER", tr: "Buzul", en: "Glacier" },
    { key: "GEYSER", tr: "Gayzer", en: "Geyser" },
    { key: "CANYON", tr: "Kanyon", en: "Canyon" },
    { key: "MEADOW", tr: "Çayır", en: "Meadow" },
    { key: "OASIS", tr: "Vaha", en: "Oasis" },
    { key: "DUNE", tr: "Kumul", en: "Dune" },
    { key: "REEF", tr: "Resif", en: "Reef" },
    { key: "RAVINE", tr: "Yarık", en: "Ravine" },
    { key: "SUMMIT", tr: "Zirve", en: "Summit" },
    { key: "LAGOON", tr: "Lagün", en: "Lagoon" },
    { key: "TUNDRA", tr: "Tundra", en: "Tundra" },
    { key: "SAVANNA", tr: "Savan", en: "Savanna" },
    { key: "FJORD", tr: "Fiyort", en: "Fjord" },
    { key: "GROVE", tr: "Koru", en: "Grove" },
    { key: "DELTA", tr: "Delta", en: "Delta" },
    { key: "DAWN", tr: "Şafak", en: "Dawn" },
    { key: "GLADE", tr: "Açıklık", en: "Glade" },
    { key: "COVE", tr: "Koy", en: "Cove" },
    { key: "RAPIDS", tr: "Çağlayan", en: "Rapids" },
    { key: "PLATEAU", tr: "Yayla", en: "Plateau" },
    { key: "GROTTO", tr: "Mağara", en: "Grotto" },
    { key: "STEPPE", tr: "Bozkır", en: "Steppe" },

    // ═══ CELESTIAL ═══
    { key: "NEBULA", tr: "Bulutsu", en: "Nebula" },
    { key: "COMET", tr: "Kuyruklu", en: "Comet" },
    { key: "ECLIPSE", tr: "Tutulma", en: "Eclipse" },
    { key: "METEOR", tr: "Göktaşı", en: "Meteor" },
    { key: "ORBIT", tr: "Yörünge", en: "Orbit" },
    { key: "COSMOS", tr: "Kozmos", en: "Cosmos" },
    { key: "GALAXY", tr: "Galaksi", en: "Galaxy" },
    { key: "PULSAR", tr: "Pulsar", en: "Pulsar" },
    { key: "SUPERNOVA", tr: "Süpernova", en: "Supernova" },
    { key: "QUASAR", tr: "Kuazar", en: "Quasar" },
    { key: "SOLSTICE", tr: "Gündönümü", en: "Solstice" },
    { key: "ZENITH", tr: "Zenit", en: "Zenith" },
    { key: "NADIR", tr: "Nadir", en: "Nadir" },

    // ═══ MYTHOLOGY ═══
    { key: "CENTAUR", tr: "Kentaur", en: "Centaur" },
    { key: "SPHINX", tr: "Sfenks", en: "Sphinx" },
    { key: "HYDRA", tr: "Hidra", en: "Hydra" },
    { key: "PEGASUS", tr: "Pegasus", en: "Pegasus" },
    { key: "CHIMERA", tr: "Kimera", en: "Chimera" },
    { key: "GRIFFIN", tr: "Grifon", en: "Griffin" },
    { key: "KRAKEN", tr: "Kraken", en: "Kraken" },
    { key: "GARGOYLE", tr: "Çörten", en: "Gargoyle" },
    { key: "MINOTAUR", tr: "Minotaur", en: "Minotaur" },
    { key: "CYCLOPS", tr: "Kiklop", en: "Cyclops" },
    { key: "BASILISK", tr: "Bazilisk", en: "Basilisk" },
    { key: "LEVIATHAN", tr: "Leviatan", en: "Leviathan" },
    { key: "CERBERUS", tr: "Kerberos", en: "Cerberus" },
    { key: "GOLEM", tr: "Golem", en: "Golem" },
    { key: "FENRIR", tr: "Fenrir", en: "Fenrir" },
    { key: "VALKYRIE", tr: "Valküre", en: "Valkyrie" },
    { key: "BANSHEE", tr: "Banşi", en: "Banshee" },
    { key: "NYMPH", tr: "Nymfa", en: "Nymph" },
    { key: "DJINN", tr: "Cin", en: "Djinn" },
    { key: "WENDIGO", tr: "Vendigo", en: "Wendigo" },
    { key: "YETI", tr: "Yeti", en: "Yeti" },
    { key: "WYRM", tr: "Solucan", en: "Wyrm" },
    { key: "WRAITH", tr: "Hortlak", en: "Wraith" },
    { key: "SPECTER", tr: "Tayf", en: "Specter" },
    { key: "DOPPELGANGER", tr: "İkiz", en: "Doppelganger" },
    { key: "FAMILIAR", tr: "Dost", en: "Familiar" },

    // ═══ BODY ═══
    { key: "SPINE", tr: "Omurga", en: "Spine" },
    { key: "LUNG", tr: "Akciğer", en: "Lung" },
    { key: "BONE", tr: "Kemik", en: "Bone" },
    { key: "VEIN", tr: "Damar", en: "Vein" },
    { key: "MUSCLE", tr: "Kas", en: "Muscle" },
    { key: "JAW", tr: "Çene", en: "Jaw" },
    { key: "RIB", tr: "Kaburga", en: "Rib" },
    { key: "SKULL", tr: "Kafatası", en: "Skull" },
    { key: "WOMB", tr: "Rahim", en: "Womb" },
    { key: "NAVEL", tr: "Göbek", en: "Navel" },
    { key: "MARROW", tr: "İlik", en: "Marrow" },
    { key: "SCAR", tr: "Yara", en: "Scar" },
    { key: "WRINKLE", tr: "Kırışık", en: "Wrinkle" },
    { key: "TENDON", tr: "Tendon", en: "Tendon" },
    { key: "PELVIS", tr: "Pelvis", en: "Pelvis" },
    { key: "KNUCKLE", tr: "Eklem", en: "Knuckle" },
    { key: "CARTILAGE", tr: "Kıkırdak", en: "Cartilage" },
    { key: "LIGAMENT", tr: "Bağ", en: "Ligament" },
    { key: "ABDOMEN", tr: "Karın", en: "Abdomen" },
    { key: "IRIS", tr: "İris", en: "Iris" },

    // ═══ OBJECTS ═══
    { key: "QUILL", tr: "Tüy", en: "Quill" },
    { key: "LOCKET", tr: "Madalyon", en: "Locket" },
    { key: "PENDULUM", tr: "Sarkaç", en: "Pendulum" },
    { key: "CHALICE", tr: "Kadeh", en: "Chalice" },
    { key: "PRISM", tr: "Prizma", en: "Prism" },
    { key: "LANTERN", tr: "Fener", en: "Lantern" },
    { key: "AMULET", tr: "Muska", en: "Amulet" },
    { key: "TALISMAN", tr: "Tılsım", en: "Talisman" },
    { key: "RUNE", tr: "Rün", en: "Rune" },
    { key: "SCROLL", tr: "Parşömen", en: "Scroll" },
    { key: "COMPASS", tr: "Pusula", en: "Compass" },
    { key: "TELESCOPE", tr: "Teleskop", en: "Telescope" },
    { key: "ANVIL", tr: "Örs", en: "Anvil" },
    { key: "CRUCIBLE", tr: "Pota", en: "Crucible" },
    { key: "LOOM", tr: "Tezgah", en: "Loom" },
    { key: "SPINDLE", tr: "İğ", en: "Spindle" },
    { key: "BELLOWS", tr: "Körük", en: "Bellows" },
    { key: "CAULDRON", tr: "Kazan", en: "Cauldron" },
    { key: "HARP", tr: "Arp", en: "Harp" },
    { key: "DRUM", tr: "Davul", en: "Drum" },
    { key: "GONG", tr: "Gong", en: "Gong" },
    { key: "LYRE", tr: "Lir", en: "Lyre" },
    { key: "CENSER", tr: "Buhurdan", en: "Censer" },
    { key: "MORTAR", tr: "Havan", en: "Mortar" },
    { key: "SICKLE", tr: "Orak", en: "Sickle" },
    { key: "FLUTE", tr: "Flüt", en: "Flute" },
    { key: "GOBLET", tr: "Kupa", en: "Goblet" },
    { key: "MONOCLE", tr: "Monokel", en: "Monocle" },
    { key: "SUNDIAL", tr: "Kadran", en: "Sundial" },
    { key: "INKWELL", tr: "Hokka", en: "Inkwell" },
    { key: "CODEX", tr: "Kodeks", en: "Codex" },
    { key: "GRIMOIRE", tr: "Büyükitap", en: "Grimoire" },
    { key: "HOURGLASS", tr: "Kumsaat", en: "Hourglass" },

    // ═══ WEAPONS ═══
    { key: "SPEAR", tr: "Mızrak", en: "Spear" },
    { key: "DAGGER", tr: "Hançer", en: "Dagger" },
    { key: "MACE", tr: "Topuz", en: "Mace" },
    { key: "JAVELIN", tr: "Cirit", en: "Javelin" },
    { key: "ARMOR", tr: "Zırh", en: "Armor" },
    { key: "HELMET", tr: "Miğfer", en: "Helmet" },
    { key: "QUIVER", tr: "Okluk", en: "Quiver" },
    { key: "CATAPULT", tr: "Mancınık", en: "Catapult" },
    { key: "TRIDENT", tr: "Üçdişli", en: "Trident" },
    { key: "SCIMITAR", tr: "Pala", en: "Scimitar" },
    { key: "RAPIER", tr: "Kılıç", en: "Rapier" },
    { key: "FLAIL", tr: "Zincir", en: "Flail" },
    { key: "TREBUCHET", tr: "Trabzan", en: "Trebuchet" },

    // ═══ GEMSTONES ═══
    { key: "SAPPHIRE", tr: "Safir", en: "Sapphire" },
    { key: "EMERALD", tr: "Zümrüt", en: "Emerald" },
    { key: "RUBY", tr: "Yakut", en: "Ruby" },
    { key: "AMETHYST", tr: "Ametist", en: "Amethyst" },
    { key: "TOPAZ", tr: "Topaz", en: "Topaz" },
    { key: "ONYX", tr: "Oniks", en: "Onyx" },
    { key: "OBSIDIAN", tr: "Obsidyen", en: "Obsidian" },
    { key: "TURQUOISE", tr: "Turkuaz", en: "Turquoise" },
    { key: "OPAL", tr: "Opal", en: "Opal" },
    { key: "GARNET", tr: "Granat", en: "Garnet" },
    { key: "JADE", tr: "Yeşim", en: "Jade" },
    { key: "AMBER", tr: "Kehribar", en: "Amber" },
    { key: "QUARTZ", tr: "Kuvars", en: "Quartz" },
    { key: "AGATE", tr: "Akik", en: "Agate" },
    { key: "LAPIS", tr: "Lazurit", en: "Lapis" },
    { key: "MOONSTONE", tr: "Aytaşı", en: "Moonstone" },
    { key: "MALACHITE", tr: "Malahit", en: "Malachite" },
    { key: "CITRINE", tr: "Sitrin", en: "Citrine" },
    { key: "PERIDOT", tr: "Peridot", en: "Peridot" },
    { key: "TOURMALINE", tr: "Turmalin", en: "Tourmaline" },
    { key: "ALEXANDRITE", tr: "İskenderit", en: "Alexandrite" },
    { key: "TANZANITE", tr: "Tanzanit", en: "Tanzanite" },
    { key: "ZIRCON", tr: "Zirkon", en: "Zircon" },
    { key: "BERYL", tr: "Beril", en: "Beryl" },
    { key: "CARNELIAN", tr: "Akik", en: "Carnelian" },

    // ═══ ANIMALS ═══
    { key: "HYENA", tr: "Sırtlan", en: "Hyena" },
    { key: "RAVEN", tr: "Kuzgun", en: "Raven" },
    { key: "VULTURE", tr: "Akbaba", en: "Vulture" },
    { key: "CHAMELEON", tr: "Bukalemun", en: "Chameleon" },
    { key: "OTTER", tr: "Samur", en: "Otter" },
    { key: "VIPER", tr: "Engerek", en: "Viper" },
    { key: "COBRA", tr: "Kobra", en: "Cobra" },
    { key: "MOLE", tr: "Köstebek", en: "Mole" },
    { key: "BADGER", tr: "Porsuk", en: "Badger" },
    { key: "TOUCAN", tr: "Tukan", en: "Toucan" },
    { key: "SLOTH", tr: "Tembel", en: "Sloth" },
    { key: "CAPYBARA", tr: "Kapibara", en: "Capybara" },
    { key: "COYOTE", tr: "Kojot", en: "Coyote" },
    { key: "IBIS", tr: "İbis", en: "Ibis" },
    { key: "LEMUR", tr: "Lemur", en: "Lemur" },
    { key: "MARTEN", tr: "Sansar", en: "Marten" },
    { key: "OSPREY", tr: "Kartal", en: "Osprey" },
    { key: "QUAIL", tr: "Bıldırcın", en: "Quail" },
    { key: "WEASEL", tr: "Gelincik", en: "Weasel" },
    { key: "ANTEATER", tr: "Karıncayiyen", en: "Anteater" },

    // ═══ PLANTS ═══
    { key: "JASMINE", tr: "Yasemin", en: "Jasmine" },
    { key: "POPPY", tr: "Gelincik", en: "Poppy" },
    { key: "HEMLOCK", tr: "Baldıran", en: "Hemlock" },
    { key: "MAGNOLIA", tr: "Manolya", en: "Magnolia" },
    { key: "NETTLE", tr: "Isırgan", en: "Nettle" },
    { key: "MISTLETOE", tr: "Ökseotu", en: "Mistletoe" },
    { key: "DANDELION", tr: "Karahindiba", en: "Dandelion" },
    { key: "SYCAMORE", tr: "Çınar", en: "Sycamore" },
    { key: "THISTLE", tr: "Devedikeni", en: "Thistle" },
    { key: "BONSAI", tr: "Bonsai", en: "Bonsai" },
    { key: "ACACIA", tr: "Akasya", en: "Acacia" },
    { key: "WISTERIA", tr: "Morsalkım", en: "Wisteria" },
    { key: "OLEANDER", tr: "Zakkum", en: "Oleander" },
    { key: "SEQUOIA", tr: "Sekoya", en: "Sequoia" },
    { key: "LICHEN", tr: "Liken", en: "Lichen" },
    { key: "MANGROVE", tr: "Mangrov", en: "Mangrove" },
    { key: "BAOBAB", tr: "Baobap", en: "Baobab" },
    { key: "GINSENG", tr: "Ginseng", en: "Ginseng" },
    { key: "TURMERIC", tr: "Zerdeçal", en: "Turmeric" },
    { key: "SAFFRON", tr: "Safran", en: "Saffron" },

    // ═══ WEATHER ═══
    { key: "BLIZZARD", tr: "Tipi", en: "Blizzard" },
    { key: "TEMPEST", tr: "Kasırga", en: "Tempest" },
    { key: "DROUGHT", tr: "Kuraklık", en: "Drought" },
    { key: "GALE", tr: "Bora", en: "Gale" },
    { key: "MONSOON", tr: "Muson", en: "Monsoon" },
    { key: "HAZE", tr: "Pus", en: "Haze" },
    { key: "SQUALL", tr: "Sağanak", en: "Squall" },
    { key: "DRIZZLE", tr: "Çisenti", en: "Drizzle" },
    { key: "SLEET", tr: "Sulusepken", en: "Sleet" },
    { key: "CYCLONE", tr: "Siklon", en: "Cyclone" },

    // ═══ ARCHITECTURE ═══
    { key: "DOME", tr: "Kubbe", en: "Dome" },
    { key: "CRYPT", tr: "Mahzen", en: "Crypt" },
    { key: "CITADEL", tr: "Hisar", en: "Citadel" },
    { key: "SPIRE", tr: "Sivri", en: "Spire" },
    { key: "BASTION", tr: "Burç", en: "Bastion" },
    { key: "PORTICO", tr: "Revak", en: "Portico" },
    { key: "PARAPET", tr: "Parapet", en: "Parapet" },
    { key: "TURRET_NEW", tr: "Taret", en: "Turret" },
    { key: "MINARET_NEW", tr: "Minare", en: "Minaret" },
    { key: "RAMPART", tr: "Sur", en: "Rampart" },
    { key: "COLONNADE", tr: "Sütunluk", en: "Colonnade" },
    { key: "ROTUNDA", tr: "Rotunda", en: "Rotunda" },
    { key: "CUPOLA", tr: "Kubbecik", en: "Cupola" },
    { key: "BUTTRESS", tr: "Payanda", en: "Buttress" },
    { key: "PARAPET2", tr: "Mazgal", en: "Battlement" },

    // ═══ FOOD ═══
    { key: "ALMOND", tr: "Badem", en: "Almond" },
    { key: "WALNUT", tr: "Ceviz", en: "Walnut" },
    { key: "CINNAMON", tr: "Tarçın", en: "Cinnamon" },
    { key: "CLOVE", tr: "Karanfil", en: "Clove" },
    { key: "CARDAMOM", tr: "Kakule", en: "Cardamom" },
    { key: "VANILLA", tr: "Vanilya", en: "Vanilla" },
    { key: "NUTMEG", tr: "Muskat", en: "Nutmeg" },
    { key: "VINEGAR", tr: "Sirke", en: "Vinegar" },
    { key: "YEAST", tr: "Maya", en: "Yeast" },
    { key: "TRUFFLE", tr: "Trüf", en: "Truffle" },

    // ═══ MATERIALS ═══
    { key: "LEATHER", tr: "Deri", en: "Leather" },
    { key: "IVORY", tr: "Fildişi", en: "Ivory" },
    { key: "PORCELAIN", tr: "Porselen", en: "Porcelain" },
    { key: "CLAY", tr: "Kil", en: "Clay" },
    { key: "WAX", tr: "Mum", en: "Wax" },
    { key: "PEWTER", tr: "Kalay", en: "Pewter" },
    { key: "MERCURY", tr: "Civa", en: "Mercury" },
    { key: "BRONZE", tr: "Bronz", en: "Bronze" },
    { key: "GRAPHITE", tr: "Grafit", en: "Graphite" },
    { key: "BITUMEN", tr: "Katran", en: "Bitumen" },

    // ═══ CLOTHING ═══
    { key: "GIRDLE", tr: "Kuşak", en: "Girdle" },
    { key: "TURBAN", tr: "Sarık", en: "Turban" },
    { key: "SHROUD", tr: "Kefen", en: "Shroud" },
    { key: "TOGA", tr: "Toga", en: "Toga" },
    { key: "KIMONO", tr: "Kimono", en: "Kimono" },
    { key: "SARI", tr: "Sari", en: "Sari" },
    { key: "CORSET", tr: "Korse", en: "Corset" },
    { key: "EPAULETTE", tr: "Apolet", en: "Epaulette" },
    { key: "FROCK", tr: "Cübbe", en: "Frock" },
    { key: "KAFTAN", tr: "Kaftan", en: "Kaftan" },

    // ═══ ACTIONS ═══
    { key: "CHASING", tr: "Kovalama", en: "Chasing" },
    { key: "WEEPING", tr: "Ağlama", en: "Weeping" },
    { key: "SCREAMING", tr: "Çığlık", en: "Screaming" },
    { key: "ASCENDING", tr: "Yükselme", en: "Ascending" },
    { key: "SINKING", tr: "Batma", en: "Sinking" },
    { key: "CRUMBLING", tr: "Çökme", en: "Crumbling" },
    { key: "MELTING", tr: "Erime", en: "Melting" },
    { key: "FREEZING", tr: "Donma", en: "Freezing" },
    { key: "BURNING", tr: "Yanma", en: "Burning" },
    { key: "FLOATING", tr: "Süzülme", en: "Floating" },
    { key: "VANISHING", tr: "Kaybolma", en: "Vanishing" },
    { key: "SPLITTING", tr: "Yarılma", en: "Splitting" },
    { key: "SUFFOCATING", tr: "Boğulma", en: "Suffocating" },
    { key: "METAMORPHING", tr: "Dönüşme", en: "Transforming" },
    { key: "UNRAVELING", tr: "Çözülme", en: "Unraveling" },

    // ═══ ARCHETYPES ═══
    { key: "JESTER", tr: "Soytarı", en: "Jester" },
    { key: "HERMIT", tr: "Münzevi", en: "Hermit" },
    { key: "SHAMAN", tr: "Şaman", en: "Shaman" },
    { key: "SORCERER", tr: "Büyücü", en: "Sorcerer" },
    { key: "EMPRESS", tr: "İmparatoriçe", en: "Empress" },
    { key: "WARRIOR", tr: "Savaşçı", en: "Warrior" },
    { key: "HEALER", tr: "Şifacı", en: "Healer" },
    { key: "TRICKSTER", tr: "Düzenbaz", en: "Trickster" },
    { key: "EXILE", tr: "Sürgün", en: "Exile" },
    { key: "MARTYR", tr: "Şehit", en: "Martyr" },
    { key: "ALCHEMIST", tr: "Simyacı", en: "Alchemist" },
    { key: "ARCHITECT", tr: "Mimar", en: "Architect" },
    { key: "BLACKSMITH", tr: "Demirci", en: "Blacksmith" },
    { key: "WEAVER", tr: "Dokumacı", en: "Weaver" },
    { key: "SCRIBE", tr: "Katip", en: "Scribe" },

    // ═══ ABSTRACT ═══
    { key: "KARMA", tr: "Karma", en: "Karma" },
    { key: "PARADOX", tr: "Çelişki", en: "Paradox" },
    { key: "ILLUSION", tr: "Yanılsama", en: "Illusion" },
    { key: "ETERNITY", tr: "Ebediyet", en: "Eternity" },
    { key: "OBLIVION", tr: "Unutuş", en: "Oblivion" },
    { key: "GENESIS", tr: "Yaratılış", en: "Genesis" },
    { key: "ENTROPY", tr: "Entropi", en: "Entropy" },
    { key: "CATHARSIS", tr: "Arınma", en: "Catharsis" },
    { key: "EPIPHANY", tr: "Aydınlanma", en: "Epiphany" },
    { key: "SYNCHRONICITY", tr: "Eşzamanlılık", en: "Synchronicity" },
    { key: "DUALITY", tr: "İkilik", en: "Duality" },
    { key: "INERTIA", tr: "Atalet", en: "Inertia" },
    { key: "TRANSCENDENCE", tr: "Aşkınlık", en: "Transcendence" },
    { key: "CONVERGENCE", tr: "Yakınsama", en: "Convergence" },
    { key: "DISSOLUTION", tr: "Çözünme", en: "Dissolution" },

    // ═══ SENSES ═══
    { key: "FRAGRANCE", tr: "Koku", en: "Fragrance" },
    { key: "APPARITION", tr: "Görüntü", en: "Apparition" },
    { key: "VERTIGO2", tr: "Baş dönme", en: "Dizziness" },
    { key: "NUMBNESS", tr: "Uyuşma", en: "Numbness" },
    { key: "BLINDNESS", tr: "Körlük", en: "Blindness" },
    { key: "DEAFNESS", tr: "Sağırlık", en: "Deafness" },
    { key: "LUCIDITY", tr: "Berraklık", en: "Lucidity" },

    // ═══ MARINE ═══
    { key: "SHIPWRECK", tr: "Batık", en: "Shipwreck" },
    { key: "MAELSTROM", tr: "Anafor", en: "Maelstrom" },
    { key: "BARNACLE", tr: "Midye", en: "Barnacle" },
    { key: "PLANKTON", tr: "Plankton", en: "Plankton" },
    { key: "ANEMONE", tr: "Anemon", en: "Anemone" },

    // ═══ INSECTS ═══
    { key: "CICADA", tr: "Ağustosböceği", en: "Cicada" },
    { key: "CENTIPEDE", tr: "Kırkayak", en: "Centipede" },
    { key: "LEECH", tr: "Sülük", en: "Leech" },
    { key: "COCOON", tr: "Koza", en: "Cocoon" },
    { key: "LARVA", tr: "Larva", en: "Larva" },
    { key: "WASP", tr: "Arı", en: "Wasp" },
    { key: "TERMITE", tr: "Termit", en: "Termite" },
    { key: "SILKWORM", tr: "İpekkurdu", en: "Silkworm" },
    { key: "FIREFLY", tr: "Ateşböceği", en: "Firefly" },
    { key: "TICK", tr: "Kene", en: "Tick" },

    // ═══ SACRED ═══
    { key: "MANDALA2", tr: "Çember", en: "Mandala" },
    { key: "ANKH", tr: "Ankh", en: "Ankh" },
    { key: "OUROBOROS", tr: "Uroboros", en: "Ouroboros" },
    { key: "TOTEM", tr: "Totem", en: "Totem" },
    { key: "ORACLE", tr: "Kahin", en: "Oracle" },
    { key: "MANTRA", tr: "Mantra", en: "Mantra" },
    { key: "SUTRA", tr: "Sutra", en: "Sutra" },
    { key: "DHARMA", tr: "Dharma", en: "Dharma" },
    { key: "ASTRAL", tr: "Astral", en: "Astral" },
    { key: "ENCHANTMENT", tr: "Büyü", en: "Enchantment" },
    { key: "CHAKRA", tr: "Çakra", en: "Chakra" },
    { key: "NIRVANA", tr: "Nirvan", en: "Nirvana" },
    { key: "SAMSARA", tr: "Samsara", en: "Samsara" },
    { key: "MOKSHA", tr: "Mokşa", en: "Moksha" },
    { key: "KUNDALINI", tr: "Kundalini", en: "Kundalini" },

    // ═══ HOUSEHOLD ═══
    { key: "THRESHOLD", tr: "Eşik", en: "Threshold" },
    { key: "HEARTH", tr: "Ocak", en: "Hearth" },
    { key: "CRADLE", tr: "Beşik", en: "Cradle" },
    { key: "CHANDELIER", tr: "Avize", en: "Chandelier" },
    { key: "TAPESTRY", tr: "Halı", en: "Tapestry" },
    { key: "MANTELPIECE", tr: "Şömine", en: "Mantelpiece" },
    { key: "WARDROBE", tr: "Dolap", en: "Wardrobe" },
    { key: "LANTERN2", tr: "Kandil", en: "Lamp" },
    { key: "SHUTTER", tr: "Kepenk", en: "Shutter" },
    { key: "BANISTER", tr: "Korkuluk", en: "Banister" },

    // ═══ TRANSPORT ═══
    { key: "CHARIOT", tr: "Araba", en: "Chariot" },
    { key: "CANOE", tr: "Kano", en: "Canoe" },
    { key: "SLEDGE", tr: "Kızak", en: "Sledge" },
    { key: "CARRIAGE", tr: "Fayton", en: "Carriage" },
    { key: "SLED", tr: "Sled", en: "Sled" },

    // ═══ MUSIC ═══
    { key: "CHIME", tr: "Çan", en: "Chime" },
    { key: "BAGPIPE", tr: "Gayda", en: "Bagpipe" },
    { key: "ZITHER", tr: "Kanun", en: "Zither" },
    { key: "REBEC", tr: "Rebap", en: "Rebec" },
    { key: "DIDGERIDOO", tr: "Didjeridu", en: "Didgeridoo" },

    // ═══ CONTAINERS ═══
    { key: "URN", tr: "Vazo", en: "Urn" },
    { key: "VIAL", tr: "Flakon", en: "Vial" },
    { key: "RELIQUARY", tr: "Emanetlik", en: "Reliquary" },
    { key: "COFFER", tr: "Kasa", en: "Coffer" },
    { key: "TANKARD", tr: "Maşrapa", en: "Tankard" },

    // ═══ TOOLS ═══
    { key: "CHISEL", tr: "Keski", en: "Chisel" },
    { key: "PLOUGH", tr: "Saban", en: "Plough" },
    { key: "LATCH", tr: "Mandal", en: "Latch" },
    { key: "PULLEY", tr: "Makara", en: "Pulley" },
    { key: "LEVER", tr: "Manivela", en: "Lever" },
    { key: "LATHE", tr: "Torna", en: "Lathe" },
    { key: "TROWEL", tr: "Mala", en: "Trowel" },
    { key: "WHETSTONE", tr: "Bileği", en: "Whetstone" },
    { key: "BELLOWS2", tr: "Çekçek", en: "Winch" },
    { key: "PLIERS", tr: "Pense", en: "Pliers" },

    // ═══ MISC ═══
    { key: "LABYRINTH2", tr: "Labirent", en: "Maze" },
    { key: "QUICKSAND", tr: "Bataklık", en: "Quicksand" },
    { key: "WHIRLWIND", tr: "Kasırga", en: "Whirlwind" },
    { key: "SANDSTORM", tr: "Kum fırtınası", en: "Sandstorm" },
    { key: "AURORA", tr: "Kutup", en: "Aurora" },
];

// Filter ONLY fresh symbols
const freshSymbols = [];
const usedSlugs = new Set();
const usedKeys = new Set();

for (const s of ALL_CANDIDATES) {
    const slug = s.key.toLowerCase().replace(/[^a-z0-9]/g, '').replace(/\d+$/, '');
    const actualSlug = s.key.toLowerCase().replace(/_/g, '-').replace(/\d+$/, '');

    if (isNew(s.key, actualSlug) && !usedKeys.has(s.key) && !usedSlugs.has(actualSlug) && !s.tr.includes(' ')) {
        freshSymbols.push({
            key: s.key,
            slug: actualSlug,
            tr: s.tr,
            en: s.en
        });
        usedKeys.add(s.key);
        usedSlugs.add(actualSlug);
    }
}

console.log(`\n=== RESULT ===`);
console.log(`Total fresh single-word symbols: ${freshSymbols.length}`);
console.log(`Target: 500`);
console.log(`Deficit: ${Math.max(0, 500 - freshSymbols.length)}`);

if (freshSymbols.length > 0) {
    // Write to output file
    const output = `// Auto-generated fresh symbol list\n// Total: ${freshSymbols.length}\nmodule.exports = ${JSON.stringify(freshSymbols, null, 2)};\n`;
    fs.writeFileSync(path.join(__dirname, 'new_symbols_fresh.js'), output, 'utf8');
    console.log(`\nWritten to scripts/new_symbols_fresh.js`);
}
