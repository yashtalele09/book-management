import { useNavigate } from "react-router-dom";
import { ArrowLeft, User, Calendar, Tag, Pencil, Trash2 } from "lucide-react";
import InfoItem from "./components/InfoItem";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBookById } from "../../services/BookApi";
import { type Book } from "../../types/book";
import AddBookModal from "../../components/AddUpdatePanel";
import DeleteWarningModal from "../../components/DeleteWarning";
import { updateBook, deleteBook } from "../../services/BookApi";
import Loading from "../../components/Loading";


const BookDetails = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    const [book, setBook] = useState<Book | null>(null);
    const [loading, setLoading] = useState(true);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                if (!id) return;
                const data = await getBookById(id);
                setBook(data);

            } catch (err) {
                console.log("Error fetching book:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchBook();
    }, [id]);

    const handleUpdate = async (bookData: any) => {
        try {
            const payload = {
                ...bookData,
                publicationYear: Number(bookData.publicationYear),
            };

            const res = await updateBook(String(book!.id), payload);

            setBook(res.data); // update current page UI
            setIsEditOpen(false);
        } catch (err) {
            console.log(err);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteBook(String(book!.id));

            navigate("/"); // go back to list after delete
        } catch (err) {
            console.log(err);
        }
    };

    if (loading) {
        return (
            <Loading />
        );
    }

    if (!book) {
        return (
            <div className="min-h-screen py-16 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-white">Book not found</h1>
                    <button
                        onClick={() => navigate(-1)}
                        className="mt-4 px-6 py-3 rounded-xl flex items-center gap-2 text-white font-medium bg-cyan-500 hover:bg-cyan-600 transition"
                    >
                        <ArrowLeft size={18} />
                        Back to Library
                    </button>
                </div>
            </div>
        );
    }

    return (
        <section
            className="min-h-screen py-16"
            style={{
                background:
                    "linear-gradient(180deg,#020617 0%,#0f172a 50%,#082f49 100%)",
            }}
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-10">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-8 transition"
                >
                    <ArrowLeft size={18} />
                    Back to Library
                </button>

                {/* Main Card */}
                <div
                    className="rounded-3xl overflow-hidden"
                    style={{
                        background:
                            "linear-gradient(135deg, rgba(15,23,42,.95) 0%, rgba(12,34,56,.92) 100%)",
                        border:
                            "1px solid rgba(34,211,238,.15)",
                        backdropFilter: "blur(20px)",
                        boxShadow:
                            "0 15px 50px rgba(0,0,0,.4)",
                    }}
                >
                    <div className="grid lg:grid-cols-[420px_1fr] gap-10 p-8 lg:p-12">
                        {/* Book Image */}
                        <div>
                            <div
                                className="overflow-hidden rounded-3xl"
                                style={{
                                    border:
                                        "1px solid rgba(255,255,255,.08)",
                                }}
                            >
                                <img
                                    src={
                                        book?.thumbnail ||
                                        "https://placehold.co/600x900"
                                    }
                                    alt={book?.title || "Book Cover"}
                                    className="w-full h-[600px] object-cover"
                                />
                            </div>
                        </div>

                        {/* Content */}
                        <div>
                            <span
                                className="inline-flex px-4 py-2 rounded-full text-sm font-medium mb-5"
                                style={{
                                    background:
                                        "rgba(34,211,238,.15)",
                                    color: "#22d3ee",
                                }}
                            >
                                {book?.genre || "Unknown Genre"}
                            </span>

                            <h1
                                className="font-bold text-white mb-4 leading-tight"
                                style={{
                                    fontSize:
                                        "clamp(2rem,4vw,4rem)",
                                }}
                            >
                                {book?.title || "Untitled Book"}
                            </h1>

                            <div className="flex items-center gap-3 text-slate-300 mb-6">
                                <User size={18} />
                                <span>{book?.author || "Unknown Author"}</span>
                            </div>

                            <div className="flex flex-wrap gap-5 mb-8">
                                <div className="flex items-center gap-2 text-slate-400">
                                    <Calendar size={18} />
                                    {book?.publicationYear || "Unknown Year"}
                                </div>

                                <div className="flex items-center gap-2 text-slate-400">
                                    <Tag size={18} />
                                    {book?.genre || "Unknown Genre"}
                                </div>

                            </div>

                            <div
                                className="rounded-2xl p-6 mb-8"
                                style={{
                                    background:
                                        "rgba(255,255,255,.03)",
                                    border:
                                        "1px solid rgba(255,255,255,.06)",
                                }}
                            >
                                <h3 className="text-white font-semibold text-xl mb-4">
                                    About This Book
                                </h3>

                                <p className="text-slate-400 leading-8">
                                    {book?.description || "No description available"}
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-4">
                                <button
                                    onClick={() => setIsEditOpen(true)}
                                    className="px-6 py-3 rounded-xl flex items-center gap-2 text-white font-medium"
                                    style={{
                                        background:
                                            "linear-gradient(135deg,#06b6d4,#2563eb)",
                                    }}
                                >
                                    <Pencil size={18} />
                                    Edit Book
                                </button>

                                <button
                                    onClick={() => setIsDeleteOpen(true)}
                                    className="px-6 py-3 rounded-xl flex items-center gap-2 text-white font-medium bg-red-500 hover:bg-red-600 transition"
                                >
                                    <Trash2 size={18} />
                                    Delete Book
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional Information */}
                <div
                    className="mt-10 rounded-3xl p-8"
                    style={{
                        background:
                            "rgba(255,255,255,.03)",
                        border:
                            "1px solid rgba(255,255,255,.08)",
                    }}
                >
                    <h2 className="text-white text-2xl font-bold mb-6">
                        Book Information
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        <InfoItem
                            label="Title"
                            value={book?.title || "Untitled Book"}
                        />

                        <InfoItem
                            label="Author"
                            value={book?.author || "Unknown Author"}
                        />

                        <InfoItem
                            label="Genre"
                            value={book?.genre || "Unknown Genre"}
                        />

                        <InfoItem
                            label="Publication Year"
                            value={String(
                                book?.publicationYear || "Unknown Year"
                            )}
                        />
                    </div>
                </div>
            </div>
            <AddBookModal
                isOpen={isEditOpen}
                onClose={() => setIsEditOpen(false)}
                onSubmit={handleUpdate}
                editBook={book}
            />

            <DeleteWarningModal
                isOpen={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                onConfirm={handleDelete}
                bookTitle={book?.title || ""}
            />
        </section>
    );
};

export default BookDetails;