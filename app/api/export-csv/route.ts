import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const LOCALES = ['tr', 'en', 'es', 'de', 'pt'];
const LOCALE_LABELS: Record<string, string> = {
    tr: 'TR', en: 'EN', es: 'ES', de: 'DE', pt: 'PT'
};

function escapeCsv(value: string): string {
    if (!value) return '';
    // Remove newlines → replace with space, escape quotes
    const cleaned = value.replace(/\r?\n/g, ' ').replace(/\s+/g, ' ').trim();
    if (cleaned.includes(',') || cleaned.includes('"') || cleaned.includes('\n')) {
        return `"${cleaned.replace(/"/g, '""')}"`;
    }
    return cleaned;
}

function getShortDescription(content: Record<string, string>): string {
    // Use definitionSnippet if available, otherwise first sentence of introduction
    if (content.definitionSnippet) return content.definitionSnippet;
    if (content.introduction) {
        const firstSentence = content.introduction.split(/[.!?]/)[0];
        return firstSentence ? firstSentence.trim() + '.' : '';
    }
    return '';
}

function getFullContent(content: Record<string, string>): string {
    const parts = [];
    if (content.introduction) parts.push(content.introduction);
    if (content.symbolism) parts.push(content.symbolism);
    if (content.psychologicalPerspective) parts.push(content.psychologicalPerspective);
    if (content.culturalContext) parts.push(content.culturalContext);
    if (content.cosmicAnalysis) parts.push(content.cosmicAnalysis);
    if (content.commonDreamScenarios) parts.push(content.commonDreamScenarios);
    return parts.join(' ');
}

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const localeParam = searchParams.get('locale'); // optional filter

    const localesToExport = localeParam
        ? [localeParam].filter(l => LOCALES.includes(l))
        : LOCALES;

    const rows: string[] = [];

    // BOM for Excel UTF-8 compatibility + header
    const BOM = '\uFEFF';
    rows.push('Symbol Name,Language,Short Description,Full Content');

    for (const locale of localesToExport) {
        const dir = path.join(process.cwd(), 'content', locale, 'meanings');
        if (!fs.existsSync(dir)) continue;

        const files = fs.readdirSync(dir)
            .filter(f => f.endsWith('.json'))
            .sort();

        for (const file of files) {
            try {
                const raw = fs.readFileSync(path.join(dir, file), 'utf8');
                const content = JSON.parse(raw);

                const symbolName = content.localizedName || content.title || file.replace('.json', '');
                const lang = LOCALE_LABELS[locale] || locale.toUpperCase();
                const shortDesc = getShortDescription(content);
                const fullContent = getFullContent(content);

                rows.push([
                    escapeCsv(symbolName),
                    lang,
                    escapeCsv(shortDesc),
                    escapeCsv(fullContent),
                ].join(','));
            } catch {
                // Skip malformed files
            }
        }
    }

    const csv = BOM + rows.join('\n');
    const filename = localeParam
        ? `dreamboat_symbols_${localeParam}.csv`
        : 'dreamboat_symbols_all.csv';

    return new NextResponse(csv, {
        status: 200,
        headers: {
            'Content-Type': 'text/csv; charset=utf-8',
            'Content-Disposition': `attachment; filename="${filename}"`,
        },
    });
}
