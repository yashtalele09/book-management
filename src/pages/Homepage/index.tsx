import { useEffect, useState, useRef } from "react";
import BookListing from "./components/BookListing";
import Hero from "./components/Hero";
import { getBooks } from "../../services/BookApi";
import { type Book } from "../../types/book";



const Homepage = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");
    const booksRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        fetchBooks();
    }, []);

    useEffect(() => {
        console.log("SEARCH VALUE:", search);
    }, [search]);

    const fetchBooks = async () => {
        try {
            setLoading(true);
            const res = await getBooks();
            setBooks(res.data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };



    return (
        <div className="relative overflow-hidden bg-[#050505] min-h-screen">
            <Hero search={search} setSearch={setSearch} onSearchClick={() => {
                booksRef.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            }} />
            <div ref={booksRef} >
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <BookListing books={books} setBooks={setBooks} search={search} setSearch={setSearch} />
                )}
            </div>
        </div>
    )
}
export default Homepage