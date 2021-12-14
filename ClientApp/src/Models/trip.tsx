// Typescript interface
export  interface Trip {
    id: string;
    title: string;
    author: string;
    shortDescription: string;
    description: string;
    startDate: Date;
    endDate: Date;
    picCoverUrl: string;
    rating: number;
    location: string;
    cost: number;
    duration: number;
    createdAt: Date;
}