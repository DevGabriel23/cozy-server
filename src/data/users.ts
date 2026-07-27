// src/data/users.ts
export interface Users {
    id: number;
    name: string;
    gamertag?: string;
}

export const users: Users[] = [
    { id: 1, name: "CinnamonGirl" },
    { id: 2, name: "xsofiis" },
    { id: 3, name: "MattCrowley3995" },
    { id: 4, name: "Loressy" },
    { id: 5, name: "ZONAGAMER079897" },
    { id: 6, name: "Dios", gamertag: "Rehin6510" },
]