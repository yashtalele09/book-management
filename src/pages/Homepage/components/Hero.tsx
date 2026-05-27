
const HeroSection = ({
    search,
    setSearch,
    onSearchClick,
}: {
    search: string;
    setSearch: (value: string) => void;
    onSearchClick: () => void;
}) => {
    return (
        <section className="relative min-h-[680px] flex items-center overflow-hidden">
            <div
                className="absolute inset-0 bg-cover bg-center scale-105"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f')",
                    filter: "saturate(0.7)",
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/80 to-slate-900/40" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
            </div>

            <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-amber-400/40 to-transparent hidden lg:block" />

            <div className="relative z-10 max-w-7xl mx-auto px-8 lg:px-12 w-full py-20">
                <div className="max-w-2xl xl:max-w-3xl">

                    <div className="flex items-center gap-3 mb-8">
                        <span className="h-px w-8 bg-amber-400" />
                        <span className="text-amber-400 text-xs font-semibold tracking-[0.2em] uppercase">
                            Book Management System
                        </span>
                    </div>

                    <h1
                        className="font-bold leading-[1.08] tracking-tight text-white mb-6"
                        style={{
                            fontSize: "clamp(2.5rem, 5.5vw, 4rem)",
                            fontFamily: "'Georgia', 'Times New Roman', serif",
                            letterSpacing: "-0.02em",
                        }}
                    >
                        Manage Your Book
                        <br />
                        <span
                            style={{
                                background: "linear-gradient(90deg, #fbbf24, #f59e0b)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                            }}
                        >
                            Collection
                        </span>{" "}
                        Effortlessly
                    </h1>

                    {/* Subheading */}
                    <p
                        className="text-slate-300/80 mb-10 max-w-xl"
                        style={{
                            fontSize: "1.0625rem",
                            lineHeight: "1.75",
                            fontWeight: 300,
                            letterSpacing: "0.01em",
                        }}
                    >
                        Search, add, edit, and organize your favorite books in one
                        place. Keep track of authors, genres, ratings, and book details
                        with ease.
                    </p>

                    <div
                        className="flex flex-col sm:flex-row gap-2 max-w-2xl mb-12"
                        style={{
                            background: "rgba(255,255,255,0.06)",
                            backdropFilter: "blur(20px)",
                            WebkitBackdropFilter: "blur(20px)",
                            border: "1px solid rgba(255,255,255,0.12)",
                            borderRadius: "14px",
                            padding: "6px",
                        }}
                    >
                        <div className="relative flex-1 flex items-center">
                            <svg
                                className="absolute left-4 text-slate-400 pointer-events-none"
                                width="17"
                                height="17"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                            >
                                <circle cx="11" cy="11" r="8" />
                                <path d="m21 21-4.35-4.35" />
                            </svg>
                            <input
                                type="text"
                                value={search ?? ""}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                }}
                                placeholder="Search by title, author, or genre..."
                                className="w-full bg-transparent pl-11 pr-4 py-3.5 text-white placeholder-slate-400/70 outline-none"
                                style={{ fontSize: "0.9375rem" }}
                            />
                        </div>

                        <button
                            className="shrink-0 px-7 py-3.5 font-semibold text-slate-900 transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
                            onClick={onSearchClick}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    setSearch(e.currentTarget.value);
                                }
                            }}
                            style={{
                                background: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)",
                                borderRadius: "10px",
                                fontSize: "0.9375rem",
                                letterSpacing: "0.01em",
                            }}
                        >
                            Search Books
                        </button>
                    </div>
                    <div className="h-px w-full max-w-2xl bg-gradient-to-r from-white/10 to-transparent mb-10" />

                    <div className="flex items-center gap-10">
                        {[
                            { value: "500+", label: "Books" },
                            { value: "150+", label: "Authors" },
                            { value: "20+", label: "Categories" },
                        ].map((stat, i) => (
                            <div key={i} className="flex items-center gap-10">
                                <div>
                                    <p
                                        className="font-bold text-white leading-none mb-1"
                                        style={{
                                            fontSize: "1.875rem",
                                            fontFamily: "'Georgia', serif",
                                            letterSpacing: "-0.03em",
                                        }}
                                    >
                                        {stat.value}
                                    </p>
                                    <p
                                        className="text-slate-400 font-medium"
                                        style={{
                                            fontSize: "0.75rem",
                                            letterSpacing: "0.12em",
                                            textTransform: "uppercase",
                                        }}
                                    >
                                        {stat.label}
                                    </p>
                                </div>
                                {i < 2 && (
                                    <div className="h-8 w-px bg-white/10" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-950/50 to-transparent pointer-events-none" />
        </section>
    );
}

export default HeroSection;