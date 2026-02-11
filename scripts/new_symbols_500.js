// 500 New Single-Word Dream Symbols
// Each: { key: "ENGLISH_KEY", slug: "lowercase", tr: "Türkçe", en: "English" }
// ALL single-word only — both key and TR translation

const NEW_SYMBOLS = [
    // ═══ EMOTIONS & MENTAL STATES ═══
    { key: "ANXIETY", slug: "anxiety", tr: "Kaygı", en: "Anxiety" },
    { key: "JEALOUSY", slug: "jealousy", tr: "Kıskançlık", en: "Jealousy" },
    { key: "SHAME", slug: "shame", tr: "Utanç", en: "Shame" },
    { key: "GUILT", slug: "guilt", tr: "Suçluluk", en: "Guilt" },
    { key: "LONELINESS", slug: "loneliness", tr: "Yalnızlık", en: "Loneliness" },
    { key: "EUPHORIA", slug: "euphoria", tr: "Coşku", en: "Euphoria" },
    { key: "NOSTALGIA", slug: "nostalgia", tr: "Nostalji", en: "Nostalgia" },
    { key: "GRIEF", slug: "grief", tr: "Yas", en: "Grief" },
    { key: "RESENTMENT", slug: "resentment", tr: "Hınç", en: "Resentment" },
    { key: "ECSTASY", slug: "ecstasy", tr: "Vecit", en: "Ecstasy" },
    { key: "FURY", slug: "fury", tr: "Hiddet", en: "Fury" },
    { key: "DESPAIR", slug: "despair", tr: "Umutsuzluk", en: "Despair" },
    { key: "BLISS", slug: "bliss", tr: "Mutluluk", en: "Bliss" },
    { key: "DREAD", slug: "dread", tr: "Dehşet", en: "Dread" },
    { key: "ENVY", slug: "envy", tr: "Haset", en: "Envy" },
    { key: "APATHY", slug: "apathy", tr: "Kayıtsızlık", en: "Apathy" },
    { key: "MELANCHOLY", slug: "melancholy", tr: "Melankoli", en: "Melancholy" },
    { key: "SERENITY", slug: "serenity", tr: "Huzur", en: "Serenity" },
    { key: "AGONY", slug: "agony", tr: "Azap", en: "Agony" },
    { key: "YEARNING", slug: "yearning", tr: "Özlem", en: "Yearning" },

    // ═══ NATURE & LANDSCAPE ═══
    { key: "CORAL", slug: "coral", tr: "Mercan", en: "Coral" },
    { key: "MOSS", slug: "moss", tr: "Yosun", en: "Moss" },
    { key: "FERN", slug: "fern", tr: "Eğrelti", en: "Fern" },
    { key: "THORN", slug: "thorn", tr: "Diken", en: "Thorn" },
    { key: "PEBBLE", slug: "pebble", tr: "Çakıl", en: "Pebble" },
    { key: "CLIFF", slug: "cliff", tr: "Uçurum", en: "Cliff" },
    { key: "CREEK", slug: "creek", tr: "Dere", en: "Creek" },
    { key: "MARSH", slug: "marsh", tr: "Bataklık", en: "Marsh" },
    { key: "BOULDER", slug: "boulder", tr: "Kaya", en: "Boulder" },
    { key: "EMBER", slug: "ember", tr: "Kor", en: "Ember" },
    { key: "GLACIER", slug: "glacier", tr: "Buzul", en: "Glacier" },
    { key: "GEYSER", slug: "geyser", tr: "Gayzer", en: "Geyser" },
    { key: "CANYON", slug: "canyon", tr: "Kanyon", en: "Canyon" },
    { key: "MEADOW", slug: "meadow", tr: "Çayır", en: "Meadow" },
    { key: "OASIS", slug: "oasis", tr: "Vaha", en: "Oasis" },
    { key: "DUNE", slug: "dune", tr: "Kumul", en: "Dune" },
    { key: "REEF", slug: "reef", tr: "Resif", en: "Reef" },
    { key: "RAVINE", slug: "ravine", tr: "Yarık", en: "Ravine" },
    { key: "SUMMIT", slug: "summit", tr: "Zirve", en: "Summit" },
    { key: "LAGOON", slug: "lagoon", tr: "Lagün", en: "Lagoon" },
    { key: "TUNDRA", slug: "tundra", tr: "Tundra", en: "Tundra" },
    { key: "SAVANNA", slug: "savanna", tr: "Savan", en: "Savanna" },
    { key: "FJORD", slug: "fjord", tr: "Fiyort", en: "Fjord" },
    { key: "GROVE", slug: "grove", tr: "Koru", en: "Grove" },
    { key: "DELTA", slug: "delta", tr: "Delta", en: "Delta" },
    { key: "DUSK", slug: "dusk", tr: "Alacakaranlık", en: "Dusk" },
    { key: "DAWN", slug: "dawn", tr: "Şafak", en: "Dawn" },
    { key: "GLADE", slug: "glade", tr: "Açıklık", en: "Glade" },
    { key: "COVE", slug: "cove", tr: "Koy", en: "Cove" },
    { key: "RAPIDS", slug: "rapids", tr: "Çağlayan", en: "Rapids" },

    // ═══ CELESTIAL & COSMIC ═══
    { key: "NEBULA", slug: "nebula", tr: "Bulutsu", en: "Nebula" },
    { key: "COMET", slug: "comet", tr: "Kuyruklu", en: "Comet" },
    { key: "ECLIPSE", slug: "eclipse", tr: "Tutulma", en: "Eclipse" },
    { key: "METEOR", slug: "meteor", tr: "Meteor", en: "Meteor" },
    { key: "AURORA", slug: "aurora", tr: "Kutup", en: "Aurora" },
    { key: "CONSTELLATION", slug: "constellation", tr: "Takımyıldız", en: "Constellation" },
    { key: "ORBIT", slug: "orbit", tr: "Yörünge", en: "Orbit" },
    { key: "COSMOS", slug: "cosmos", tr: "Kozmos", en: "Cosmos" },
    { key: "GALAXY", slug: "galaxy", tr: "Galaksi", en: "Galaxy" },
    { key: "PULSAR", slug: "pulsar", tr: "Pulsar", en: "Pulsar" },

    // ═══ MYTHOLOGICAL ═══
    { key: "CENTAUR", slug: "centaur", tr: "Kentaur", en: "Centaur" },
    { key: "SPHINX", slug: "sphinx", tr: "Sfenks", en: "Sphinx" },
    { key: "HYDRA", slug: "hydra", tr: "Hidra", en: "Hydra" },
    { key: "PEGASUS", slug: "pegasus", tr: "Pegasus", en: "Pegasus" },
    { key: "CHIMERA", slug: "chimera", tr: "Kimera", en: "Chimera" },
    { key: "GRIFFIN", slug: "griffin", tr: "Grifon", en: "Griffin" },
    { key: "KRAKEN", slug: "kraken", tr: "Kraken", en: "Kraken" },
    { key: "GARGOYLE", slug: "gargoyle", tr: "Çörten", en: "Gargoyle" },
    { key: "MINOTAUR", slug: "minotaur", tr: "Minotaur", en: "Minotaur" },
    { key: "CYCLOPS", slug: "cyclops", tr: "Kiklop", en: "Cyclops" },
    { key: "BASILISK", slug: "basilisk", tr: "Bazilisk", en: "Basilisk" },
    { key: "LEVIATHAN", slug: "leviathan", tr: "Leviatan", en: "Leviathan" },
    { key: "CERBERUS", slug: "cerberus", tr: "Kerberos", en: "Cerberus" },
    { key: "GOLEM", slug: "golem", tr: "Golem", en: "Golem" },
    { key: "FENRIR", slug: "fenrir", tr: "Fenrir", en: "Fenrir" },
    { key: "VALKYRIE", slug: "valkyrie", tr: "Valküre", en: "Valkyrie" },
    { key: "BANSHEE", slug: "banshee", tr: "Banşi", en: "Banshee" },
    { key: "SELKIE", slug: "selkie", tr: "Selki", en: "Selkie" },
    { key: "NYMPH", slug: "nymph", tr: "Nymfa", en: "Nymph" },
    { key: "DJINN", slug: "djinn", tr: "Cin", en: "Djinn" },

    // ═══ BODY & ANATOMY ═══
    { key: "SPINE", slug: "spine", tr: "Omurga", en: "Spine" },
    { key: "LUNG", slug: "lung", tr: "Akciğer", en: "Lung" },
    { key: "LIVER", slug: "liver", tr: "Karaciğer", en: "Liver" },
    { key: "BONE", slug: "bone", tr: "Kemik", en: "Bone" },
    { key: "VEIN", slug: "vein", tr: "Damar", en: "Vein" },
    { key: "MUSCLE", slug: "muscle", tr: "Kas", en: "Muscle" },
    { key: "JAW", slug: "jaw", tr: "Çene", en: "Jaw" },
    { key: "RIB", slug: "rib", tr: "Kaburga", en: "Rib" },
    { key: "SKULL", slug: "skull", tr: "Kafatası", en: "Skull" },
    { key: "PUPIL", slug: "pupil", tr: "Gözbeb", en: "Pupil" },
    { key: "WOMB", slug: "womb", tr: "Rahim", en: "Womb" },
    { key: "TENDON", slug: "tendon", tr: "Tendon", en: "Tendon" },
    { key: "KNUCKLE", slug: "knuckle", tr: "Eklem", en: "Knuckle" },
    { key: "NAVEL", slug: "navel", tr: "Göbek", en: "Navel" },
    { key: "PELVIS", slug: "pelvis", tr: "Pelvis", en: "Pelvis" },
    { key: "EYELID", slug: "eyelid", tr: "Gözkap", en: "Eyelid" },
    { key: "ARTERY", slug: "artery", tr: "Atardamar", en: "Artery" },
    { key: "MARROW", slug: "marrow", tr: "İlik", en: "Marrow" },
    { key: "SCAR", slug: "scar", tr: "Yara", en: "Scar" },
    { key: "WRINKLE", slug: "wrinkle", tr: "Kırışık", en: "Wrinkle" },

    // ═══ ARTIFACTS & OBJECTS ═══
    { key: "QUILL", slug: "quill", tr: "Tüy", en: "Quill" },
    { key: "LOCKET", slug: "locket", tr: "Madalyon", en: "Locket" },
    { key: "PENDULUM", slug: "pendulum", tr: "Sarkaç", en: "Pendulum" },
    { key: "CHALICE", slug: "chalice", tr: "Kadeh", en: "Chalice" },
    { key: "SUNDIAL", slug: "sundial", tr: "Güneşsaati", en: "Sundial" },
    { key: "PRISM", slug: "prism", tr: "Prizma", en: "Prism" },
    { key: "LANTERN", slug: "lantern", tr: "Fener", en: "Lantern" },
    { key: "GOBLET", slug: "goblet", tr: "Kupa", en: "Goblet" },
    { key: "AMULET", slug: "amulet", tr: "Muska", en: "Amulet" },
    { key: "TALISMAN", slug: "talisman", tr: "Tılsım", en: "Talisman" },
    { key: "RUNE", slug: "rune", tr: "Rün", en: "Rune" },
    { key: "SCROLL", slug: "scroll", tr: "Parşömen", en: "Scroll" },
    { key: "COMPASS", slug: "compass", tr: "Pusula", en: "Compass" },
    { key: "TELESCOPE", slug: "telescope", tr: "Teleskop", en: "Telescope" },
    { key: "HOURGLASS", slug: "hourglass", tr: "Kumsaati", en: "Hourglass" },
    { key: "ANVIL", slug: "anvil", tr: "Örs", en: "Anvil" },
    { key: "CRUCIBLE", slug: "crucible", tr: "Pota", en: "Crucible" },
    { key: "LOOM", slug: "loom", tr: "Tezgah", en: "Loom" },
    { key: "SEXTANT", slug: "sextant", tr: "Sekstant", en: "Sextant" },
    { key: "SPINDLE", slug: "spindle", tr: "İğ", en: "Spindle" },
    { key: "BELLOWS", slug: "bellows", tr: "Körük", en: "Bellows" },
    { key: "CAULDRON", slug: "cauldron", tr: "Kazan", en: "Cauldron" },
    { key: "FLUTE", slug: "flute", tr: "Flüt", en: "Flute" },
    { key: "HARP", slug: "harp", tr: "Arp", en: "Harp" },
    { key: "DRUM", slug: "drum", tr: "Davul", en: "Drum" },
    { key: "GONG", slug: "gong", tr: "Gong", en: "Gong" },
    { key: "LYRE", slug: "lyre", tr: "Lir", en: "Lyre" },
    { key: "CENSER", slug: "censer", tr: "Buhurdan", en: "Censer" },
    { key: "MORTAR", slug: "mortar", tr: "Havan", en: "Mortar" },
    { key: "SICKLE", slug: "sickle", tr: "Orak", en: "Sickle" },

    // ═══ WEAPONS & COMBAT ═══
    { key: "SPEAR", slug: "spear", tr: "Mızrak", en: "Spear" },
    { key: "DAGGER", slug: "dagger", tr: "Hançer", en: "Dagger" },
    { key: "MACE", slug: "mace", tr: "Topuz", en: "Mace" },
    { key: "JAVELIN", slug: "javelin", tr: "Cirit", en: "Javelin" },
    { key: "CROSSBOW", slug: "crossbow", tr: "Tatar", en: "Crossbow" },
    { key: "ARMOR", slug: "armor", tr: "Zırh", en: "Armor" },
    { key: "HELMET", slug: "helmet", tr: "Miğfer", en: "Helmet" },
    { key: "QUIVER", slug: "quiver", tr: "Okluk", en: "Quiver" },
    { key: "CATAPULT", slug: "catapult", tr: "Mancınık", en: "Catapult" },
    { key: "TRIDENT", slug: "trident", tr: "Trident", en: "Trident" },

    // ═══ GEMSTONES & MINERALS ═══
    { key: "SAPPHIRE", slug: "sapphire", tr: "Safir", en: "Sapphire" },
    { key: "EMERALD", slug: "emerald", tr: "Zümrüt", en: "Emerald" },
    { key: "RUBY", slug: "ruby", tr: "Yakut", en: "Ruby" },
    { key: "AMETHYST", slug: "amethyst", tr: "Ametist", en: "Amethyst" },
    { key: "TOPAZ", slug: "topaz", tr: "Topaz", en: "Topaz" },
    { key: "ONYX", slug: "onyx", tr: "Oniks", en: "Onyx" },
    { key: "OBSIDIAN", slug: "obsidian", tr: "Obsidyen", en: "Obsidian" },
    { key: "TURQUOISE", slug: "turquoise", tr: "Turkuaz", en: "Turquoise" },
    { key: "OPAL", slug: "opal", tr: "Opal", en: "Opal" },
    { key: "GARNET", slug: "garnet", tr: "Granat", en: "Garnet" },
    { key: "JADE", slug: "jade", tr: "Yeşim", en: "Jade" },
    { key: "AMBER", slug: "amber", tr: "Kehribar", en: "Amber" },
    { key: "QUARTZ", slug: "quartz", tr: "Kuvars", en: "Quartz" },
    { key: "AGATE", slug: "agate", tr: "Akik", en: "Agate" },
    { key: "JASPER", slug: "jasper", tr: "Jasper", en: "Jasper" },
    { key: "LAPIS", slug: "lapis", tr: "Lazurit", en: "Lapis" },
    { key: "MOONSTONE", slug: "moonstone", tr: "Aytaşı", en: "Moonstone" },
    { key: "CORAL_STONE", slug: "coral-stone", tr: "Kırmızımercan", en: "Coral" },
    { key: "MALACHITE", slug: "malachite", tr: "Malahit", en: "Malachite" },
    { key: "CITRINE", slug: "citrine", tr: "Sitrin", en: "Citrine" },

    // ═══ ANIMALS (Extended) ═══
    { key: "HYENA", slug: "hyena", tr: "Sırtlan", en: "Hyena" },
    { key: "RAVEN", slug: "raven", tr: "Kuzgun", en: "Raven" },
    { key: "VULTURE", slug: "vulture", tr: "Akbaba", en: "Vulture" },
    { key: "CHAMELEON", slug: "chameleon", tr: "Bukalemun", en: "Chameleon" },
    { key: "OTTER", slug: "otter", tr: "Samur", en: "Otter" },
    { key: "PELICAN", slug: "pelican", tr: "Pelikan", en: "Pelican" },
    { key: "HEDGEHOG", slug: "hedgehog", tr: "Kirpi", en: "Hedgehog" },
    { key: "ALBATROSS", slug: "albatross", tr: "Albatros", en: "Albatross" },
    { key: "SALAMANDER", slug: "salamander", tr: "Semender", en: "Salamander" },
    { key: "JACKAL", slug: "jackal", tr: "Çakal", en: "Jackal" },
    { key: "CONDOR", slug: "condor", tr: "Kondor", en: "Condor" },
    { key: "VIPER", slug: "viper", tr: "Engerek", en: "Viper" },
    { key: "PIRANHA", slug: "piranha", tr: "Pirana", en: "Piranha" },
    { key: "FIREFLY", slug: "firefly", tr: "Ateşböceği", en: "Firefly" },
    { key: "MANTIS", slug: "mantis", tr: "Peygamberdevesi", en: "Mantis" },
    { key: "COBRA", slug: "cobra", tr: "Kobra", en: "Cobra" },
    { key: "PUMA", slug: "puma", tr: "Puma", en: "Puma" },
    { key: "GAZELLE", slug: "gazelle", tr: "Ceylan", en: "Gazelle" },
    { key: "PANTHER", slug: "panther", tr: "Panter", en: "Panther" },
    { key: "OSPREY", slug: "osprey", tr: "Balıkkartalı", en: "Osprey" },
    { key: "IGUANA", slug: "iguana", tr: "İguana", en: "Iguana" },
    { key: "BADGER", slug: "badger", tr: "Porsuk", en: "Badger" },
    { key: "BISON", slug: "bison", tr: "Bizon", en: "Bison" },
    { key: "MANATEE", slug: "manatee", tr: "Lamantin", en: "Manatee" },
    { key: "NARWHAL", slug: "narwhal", tr: "Narval", en: "Narwhal" },
    { key: "BARRACUDA", slug: "barracuda", tr: "Barakuda", en: "Barracuda" },
    { key: "MOLE", slug: "mole", tr: "Köstebek", en: "Mole" },
    { key: "HERON", slug: "heron", tr: "Balıkçıl", en: "Heron" },
    { key: "LYNX", slug: "lynx", tr: "Vaşak", en: "Lynx" },
    { key: "MOOSE", slug: "moose", tr: "Geyik", en: "Moose" },

    // ═══ PLANTS & FLORA ═══
    { key: "ORCHID", slug: "orchid", tr: "Orkide", en: "Orchid" },
    { key: "LOTUS", slug: "lotus", tr: "Nilüfer", en: "Lotus" },
    { key: "CACTUS", slug: "cactus", tr: "Kaktüs", en: "Cactus" },
    { key: "BAMBOO", slug: "bamboo", tr: "Bambu", en: "Bamboo" },
    { key: "BONSAI", slug: "bonsai", tr: "Bonsai", en: "Bonsai" },
    { key: "IVY", slug: "ivy", tr: "Sarmaşık", en: "Ivy" },
    { key: "THISTLE", slug: "thistle", tr: "Devedikeni", en: "Thistle" },
    { key: "CLOVER", slug: "clover", tr: "Yonca", en: "Clover" },
    { key: "JASMINE", slug: "jasmine", tr: "Yasemin", en: "Jasmine" },
    { key: "LAVENDER", slug: "lavender", tr: "Lavanta", en: "Lavender" },
    { key: "POPPY", slug: "poppy", tr: "Gelincik", en: "Poppy" },
    { key: "WILLOW", slug: "willow", tr: "Söğüt", en: "Willow" },
    { key: "CYPRESS", slug: "cypress", tr: "Selvi", en: "Cypress" },
    { key: "HEMLOCK", slug: "hemlock", tr: "Baldıran", en: "Hemlock" },
    { key: "MAGNOLIA", slug: "magnolia", tr: "Manolya", en: "Magnolia" },
    { key: "NETTLE", slug: "nettle", tr: "Isırgan", en: "Nettle" },
    { key: "MISTLETOE", slug: "mistletoe", tr: "Ökseotu", en: "Mistletoe" },
    { key: "DANDELION", slug: "dandelion", tr: "Karahindiba", en: "Dandelion" },
    { key: "HIBISCUS", slug: "hibiscus", tr: "Amber", en: "Hibiscus" },
    { key: "SYCAMORE", slug: "sycamore", tr: "Çınar", en: "Sycamore" },

    // ═══ WEATHER & ELEMENTS ═══
    { key: "HAIL", slug: "hail", tr: "Dolu", en: "Hail" },
    { key: "FOG", slug: "fog", tr: "Sis", en: "Fog" },
    { key: "FROST", slug: "frost", tr: "Kırağı", en: "Frost" },
    { key: "BLIZZARD", slug: "blizzard", tr: "Tipi", en: "Blizzard" },
    { key: "TYPHOON", slug: "typhoon", tr: "Tayfun", en: "Typhoon" },
    { key: "MIST", slug: "mist", tr: "Pus", en: "Mist" },
    { key: "TEMPEST", slug: "tempest", tr: "Fırtına", en: "Tempest" },
    { key: "DROUGHT", slug: "drought", tr: "Kuraklık", en: "Drought" },
    { key: "GALE", slug: "gale", tr: "Bora", en: "Gale" },
    { key: "MONSOON", slug: "monsoon", tr: "Muson", en: "Monsoon" },

    // ═══ ARCHITECTURE & STRUCTURES ═══
    { key: "MINARET", slug: "minaret", tr: "Minare", en: "Minaret" },
    { key: "DOME", slug: "dome", tr: "Kubbe", en: "Dome" },
    { key: "TURRET", slug: "turret", tr: "Kule", en: "Turret" },
    { key: "CRYPT", slug: "crypt", tr: "Mahzen", en: "Crypt" },
    { key: "VAULT", slug: "vault", tr: "Tonoz", en: "Vault" },
    { key: "OBELISK", slug: "obelisk", tr: "Dikilitaş", en: "Obelisk" },
    { key: "CITADEL", slug: "citadel", tr: "Hisar", en: "Citadel" },
    { key: "DUNGEON", slug: "dungeon", tr: "Zindan", en: "Dungeon" },
    { key: "PARAPET", slug: "parapet", tr: "Parapet", en: "Parapet" },
    { key: "SPIRE", slug: "spire", tr: "Sivri", en: "Spire" },
    { key: "PAVILION", slug: "pavilion", tr: "Köşk", en: "Pavilion" },
    { key: "ALCOVE", slug: "alcove", tr: "Hücre", en: "Alcove" },
    { key: "BASTION", slug: "bastion", tr: "Burç", en: "Bastion" },
    { key: "LABYRINTH", slug: "labyrinth", tr: "Labirent", en: "Labyrinth" },
    { key: "PORTICO", slug: "portico", tr: "Revak", en: "Portico" },

    // ═══ FOOD & DRINK ═══
    { key: "POMEGRANATE", slug: "pomegranate", tr: "Nar", en: "Pomegranate" },
    { key: "FIG", slug: "fig", tr: "İncir", en: "Fig" },
    { key: "OLIVE", slug: "olive", tr: "Zeytin", en: "Olive" },
    { key: "WINE", slug: "wine", tr: "Şarap", en: "Wine" },
    { key: "HONEY", slug: "honey", tr: "Bal", en: "Honey" },
    { key: "BREAD", slug: "bread", tr: "Ekmek", en: "Bread" },
    { key: "SALT", slug: "salt", tr: "Tuz", en: "Salt" },
    { key: "PLUM", slug: "plum", tr: "Erik", en: "Plum" },
    { key: "CHERRY", slug: "cherry", tr: "Kiraz", en: "Cherry" },
    { key: "GRAPE", slug: "grape", tr: "Üzüm", en: "Grape" },
    { key: "ALMOND", slug: "almond", tr: "Badem", en: "Almond" },
    { key: "WALNUT", slug: "walnut", tr: "Ceviz", en: "Walnut" },
    { key: "PEACH", slug: "peach", tr: "Şeftali", en: "Peach" },
    { key: "MELON", slug: "melon", tr: "Kavun", en: "Melon" },
    { key: "QUINCE", slug: "quince", tr: "Ayva", en: "Quince" },

    // ═══ TEXTILES & MATERIALS ═══
    { key: "SILK", slug: "silk", tr: "İpek", en: "Silk" },
    { key: "VELVET", slug: "velvet", tr: "Kadife", en: "Velvet" },
    { key: "LINEN", slug: "linen", tr: "Keten", en: "Linen" },
    { key: "LEATHER", slug: "leather", tr: "Deri", en: "Leather" },
    { key: "LACE", slug: "lace", tr: "Dantel", en: "Lace" },
    { key: "IVORY", slug: "ivory", tr: "Fildişi", en: "Ivory" },
    { key: "PORCELAIN", slug: "porcelain", tr: "Porselen", en: "Porcelain" },
    { key: "PEWTER", slug: "pewter", tr: "Kalay", en: "Pewter" },
    { key: "CLAY", slug: "clay", tr: "Kil", en: "Clay" },
    { key: "WAX", slug: "wax", tr: "Mum", en: "Wax" },

    // ═══ CLOTHING & ADORNMENT ═══
    { key: "VEIL", slug: "veil", tr: "Peçe", en: "Veil" },
    { key: "CLOAK", slug: "cloak", tr: "Pelerin", en: "Cloak" },
    { key: "TIARA", slug: "tiara", tr: "Diadem", en: "Tiara" },
    { key: "BROOCH", slug: "brooch", tr: "Broş", en: "Brooch" },
    { key: "GIRDLE", slug: "girdle", tr: "Kuşak", en: "Girdle" },
    { key: "SANDAL", slug: "sandal", tr: "Sandalet", en: "Sandal" },
    { key: "TURBAN", slug: "turban", tr: "Sarık", en: "Turban" },
    { key: "GAUNTLET", slug: "gauntlet", tr: "Eldiven", en: "Gauntlet" },
    { key: "SHROUD", slug: "shroud", tr: "Kefen", en: "Shroud" },
    { key: "TOGA", slug: "toga", tr: "Toga", en: "Toga" },

    // ═══ ACTIONS & STATES ═══
    { key: "FALLING", slug: "falling", tr: "Düşme", en: "Falling" },
    { key: "FLYING", slug: "flying", tr: "Uçma", en: "Flying" },
    { key: "DROWNING", slug: "drowning", tr: "Boğulma", en: "Drowning" },
    { key: "CLIMBING", slug: "climbing", tr: "Tırmanma", en: "Climbing" },
    { key: "CHASING", slug: "chasing", tr: "Kovalama", en: "Chasing" },
    { key: "HIDING", slug: "hiding", tr: "Saklanma", en: "Hiding" },
    { key: "SINGING", slug: "singing", tr: "Şarkı", en: "Singing" },
    { key: "WEEPING", slug: "weeping", tr: "Ağlama", en: "Weeping" },
    { key: "DANCING", slug: "dancing", tr: "Dans", en: "Dancing" },
    { key: "WANDERING", slug: "wandering", tr: "Gezinme", en: "Wandering" },
    { key: "SWIMMING", slug: "swimming", tr: "Yüzme", en: "Swimming" },
    { key: "DIGGING", slug: "digging", tr: "Kazma", en: "Digging" },
    { key: "BLEEDING", slug: "bleeding", tr: "Kanama", en: "Bleeding" },
    { key: "SCREAMING", slug: "screaming", tr: "Çığlık", en: "Screaming" },
    { key: "WHISPERING", slug: "whispering", tr: "Fısıltı", en: "Whispering" },

    // ═══ PEOPLE & ARCHETYPES ═══
    { key: "ORPHAN", slug: "orphan", tr: "Yetim", en: "Orphan" },
    { key: "SAGE", slug: "sage", tr: "Bilge", en: "Sage" },
    { key: "JESTER", slug: "jester", tr: "Soytarı", en: "Jester" },
    { key: "HERMIT", slug: "hermit", tr: "Münzevi", en: "Hermit" },
    { key: "PILGRIM", slug: "pilgrim", tr: "Hacı", en: "Pilgrim" },
    { key: "SHAMAN", slug: "shaman", tr: "Şaman", en: "Shaman" },
    { key: "ASSASSIN", slug: "assassin", tr: "Suikastçı", en: "Assassin" },
    { key: "NOMAD", slug: "nomad", tr: "Göçebe", en: "Nomad" },
    { key: "SORCERER", slug: "sorcerer", tr: "Büyücü", en: "Sorcerer" },
    { key: "PROPHET", slug: "prophet", tr: "Peygamber", en: "Prophet" },
    { key: "EMPRESS", slug: "empress", tr: "İmparatoriçe", en: "Empress" },
    { key: "WARRIOR", slug: "warrior", tr: "Savaşçı", en: "Warrior" },
    { key: "HEALER", slug: "healer", tr: "Şifacı", en: "Healer" },
    { key: "GUARDIAN", slug: "guardian", tr: "Koruyucu", en: "Guardian" },
    { key: "TRICKSTER", slug: "trickster", tr: "Düzenbaz", en: "Trickster" },

    // ═══ ABSTRACT CONCEPTS ═══
    { key: "VOID", slug: "void", tr: "Boşluk", en: "Void" },
    { key: "INFINITY", slug: "infinity", tr: "Sonsuzluk", en: "Infinity" },
    { key: "CHAOS", slug: "chaos", tr: "Kaos", en: "Chaos" },
    { key: "FATE", slug: "fate", tr: "Kader", en: "Fate" },
    { key: "KARMA", slug: "karma", tr: "Karma", en: "Karma" },
    { key: "PARADOX", slug: "paradox", tr: "Paradoks", en: "Paradox" },
    { key: "ILLUSION", slug: "illusion", tr: "Yanılsama", en: "Illusion" },
    { key: "ETERNITY", slug: "eternity", tr: "Ebediyet", en: "Eternity" },
    { key: "REBIRTH", slug: "rebirth", tr: "Yenidoğuş", en: "Rebirth" },
    { key: "PROPHECY", slug: "prophecy", tr: "Kehanet", en: "Prophecy" },
    { key: "REDEMPTION", slug: "redemption", tr: "Kurtuluş", en: "Redemption" },
    { key: "SACRIFICE", slug: "sacrifice", tr: "Kurban", en: "Sacrifice" },
    { key: "OBLIVION", slug: "oblivion", tr: "Unutuş", en: "Oblivion" },
    { key: "GENESIS", slug: "genesis", tr: "Yaratılış", en: "Genesis" },
    { key: "REVELATION", slug: "revelation", tr: "Vahiy", en: "Revelation" },

    // ═══ SENSES & PERCEPTION ═══
    { key: "ECHO", slug: "echo", tr: "Yankı", en: "Echo" },
    { key: "WHISPER", slug: "whisper", tr: "Fısıltı", en: "Whisper" },
    { key: "SHADOW", slug: "shadow", tr: "Gölge", en: "Shadow" },
    { key: "MIRAGE", slug: "mirage", tr: "Serap", en: "Mirage" },
    { key: "FRAGRANCE", slug: "fragrance", tr: "Koku", en: "Fragrance" },
    { key: "SILENCE", slug: "silence", tr: "Sessizlik", en: "Silence" },
    { key: "VIBRATION", slug: "vibration", tr: "Titreşim", en: "Vibration" },
    { key: "AURA", slug: "aura", tr: "Aura", en: "Aura" },
    { key: "PHANTOM", slug: "phantom", tr: "Hayalet", en: "Phantom" },
    { key: "APPARITION", slug: "apparition", tr: "Görüntü", en: "Apparition" },

    // ═══ COLORS ═══
    { key: "CRIMSON", slug: "crimson", tr: "Kızıl", en: "Crimson" },
    { key: "INDIGO", slug: "indigo", tr: "Çivit", en: "Indigo" },
    { key: "SCARLET", slug: "scarlet", tr: "Al", en: "Scarlet" },
    { key: "AZURE", slug: "azure", tr: "Gökmavisi", en: "Azure" },
    { key: "GOLDEN", slug: "golden", tr: "Altın", en: "Golden" },

    // ═══ MARINE & AQUATIC ═══
    { key: "ANCHOR", slug: "anchor", tr: "Çapa", en: "Anchor" },
    { key: "SHIPWRECK", slug: "shipwreck", tr: "Batık", en: "Shipwreck" },
    { key: "WHIRLPOOL", slug: "whirlpool", tr: "Girdap", en: "Whirlpool" },
    { key: "LIGHTHOUSE", slug: "lighthouse", tr: "Fener", en: "Lighthouse" },
    { key: "SAIL", slug: "sail", tr: "Yelken", en: "Sail" },
    { key: "HARBOR", slug: "harbor", tr: "Liman", en: "Harbor" },
    { key: "TIDE", slug: "tide", tr: "Gelgit", en: "Tide" },
    { key: "SEASHELL", slug: "seashell", tr: "Midye", en: "Seashell" },
    { key: "KELP", slug: "kelp", tr: "Varek", en: "Kelp" },
    { key: "STARFISH", slug: "starfish", tr: "Denizyıldızı", en: "Starfish" },

    // ═══ INSECTS & SMALL CREATURES ═══
    { key: "MOTH", slug: "moth", tr: "Güve", en: "Moth" },
    { key: "BEETLE", slug: "beetle", tr: "Böcek", en: "Beetle" },
    { key: "CICADA", slug: "cicada", tr: "Ağustos", en: "Cicada" },
    { key: "CENTIPEDE", slug: "centipede", tr: "Kırkayak", en: "Centipede" },
    { key: "DRAGONFLY", slug: "dragonfly", tr: "Yusufçuk", en: "Dragonfly" },
    { key: "LEECH", slug: "leech", tr: "Sülük", en: "Leech" },
    { key: "COCOON", slug: "cocoon", tr: "Koza", en: "Cocoon" },
    { key: "LARVA", slug: "larva", tr: "Larva", en: "Larva" },
    { key: "WASP", slug: "wasp", tr: "Eşekarısı", en: "Wasp" },
    { key: "CRICKET", slug: "cricket", tr: "Cırcırböceği", en: "Cricket" },

    // ═══ TIME & SEASONS ═══
    { key: "TWILIGHT", slug: "twilight", tr: "Alacakaranlık", en: "Twilight" },
    { key: "SOLSTICE", slug: "solstice", tr: "Gündönümü", en: "Solstice" },
    { key: "EQUINOX", slug: "equinox", tr: "Ekinoks", en: "Equinox" },
    { key: "MIDNIGHT", slug: "midnight", tr: "Gece", en: "Midnight" },
    { key: "AUTUMN", slug: "autumn", tr: "Sonbahar", en: "Autumn" },

    // ═══ SYMBOLS & SACRED ═══
    { key: "MANDALA", slug: "mandala", tr: "Mandala", en: "Mandala" },
    { key: "ANKH", slug: "ankh", tr: "Ankh", en: "Ankh" },
    { key: "OUROBOROS", slug: "ouroboros", tr: "Uroboros", en: "Ouroboros" },
    { key: "PENTACLE", slug: "pentacle", tr: "Yıldız", en: "Pentacle" },
    { key: "TOTEM", slug: "totem", tr: "Totem", en: "Totem" },
    { key: "SIGIL", slug: "sigil", tr: "Mühür", en: "Sigil" },
    { key: "ALTAR", slug: "altar", tr: "Sunak", en: "Altar" },
    { key: "RELIC", slug: "relic", tr: "Emanet", en: "Relic" },
    { key: "ORACLE", slug: "oracle", tr: "Kahin", en: "Oracle" },
    { key: "SHRINE", slug: "shrine", tr: "Türbe", en: "Shrine" },

    // ═══ HOUSEHOLD & DOMESTIC ═══
    { key: "THRESHOLD", slug: "threshold", tr: "Eşik", en: "Threshold" },
    { key: "HEARTH", slug: "hearth", tr: "Ocak", en: "Hearth" },
    { key: "CRADLE", slug: "cradle", tr: "Beşik", en: "Cradle" },
    { key: "CHIMNEY", slug: "chimney", tr: "Baca", en: "Chimney" },
    { key: "CELLAR", slug: "cellar", tr: "Bodrum", en: "Cellar" },
    { key: "ATTIC", slug: "attic", tr: "Tavan", en: "Attic" },
    { key: "PANTRY", slug: "pantry", tr: "Kiler", en: "Pantry" },
    { key: "BALCONY", slug: "balcony", tr: "Balkon", en: "Balcony" },
    { key: "STAIRCASE", slug: "staircase", tr: "Merdiven", en: "Staircase" },
    { key: "CORRIDOR", slug: "corridor", tr: "Koridor", en: "Corridor" },

    // ═══ TRANSPORTATION ═══
    { key: "CHARIOT", slug: "chariot", tr: "Araba", en: "Chariot" },
    { key: "CANOE", slug: "canoe", tr: "Kano", en: "Canoe" },
    { key: "GONDOLA", slug: "gondola", tr: "Gondol", en: "Gondola" },
    { key: "SLEDGE", slug: "sledge", tr: "Kızak", en: "Sledge" },
    { key: "RAFT", slug: "raft", tr: "Sal", en: "Raft" },

    // ═══ COSMIC EVENTS & PHENOMENA ═══
    { key: "EARTHQUAKE", slug: "earthquake", tr: "Deprem", en: "Earthquake" },
    { key: "AVALANCHE", slug: "avalanche", tr: "Çığ", en: "Avalanche" },
    { key: "TSUNAMI", slug: "tsunami", tr: "Tsunami", en: "Tsunami" },
    { key: "ERUPTION", slug: "eruption", tr: "Patlama", en: "Eruption" },
    { key: "TORNADO", slug: "tornado", tr: "Hortum", en: "Tornado" },

    // ═══ TOOLS & CRAFT ═══
    { key: "CHISEL", slug: "chisel", tr: "Keski", en: "Chisel" },
    { key: "NEEDLE", slug: "needle", tr: "İğne", en: "Needle" },
    { key: "SCISSORS", slug: "scissors", tr: "Makas", en: "Scissors" },
    { key: "THREAD", slug: "thread", tr: "İplik", en: "Thread" },
    { key: "HAMMER", slug: "hammer", tr: "Çekiç", en: "Hammer" },
    { key: "TONGS", slug: "tongs", tr: "Maşa", en: "Tongs" },
    { key: "AWL", slug: "awl", tr: "Bız", en: "Awl" },
    { key: "PLOUGH", slug: "plough", tr: "Saban", en: "Plough" },
    { key: "LATCH", slug: "latch", tr: "Mandal", en: "Latch" },
    { key: "PULLEY", slug: "pulley", tr: "Makara", en: "Pulley" },

    // ═══ RARE CREATURES ═══
    { key: "AXOLOTL", slug: "axolotl", tr: "Aksolotl", en: "Axolotl" },
    { key: "PANGOLIN", slug: "pangolin", tr: "Pangolin", en: "Pangolin" },
    { key: "PLATYPUS", slug: "platypus", tr: "Ornitorenk", en: "Platypus" },
    { key: "TAPIR", slug: "tapir", tr: "Tapir", en: "Tapir" },
    { key: "OKAPI", slug: "okapi", tr: "Okapi", en: "Okapi" },

    // ═══ MUSIC & SOUND ═══
    { key: "CHIME", slug: "chime", tr: "Çan", en: "Chime" },
    { key: "CYMBAL", slug: "cymbal", tr: "Zil", en: "Cymbal" },
    { key: "TAMBOURINE", slug: "tambourine", tr: "Tef", en: "Tambourine" },
    { key: "BAGPIPE", slug: "bagpipe", tr: "Gayda", en: "Bagpipe" },
    { key: "ACCORDION", slug: "accordion", tr: "Akordeon", en: "Accordion" },

    // ═══ WRITING & KNOWLEDGE ═══
    { key: "PAPYRUS", slug: "papyrus", tr: "Papirüs", en: "Papyrus" },
    { key: "GRIMOIRE", slug: "grimoire", tr: "Büyükitabı", en: "Grimoire" },
    { key: "CODEX", slug: "codex", tr: "Kodeks", en: "Codex" },
    { key: "INKWELL", slug: "inkwell", tr: "Hokka", en: "Inkwell" },
    { key: "TABLET", slug: "tablet", tr: "Tablet", en: "Tablet" },

    // ═══ CONTAINERS & VESSELS ═══
    { key: "URN", slug: "urn", tr: "Vazo", en: "Urn" },
    { key: "AMPHORA", slug: "amphora", tr: "Amfora", en: "Amphora" },
    { key: "FLASK", slug: "flask", tr: "Şişe", en: "Flask" },
    { key: "VIAL", slug: "vial", tr: "Flakon", en: "Vial" },
    { key: "CHEST", slug: "chest", tr: "Sandık", en: "Chest" },

    // ═══ SPIRITUAL & ESOTERIC ═══
    { key: "CHAKRA", slug: "chakra", tr: "Çakra", en: "Chakra" },
    { key: "NIRVANA", slug: "nirvana", tr: "Nirvan", en: "Nirvana" },
    { key: "MANTRA", slug: "mantra", tr: "Mantra", en: "Mantra" },
    { key: "SUTRA", slug: "sutra", tr: "Sutra", en: "Sutra" },
    { key: "DHARMA", slug: "dharma", tr: "Dharma", en: "Dharma" },
    { key: "ASTRAL", slug: "astral", tr: "Astral", en: "Astral" },
    { key: "ALCHEMY", slug: "alchemy", tr: "Simya", en: "Alchemy" },
    { key: "ENCHANTMENT", slug: "enchantment", tr: "Büyü", en: "Enchantment" },
    { key: "DIVINATION", slug: "divination", tr: "Kehanet", en: "Divination" },
    { key: "EXORCISM", slug: "exorcism", tr: "Afsun", en: "Exorcism" },

    // ═══ LANDSCAPES & PLACES ═══
    { key: "CEMETERY", slug: "cemetery", tr: "Mezarlık", en: "Cemetery" },
    { key: "MARKETPLACE", slug: "marketplace", tr: "Pazar", en: "Marketplace" },
    { key: "ARENA", slug: "arena", tr: "Arena", en: "Arena" },
    { key: "LIBRARY", slug: "library", tr: "Kütüphane", en: "Library" },
    { key: "MONASTERY", slug: "monastery", tr: "Manastır", en: "Monastery" },
    { key: "RUIN", slug: "ruin", tr: "Harabe", en: "Ruin" },
    { key: "CROSSROADS", slug: "crossroads", tr: "Kavşak", en: "Crossroads" },
    { key: "ABYSS", slug: "abyss", tr: "Uçurum", en: "Abyss" },
    { key: "PINNACLE", slug: "pinnacle", tr: "Doruk", en: "Pinnacle" },
    { key: "HORIZON", slug: "horizon", tr: "Ufuk", en: "Horizon" },
];

module.exports = NEW_SYMBOLS;

// Validation when run directly
if (require.main === module) {
    const d = require('./data/source_dictionary.js');
    const existingKeys = new Set(Object.keys(d));
    const existingSlugs = new Set(Object.keys(d).map(k => k.toLowerCase().replace(/\s+/g, '-').replace(/_/g, '-')));

    let dupes = 0;
    let multiWord = 0;
    const slugSet = new Set();
    const keySet = new Set();

    for (const s of NEW_SYMBOLS) {
        // Check duplicate keys
        if (existingKeys.has(s.key)) { console.log(`⚠️ DUPE KEY: ${s.key}`); dupes++; }
        if (existingSlugs.has(s.slug)) { console.log(`⚠️ DUPE SLUG: ${s.slug}`); dupes++; }

        // Check internal duplicates
        if (keySet.has(s.key)) { console.log(`⚠️ INTERNAL DUPE KEY: ${s.key}`); dupes++; }
        if (slugSet.has(s.slug)) { console.log(`⚠️ INTERNAL DUPE SLUG: ${s.slug}`); dupes++; }
        keySet.add(s.key);
        slugSet.add(s.slug);

        // Check multi-word
        if (s.tr.includes(' ')) { console.log(`⚠️ MULTI-WORD TR: ${s.key} -> "${s.tr}"`); multiWord++; }
        if (s.en.includes(' ')) { console.log(`⚠️ MULTI-WORD EN: ${s.key} -> "${s.en}"`); multiWord++; }
    }

    console.log(`\n=== VALIDATION ===`);
    console.log(`Total symbols: ${NEW_SYMBOLS.length}`);
    console.log(`Unique keys: ${keySet.size}`);
    console.log(`Unique slugs: ${slugSet.size}`);
    console.log(`Duplicates with existing: ${dupes}`);
    console.log(`Multi-word issues: ${multiWord}`);
}
