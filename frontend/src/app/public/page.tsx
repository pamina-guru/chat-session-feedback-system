import Link from "next/link";

const enterprises = [
    {
        title: "Acme Bank",
        enterpriseId: "acme-bank",
        description:
            "Explore the seeded public demo states including active, expired, invalid, and already-responded feedback requests.",
        accent: "emerald",
    },
    {
        title: "Uber",
        enterpriseId: "uber",
        description:
            "Open the live public feedback form powered by the current Uber admin configuration.",
        accent: "violet",
    },
];

function getAccentClasses(accent: string) {
    switch (accent) {
        case "violet":
            return "text-violet-300 hover:border-violet-400/70 hover:bg-violet-500/5";
        default:
            return "text-emerald-300 hover:border-emerald-400/70 hover:bg-emerald-500/5";
    }
}

export default function PublicPortalPage() {
    return (
        <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
            <div className="mx-auto max-w-6xl">
                <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-8 shadow-2xl">
                    <div className="border-b border-slate-800 pb-6">
                        <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-400">
                            Public Portal
                        </p>
                        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                            Choose an Enterprise
                        </h1>
                        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">
                            Select an enterprise to review its customer-facing feedback flow.
                        </p>
                    </div>

                    <div className="mt-8 grid gap-6 md:grid-cols-2">
                        {enterprises.map((enterprise) => (
                            <Link
                                key={enterprise.enterpriseId}
                                href={`/public/${enterprise.enterpriseId}`}
                                className={`rounded-3xl border border-slate-800 bg-slate-950/60 p-6 transition ${getAccentClasses(
                                    enterprise.accent
                                )}`}
                            >
                                <p className="text-sm font-medium uppercase tracking-[0.2em]">
                                    Enterprise
                                </p>
                                <h2 className="mt-4 text-2xl font-semibold text-white">
                                    {enterprise.title}
                                </h2>
                                <p className="mt-4 text-sm leading-7 text-slate-300">
                                    {enterprise.description}
                                </p>

                                <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3">
                                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                                        Enterprise ID
                                    </p>
                                    <p className="mt-2 font-mono text-sm text-slate-200">
                                        {enterprise.enterpriseId}
                                    </p>
                                </div>

                                <div className="mt-6 text-sm font-semibold">Open Public Flow</div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}