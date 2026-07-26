export interface TagConfig {
    value: string;
    name: string;
    icon: string;
    color: string;
}

export const TAG_CATALOG: TagConfig[] = [
    { value: 'buildings', name: 'Construcciones', icon: '🏡', color: 'bg-canvas text-ink-primary' },
    { value: 'decoration', name: 'Decoración', icon: '🎀', color: 'bg-surface text-brand-sage' },
    { value: 'landscapes', name: 'Mundo/Paisaje', icon: '🌻', color: 'bg-canvas text-ink-primary' },
    { value: 'farms', name: 'Granjitas', icon: '🍄', color: 'bg-surface text-brand-sage' },
    { value: 'pets', name: 'Animales', icon: '🐾', color: 'bg-canvas text-ink-primary' },
    { value: 'food', name: 'Comida', icon: '🍰', color: 'bg-surface text-brand-sage' },
    { value: 'aesthetic', name: 'Aesthetic', icon: '✨', color: 'bg-canvas text-ink-primary' },
    { value: 'outfits', name: 'Skins/Outfits', icon: '👗', color: 'bg-surface text-brand-sage' },
    { value: 'moments', name: 'Momentos', icon: '📸', color: 'bg-surface text-brand-sage' }
];