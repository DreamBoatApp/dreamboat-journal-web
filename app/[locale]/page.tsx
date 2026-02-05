import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';

export default async function HomePage() {
    const t = await getTranslations('HomePage');

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24 text-center">
            <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
                {/* Header or Nav could go here */}
            </div>

            <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-to-br before:from-transparent before:to-blue-700 before:opacity-10 before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-to-t after:from-sky-900 after:via-sky-900 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
                <div className="space-y-6">
                    <h1 className="text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-amber-100 to-amber-400 font-serif">
                        {t('title')}
                    </h1>
                    <p className="text-xl text-slate-400">
                        {t('subtitle')}
                    </p>

                    <div className="mt-8">
                        <input
                            type="text"
                            placeholder={t('searchPlaceholder')}
                            className="w-full max-w-md px-6 py-4 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all"
                        />
                    </div>

                    <div className="mt-8">
                        <button className="px-8 py-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold shadow-lg shadow-amber-500/20 hover:scale-105 transition-transform">
                            {t('cta')}
                        </button>
                    </div>
                </div>
            </div>

            <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left mt-20">
                {/* Feature grid will go here */}
            </div>
        </main>
    );
}
