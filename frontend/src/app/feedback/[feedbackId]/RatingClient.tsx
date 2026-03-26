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

    const submitRating = async (rating: number) => {
        setLoading(true);

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

            alert(data.message);
        } catch {
            alert("Something went wrong while submitting feedback.");
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <div className="mt-8 rounded-lg border p-6">
                <h2 className="text-2xl font-semibold">Thank You</h2>
                <p className="mt-3 text-gray-300">{thankYouText}</p>
            </div>
        );
    }

    return (
        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-5">
            {ratingLabels.map((label, index) => (
                <button
                    key={index}
                    type="button"
                    onClick={() => submitRating(index + 1)}
                    disabled={loading}
                    className="rounded-lg border px-4 py-3 text-left transition hover:bg-neutral-900 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <div className="font-semibold">{index + 1}</div>
                    <div className="mt-1 text-sm text-gray-400">{label}</div>
                </button>
            ))}
        </div>
    );
}