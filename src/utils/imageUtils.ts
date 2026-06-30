// src/utils/imageUtils.ts

const bgColors = ["8A9A5B", "D4A373", "DCE3C8", "E8D3D0"];
const textColors = ["FAF6F0", "4A4036"];

export function generateAddonImageFallback(item: any): string {
    // Si no, generamos el fallback
    const uriEncodedTitle = encodeURIComponent(item.data.title);
    const bgColor = bgColors[Math.floor(Math.random() * bgColors.length)];
    const textColor = textColors[Math.floor(Math.random() * textColors.length)];

    return `https://placehold.co/600x400/${bgColor}/${textColor}?text=${uriEncodedTitle}`;
}