import { NextRequest, NextResponse } from 'next/server';
import { logFailedSearch } from '@/lib/logger';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { query, locale, source } = body;

        if (!query) {
            return NextResponse.json({ error: 'Query is required' }, { status: 400 });
        }

        // Log the failed search
        logFailedSearch(query, locale || 'en', source || 'app');

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
