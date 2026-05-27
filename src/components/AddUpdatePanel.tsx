import { X, BookOpen } from "lucide-react";
import { useEffect, useState } from "react";
import InputField from "./InputField";
import { type Book } from "../types/book";

interface AddBookModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (book: {
        title: string;
        author: string;
        genre: string;
        publicationYear: number;
        thumbnail: string;
        description: string;

    }) => void;

    editBook?: Book | null;
    isLoading?: boolean;
}

const AddBookModal = ({
    isOpen,
    onClose,
    onSubmit,
    editBook,
    isLoading = false,
}: AddBookModalProps) => {
    const [formData, setFormData] = useState({
        title: "",
        author: "",
        genre: "",
        publicationYear: 0,
        thumbnail: "",
        description: "",
    });

    useEffect(() => {
        if (!isOpen) return;

        if (editBook) {
            setFormData({
                title: editBook.title || "",
                author: editBook.author || "",
                genre: editBook.genre || "",
                publicationYear: editBook.publicationYear || 0,
                thumbnail: editBook.thumbnail || "",
                description: (editBook as any).description || "",
            });
        } else {
            setFormData({
                title: "",
                author: "",
                genre: "",
                publicationYear: 0,
                thumbnail: "",
                description: "",
            });
        }
    }, [isOpen, editBook]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]:
                name === "publicationYear"
                    ? Number(value)
                    : value,
        }));
    };

    const handleSubmit = (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        onSubmit(formData);

        setFormData({
            title: "",
            author: "",
            genre: "",
            publicationYear: 0,
            thumbnail: "",
            description: "",
        });

    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0"
                style={{
                    background: "rgba(0,0,0,0.88)",
                    backdropFilter: "blur(18px)",
                    WebkitBackdropFilter: "blur(18px)",
                }}
                onClick={onClose}
            />

            {/* Modal */}
            <div
                className="relative w-full max-w-2xl max-h-[90vh] rounded-3xl overflow-hidden"
                style={{
                    background:
                        "linear-gradient(135deg, rgba(2,6,23,0.98) 0%, rgba(15,23,42,0.98) 100%)",
                    border:
                        "1px solid rgba(34,211,238,0.15)",
                    backdropFilter: "blur(40px)",
                    WebkitBackdropFilter: "blur(40px)",
                    boxShadow:
                        "0 30px 80px rgba(0,0,0,0.8), 0 0 40px rgba(6,182,212,0.12)",
                }}
            >
                {/* Glow Effects */}
                <div className="absolute -top-24 -left-24 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl" />

                <div className="relative z-10 p-8 flex flex-col h-full max-h-[90vh]">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-8">
                        <div>
                            <div className="flex items-center gap-3 mb-3">
                                <BookOpen
                                    size={22}
                                    className="text-cyan-400"
                                />
                                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-400">
                                    Library Dashboard
                                </span>
                            </div>

                            <h2 className="text-3xl font-bold text-white">
                                {editBook
                                    ? "Update Book"
                                    : "Add New Book"}
                            </h2>

                            <p className="text-slate-400 mt-2">
                                Fill in the book details below.
                            </p>
                        </div>

                        <button
                            onClick={onClose}
                            className="w-11 h-11 rounded-xl flex items-center justify-center transition-all hover:scale-105"
                            style={{
                                background:
                                    "rgba(255,255,255,0.05)",
                                border:
                                    "1px solid rgba(255,255,255,0.08)",
                            }}
                        >
                            <X
                                size={18}
                                className="text-slate-300"
                            />
                        </button>
                    </div>

                    {/* Form (SCROLL ENABLED) */}
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5 flex-1 overflow-y-auto pr-2"
                    >
                        <div className="grid md:grid-cols-2 gap-5">
                            <InputField
                                label="Title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                            />

                            <InputField
                                label="Author"
                                name="author"
                                value={formData.author}
                                onChange={handleChange}
                            />

                            <InputField
                                label="Genre"
                                name="genre"
                                value={formData.genre}
                                onChange={handleChange}
                            />

                            <InputField
                                label="Publication Year"
                                name="publicationYear"
                                value={formData.publicationYear}
                                onChange={handleChange}
                            />
                        </div>

                        <InputField
                            label="Thumbnail URL"
                            name="thumbnail"
                            value={formData.thumbnail}
                            onChange={handleChange}
                        />

                        {/* NEW FIELD */}
                        <InputField
                            label="Description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                        />

                        {/* Image Preview */}
                        {formData.thumbnail && (
                            <div
                                className="rounded-2xl p-4"
                                style={{
                                    background:
                                        "rgba(255,255,255,0.03)",
                                    border:
                                        "1px solid rgba(255,255,255,0.06)",
                                }}
                            >
                                <p className="text-sm text-slate-400 mb-3">
                                    Thumbnail Preview
                                </p>

                                <img
                                    src={formData.thumbnail}
                                    alt="Book Thumbnail"
                                    className="w-32 h-44 object-cover rounded-xl"
                                    onError={(e) => {
                                        (
                                            e.target as HTMLImageElement
                                        ).style.display =
                                            "none";
                                    }}
                                />
                            </div>
                        )}

                        {/* Buttons */}
                        <div className="flex justify-end gap-4 pt-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-6 py-3 rounded-xl text-white transition"
                                style={{
                                    background:
                                        "rgba(255,255,255,0.05)",
                                    border:
                                        "1px solid rgba(255,255,255,0.08)",
                                }}
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="px-8 py-3 rounded-xl text-white font-semibold transition hover:scale-[1.02] flex items-center justify-center gap-2"
                                style={{
                                    background:
                                        "linear-gradient(135deg,#06b6d4,#2563eb)",
                                    boxShadow:
                                        "0 10px 30px rgba(37,99,235,0.35)",
                                    opacity: isLoading ? 0.7 : 1,
                                    cursor: isLoading ? "not-allowed" : "pointer",
                                }}
                            >
                                {isLoading ? (
                                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    <>
                                        {editBook ? "Update Book" : "Add Book"}
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddBookModal;