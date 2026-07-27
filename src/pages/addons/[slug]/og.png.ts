// src/pages/addons/[slug]/og.png.ts
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { html } from 'satori-html';
import { getEntry } from 'astro:content';
import { isRecent } from '../../../utils/dateUtils';
import { getAddonAssets } from '../../../utils/addonResolver';

function getEmojiCodePoint(emojiStr: string) {
    return [...emojiStr]
        .map((char) => char.codePointAt(0)?.toString(16))
        .filter(Boolean)
        .join('-');
}

async function getCoverAsset(coverUrl: string | undefined, requestUrl: string) {
    if (!coverUrl?.startsWith('/images/')) {
        return { coverBase64: null, mimeType: 'image/png' };
    }

    try {
        const absoluteUrl = new URL(coverUrl, requestUrl);
        const coverRes = await fetch(absoluteUrl);

        if (!coverRes.ok) {
            console.warn(`No se pudo descargar el cover en SSR: ${absoluteUrl}`);
            return { coverBase64: null, mimeType: 'image/png' };
        }

        const arrayBuffer = await coverRes.arrayBuffer();
        const coverBase64 = Buffer.from(arrayBuffer).toString('base64');
        const mimeType = coverUrl.toLowerCase().endsWith('.jpg') || coverUrl.toLowerCase().endsWith('.jpeg')
            ? 'image/jpeg'
            : 'image/png';

        return { coverBase64, mimeType };
    } catch (error) {
        console.error(`Error procesando el cover:`, error);
        return { coverBase64: null, mimeType: 'image/png' };
    }
}

function buildBadgeHtml(isNew: boolean, isOverlay: boolean) {
    if (!isNew) return '';
    const padding = isOverlay ? '12px 32px' : '8px 24px';
    return `
        <div style="display: flex; align-items: center; background-color: #FEF3C7; color: #92400E; border: 2px solid #FDE68A; padding: ${padding}; border-radius: 9999px; font-size: 32px; font-weight: bold; ${isOverlay ? 'box-shadow: 0 4px 6px rgba(0,0,0,0.1);' : ''}">
            <span style="display: flex; margin-right: ${isOverlay ? '12px' : '10px'};">✨</span>
            <span>Nuevo</span>
        </div>
    `;
}

function generateMarkup(addon: any, isNew: boolean, coverBase64: string | null, mimeType: string) {
    const addonType = addon.data.type || "Addon";

    if (coverBase64) {
        const addonPillMargin = isNew ? '24px' : '0';
        return `
            <div style="display: flex; width: 100%; height: 100%; position: relative; font-family: 'Quicksand';">
                <img src="data:${mimeType};base64,${coverBase64}" style="position: absolute; top: 0; left: 0; width: 1200px; height: 630px; object-fit: cover;" />
                <div style="display: flex; position: absolute; top: 48px; right: 48px;">
                    <div style="display: flex; background-color: #E4E8D6; color: #5C6B43; padding: 12px 32px; border-radius: 9999px; font-size: 32px; font-weight: bold; margin-right: ${addonPillMargin}; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                        ${addonType}
                    </div>
                    ${buildBadgeHtml(isNew, true)}
                </div>
            </div>
        `;
    }

    return `
        <div style="display: flex; flex-direction: column; width: 100%; height: 100%; background-color: #FAF6F0; padding: 96px; justify-content: center; border-top: 20px solid #8A9A5B; font-family: 'Quicksand';">
            <div style="display: flex; align-items: center; margin-bottom: 32px;">
                <div style="display: flex; background-color: #E4E8D6; color: #5C6B43; padding: 8px 24px; border-radius: 9999px; font-size: 32px; font-weight: bold; margin-right: 24px;">
                    ${addonType}
                </div>
                ${buildBadgeHtml(isNew, false)}
            </div>
            <div style="display: flex; font-size: 96px; font-weight: bold; color: #4A4036; margin-bottom: 24px; line-height: 1.1;">
                ${addon.data.title}
            </div>
            <div style="display: flex; font-size: 40px; color: #78716C; margin-top: 16px;">
                por <span style="font-weight: bold; color: #4A4036; margin-left: 12px;">${addon.data.creator}</span>
            </div>
        </div>
    `;
}

export async function GET({ params, request }: { params: any, request: Request }) {
    const { slug } = params;
    const addon = await getEntry('addons', slug);

    if (!addon) {
        return new Response('Addon no encontrado', { status: 404 });
    }

    const isNew = isRecent(addon.data.pubDate);
    const assets = getAddonAssets(addon.id);

    const fontUrl = new URL('/fonts/quicksand.ttf', request.url);
    const fontRes = await fetch(fontUrl);
    const fontQuicksandData = await fontRes.arrayBuffer();

    const { coverBase64, mimeType } = await getCoverAsset(assets.cover, request.url);
    const rawMarkup = generateMarkup(addon, isNew, coverBase64, mimeType);
    const markup = html(rawMarkup);

    const svg = await satori(markup, {
        width: 1200,
        height: 630,
        fonts: [
            {
                name: 'Quicksand',
                data: fontQuicksandData,
                weight: 700,
                style: 'normal',
            }
        ],
        loadAdditionalAsset: async (languageCode, segment) => {
            if (languageCode !== 'emoji') return [];
            const code = getEmojiCodePoint(segment);
            const url = `https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/${code}.svg`;
            const response = await fetch(url);
            const svgText = await response.text();
            return `data:image/svg+xml;base64,${Buffer.from(svgText).toString('base64')}`;
        }
    });

    const resvg = new Resvg(svg, {
        fitTo: { mode: 'width', value: 1200 },
    });

    return new Response(new Uint8Array(resvg.render().asPng()), {
        headers: {
            'Content-Type': 'image/png',
            'Cache-Control': 'public, max-age=3600, s-maxage=3600'
        },
    });
}