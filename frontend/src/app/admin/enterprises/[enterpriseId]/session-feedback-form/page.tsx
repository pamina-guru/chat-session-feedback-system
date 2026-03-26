import { fetchJson } from "@/lib/api";

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

                <div className="mt-6 space-y-4">
                    <div>
                        <p className="font-semibold">Header</p>
                        <p className="text-gray-400">{data.headerText}</p>
                    </div>

                    <div>
                        <p className="font-semibold">Description</p>
                        <p className="text-gray-400">{data.headerDescription}</p>
                    </div>

                    <div>
                        <p className="font-semibold">Rating Labels</p>
                        <ul className="list-disc pl-5 text-gray-400">
                            {data.ratingLabels.map((label, i) => (
                                <li key={i}>{label}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </main>
    );
}