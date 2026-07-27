import { users } from "./users";

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
        username: getUsernameById(1),
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
        username: getUsernameById(2),
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
        username: getUsernameById(3),
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
        username: getUsernameById(4),
        date: "2026-07-05T00:00:00Z",
        description:
            "Paralelismos cinematográficos entre la prohibición de ZONAGAMER079897 y el meme de Garfield 😺🚫🐈.",
        tags: ["moments", "aesthetic"],
    },
    {
        id: 5,
        resources: [{ src: "/gallery/casa-progreso1.jpeg", type: "image" }],
        username: getUsernameById(1),
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
        username: getUsernameById(4),
        date: "2026-07-25T00:06:16Z",
        description: "Happy GHAST",
        tags: ["moments"],
    },
    {
        id: 7,
        resources: [{ src: "https://res.cloudinary.com/ddtrthy26/image/upload/v1785111894/post0-1_xnr4gk.jpg", type: "image" }],
        username: getUsernameById(2),
        date: "2026-07-08T03:45:00Z",
        description: "⛏️",
        tags: ["buildings"],
    },
    {
        id: 8,
        resources: [{ src: "https://res.cloudinary.com/ddtrthy26/image/upload/v1785111998/post0-1_euhypa.jpg", type: "image" }],
        username: getUsernameById(3),
        date: "2026-07-08T04:11:00Z",
        description: "mueren muchos niños en este lugar",
        tags: ["fun"],
    },
    {
        id: 9,
        resources: [{ src: "https://res.cloudinary.com/ddtrthy26/image/upload/v1785112010/post1-1_ixmn6c.jpg", type: "image" }],
        username: getUsernameById(3),
        date: "2026-07-08T04:12:00Z",
        description: `Y este especimen tan unico? @${getUsernameById(2)}`,
        tags: ["fun"],
    },
    {
        id: 10,
        resources: [{ src: "https://res.cloudinary.com/ddtrthy26/image/upload/v1785111944/post1-1_ijepvh.jpg", type: "image" }],
        username: getUsernameById(2),
        date: "2026-07-09T08:26:00Z",
        description: "motomami 🏍️",
        tags: ["fun"],
    },
    {
        id: 11,
        resources: [{ src: "https://res.cloudinary.com/ddtrthy26/image/upload/v1785112171/post2-1_c6sn81.jpg", type: "image" }],
        username: getUsernameById(2),
        date: "2026-07-09T08:26:00Z",
        description: "🚿",
        tags: ["fun"],
    },
    {
        id: 12,
        resources: [{ src: "https://res.cloudinary.com/ddtrthy26/image/upload/v1785112217/nullpost0-1_zuxc8c.jpg", type: "image" }],
        username: getUsernameById(7),
        date: "2026-07-08T03:45:00Z",
        description: "habemus portal",
        tags: ["buildings"],
    },
    {
        id: 13,
        resources: [{ src: "https://res.cloudinary.com/ddtrthy26/image/upload/v1785112020/post2-1_jdhsar.jpg", type: "image" }],
        username: getUsernameById(3),
        date: "2026-07-10T12:28:00Z",
        description: "🛵",
        tags: ["buildings"],
    },
    {
        id: 14,
        resources: [{ src: "https://res.cloudinary.com/ddtrthy26/image/upload/v1785112232/nullpost1-1_xekxeb.jpg", type: "image" }],
        username: getUsernameById(7),
        date: "2026-07-10T04:36:00Z",
        description: "al q se le antoje comida ya hay cafeteria",
        tags: ["buildings", "decoration", "food"],
    },
    {
        id: 15,
        resources: [{ src: "https://res.cloudinary.com/ddtrthy26/image/upload/v1785112320/post2-1_a8r8q6.jpg", type: "image" }],
        username: getUsernameById(6),
        date: "2026-07-12T22:18:00Z",
        description: "con una chingada, a que hora va salir mi pedido",
        tags: ["fun"],
    },
    {
        id: 16,
        resources: [{ src: "https://res.cloudinary.com/ddtrthy26/image/upload/v1785112405/post3-1_zxl7md.jpg", type: "image" }],
        username: getUsernameById(2),
        date: "2026-07-12T21:36:00Z",
        description: `@${getUsernameById(6)} captado en cámara`,
        tags: ["fun"],
    },
    {
        id: 17,
        resources: [{ src: "https://res.cloudinary.com/ddtrthy26/image/upload/v1785112030/post3-1_keh93x.jpg", type: "image" }],
        username: getUsernameById(3),
        date: "2026-07-13T01:06:00Z",
        description: `lore acaba de crear una familia de gatos gordos @${getUsernameById(4)}`,
        tags: ["fun", "pets"],
    },
];

function getUsernameById(id: number): string | null {
    return users.find((user) => user.id === id)?.name || null;
}

