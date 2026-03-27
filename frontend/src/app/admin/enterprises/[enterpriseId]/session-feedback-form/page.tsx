import { fetchJson } from "@/lib/api";
import AdminFeedbackFormClient from "./AdminFeedbackFormClient";

type FeedbackFormConfig = {
    enterpriseId: string;
    headerText: string;
    headerDescription: string;
    footerText: string;
    ratingLabels: string[];
    thankYouText: string;
    invalidReplyText: string;
    expiredReplyText: string;
    skipForChannels: string[];
};

type Props = {
    params: Promise<{
        enterpriseId: string;
    }>;
};

function AdminStateCard({
                            title,
                            message,
                        }: {
    title: string;
    message?: string;
}) {
    return (
        <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
            <div className="mx-auto max-w-4xl rounded-3xl border border-slate-800 bg-slate-900/90 p-8 shadow-2xl">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-sky-400">
                    Admin Console
                </p>
                <h1 className="mt-4 text-3xl font-bold tracking-tight">{title}</h1>
                {message && (
                    <p className="mt-4 text-base leading-7 text-slate-300">{message}</p>
                )}
            </div>
        </main>
    );
}

export default async function AdminFeedbackPage({ params }: Props) {
    const { enterpriseId } = await params;

    let data: FeedbackFormConfig | null = null;

    try {
        data = await fetchJson<FeedbackFormConfig>(
            `/api/admin/enterprises/${enterpriseId}/session-feedback-form`
        );
    } catch {
        return (
            <AdminStateCard
                title="Failed to Load Config"
                message="Something went wrong while loading the enterprise feedback configuration."
            />
        );
    }

    if (!data) {
        return <AdminStateCard title="No Config Found" />;
    }

    return (
        <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
            <div className="mx-auto max-w-6xl">
                <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-8 shadow-2xl">
                    <div className="border-b border-slate-800 pb-6">
                        <p className="text-sm font-medium uppercase tracking-[0.2em] text-sky-400">
                            Admin Flow
                        </p>
                        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                            Session Feedback Form Configuration
                        </h1>
                        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">
                            Customize the enterprise feedback form, update the messaging shown
                            to customers, manage channel exclusions, and preview the public
                            experience before saving changes.
                        </p>
                    </div>

                    <AdminFeedbackFormClient initialData={data} />
                </div>
            </div>
        </main>
    );
}