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

export default async function AdminFeedbackPage({ params }: Props) {
    const { enterpriseId } = await params;

    let data: FeedbackFormConfig | null = null;

    try {
        data = await fetchJson<FeedbackFormConfig>(
            `/api/admin/enterprises/${enterpriseId}/session-feedback-form`
        );
    } catch {
        return (
            <main className="p-6">
                <h1 className="text-2xl font-bold">Admin Feedback Config</h1>
                <p className="mt-4 text-red-500">Failed to load config.</p>
            </main>
        );
    }

    if (!data) {
        return (
            <main className="p-6">
                <h1 className="text-2xl font-bold">No config found</h1>
            </main>
        );
    }

    return (
        <main className="p-6">
            <div className="mx-auto max-w-3xl rounded-lg border p-6">
                <h1 className="text-2xl font-bold">Admin Feedback Config</h1>
                <AdminFeedbackFormClient initialData={data} />
            </div>
        </main>
    );
}