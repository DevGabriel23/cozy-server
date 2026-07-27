// src/pages/addons/[slug]/og.png.ts
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { html } from 'satori-html';
import { getCollection } from 'astro:content';
import { isRecent } from '../../../utils/dateUtils';
import fs from 'node:fs/promises';
import path from 'node:path';
import { getAddonAssets } from '../../../utils/addonResolver';

function getEmojiCodePoint(emojiStr: string) {
    return [...emojiStr]
        .map((char) => char.codePointAt(0)?.toString(16))
        .filter(Boolean)
        .join('-');
}

export async function getStaticPaths() {
    const addons = await getCollection("addons");
    return addons.map((addon) => ({
        params: { slug: addon.id },
        props: { addon },
    }));
}

export async function GET({ props }: { props: any }) {
    const { addon } = props;
    const isNew = isRecent(addon.data.pubDate);

    const assets = getAddonAssets(addon.id);
    const coverUrl = assets.cover;

    // Cargar la fuente principal
    const fontQuicksandPath = path.resolve(process.cwd(), 'public/fonts/quicksand.ttf');
    const fontQuicksandData = await fs.readFile(fontQuicksandPath);

    let coverBase64 = null;
    let mimeType = '';

    // Verificamos si es una imagen real que encontró el for-loop (empieza con /images/) 
    // y no el fallback generado
    if (coverUrl?.startsWith('/images/')) {
        try {
            // Quitamos el slash inicial para que resuelva bien la ruta local
            const coverPath = path.resolve(process.cwd(), 'public', coverUrl.replace(/^\//, ''));
            const coverBuffer = await fs.readFile(coverPath);
            coverBase64 = coverBuffer.toString('base64');
            const lowerPath = coverPath.toLowerCase();

            if (lowerPath.endsWith('.png')) {
                mimeType = 'image/png';
            } else if (lowerPath.endsWith('.webp')) {
                mimeType = 'image/webp';
            } else {
                mimeType = 'image/jpeg';
            }

        } catch (error) {
            console.error(`No se pudo cargar el cover físico para ${addon.id} en la ruta ${coverUrl}:`, error);
        }
    }
    // 2. Renderizado Condicional del HTML
    let rawMarkup = '';

    // Corrección S3358: Uso de if/else y variables independientes para los elementos dinámicos
    if (coverBase64) {
        const addonPillMargin = isNew ? '24px' : '0';
        const newBadgeHtml = isNew ? `
            <div style="display: flex; align-items: center; background-color: #FEF3C7; color: #92400E; border: 2px solid #FDE68A; padding: 12px 32px; border-radius: 9999px; font-size: 32px; font-weight: bold; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                <span style="display: flex; margin-right: 12px;">✨</span>
                <span>Nuevo</span>
            </div>
        ` : "";

        rawMarkup = `
            <div style="display: flex; width: 100%; height: 100%; position: relative; font-family: 'Quicksand';">
                <img src="data:${mimeType};base64,${coverBase64}" style="position: absolute; top: 0; left: 0; width: 1200px; height: 630px; object-fit: cover;" />
                
                <div style="display: flex; position: absolute; top: 48px; right: 48px;">
                    <div style="display: flex; background-color: #E4E8D6; color: #5C6B43; padding: 12px 32px; border-radius: 9999px; font-size: 32px; font-weight: bold; margin-right: ${addonPillMargin}; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                        ${addon.data.type || "Addon"}
                    </div>
                    ${newBadgeHtml}
                </div>
            </div>
        `;
    } else {
        const newBadgeHtml = isNew ? `
            <div style="display: flex; align-items: center; background-color: #FEF3C7; color: #92400E; border: 2px solid #FDE68A; padding: 8px 24px; border-radius: 9999px; font-size: 32px; font-weight: bold;">
                <span style="display: flex; margin-right: 10px;">✨</span>
                <span>Nuevo</span>
            </div>
        ` : "";

        rawMarkup = `
            <div style="display: flex; flex-direction: column; width: 100%; height: 100%; background-color: #FAF6F0; padding: 96px; justify-content: center; border-top: 20px solid #8A9A5B; font-family: 'Quicksand';">
                <div style="display: flex; align-items: center; margin-bottom: 32px;">
                    <div style="display: flex; background-color: #E4E8D6; color: #5C6B43; padding: 8px 24px; border-radius: 9999px; font-size: 32px; font-weight: bold; margin-right: 24px;">
                        ${addon.data.type || "Addon"}
                    </div>
                    ${newBadgeHtml}
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
            if (languageCode === 'emoji') {
                const code = getEmojiCodePoint(segment);
                const url = `https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/${code}.svg`;

                const response = await fetch(url);
                const svgText = await response.text();
                const base64 = Buffer.from(svgText).toString('base64');
                return `data:image/svg+xml;base64,${base64}`;
            }
            return [];
        }
    });

    const resvg = new Resvg(svg, {
        fitTo: { mode: 'width', value: 1200 },
    });

    const pngData = resvg.render().asPng();

    return new Response(new Uint8Array(pngData), {
        headers: {
            'Content-Type': 'image/png',
            'Cache-Control': 'public, max-age=31536000, immutable'
        },
    });
}