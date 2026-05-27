import { useEffect, useMemo, useState } from "react";
import { Search, Filter, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BookCard from "./BookCard";
import AddBookModal from "../../../components/AddUpdatePanel";
import { createBook, updateBook, deleteBook } from "../../../services/BookApi";
import { type Book } from "../../../types/book";
import DeleteWarningModal from "../../../components/DeleteWarning";
import toast from "react-hot-toast";


const BookListing = ({
    books,
    setBooks,
    search,
    setSearch
}: {
    books: Book[];
    setBooks: React.Dispatch<React.SetStateAction<Book[]>>;
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
}) => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [isAddBookOpen, setIsAddBookOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [deleteId, setDeleteId] = useState<string | number | null>(null);
    const [deleteTitle, setDeleteTitle] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Filter by field (first dropdown)
    const [filterBy, setFilterBy] = useState<
        "title" | "author" | "genre" | "publicationYear"
    >("title");

    // Selected value from second dropdown (e.g. a specific author/genre/year)
    const [filterValue, setFilterValue] = useState<string>("");

    const ITEMS_PER_PAGE = 8;

    // ✅ Dynamically compute unique values for the second dropdown based on filterBy
    const filterOptions = useMemo(() => {
        const values = books.map((book) => {
            if (filterBy === "title") return book.title;
            if (filterBy === "author") return book.author;
            if (filterBy === "genre") return book.genre;
            return String(book.publicationYear);
        });
        return [...new Set(values)].sort();
    }, [books, filterBy]);

    // ✅ Filter logic: search is independent, second dropdown filters by selected value
    const filteredBooks = useMemo(() => {
        return books.filter((book) => {
            // Search is always independent — searches across title, author, genre
            const query = search.toLowerCase().trim();
            const matchesSearch =
                query === "" ||
                book.title.toLowerCase().includes(query) ||
                book.author.toLowerCase().includes(query) ||
                book.genre.toLowerCase().includes(query) ||
                String(book.publicationYear).includes(query);

            // Second dropdown filters by the selected field value
            const fieldValue =
                filterBy === "title"
                    ? book.title
                    : filterBy === "author"
                        ? book.author
                        : filterBy === "genre"
                            ? book.genre
                            : String(book.publicationYear);

            const matchesFilter =
                filterValue === "" || fieldValue === filterValue;

            return matchesSearch && matchesFilter;
        });
    }, [books, search, filterBy, filterValue]);

    const totalPages = Math.ceil(filteredBooks.length / ITEMS_PER_PAGE);

    const paginatedBooks = filteredBooks.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const handleEdit = (book: Book) => {
        setSelectedBook(book);
        setIsEditMode(true);
        setIsAddBookOpen(true);
    };

    const handleDelete = (book: Book) => {
        setDeleteId(book.id);
        setDeleteTitle(book.title);
        setIsDeleteOpen(true);
    };

    const handleViewDetails = (book: Book) => {
        navigate(`/book/${book.id}`, { state: { book } });
    };

    const handleSubmitBook = async (bookData: any) => {
        try {
            setIsSubmitting(true);
            const payload = {
                ...bookData,
                publicationYear: Number(bookData.publicationYear),
            };

            if (isEditMode && selectedBook) {
                const res = await updateBook(String(selectedBook.id), payload);
                setBooks((prev) =>
                    prev.map((b) => b.id === selectedBook.id ? res.data : b)
                );
                toast.success("Book updated successfully");
            } else {
                const res = await createBook(payload);
                setBooks((prev) => [res.data, ...prev]);
                toast.success("Book added successfully");
            }

            setIsAddBookOpen(false);
            setIsEditMode(false);
            setSelectedBook(null);
        } catch (err) {
            console.log(err);
            toast.error("Something went wrong!");
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [search, filterBy, filterValue]);

    const confirmDelete = async () => {
        try {
            if (!deleteId) return;
            await deleteBook(String(deleteId));
            setBooks((prev) => prev.filter((b) => b.id !== deleteId));
            setIsDeleteOpen(false);
            setDeleteId(null);
            setDeleteTitle("");
            toast.success("Book deleted successfully");
        } catch (err) {
            console.log("Delete error:", err);
            toast.error("Failed to delete book!");
        }
    };

    // ✅ When first dropdown changes, reset second dropdown value
    const handleFilterByChange = (value: "title" | "author" | "genre" | "publicationYear") => {
        setFilterBy(value);
        setFilterValue(""); // reset second dropdown
        setCurrentPage(1);
    };

    // Label for second dropdown placeholder based on filterBy
    const secondDropdownLabel = {
        title: "All Titles",
        author: "All Authors",
        genre: "All Genres",
        publicationYear: "All Years",
    }[filterBy];

    return (
        <section
            className="relative overflow-hidden py-20"
            style={{
                background:
                    "linear-gradient(180deg,#020617 0%,#0f172a 40%,#082f49 100%)",
            }}
        >
            <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full" />

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
                <div className="mb-12">
                    <div className="flex items-center gap-3 mb-5">
                        <span className="h-px w-8 bg-amber-400" />
                        <span className="text-amber-400 text-xs font-semibold tracking-[0.2em] uppercase">
                            Library Dashboard
                        </span>
                    </div>

                    <h3
                        className="font-bold text-white leading-tight mb-4"
                        style={{
                            fontSize: "clamp(1.5rem,2vw,2.2rem)",
                            fontFamily: "'Georgia', 'Times New Roman', serif",
                            letterSpacing: "-0.02em",
                        }}
                    >
                        Explore Your{" "}
                        <span
                            style={{
                                background: "linear-gradient(90deg,#fbbf24,#f59e0b)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            Book Collection
                        </span>
                    </h3>
                </div>

                <div
                    className="relative overflow-hidden rounded-3xl p-6 mb-10"
                    style={{
                        background:
                            "linear-gradient(135deg, rgba(15,23,42,0.95) 0%, rgba(12,34,56,0.92) 100%)",
                        backdropFilter: "blur(24px)",
                        WebkitBackdropFilter: "blur(24px)",
                        border: "1px solid rgba(56,189,248,0.15)",
                        boxShadow:
                            "0 10px 40px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04)",
                    }}
                >
                    <div className="absolute top-0 left-0 w-40 h-40 bg-cyan-500/10 blur-3xl rounded-full" />
                    <div className="absolute bottom-0 right-0 w-40 h-40 bg-blue-600/10 blur-3xl rounded-full" />

                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="h-px w-8 bg-amber-400" />
                            <span className="text-amber-400 text-xs font-semibold uppercase tracking-[0.2em]">
                                Search & Filter Books
                            </span>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px_220px_180px] gap-5">

                            {/* ✅ Search — fully independent */}
                            <div
                                className="relative flex items-center"
                                style={{
                                    background: "rgba(255,255,255,0.04)",
                                    border: "1px solid rgba(34,211,238,0.25)",
                                    borderRadius: "999px",
                                    backdropFilter: "blur(20px)",
                                }}
                            >
                                <Search size={22} className="absolute left-5 text-cyan-400" />
                                <input
                                    type="text"
                                    placeholder="Search title, author, genre..."
                                    value={search}
                                    onChange={(e) => {
                                        setSearch(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                    className="w-full bg-transparent pl-14 pr-5 py-4 text-white placeholder-slate-400 outline-none"
                                />
                            </div>

                            {/* ✅ First dropdown — pick which field to filter by */}
                            <div
                                className="relative"
                                style={{
                                    background: "rgba(255,255,255,0.04)",
                                    border: "1px solid rgba(34,211,238,0.25)",
                                    borderRadius: "16px",
                                    backdropFilter: "blur(20px)",
                                }}
                            >
                                <Filter
                                    size={18}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400"
                                />
                                <select
                                    value={filterBy}
                                    onChange={(e) =>
                                        handleFilterByChange(
                                            e.target.value as
                                            | "title"
                                            | "author"
                                            | "genre"
                                            | "publicationYear"
                                        )
                                    }
                                    className="w-full bg-transparent pl-11 pr-4 py-4 text-white outline-none appearance-none"
                                >
                                    <option value="title" className="bg-slate-900">Filter by Title</option>
                                    <option value="author" className="bg-slate-900">Filter by Author</option>
                                    <option value="genre" className="bg-slate-900">Filter by Genre</option>
                                    <option value="publicationYear" className="bg-slate-900">Filter by Year</option>
                                </select>
                            </div>

                            {/* ✅ Second dropdown — shows unique values based on first dropdown */}
                            <div
                                className="relative"
                                style={{
                                    background: "rgba(255,255,255,0.04)",
                                    border: "1px solid rgba(34,211,238,0.25)",
                                    borderRadius: "16px",
                                    backdropFilter: "blur(20px)",
                                }}
                            >
                                <Filter
                                    size={18}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400"
                                />
                                <select
                                    value={filterValue}
                                    onChange={(e) => {
                                        setFilterValue(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                    className="w-full bg-transparent pl-11 pr-4 py-4 text-white outline-none appearance-none"
                                >
                                    <option value="" className="bg-slate-900">
                                        {secondDropdownLabel}
                                    </option>
                                    {filterOptions.map((option) => (
                                        <option
                                            key={option}
                                            value={option}
                                            className="bg-slate-900"
                                        >
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Add Book Button */}
                            <div className="flex items-center">
                                <button
                                    onClick={() => {
                                        setIsAddBookOpen(true);
                                        setIsEditMode(false);
                                        setSelectedBook(null);
                                    }}
                                    className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl text-white font-semibold transition-all duration-300 hover:scale-[1.02]"
                                    style={{
                                        background: "linear-gradient(135deg,#06b6d4,#2563eb)",
                                        boxShadow: "0 10px 30px rgba(37,99,235,0.35)",
                                    }}
                                >
                                    <Plus size={18} />
                                    Add Book
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between mb-8">
                    <p className="text-slate-400">
                        Showing{" "}
                        <span className="font-bold text-cyan-400">{paginatedBooks.length}</span>{" "}
                        of{" "}
                        <span className="font-bold text-cyan-400">{filteredBooks.length}</span>{" "}
                        books
                    </p>
                </div>

                {filteredBooks.length > 0 ? (
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {paginatedBooks.map((book) => (
                            <BookCard
                                key={book.id}
                                book={book}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                                onViewDetails={handleViewDetails}
                            />
                        ))}
                    </div>
                ) : (
                    <div
                        className="text-center py-20 rounded-3xl"
                        style={{
                            background: "rgba(255,255,255,0.03)",
                            border: "1px solid rgba(255,255,255,0.08)",
                            backdropFilter: "blur(20px)",
                        }}
                    >
                        <h3 className="text-2xl font-bold text-white mb-3">No Books Found</h3>
                        <p className="text-slate-400">
                            Try changing your search keywords or filter.
                        </p>
                    </div>
                )}
            </div>

            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-12 flex-wrap">
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 rounded-xl text-white disabled:opacity-40"
                        style={{
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(34,211,238,0.2)",
                        }}
                    >
                        Previous
                    </button>

                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentPage(index + 1)}
                            className="w-10 h-10 rounded-xl text-white font-medium"
                            style={{
                                background:
                                    currentPage === index + 1
                                        ? "linear-gradient(135deg,#06b6d4,#2563eb)"
                                        : "rgba(255,255,255,0.05)",
                                border: "1px solid rgba(34,211,238,0.2)",
                            }}
                        >
                            {index + 1}
                        </button>
                    ))}

                    <button
                        onClick={() =>
                            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                        }
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 rounded-xl text-white disabled:opacity-40"
                        style={{
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(34,211,238,0.2)",
                        }}
                    >
                        Next
                    </button>
                </div>
            )}

            <AddBookModal
                isOpen={isAddBookOpen}
                onClose={() => {
                    setIsAddBookOpen(false);
                    setSelectedBook(null);
                    setIsEditMode(false);
                }}
                onSubmit={handleSubmitBook}
                editBook={isEditMode ? selectedBook : null}
                isLoading={isSubmitting}
            />

            <DeleteWarningModal
                isOpen={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                onConfirm={confirmDelete}
                bookTitle={deleteTitle}
            />
        </section>
    );
};

export default BookListing;