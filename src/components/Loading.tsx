const Loading = () => {
    return (
        <section
            className="min-h-screen flex items-center justify-center"
            style={{
                background:
                    "linear-gradient(180deg,#020617 0%,#0f172a 50%,#082f49 100%)",
            }}
        >
            <div
                className="w-full max-w-5xl mx-auto p-8 rounded-3xl"
                style={{
                    background:
                        "rgba(255,255,255,0.03)",
                    border:
                        "1px solid rgba(255,255,255,0.08)",
                    backdropFilter: "blur(20px)",
                }}
            >
                <div className="grid lg:grid-cols-[420px_1fr] gap-10 animate-pulse">

                    {/* IMAGE SKELETON */}
                    <div
                        className="h-[600px] rounded-3xl"
                        style={{
                            background:
                                "linear-gradient(90deg, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 75%)",
                            backgroundSize: "200% 100%",
                            animation: "shimmer 1.5s infinite",
                        }}
                    />

                    {/* CONTENT SKELETON */}
                    <div className="space-y-6">
                        <div
                            className="h-8 w-32 rounded-full"
                            style={{
                                background:
                                    "rgba(255,255,255,0.06)",
                            }}
                        />

                        <div
                            className="h-12 w-3/4 rounded-xl"
                            style={{
                                background:
                                    "rgba(255,255,255,0.06)",
                            }}
                        />

                        <div className="flex gap-4">
                            <div className="h-5 w-24 rounded-lg bg-white/10" />
                            <div className="h-5 w-24 rounded-lg bg-white/10" />
                        </div>

                        <div
                            className="h-40 rounded-2xl"
                            style={{
                                background:
                                    "rgba(255,255,255,0.06)",
                            }}
                        />

                        <div className="flex gap-4">
                            <div className="h-10 w-32 rounded-xl bg-white/10" />
                            <div className="h-10 w-32 rounded-xl bg-white/10" />
                        </div>
                    </div>
                </div>
            </div>

            {/* shimmer animation */}
            <style>
                {`
                @keyframes shimmer {
                    0% { background-position: -200% 0; }
                    100% { background-position: 200% 0; }
                }
                `}
            </style>
        </section>
    );
}

export default Loading;