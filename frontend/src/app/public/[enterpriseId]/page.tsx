import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
    params: Promise<{
        enterpriseId: string;
    }>;
};

function StateCard({
                       title,
                       description,
                       href,
                       accent = "emerald",
                   }: {
    title: string;
    description: string;
    href: string;
    accent?: "emerald" | "amber" | "rose" | "slate" | "violet";
}) {
    const accentClasses =
        accent === "amber"
            ? "text-amber-300 hover:border-amber-400/70 hover:bg-amber-500/5"
            : accent === "rose"
                ? "text-rose-300 hover:border-rose-400/70 hover:bg-rose-500/5"
                : accent === "slate"
                    ? "text-slate-300 hover:border-slate-500 hover:bg-slate-800/70"
                    : accent === "violet"
                        ? "text-violet-300 hover:border-violet-400/70 hover:bg-violet-500/5"
                        : "text-emerald-300 hover:border-emerald-400/70 hover:bg-emerald-500/5";

    const buttonClasses =
        accent === "amber"
            ? "bg-amber-400 text-slate-950"
            : accent === "rose"
                ? "bg-rose-400 text-slate-950"
                : accent === "slate"
                    ? "bg-slate-300 text-slate-950"
                    : accent === "violet"
                        ? "bg-violet-400 text-slate-950"
                        : "bg-emerald-400 text-slate-950";

    return (
        <Link
            href={href}
            className={`block rounded-3xl border border-slate-800 bg-slate-950/60 p-6 transition ${accentClasses}`}
        >
            <div className="flex min-h-[220px] flex-col justify-between">
                <div>
                    <h2 className="text-xl font-semibold text-white">{title}</h2>
                    <p className="mt-3 text-sm leading-7 text-slate-300">{description}</p>
                </div>

                <div className="mt-6">
          <span
              className={`inline-flex items-center rounded-xl px-4 py-2 text-sm font-semibold ${buttonClasses}`}
          >
            Open
          </span>
                </div>
            </div>
        </Link>
    );
}

export default async function PublicEnterprisePage({ params }: Props) {
    const { enterpriseId } = await params;

    if (!["acme-bank", "uber"].includes(enterpriseId)) {
        notFound();
    }

    const isAcme = enterpriseId === "acme-bank";

    return (
        <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
            <div className="mx-auto max-w-6xl">
                <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-8 shadow-2xl">
                    <div className="border-b border-slate-800 pb-6">
                        <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-400">
                            Public Portal
                        </p>
                        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                            {isAcme ? "Acme Bank" : "Uber"} Public Feedback
                        </h1>
                        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">
                            {isAcme
                                ? "Use these links to verify all required customer-facing feedback states."
                                : "Open the current Uber public feedback request to see the latest published admin configuration."}
                        </p>
                    </div>

                    {isAcme ? (
                        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-5">
                            <StateCard
                                title="Active Feedback"
                                description="Open the main valid active Acme Bank feedback request."
                                href="/feedback/fb-valid-005"
                                accent="emerald"
                            />
                            <StateCard
                                title="Backup Active Feedback"
                                description="Use this backup valid request if the main active link has already been submitted."
                                href="/feedback/fb-valid-006"
                                accent="emerald"
                            />
                            <StateCard
                                title="Expired Feedback"
                                description="Open the expired Acme Bank feedback state."
                                href="/feedback/fb-expired-001"
                                accent="amber"
                            />
                            <StateCard
                                title="Invalid Feedback"
                                description="Open the invalid or not-found state."
                                href="/feedback/not-found"
                                accent="slate"
                            />
                            <StateCard
                                title="Already Responded"
                                description="Open the already-used Acme Bank feedback request."
                                href="/feedback/fb-used-001"
                                accent="rose"
                            />
                        </div>
                    ) : (
                        <div className="mt-8">
                            <StateCard
                                title="Open Uber Feedback Form"
                                description="Open the live Uber public feedback request powered by the latest saved admin configuration."
                                href="/feedback/fb-uber-valid-001"
                                accent="violet"
                            />
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}