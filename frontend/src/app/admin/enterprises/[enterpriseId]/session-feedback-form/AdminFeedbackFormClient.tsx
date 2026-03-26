"use client";

import { useState } from "react";

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
    initialData: FeedbackFormConfig;
};

export default function AdminFeedbackFormClient({ initialData }: Props) {
    const [form, setForm] = useState(initialData);
    const [loading, setLoading] = useState(false);
    const [saved, setSaved] = useState(false);

    const updateField = (field: keyof FeedbackFormConfig, value: string) => {
        setSaved(false);
        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const updateRatingLabel = (index: number, value: string) => {
        setSaved(false);
        const updatedLabels = [...form.ratingLabels];
        updatedLabels[index] = value;

        setForm((prev) => ({
            ...prev,
            ratingLabels: updatedLabels,
        }));
    };

    const handleSave = async () => {
        setLoading(true);
        setSaved(false);

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/enterprises/${form.enterpriseId}/session-feedback-form`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(form),
                }
            );

            if (!res.ok) throw new Error("Failed");

            setSaved(true);
        } catch {
            alert("Failed to save changes.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-6 space-y-6">
            <div>
                <label className="mb-2 block font-semibold">Header</label>
                <input
                    value={form.headerText}
                    onChange={(e) => updateField("headerText", e.target.value)}
                    className="w-full rounded-lg border bg-transparent px-4 py-3"
                />
            </div>

            <div>
                <label className="mb-2 block font-semibold">Description</label>
                <textarea
                    value={form.headerDescription}
                    onChange={(e) => updateField("headerDescription", e.target.value)}
                    className="w-full rounded-lg border bg-transparent px-4 py-3"
                    rows={3}
                />
            </div>

            <div>
                <label className="mb-2 block font-semibold">Footer</label>
                <input
                    value={form.footerText}
                    onChange={(e) => updateField("footerText", e.target.value)}
                    className="w-full rounded-lg border bg-transparent px-4 py-3"
                />
            </div>

            <div>
                <label className="mb-3 block font-semibold">Rating Labels</label>
                <div className="grid gap-3 sm:grid-cols-2">
                    {form.ratingLabels.map((label, index) => (
                        <input
                            key={index}
                            value={label}
                            onChange={(e) => updateRatingLabel(index, e.target.value)}
                            className="rounded-lg border bg-transparent px-4 py-3"
                        />
                    ))}
                </div>
            </div>

            <div>
                <label className="mb-2 block font-semibold">Thank You Text</label>
                <input
                    value={form.thankYouText}
                    onChange={(e) => updateField("thankYouText", e.target.value)}
                    className="w-full rounded-lg border bg-transparent px-4 py-3"
                />
            </div>

            <div>
                <label className="mb-2 block font-semibold">Invalid Reply Text</label>
                <input
                    value={form.invalidReplyText}
                    onChange={(e) => updateField("invalidReplyText", e.target.value)}
                    className="w-full rounded-lg border bg-transparent px-4 py-3"
                />
            </div>

            <div>
                <label className="mb-2 block font-semibold">Expired Reply Text</label>
                <input
                    value={form.expiredReplyText}
                    onChange={(e) => updateField("expiredReplyText", e.target.value)}
                    className="w-full rounded-lg border bg-transparent px-4 py-3"
                />
            </div>

            {/* Save Button */}
            <div className="pt-4">
                <button
                    onClick={handleSave}
                    disabled={loading}
                    className="rounded-lg bg-white px-6 py-3 font-semibold text-black transition hover:opacity-90 disabled:opacity-50"
                >
                    {loading ? "Saving..." : "Save Changes"}
                </button>

                {saved && (
                    <p className="mt-3 text-green-400">Changes saved successfully.</p>
                )}
            </div>
        </div>
    );
}