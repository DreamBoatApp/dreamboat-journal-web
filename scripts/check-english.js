const fs = require('fs');
const dict = require('./data/source_dictionary.js');

const keys = Object.keys(dict).join(' '); // Huge string of keys

const checks = [
    { tr: "Donmak", en: ["FREEZING", "FROZEN", "ICE"] },
    { tr: "Boğulmak", en: ["DROWNING", "CHOKE"] },
    { tr: "Nefessizlik", en: ["SUFFOCAT", "BREATH"] },
    { tr: "Çığlık", en: ["SCREAM", "YELL", "SHOUT"] },
    { tr: "Fısıltı/Kısık ses", en: ["WHISPER", "VOICE"] },
    { tr: "Kaçamamak", en: ["ESCAPE", "TRAP", "STUCK"] },
    { tr: "Kayıp", en: ["LOST", "MISSING"] },
    { tr: "Yönsüzlük", en: ["DIRECTION", "ORIENT", "COMPASS"] },
    { tr: "Bulunamayan çıkış", en: ["EXIT", "MAZE"] },
    { tr: "Yanlış kapı", en: ["DOOR", "GATE"] },
    { tr: "Kilitlenmek", en: ["LOCK", "KEY"] },
    { tr: "Düşmek", en: ["FALLING", "DROP"] },
    { tr: "Çarpışmak", en: ["CRASH", "COLLISION", "ACCIDENT"] },
    { tr: "Uçmak", en: ["FLYING", "FLIGHT"] },
    { tr: "Kontrolsüz uçuş", en: ["UNCONTROLLED", "FLYING"] },
    { tr: "Sürekli dönmek", en: ["SPIN", "CIRCLE", "ROUND"] },
    { tr: "Sürüklenmek", en: ["DRAG", "PULL"] },
    { tr: "Kaymak", en: ["SLIDE", "SLIP", "SKATE"] },
    { tr: "Batmak", en: ["SINK", "DROWN"] },
    { tr: "Yükselmek", en: ["RISE", "ASCEND", "ELEVAT"] },
    { tr: "Süzülmek", en: ["FLOAT", "GLIDE", "SOAR"] },
    { tr: "Saat", en: ["CLOCK", "WATCH", "TIME"] },
    { tr: "Duran saat", en: ["STOPPED", "TIME"] },
    { tr: "Geri akan zaman", en: ["BACKWARD", "REVERSE"] },
    { tr: "Tekrarlayan sahne", en: ["LOOP", "REPEAT", "RECUR"] },
    { tr: "Unutmak/Hatırlayamamak", en: ["FORGET", "MEMORY", "REMEMBER"] },
    { tr: "Silinmiş/Yanlış/Karışan Anı", en: ["MEMORY", "ERASE", "FALSE"] },
    { tr: "Boş Telefon/Kırık Ekran/Şarj", en: ["PHONE", "SCREEN", "BATTERY", "CHARGE"] },
    { tr: "İnternet/Kamera/Mesaj", en: ["INTERNET", "WIFI", "SIGNAL", "CAMERA", "MESSAGE", "TEXT"] },
    { tr: "Uygulama/Kilit/Şifre", en: ["APP", "APPLICATION", "PASSWORD", "CODE"] },
];

console.log("--- ENGLISH KEY CHECK ---");
checks.forEach(c => {
    const hits = c.en.filter(word => keys.includes(word));
    // keys.includes(word) checks if word is a substring of the huge key string? 
    // No, includes checks if array has element? 
    // Join returns string. String.includes checks substring.
    // This is good for partial matches like "FALLING" in "TEETH_FALLING_OUT"

    // Let's rely on substring matching against the full key list string for breadth
    // But be careful of partials like "APP" in "APPLE".
    // Better to filter the keys array.

    const realHits = [];
    c.en.forEach(word => {
        const matchingKeys = Object.keys(dict).filter(k => k.includes(word));
        if (matchingKeys.length > 0) {
            realHits.push(`${word} -> [${matchingKeys.slice(0, 3).join(', ')}...]`);
        }
    });

    if (realHits.length > 0) {
        console.log(`✅ ${c.tr}: Found matches for ${realHits.join(' | ')}`);
    } else {
        console.log(`❌ ${c.tr}: No matches found for ${c.en.join(', ')}`);
    }
});
