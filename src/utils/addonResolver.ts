// src/utils/addonResolver.ts
import fs from 'node:fs';
import path from 'node:path';
import { generateAddonImageFallback } from './imageUtils';

export function getAddonAssets(id: string) {
    const assetsDir = path.join(process.cwd(), 'public', 'images', id);

    // Función auxiliar para verificar si existe
    const exists = (fileName: string) => fs.existsSync(path.join(assetsDir, fileName));

    return {
        cover: exists(`${id}-cover.jpg`)
            ? `/images/${id}/${id}-cover.jpg`
            : generateAddonImageFallback({ data: { title: id } }),
        gallery: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
            .map(n => ({
                src: `/images/${id}/${id}-screenshot_${n}.jpg`,
                exists: exists(`${id}-screenshot_${n}.jpg`)
            }))
            .filter(item => item.exists)
            .map(item => item.src)
    };
}