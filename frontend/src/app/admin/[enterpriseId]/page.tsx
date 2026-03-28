import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
    params: Promise<{
        enterpriseId: string;
    }>;
};

function ActionCard({
                        title,
                        description,
                        href,
                        accent = "sky",
                    }: {
    title: string;
    description: string;
    href: string;
    accent?: "sky" | "violet";
}) {
    const accentClasses =
        accent === "violet"
            ? {
                text: "text-violet-300",
                border: "hover:border-violet-400/70",
                bg: "hover:bg-violet-500/5",
                button: "bg-violet-400 text-slate-950 hover:bg-violet-300",
            }
            : {
                text: "text-sky-300",
                border: "hover:border-sky-400/70",
                bg: "hover:bg-sky-500/5",
                button: "bg-sky-400 text-slate-950 hover:bg-sky-300",
            };

    return (
        <Link
            href={href}
            className={`group block rounded-3xl border border-slate-800 bg-slate-950/60 p-6 transition ${accentClasses.border} ${accentClasses.bg}`}
        >
            <p className={`text-sm font-medium uppercase tracking-[0.2em] ${accentClasses.text}`}>
                Action
            </p>

            <h2 className="mt-4 text-2xl font-semibold text-white">{title}</h2>

            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300">
                {description}
            </p>

            <div className="mt-6 inline-flex items-center rounded-xl px-4 py-2 text-sm font-semibold transition group-hover:opacity-90">
        <span className={`rounded-xl px-4 py-2 ${accentClasses.button}`}>
          Open
        </span>
            </div>
        </Link>
    );
}

export default async function AdminEnterprisePage({ params }: Props) {
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
                        <p className="text-sm font-medium uppercase tracking-[0.2em] text-sky-400">
                            Admin Portal
                        </p>

                        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                            {isAcme ? "Acme Bank" : "Uber"} Admin Actions
                        </h1>

                        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">
                            {isAcme
                                ? "Open the active Acme Bank feedback form editor to update the enterprise configuration and preview the live customer-facing experience."
                                : "Open the configurable Uber form editor to update content, preview changes live, and publish an enterprise-specific public experience."}
                        </p>
                    </div>

                    <div className="mt-8 max-w-3xl">
                        <ActionCard
                            title={isAcme ? "Edit Active Form" : "Open Uber Form Builder"}
                            description={
                                isAcme
                                    ? "Open the actual Acme Bank feedback form editor with live preview and save support."
                                    : "Configure header, footer, messages, rating labels, and skip channels, then see how the public feedback form updates."
                            }
                            href={`/admin/enterprises/${enterpriseId}/session-feedback-form`}
                            accent={isAcme ? "sky" : "violet"}
                        />
                    </div>
                </div>
            </div>
        </main>
    );
}