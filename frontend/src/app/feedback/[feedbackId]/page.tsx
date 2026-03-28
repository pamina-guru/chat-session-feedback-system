import { fetchJson } from "@/lib/api";
import type { PublicFeedbackView } from "@/lib/types";
import RatingClient from "./RatingClient";

type PublicFeedbackPageProps = {
    params: Promise<{
        feedbackId: string;
    }>;
};

function FeedbackStateCard({
                               title,
                               message,
                           }: {
    title: string;
    message: string;
}) {
    return (
        <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
            <div className="mx-auto max-w-3xl">
                <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-8 shadow-2xl">
                    <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-400">
                        Session Feedback
                    </p>
                    <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                        {title}
                    </h1>
                    <p className="mt-4 text-base leading-7 text-slate-300">{message}</p>
                </div>
            </div>
        </main>
    );
}

export default async function PublicFeedbackPage({
                                                     params,
                                                 }: PublicFeedbackPageProps) {
    const { feedbackId } = await params;

    let data: PublicFeedbackView;

    try {
        data = await fetchJson<PublicFeedbackView>(
            `/api/public/feedback/${feedbackId}`
        );
    } catch {
        return (
            <FeedbackStateCard
                title="Failed to Load Feedback"
                message="Something went wrong while loading the feedback request."
            />
        );
    }

    if (data.status === "INVALID") {
        return (
            <FeedbackStateCard
                title="Invalid Feedback Link"
                message="This feedback request could not be found."
            />
        );
    }

    if (data.status === "EXPIRED") {
        return (
            <FeedbackStateCard
                title="Feedback Link Expired"
                message={
                    data.formConfig?.expiredReplyText ?? "This feedback link has expired."
                }
            />
        );
    }

    if (data.status === "ALREADY_RESPONDED") {
        return (
            <FeedbackStateCard
                title="Feedback Already Submitted"
                message="This feedback request has already been used."
            />
        );
    }

    const formConfig = data.formConfig;

    return (
        <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
            <div className="mx-auto max-w-3xl">
                <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-8 shadow-2xl">
                    <div className="border-b border-slate-800 pb-6">
                        <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-400">
                            Customer Feedback
                        </p>
                        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                            {formConfig?.headerText ?? "Session Feedback"}
                        </h1>

                        {formConfig?.headerDescription && (
                            <p className="mt-4 text-base leading-7 text-slate-300">
                                {formConfig.headerDescription}
                            </p>
                        )}

                        {data.expiresAt && (
                            <p className="mt-2 text-sm text-slate-400">
                                Expires on: {new Date(data.expiresAt).toLocaleString()}
                            </p>
                        )}


                    </div>

                    <RatingClient
                        feedbackId={feedbackId}
                        ratingLabels={formConfig?.ratingLabels ?? ["1", "2", "3", "4", "5"]}
                        thankYouText={formConfig?.thankYouText ?? "Thank you for your feedback!"}
                    />

                    {formConfig?.footerText && (
                        <div className="mt-8 border-t border-slate-800 pt-6">
                            <p className="text-sm leading-6 text-slate-400">
                                {formConfig.footerText}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}