import Link from "next/link";

const roleCards = [
    {
        title: "Admin Portal",
        description:
            "Review enterprise feedback configurations, edit active forms, and preview required public states.",
        href: "/admin",
        accent:
            "hover:border-sky-400/70 hover:bg-sky-500/5 text-sky-300 bg-sky-400",
        label: "Admin Flow",
        buttonText: "Open Admin Portal",
    },
    {
        title: "Public User Portal",
        description:
            "Explore the customer-facing feedback journey for each enterprise and verify all required response states.",
        href: "/public",
        accent:
            "hover:border-emerald-400/70 hover:bg-emerald-500/5 text-emerald-300 bg-emerald-400",
        label: "Public Flow",
        buttonText: "Open Public Portal",
    },
];

export default function HomePage() {
    return (
        <main className="min-h-screen bg-slate-950 text-white">
            <div className="mx-auto max-w-6xl px-6 py-16">
                <section className="mx-auto max-w-3xl text-center">
                    <p className="inline-flex rounded-full border border-slate-700 bg-slate-900 px-4 py-1 text-sm text-slate-300">
                        Chat Feedback
                    </p>

                    <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
                        Chat Session Feedback System
                    </h1>

                    <p className="mt-5 text-lg leading-8 text-slate-300">
                        A multi-tenant session feedback demo where enterprises can configure
                        their feedback forms and customers can submit ratings through unique
                        feedback links.
                    </p>
                </section>

                <section className="mt-10 rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
                    <h2 className="text-xl font-semibold text-white">Demo Overview</h2>
                    <div className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
                        <p>
                            • Use the <span className="font-semibold text-white">Admin Portal</span>{" "}
                            to inspect enterprise-specific configurations and preview required
                            public states.
                        </p>
                        <p>
                            • Use the <span className="font-semibold text-white">Public User Portal</span>{" "}
                            to verify active, expired, invalid, and already-responded
                            feedback flows.
                        </p>
                        <p>
                            • <span className="font-semibold text-white">Acme Bank</span> acts as the
                            seeded enterprise with fixed demo states.
                        </p>
                        <p>
                            • <span className="font-semibold text-white">Uber</span> acts as the
                            configurable enterprise where admin changes immediately affect the
                            public-side experience.
                        </p>
                    </div>
                </section>

                <section className="mt-12 grid gap-6 md:grid-cols-2">
                    {roleCards.map((card) => (
                        <Link
                            key={card.href}
                            href={card.href}
                            className={`group rounded-3xl border border-slate-800 bg-slate-900/90 p-8 transition ${card.accent.split(" bg-")[0]}`}
                        >
                            <p className="text-sm font-medium uppercase tracking-[0.2em]">
                                {card.label}
                            </p>
                            <h2 className="mt-4 text-2xl font-semibold text-white">
                                {card.title}
                            </h2>
                            <p className="mt-4 text-sm leading-7 text-slate-300">
                                {card.description}
                            </p>

                            <div className="mt-8">
                                <div
                                    className={`inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-md transition transform 
    ${card.accent.split(" ").find((c) => c.startsWith("bg-"))} 
    group-hover:scale-105 group-hover:shadow-lg active:scale-95`}
                                >
                                    {card.buttonText}
                                </div>
                            </div>
                        </Link>
                    ))}
                </section>
            </div>
        </main>
    );
}