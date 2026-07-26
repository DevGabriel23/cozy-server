// src/data/galleryPosts.ts
export type ResourceType = "image" | "video";

export interface PostResource {
    src: string;
    type: ResourceType;
}

export interface GalleryPostData {
    id: number;
    resources: PostResource[];
    username: string | null;
    date: string;
    description: string;
    tags?: string[];
}

export const galleryPosts: GalleryPostData[] = [
    {
        id: 1,
        resources: [{ src: "/gallery/casa-progreso0.jpeg", type: "image" }],
        username: "CinnamonGirl",
        date: "2026-07-03T00:00:00Z",
        description: "Apenas llevo la base",
        tags: ["buildings"],
    },
    {
        id: 2,
        resources: [
            { src: "/gallery/casa-sofy0.jpeg", type: "image" },
            { src: "/gallery/casa-sofy1.jpeg", type: "image" },
        ],
        username: "xsofiis",
        date: "2026-07-04T00:00:00Z",
        description:
            "Casa de Sofy, una de las primeras casas construidas en Cozy Server",
        tags: ["buildings", "aesthetic"],
    },
    {
        id: 3,
        resources: [
            { src: "/gallery/prohibición-zonagamer0.jpeg", type: "image" },
            { src: "/gallery/prohibición-zonagamer1.jpeg", type: "image" },
        ],
        username: "MattCrowley3995",
        date: "2026-07-05T00:00:00Z",
        description:
            "Prohibición de ZONAGAMER079897 en la zona de xsofiis, se le prohibió el acceso a la zona por romper las reglas del servidor.",
        tags: ["moments"],
    },
    {
        id: 4,
        resources: [
            { src: "/gallery/prohibición-zonagamer2.jpeg", type: "image" },
            { src: "/gallery/prohibición-zonagamer3.jpeg", type: "image" },
        ],
        username: "Loressy",
        date: "2026-07-05T00:00:00Z",
        description:
            "Paralelismos cinematográficos entre la prohibición de ZONAGAMER079897 y el meme de Garfield 😺🚫🐈.",
        tags: ["moments", "aesthetic"],
    },
    {
        id: 5,
        resources: [{ src: "/gallery/casa-progreso1.jpeg", type: "image" }],
        username: "CinnamonGirl",
        date: "2026-07-07T00:07:47Z",
        description: "Nomas pude avanzar un poquito ahora",
        tags: ["buildings"],
    },
    {
        id: 6,
        resources: [
            {
                src: "https://res.cloudinary.com/ddtrthy26/image/upload/v1785101817/1_s46svy.jpg",
                type: "image",
            },
            {
                src: "https://res.cloudinary.com/ddtrthy26/image/upload/v1785101815/2_vsefhl.jpg",
                type: "image",
            },
            {
                src: "https://res.cloudinary.com/ddtrthy26/video/upload/v1785101820/3_j8brj1.mp4",
                type: "video",
            },
            {
                src: "https://res.cloudinary.com/ddtrthy26/image/upload/v1785101815/4_nsvses.jpg",
                type: "image",
            },
            {
                src: "https://res.cloudinary.com/ddtrthy26/video/upload/v1785101816/5_dct6m6.mp4",
                type: "video",
            },
        ],
        username: "Loressy",
        date: "2026-07-25T00:06:16Z",
        description: "Happy GHAST",
        tags: ["moments"],
    },
];
