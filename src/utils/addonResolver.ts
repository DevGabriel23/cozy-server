// src/utils/addonResolver.ts
import fs from 'node:fs';
import path from 'node:path';
import { generateAddonImageFallback } from './imageUtils';
const ALLOWED_EXTENSIONS = ['.jpg', '.webp', '.png'];
export function getAddonAssets(id: string) {
    const assetsDir = path.join(process.cwd(), 'public', 'images', id);

    let cover = generateAddonImageFallback({ data: { title: id } });

    for (const ext of ALLOWED_EXTENSIONS) {
        if (fs.existsSync(path.join(assetsDir, `${id}-cover${ext}`))) {
            cover = `/images/${id}/${id}-cover${ext}`;
            break;
        }
    }

    let gallery: string[] = [];

    if (fs.existsSync(assetsDir)) {
        const files = fs.readdirSync(assetsDir);

        const escapeRegExp = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, String.raw`\$&`);
        const extPattern = ALLOWED_EXTENSIONS.map(ext => ext.replace('.', '')).join('|');

        const galleryRegex = new RegExp(String.raw`^${escapeRegExp(id)}-screenshot_(\d+)\.(${extPattern})$`, 'i');

        const matchedFiles = files.filter(file => galleryRegex.test(file));

        matchedFiles.sort((a, b) => {
            const numA = Number.parseInt(galleryRegex.exec(a)?.[1] || '0', 10);
            const numB = Number.parseInt(galleryRegex.exec(b)?.[1] || '0', 10);
            return numA - numB;
        });

        gallery = matchedFiles.map(file => `/images/${id}/${file}`);
    }

    return {
        cover,
        gallery
    };
}