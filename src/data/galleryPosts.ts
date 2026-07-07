// src/data/galleryPosts.ts
export interface GalleryPostData {
    id: number;
    images: string[];
    username: string | null;
    date: string;
    description: string;
}

export const galleryPosts: GalleryPostData[] = [
    {
        id: 1,
        images: ["/gallery/casa-progreso0.jpeg"],
        username: 'CinnamonGirl',
        date: "2026-07-03T00:00:00Z",
        description: '"Apenas llevo la base"'
    },
    {
        id: 2,
        images: ["/gallery/casa-sofy0.jpeg", "/gallery/casa-sofy1.jpeg"],
        username: "xsofiis",
        date: "2026-07-04T00:00:00Z",
        description: "Casa de Sofy, una de las primeras casas construidas en Cozy Server"
    },
    {
        id: 3,
        images: ["/gallery/prohibición-zonagamer0.jpeg", "/gallery/prohibición-zonagamer1.jpeg"],
        username: "MattCrowley3995",
        date: "2026-07-05T00:00:00Z",
        description: "Prohibición de ZONAGAMER079897 en la zona de xsofiis, se le prohibió el acceso a la zona por romper las reglas del servidor."
    },
    {
        id: 4,
        images: ["/gallery/prohibición-zonagamer2.jpeg", "/gallery/prohibición-zonagamer3.jpeg"],
        username: "Loressy",
        date: "2026-07-05T00:00:00Z",
        description: "Paralelismos cinematográficos entre la prohibición de ZONAGAMER079897 y el meme de Garfield 😺🚫🐈."
    },
    {
        id: 5,
        images: ["/gallery/casa-progreso1.jpeg"],
        username: "CinnamonGirl",
        date: "2026-07-07T00:07:47Z",
        description: "Nomas pude avanzar un poquito ahora"
    },
];