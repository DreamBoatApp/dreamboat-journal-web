import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

export async function GET(
    request: Request,
    { params }: { params: { symbol: string } }
) {
    try {
        const symbol = params.symbol.toLowerCase().trim();

        // Default to English (source of truth), but allow override via query param
        const { searchParams } = new URL(request.url);
        const lang = searchParams.get('lang') || 'en';

        // Construct path to the JSON file
        // Note: In Next.js production, we need to ensure these files are included in the build
        // or accessed via process.cwd() correctly.
        const contentDir = path.join(process.cwd(), 'content', lang, 'meanings');
        let filePath = path.join(contentDir, `${symbol}.json`);

        // Check if file exists in the requested language (default 'en')
        try {
            await fs.access(filePath);
        } catch {
            // FALLBACK: If missing in 'en', check 'tr' as a backup
            // This handles cases where content exists only in Turkish (e.g. "street.json")
            if (lang === 'en') {
                const fallbackPath = path.join(process.cwd(), 'content', 'tr', 'meanings', `${symbol}.json`);
                try {
                    await fs.access(fallbackPath);
                    filePath = fallbackPath;
                } catch {
                    return NextResponse.json(
                        { error: 'Symbol not found' },
                        { status: 404 }
                    );
                }
            } else {
                return NextResponse.json(
                    { error: 'Symbol not found' },
                    { status: 404 }
                );
            }
        }

        // Read and parse the file
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const data = JSON.parse(fileContent);

        // Return the essential data for the App
        return NextResponse.json({
            symbol: symbol,
            title: data.title,
            introduction: data.introduction,
            symbolism: data.symbolism,
            cosmicAnalysis: data.cosmicAnalysis, // Critical for the new UI feature
            // We can add more fields if needed
        }, {
            status: 200,
            headers: {
                // Cache for 1 hour on CDN, 5 minutes locally
                'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=300',
                'Access-Control-Allow-Origin': '*', // Allow App to access this
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
            }
        });

    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}

// Handle OPTIONS for CORS (preflight checks from App)
export async function OPTIONS() {
    return NextResponse.json({}, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
    });
}
