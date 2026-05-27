import axios from "axios";
import { type Book } from "../types/book";

const API_URL = "https://6a15993091ff9a63de08771c.mockapi.io/books";


export const getBooks = async () => {
    return await axios.get<Book[]>(API_URL);
};

export const getBookById = async (id: string) => {
    const res = await axios.get<Book>(`${API_URL}/${id}`);
    return res.data;
};

export const createBook = async (data: Book) => {
    return await axios.post<Book>(API_URL, data);
};

export const updateBook = async (id: string, data: Book) => {
    return await axios.put<Book>(`${API_URL}/${id}`, data);
};

export const deleteBook = async (id: string) => {
    return await axios.delete(`${API_URL}/${id}`);
};