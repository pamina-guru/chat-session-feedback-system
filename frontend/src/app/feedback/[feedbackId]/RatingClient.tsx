"use client";

import { useState } from "react";

type RatingClientProps = {
    feedbackId: string;
    ratingLabels: string[];
    thankYouText: string;
};

type SubmitResponse = {
    code: string;
    message: string;
};

export default function RatingClient({
                                         feedbackId,
                                         ratingLabels,
                                         thankYouText,
                                     }: RatingClientProps) {
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const submitRating = async (rating: number) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(
                `http://localhost:8080/api/public/feedback/${feedbackId}/respond`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ rating }),
                }
            );

            const data: SubmitResponse = await response.json();

            if (data.code === "SUCCESS") {
                setSubmitted(true);
                return;
            }

            setError(data.message || "Failed to submit feedback.");
        } catch {
            setError("Something went wrong while submitting feedback.");
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <div className="mt-8 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-300">
                    Submitted Successfully
                </p>
                <h2 className="mt-3 text-2xl font-semibold text-white">Thank You</h2>
                <p className="mt-3 leading-7 text-slate-200">{thankYouText}</p>
            </div>
        );
    }

    return (
        <div className="mt-8">
            <div className="mb-5">
                <h2 className="text-xl font-semibold text-white">
                    Rate your experience
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                    Please select a rating from 1 to 5 based on your chat session.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-5">
                {ratingLabels.map((label, index) => (
                    <button
                        key={index}
                        type="button"
                        onClick={() => submitRating(index + 1)}
                        disabled={loading}
                        className="group rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-4 text-left transition hover:border-emerald-400 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <div className="text-lg font-bold text-white">{index + 1}</div>
                        <div className="mt-2 text-sm leading-6 text-slate-400 transition group-hover:text-slate-200">
                            {label}
                        </div>
                    </button>
                ))}
            </div>

            {error && (
                <div className="mt-5 rounded-2xl border border-red-500/30 bg-red-500/10 p-4">
                    <p className="text-sm text-red-300">{error}</p>
                </div>
            )}

            {loading && (
                <p className="mt-4 text-sm text-slate-400">Submitting feedback...</p>
            )}
        </div>
    );
}