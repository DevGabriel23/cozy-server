export interface TagConfig {
    value: string;
    name: string;
    icon: string;
    color: string;
}

export const TAG_CATALOG: TagConfig[] = [
    { value: 'buildings', name: 'Construcciones', icon: '🏡', color: 'bg-canvas text-ink-primary' },
    { value: 'decoration', name: 'Decoración', icon: '🎀', color: 'bg-canvas text-ink-primary' },
    { value: 'landscapes', name: 'Mundo/Paisaje', icon: '🌻', color: 'bg-canvas text-ink-primary' },
    { value: 'farms', name: 'Granjitas', icon: '🍄', color: 'bg-canvas text-ink-primary' },
    { value: 'pets', name: 'Animales', icon: '🐾', color: 'bg-canvas text-ink-primary' },
    { value: 'food', name: 'Comida', icon: '🍰', color: 'bg-canvas text-ink-primary' },
    { value: 'aesthetic', name: 'Aesthetic', icon: '✨', color: 'bg-canvas text-ink-primary' },
    { value: 'outfits', name: 'Skins/Outfits', icon: '👗', color: 'bg-canvas text-ink-primary' },
    { value: 'fun', name: 'Diversión', icon: '🎉', color: 'bg-canvas text-ink-primary' },
    { value: 'moments', name: 'Momentos', icon: '📸', color: 'bg-canvas text-ink-primary' },
];