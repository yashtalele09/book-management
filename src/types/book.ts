export interface Book {
    id: string | number;
    title: string;
    author: string;
    genre: string;
    description?: string;
    publicationYear?: number;
    thumbnail?: string;
}