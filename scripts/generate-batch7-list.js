const fs = require('fs');
const path = require('path');

const batch7List = [
    // Actions / States
    { key: "FREEZING_IN_FEAR", tr: "Korkudan Donakalmak", en: "Freezing in Fear" },
    { key: "WHISPERING_VOICE", tr: "Fısıltı ve Kısık Ses", en: "Whispering Voice" },
    { key: "UNABLE_TO_ESCAPE", tr: "Kaçamamak", en: "Unable to Escape" },
    { key: "DISORIENTATION", tr: "Yönsüzlük ve Kayboluş", en: "Disorientation" },
    { key: "NO_EXIT", tr: "Bulunamayan Çıkış", en: "No Exit" },
    { key: "WRONG_DOOR", tr: "Yanlış Kapı", en: "Wrong Door" },
    { key: "LOCKED_IN", tr: "Kilitli Kalmak", en: "Locked In" },
    { key: "UNCONTROLLED_FLIGHT", tr: "Kontrolsüz Uçuş", en: "Uncontrolled Flight" },
    { key: "DRIFTING_AWAY", tr: "Sürüklenmek", en: "Drifting Away" },
    { key: "SLIPPING_SLIDING", tr: "Kaymak ve Düşmek", en: "Slipping and Sliding" },
    { key: "SINKING", tr: "Batmak", en: "Sinking" },
    { key: "FLOATING_GLIDING", tr: "Süzülmek", en: "Floating / Gliding" },
    { key: "TIME_MOVING_BACKWARDS", tr: "Geri Akan Zaman", en: "Time Moving Backwards" },
    { key: "LOOPING_SCENE", tr: "Tekrarlayan Sahne", en: "Looping Scene" },

    // Modern / Tech
    { key: "ERASED_MEMORY", tr: "Silinmiş Anı", en: "Erased Memory" },
    { key: "FALSE_MEMORY", tr: "Yanlış Hatıra", en: "False Memory" },
    { key: "MIXED_MEMORIES", tr: "Karışan Anılar", en: "Mixed Memories" },
    { key: "DEAD_BATTERY", tr: "Şarjı Biten Telefon", en: "Dead Battery" },
    { key: "BROKEN_SCREEN", tr: "Kırık Ekran", en: "Broken Screen" },
    { key: "WEAK_SIGNAL", tr: "Çekmeyen İnternet", en: "Weak Signal / No Wi-Fi" },
    { key: "FROZEN_CAMERA", tr: "Donan Kamera", en: "Frozen Camera" },
    { key: "LOST_MESSAGE", tr: "Kaybolan Mesaj", en: "Lost Message" },
    { key: "WRONG_MESSAGE_SENT", tr: "Yanlış Kişiye Mesaj", en: "Sent to Wrong Person" },
    { key: "APP_CRASHING", tr: "Açılmayan Uygulama", en: "App Crashing" },
    { key: "LOCKED_SCREEN_PASSWORD", tr: "Kilitli Ekran ve Şifre", en: "Locked Screen / Password" },
    { key: "FORGOT_PASSWORD", tr: "Şifreyi Unutmak", en: "Forgot Password" }
];

const outputPath = path.join(__dirname, 'data', 'batch7_list.json');
fs.writeFileSync(outputPath, JSON.stringify(batch7List, null, 2));

console.log(`Exported ${batch7List.length} items to ${outputPath}`);
