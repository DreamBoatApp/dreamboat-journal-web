'use client';

import { useState, useEffect, useCallback } from 'react';
import { QUIZ_QUESTIONS, DREAM_PROFILES, calculateProfile, type DreamProfile } from '@/lib/quiz-data';

type QuizStage = 'intro' | 'questions' | 'analyzing' | 'result';

export default function QuizClient({ locale }: { locale: string }) {
    const lang = locale === 'tr' ? 'tr' : 'en';
    const [stage, setStage] = useState<QuizStage>('intro');
    const [currentQ, setCurrentQ] = useState(0);
    const [answers, setAnswers] = useState<number[]>([]);
    const [result, setResult] = useState<DreamProfile | null>(null);
    const [analyzeStep, setAnalyzeStep] = useState(0);
    const [copied, setCopied] = useState(false);
    const [animateIn, setAnimateIn] = useState(true);

    const analyzeSteps = lang === 'tr'
        ? ['Rüya frekansın okunuyor...', 'Bilinçaltı haritası çıkarılıyor...', 'Arketipler eşleştiriliyor...', 'Kozmik bağlantılar kuruluyor...', 'Rüya kişiliğin oluşturuluyor...']
        : ['Reading your dream frequency...', 'Mapping the subconscious...', 'Matching archetypes...', 'Establishing cosmic connections...', 'Crafting your dream persona...'];

    const handleStart = () => {
        setStage('questions');
        setAnimateIn(true);
    };

    const handleAnswer = (optionIndex: number) => {
        const newAnswers = [...answers, optionIndex];
        setAnswers(newAnswers);
        setAnimateIn(false);

        setTimeout(() => {
            if (newAnswers.length >= QUIZ_QUESTIONS.length) {
                setStage('analyzing');
                const profile = calculateProfile(newAnswers);
                // simulate cosmic analysis
                let step = 0;
                const interval = setInterval(() => {
                    step++;
                    setAnalyzeStep(step);
                    if (step >= analyzeSteps.length) {
                        clearInterval(interval);
                        setTimeout(() => {
                            setResult(profile);
                            setStage('result');
                        }, 600);
                    }
                }, 800);
            } else {
                setCurrentQ(currentQ + 1);
                setAnimateIn(true);
            }
        }, 300);
    };

    const handleRetake = () => {
        setStage('intro');
        setCurrentQ(0);
        setAnswers([]);
        setResult(null);
        setAnalyzeStep(0);
        setCopied(false);
    };

    const handleShare = useCallback(async () => {
        if (!result) return;
        const name = result.name[lang];
        const tagline = result.tagline[lang];
        const shareText = lang === 'tr'
            ? `${result.emoji} Benim rüya kişiliğim: ${name}\n"${tagline}"\n\nSen de öğren 👇\nhttps://dreamboatjournal.com/tr/quiz`
            : `${result.emoji} My dream personality: ${name}\n"${tagline}"\n\nDiscover yours 👇\nhttps://dreamboatjournal.com/en/quiz`;

        if (navigator.share) {
            try {
                await navigator.share({ text: shareText });
            } catch {
                // user cancelled
            }
        } else {
            await navigator.clipboard.writeText(shareText);
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
        }
    }, [result, lang]);

    // ── Intro Screen ──
    if (stage === 'intro') {
        return (
            <div className="quiz-container">
                <div className="quiz-card intro-card">
                    <div className="quiz-orb" />
                    <span className="quiz-badge">
                        {lang === 'tr' ? '✨ 12 Soru · 2 Dakika' : '✨ 12 Questions · 2 Minutes'}
                    </span>
                    <h1 className="quiz-title">
                        {lang === 'tr' ? 'Her Gece Bir Mesaj Alıyorsun.' : 'You Receive a Message Every Night.'}
                    </h1>
                    <p className="quiz-subtitle">
                        {lang === 'tr'
                            ? 'Uyurken bilinçaltın seninle konuşuyor — sembollerle, sahnelerle, duygularla. Bu test, rüyalarının dilini çözüyor ve sana ait rüya kişiliğini ortaya çıkarıyor.'
                            : 'While you sleep, your subconscious speaks — through symbols, scenes, and emotions. This quiz decodes the hidden language of your dreams and reveals the dreamer within you.'}
                    </p>
                    <button className="quiz-start-btn" onClick={handleStart}>
                        {lang === 'tr' ? 'Teste Başla' : 'Start the Quiz'}
                        <span className="btn-arrow">→</span>
                    </button>
                    <p className="quiz-disclaimer">
                        {lang === 'tr'
                            ? 'Bilimsel değerlendirme değildir. Eğlence ve farkındalık amaçlıdır.'
                            : 'Not a scientific evaluation. For entertainment and awareness only.'}
                    </p>
                </div>
            </div>
        );
    }

    // ── Questions ──
    if (stage === 'questions') {
        const q = QUIZ_QUESTIONS[currentQ];
        const progress = ((currentQ + 1) / QUIZ_QUESTIONS.length) * 100;

        return (
            <div className="quiz-container">
                <div className="quiz-card question-card">
                    {/* Progress */}
                    <div className="quiz-progress-wrapper">
                        <div className="quiz-progress-bar">
                            <div className="quiz-progress-fill" style={{ width: `${progress}%` }} />
                        </div>
                        <span className="quiz-progress-text">
                            {currentQ + 1} / {QUIZ_QUESTIONS.length}
                        </span>
                    </div>

                    {/* Question */}
                    <div className={`quiz-question-area ${animateIn ? 'animate-slide-in' : 'animate-slide-out'}`}>
                        <h2 className="quiz-question">{q.question[lang]}</h2>
                        <div className="quiz-options">
                            {q.options.map((opt, i) => (
                                <button
                                    key={`${q.id}-${i}`}
                                    className="quiz-option"
                                    onClick={() => handleAnswer(i)}
                                >
                                    <span className="option-indicator">{String.fromCharCode(65 + i)}</span>
                                    <span className="option-text">{opt[lang]}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // ── Analyzing ──
    if (stage === 'analyzing') {
        return (
            <div className="quiz-container">
                <div className="quiz-card analyzing-card">
                    <div className="cosmic-spinner">
                        <div className="spinner-ring ring-1" />
                        <div className="spinner-ring ring-2" />
                        <div className="spinner-ring ring-3" />
                        <div className="spinner-core">🌙</div>
                    </div>
                    <div className="analyze-steps">
                        {analyzeSteps.map((step, i) => (
                            <p
                                key={i}
                                className={`analyze-step ${i <= analyzeStep ? 'step-visible' : 'step-hidden'} ${i === analyzeStep ? 'step-active' : ''}`}
                            >
                                {i < analyzeStep ? '✓' : i === analyzeStep ? '◉' : '○'} {step}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // ── Result Screen ──
    if (stage === 'result' && result) {
        return (
            <div className="quiz-container">
                <div className="quiz-card result-card">
                    {/* Header */}
                    <span className="result-label">
                        {lang === 'tr' ? 'SENİN RÜYA KİŞİLİĞİN' : 'YOUR DREAM PERSONALITY'}
                    </span>

                    {/* Profile Icon */}
                    <div className={`result-emoji-ring bg-gradient-to-br ${result.color}`}>
                        <span className="result-emoji">{result.emoji}</span>
                    </div>

                    {/* Name */}
                    <h1 className="result-name">{result.name[lang]}</h1>
                    <p className="result-tagline">{result.tagline[lang]}</p>

                    {/* Traits */}
                    <div className="result-traits">
                        {result.traits[lang].map((trait, i) => (
                            <span key={i} className="trait-badge">
                                {trait}
                            </span>
                        ))}
                    </div>

                    {/* Description */}
                    <div className="result-desc-box">
                        <p className="result-desc">{result.description[lang]}</p>
                    </div>

                    {/* Element */}
                    <div className="result-element">
                        <span>{result.element}</span>
                        <span className="element-label">
                            {lang === 'tr' ? 'Kozmik Element' : 'Cosmic Element'}
                        </span>
                    </div>

                    {/* Actions */}
                    <div className="result-actions">
                        <button className="share-btn" onClick={handleShare}>
                            {copied
                                ? (lang === 'tr' ? '✓ Kopyalandı!' : '✓ Copied!')
                                : (lang === 'tr' ? '📤 Sonucu Paylaş' : '📤 Share Result')}
                        </button>
                        <button className="retake-btn" onClick={handleRetake}>
                            {lang === 'tr' ? '🔄 Testi Tekrarla' : '🔄 Retake Quiz'}
                        </button>
                    </div>

                    {/* App CTA */}
                    <a
                        href="https://onelink.to/dreamboat"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="result-cta"
                    >
                        <span className="cta-icon">🚀</span>
                        <div className="cta-text-wrap">
                            <span className="cta-main">
                                {lang === 'tr' ? "DreamBoat'u İndir" : 'Download DreamBoat'}
                            </span>
                            <span className="cta-sub">
                                {lang === 'tr'
                                    ? 'Rüyalarını kaydet, yapay zeka ile yorumlat'
                                    : 'Record dreams, get AI interpretations'}
                            </span>
                        </div>
                        <span className="cta-arrow">→</span>
                    </a>

                    {/* Disclaimer */}
                    <p className="quiz-disclaimer" style={{ marginTop: '1.5rem' }}>
                        {lang === 'tr'
                            ? 'Bu test bilimsel bir değerlendirme değildir. Eğlence ve farkındalık amaçlıdır.'
                            : 'This quiz is not a scientific evaluation. For entertainment and awareness only.'}
                    </p>
                </div>
            </div>
        );
    }

    return null;
}
