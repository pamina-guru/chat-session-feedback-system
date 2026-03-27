import Link from "next/link";

const demoLinks = [
    {
        title: "Active Feedback",
        description: "Primary single-use public feedback demo.",
        href: "/feedback/fb-valid-003",
        id: "fb-valid-003",
        accent: "emerald",
    },
    {
        title: "Active Feedback (Backup)",
        description: "Backup active feedback link in case the primary one is used.",
        href: "/feedback/fb-valid-004",
        id: "fb-valid-004",
        accent: "emerald",
    },
    {
        title: "Expired Feedback",
        description: "Shows the expired feedback state.",
        href: "/feedback/fb-expired-001",
        id: "fb-expired-001",
        accent: "amber",
    },
    {
        title: "Already Used Feedback",
        description: "Shows the already-responded state.",
        href: "/feedback/fb-used-001",
        id: "fb-used-001",
        accent: "rose",
    },
    {
        title: "Invalid Feedback",
        description: "Shows the invalid or not-found state.",
        href: "/feedback/invalid-123",
        id: "invalid-123",
        accent: "slate",
    },
];

function getAccentClasses(accent: string) {
    switch (accent) {
        case "emerald":
            return "hover:border-emerald-400/70 hover:bg-emerald-500/5 text-emerald-300";
        case "amber":
            return "hover:border-amber-400/70 hover:bg-amber-500/5 text-amber-300";
        case "rose":
            return "hover:border-rose-400/70 hover:bg-rose-500/5 text-rose-300";
        default:
            return "hover:border-slate-500 hover:bg-slate-800/70 text-slate-300";
    }
}

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
                        A configurable multi-channel feedback system where enterprises can
                        manage their session feedback form and customers can submit a 1–5
                        rating through a unique feedback link.
                    </p>
                </section>

                <section className="mt-10 rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
                    <h3 className="text-xl font-semibold text-white">Demo Instructions</h3>

                    <div className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
                        <p>
                            • Open the <span className="font-semibold text-white">Admin Demo</span> and an{" "}
                            <span className="font-semibold text-white">Active Feedback</span> link in separate tabs
                            to compare the configured form with the customer-facing experience.
                        </p>
                        <p>
                            • Use the public demo links below to quickly test{" "}
                            <span className="font-semibold text-white">active</span>,{" "}
                            <span className="font-semibold text-white">expired</span>,{" "}
                            <span className="font-semibold text-white">already used</span>, and{" "}
                            <span className="font-semibold text-white">invalid</span> states.
                        </p>
                        <p>
                            • Active feedback links are{" "}
                            <span className="font-semibold text-white">single-use</span>, so backup active
                            links are provided if the primary demo link has already been submitted.
                        </p>
                    </div>
                </section>

                <section className="mt-12 grid gap-6 md:grid-cols-2">
                    <Link
                        href="/admin/enterprises/acme-bank/session-feedback-form"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group rounded-3xl border border-slate-800 bg-slate-900/90 p-8 transition hover:border-sky-400/70 hover:bg-sky-500/5"
                    >
                        <p className="text-sm font-medium uppercase tracking-[0.2em] text-sky-400">
                            Admin Flow
                        </p>
                        <h2 className="mt-4 text-2xl font-semibold text-white">
                            Admin Demo
                        </h2>
                        <p className="mt-4 text-sm leading-7 text-slate-300">
                            Configure the feedback form, edit labels and messages, manage
                            skipped channels, and preview the customer-facing experience.
                        </p>

                        <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                                Opens
                            </p>
                            <p className="mt-2 text-sm text-slate-200">In a new tab</p>
                        </div>

                        <div className="mt-8 inline-flex items-center rounded-xl bg-sky-400 px-4 py-2 text-sm font-semibold text-slate-950 transition group-hover:bg-sky-300">
                            Open Admin Demo
                        </div>
                    </Link>

                    <Link
                        href="/feedback/fb-valid-003"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group rounded-3xl border border-slate-800 bg-slate-900/90 p-8 transition hover:border-emerald-400/70 hover:bg-emerald-500/5"
                    >
                        <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-400">
                            Public Flow
                        </p>
                        <h2 className="mt-4 text-2xl font-semibold text-white">
                            Active Feedback Demo
                        </h2>
                        <p className="mt-4 text-sm leading-7 text-slate-300">
                            Open a live customer feedback request and submit a single-use
                            rating from 1 to 5.
                        </p>

                        <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                                Primary Demo ID
                            </p>
                            <p className="mt-2 font-mono text-sm text-slate-200">
                                fb-valid-003
                            </p>
                        </div>

                        <div className="mt-8 inline-flex items-center rounded-xl bg-emerald-400 px-4 py-2 text-sm font-semibold text-slate-950 transition group-hover:bg-emerald-300">
                            Open Active Demo
                        </div>
                    </Link>
                </section>

                <section className="mt-14">
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <h3 className="text-2xl font-semibold text-white">
                                Test Different Public States
                            </h3>
                            <p className="mt-2 text-sm leading-7 text-slate-400">
                                These links help reviewers quickly verify the required public
                                feedback states.
                            </p>
                        </div>
                    </div>

                    <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                        {demoLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`rounded-2xl border border-slate-800 bg-slate-900/90 p-5 transition ${getAccentClasses(
                                    link.accent
                                )}`}
                            >
                                <h4 className="text-base font-semibold text-white">
                                    {link.title}
                                </h4>
                                <p className="mt-2 text-sm leading-6 text-slate-400">
                                    {link.description}
                                </p>

                                <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950/70 px-3 py-2">
                                    <p className="font-mono text-xs">{link.id}</p>
                                </div>

                                <p className="mt-3 text-xs text-slate-500">Opens in new tab</p>
                            </Link>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
}