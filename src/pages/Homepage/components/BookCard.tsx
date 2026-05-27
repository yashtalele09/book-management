import { Edit, Trash2, Calendar, User } from "lucide-react";
import { type Book } from "../../../types/book";

interface BookCardProps {
    book: Book;
    onEdit: (book: Book) => void;
    onDelete: (book: Book) => void;
    onViewDetails: (book: Book) => void;
}


const BookCard = ({
    book,
    onEdit,
    onDelete,
    onViewDetails,
}: BookCardProps) => {

    return (
        <div
            className="
                group
                relative
                overflow-hidden
                rounded-3xl
                transition-all
                duration-300
                hover:-translate-y-2
            "
            style={{
                background:
                    "linear-gradient(135deg, rgba(15,23,42,0.95) 0%, rgba(30,41,59,0.92) 100%)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(56,189,248,0.12)",
                boxShadow:
                    "0 10px 30px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04)",
            }}
        >
            {/* Hover Glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-cyan-500/10 blur-3xl rounded-full" />
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500/10 blur-3xl rounded-full" />
            </div>

            {/* Thumbnail */}
            <div className="relative h-56 overflow-hidden">
                <img
                    src={
                        book.thumbnail ||
                        "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800"
                    }
                    alt={book.title}
                    className="
                        w-full
                        h-full
                        object-cover
                        transition-transform
                        duration-700
                        group-hover:scale-110
                    "
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                {/* Genre Badge */}
                <div className="absolute top-4 left-4">
                    <span
                        className="
                            px-3
                            py-1.5
                            rounded-full
                            text-[11px]
                            font-semibold
                            tracking-wider
                            uppercase
                        "
                        style={{
                            background:
                                "linear-gradient(135deg,#fbbf24,#f59e0b)",
                            color: "#0f172a",
                        }}
                    >
                        {book.genre}
                    </span>
                </div>
            </div>

            <div className="relative z-10 p-5">
                <h3
                    className="
                        text-white
                        text-xl
                        font-bold
                        mb-3
                        line-clamp-2
                    "
                    style={{
                        fontFamily:
                            "'Georgia', 'Times New Roman', serif",
                        letterSpacing: "-0.02em",
                    }}
                >
                    {book.title}
                </h3>

                <p className="text-slate-400 text-sm leading-7 line-clamp-3 mb-5">
                    {book.description ||
                        "Explore this fascinating book and discover its unique insights and stories."}
                </p>

                <div className="space-y-3 mb-5">
                    <div className="flex items-center gap-2 text-slate-300 text-sm">
                        <User size={15} className="text-cyan-400" />
                        <span>{book.author}</span>
                    </div>

                    <div className="flex items-center gap-2 text-slate-300 text-sm">
                        <Calendar size={15} className="text-cyan-400" />
                        <span>{book.publicationYear}</span>
                    </div>
                </div>

                <div className="h-px bg-gradient-to-r from-cyan-500/20 to-transparent mb-5" />

                <div className="flex gap-2">
                    <button
                        onClick={() => onViewDetails(book)}
                        className="
                            flex-1
                            flex
                            items-center
                            justify-center
                            gap-2
                            py-3
                            rounded-xl
                            font-medium
                            transition-all
                            duration-200
                        "
                        style={{
                            background:
                                "linear-gradient(135deg,#fbbf24,#f59e0b)",
                            color: "#0f172a",
                        }}
                    >
                        View Details
                    </button>

                    <button
                        onClick={() => onEdit(book)}
                        title="Edit"
                        className="
                            w-12
                            h-12
                            rounded-xl
                            flex
                            items-center
                            justify-center
                            text-cyan-400
                            border
                            border-cyan-500/20
                            bg-cyan-500/5
                            hover:bg-cyan-500/10
                            transition-all
                        "
                    >
                        <Edit size={16} />
                    </button>

                    <button
                        onClick={() => onDelete(book)}
                        title="Delete"
                        className="
                            w-12
                            h-12
                            rounded-xl
                            flex
                            items-center
                            justify-center
                            text-red-400
                            border
                            border-red-500/20
                            bg-red-500/5
                            hover:bg-red-500/10
                            transition-all
                        "
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookCard;