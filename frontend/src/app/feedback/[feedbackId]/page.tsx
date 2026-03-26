import { fetchJson } from "@/lib/api";
import type { PublicFeedbackView } from "@/lib/types";

type PublicFeedbackPageProps = {
    params: Promise<{
        feedbackId: string;
    }>;
};

export default async function PublicFeedbackPage({ params }: PublicFeedbackPageProps) {
    const { feedbackId } = await params;

    let data: PublicFeedbackView;

    try {
        data = await fetchJson<PublicFeedbackView>(`/api/public/feedback/${feedbackId}`);
    } catch {
        return (
            <main className="min-h-screen p-6">
                <div className="mx-auto max-w-3xl rounded-lg border p-6">
                    <h1 className="text-3xl font-bold">Session Feedback</h1>
                    <p className="mt-4 text-red-500">Failed to load feedback details.</p>
                </div>
            </main>
        );
    }

    if (data.status === "INVALID") {
        return (
            <main className="min-h-screen p-6">
                <div className="mx-auto max-w-3xl rounded-lg border p-6">
                    <h1 className="text-3xl font-bold">Invalid Feedback Link</h1>
                    <p className="mt-4 text-gray-600">
                        This feedback request could not be found.
                    </p>
                </div>
            </main>
        );
    }

    if (data.status === "EXPIRED") {
        return (
            <main className="min-h-screen p-6">
                <div className="mx-auto max-w-3xl rounded-lg border p-6">
                    <h1 className="text-3xl font-bold">Feedback Link Expired</h1>
                    <p className="mt-4 text-gray-600">
                        {data.formConfig?.expiredReplyText ?? "This feedback link has expired."}
                    </p>
                </div>
            </main>
        );
    }

    if (data.status === "ALREADY_RESPONDED") {
        return (
            <main className="min-h-screen p-6">
                <div className="mx-auto max-w-3xl rounded-lg border p-6">
                    <h1 className="text-3xl font-bold">Feedback Already Submitted</h1>
                    <p className="mt-4 text-gray-600">
                        This feedback request has already been used.
                    </p>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen p-6">
            <div className="mx-auto max-w-3xl rounded-lg border p-6">
                <h1 className="text-3xl font-bold">
                    {data.formConfig?.headerText ?? "Session Feedback"}
                </h1>

                {data.formConfig?.headerDescription && (
                    <p className="mt-3 text-gray-600">{data.formConfig.headerDescription}</p>
                )}

                <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-5">
                    {data.formConfig?.ratingLabels.map((label, index) => (
                        <button
                            key={index}
                            className="rounded-lg border px-4 py-3 text-left transition hover:bg-neutral-900"
                        >
                            <div className="font-semibold">{index + 1}</div>
                            <div className="mt-1 text-sm text-gray-400">{label}</div>
                        </button>
                    ))}
                </div>

                {data.formConfig?.footerText && (
                    <p className="mt-8 text-sm text-gray-500">{data.formConfig.footerText}</p>
                )}
            </div>
        </main>
    );
}