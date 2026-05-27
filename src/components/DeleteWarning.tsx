import { Trash2, X } from "lucide-react";

interface DeleteWarningModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    bookTitle?: string;
}

const DeleteWarningModal = ({
    isOpen,
    onClose,
    onConfirm,
    bookTitle,
}: DeleteWarningModalProps) => {
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
                className="relative w-full max-w-md rounded-3xl overflow-hidden"
                style={{
                    background:
                        "linear-gradient(135deg, rgba(2,6,23,0.98), rgba(15,23,42,0.98))",
                    border:
                        "1px solid rgba(239,68,68,0.25)",
                    boxShadow:
                        "0 30px 80px rgba(0,0,0,0.8)",
                }}
            >
                {/* Glow */}
                <div className="absolute -top-20 -left-20 w-64 h-64 bg-red-500/10 blur-3xl rounded-full" />

                <div className="relative z-10 p-6">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-3">
                            <Trash2 className="text-red-400" />
                            <h2 className="text-white text-xl font-bold">
                                Delete Book
                            </h2>
                        </div>

                        <button
                            onClick={onClose}
                            className="w-10 h-10 rounded-xl flex items-center justify-center"
                            style={{
                                background:
                                    "rgba(255,255,255,0.05)",
                                border:
                                    "1px solid rgba(255,255,255,0.08)",
                            }}
                        >
                            <X className="text-slate-300" />
                        </button>
                    </div>

                    {/* Content */}
                    <p className="text-slate-300 mb-6">
                        Are you sure you want to delete{" "}
                        <span className="text-red-400 font-semibold">
                            {bookTitle || "this book"}
                        </span>
                        ? This action cannot be undone.
                    </p>

                    {/* Buttons */}
                    <div className="flex justify-end gap-3">
                        <button
                            onClick={onClose}
                            className="px-5 py-2.5 rounded-xl text-white"
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
                            onClick={onConfirm}
                            className="px-5 py-2.5 rounded-xl text-white font-semibold hover:scale-[1.02] transition"
                            style={{
                                background:
                                    "linear-gradient(135deg,#ef4444,#b91c1c)",
                                boxShadow:
                                    "0 10px 30px rgba(239,68,68,0.35)",
                            }}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteWarningModal;