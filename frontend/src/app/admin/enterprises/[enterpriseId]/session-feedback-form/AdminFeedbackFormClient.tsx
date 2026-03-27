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

const CHANNEL_OPTIONS = ["WHATSAPP", "INSTAGRAM", "MESSENGER", "WEB"];

export default function AdminFeedbackFormClient({ initialData }: Props) {
    const [form, setForm] = useState(initialData);
    const [loading, setLoading] = useState(false);
    const [saved, setSaved] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const updateField = (field: keyof FeedbackFormConfig, value: string) => {
        setSaved(false);
        setError(null);
        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const updateRatingLabel = (index: number, value: string) => {
        setSaved(false);
        setError(null);

        const updatedLabels = [...form.ratingLabels];
        updatedLabels[index] = value;

        setForm((prev) => ({
            ...prev,
            ratingLabels: updatedLabels,
        }));
    };

    const toggleSkipChannel = (channel: string) => {
        setSaved(false);
        setError(null);

        setForm((prev) => ({
            ...prev,
            skipForChannels: prev.skipForChannels.includes(channel)
                ? prev.skipForChannels.filter((c) => c !== channel)
                : [...prev.skipForChannels, channel],
        }));
    };

    const handleSave = async () => {
        setLoading(true);
        setSaved(false);
        setError(null);

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

            if (!res.ok) {
                let message = "Failed to save changes.";

                try {
                    const errorData = await res.json();

                    if (errorData?.message) {
                        message = errorData.message;
                    }
                } catch {
                    // fallback message
                }

                throw new Error(message);
            }

            setSaved(true);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Failed to save changes.");
            }
        } finally {
            setLoading(false);
        }
    };

    const inputClassName =
        "w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20";

    return (
        <div className="mt-8 grid gap-8 xl:grid-cols-[1.15fr_0.85fr]">
            <div className="space-y-8">
                <section className="rounded-3xl border border-slate-800 bg-slate-950/60 p-6">
                    <h2 className="text-xl font-semibold text-white">Form Content</h2>
                    <p className="mt-2 text-sm leading-6 text-slate-400">
                        Edit the text and messages shown in the customer feedback form.
                    </p>

                    <div className="mt-6 space-y-5">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-200">
                                Header
                            </label>
                            <input
                                value={form.headerText}
                                onChange={(e) => updateField("headerText", e.target.value)}
                                className={inputClassName}
                                placeholder="Enter form header"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-200">
                                Description
                            </label>
                            <textarea
                                value={form.headerDescription}
                                onChange={(e) => updateField("headerDescription", e.target.value)}
                                className={inputClassName}
                                rows={4}
                                placeholder="Enter a short description for the feedback form"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-200">
                                Footer
                            </label>
                            <input
                                value={form.footerText}
                                onChange={(e) => updateField("footerText", e.target.value)}
                                className={inputClassName}
                                placeholder="Enter footer text"
                            />
                        </div>
                    </div>
                </section>

                <section className="rounded-3xl border border-slate-800 bg-slate-950/60 p-6">
                    <h2 className="text-xl font-semibold text-white">Rating Labels</h2>
                    <p className="mt-2 text-sm leading-6 text-slate-400">
                        Define the five labels customers will see for ratings 1 to 5.
                    </p>

                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                        {form.ratingLabels.map((label, index) => (
                            <div key={index}>
                                <label className="mb-2 block text-sm font-medium text-slate-200">
                                    Rating {index + 1}
                                </label>
                                <input
                                    value={label}
                                    onChange={(e) => updateRatingLabel(index, e.target.value)}
                                    className={inputClassName}
                                    placeholder={`Label for rating ${index + 1}`}
                                />
                            </div>
                        ))}
                    </div>
                </section>

                <section className="rounded-3xl border border-slate-800 bg-slate-950/60 p-6">
                    <h2 className="text-xl font-semibold text-white">Response Messages</h2>
                    <p className="mt-2 text-sm leading-6 text-slate-400">
                        Configure the messages shown for successful, invalid, and expired
                        feedback requests.
                    </p>

                    <div className="mt-6 space-y-5">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-200">
                                Thank You Text
                            </label>
                            <input
                                value={form.thankYouText}
                                onChange={(e) => updateField("thankYouText", e.target.value)}
                                className={inputClassName}
                                placeholder="Enter thank you message"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-200">
                                Invalid Reply Text
                            </label>
                            <input
                                value={form.invalidReplyText}
                                onChange={(e) => updateField("invalidReplyText", e.target.value)}
                                className={inputClassName}
                                placeholder="Enter invalid link message"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-200">
                                Expired Reply Text
                            </label>
                            <input
                                value={form.expiredReplyText}
                                onChange={(e) => updateField("expiredReplyText", e.target.value)}
                                className={inputClassName}
                                placeholder="Enter expired link message"
                            />
                        </div>
                    </div>
                </section>

                <section className="rounded-3xl border border-slate-800 bg-slate-950/60 p-6">
                    <h2 className="text-xl font-semibold text-white">Channel Settings</h2>
                    <p className="mt-2 text-sm leading-6 text-slate-400">
                        Select the channels where feedback should be skipped.
                    </p>

                    <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {CHANNEL_OPTIONS.map((channel) => {
                            const checked = form.skipForChannels.includes(channel);

                            return (
                                <label
                                    key={channel}
                                    className={`flex cursor-pointer items-center justify-between rounded-2xl border px-4 py-4 transition ${
                                        checked
                                            ? "border-sky-400 bg-sky-400/10"
                                            : "border-slate-700 bg-slate-950/70 hover:border-slate-500"
                                    }`}
                                >
                                    <div>
                                        <p className="font-medium text-white">{channel}</p>
                                        <p className="mt-1 text-sm text-slate-400">
                                            Skip feedback request for this channel
                                        </p>
                                    </div>
                                    <input
                                        type="checkbox"
                                        checked={checked}
                                        onChange={() => toggleSkipChannel(channel)}
                                        className="h-4 w-4 accent-sky-400"
                                    />
                                </label>
                            );
                        })}
                    </div>
                </section>

                <section className="rounded-3xl border border-slate-800 bg-slate-950/60 p-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                        <button
                            type="button"
                            onClick={handleSave}
                            disabled={loading}
                            className="inline-flex items-center justify-center rounded-2xl bg-sky-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-sky-300 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {loading ? "Saving..." : "Save Changes"}
                        </button>

                        {saved && (
                            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3">
                                <p className="text-sm text-emerald-300">
                                    Changes saved successfully.
                                </p>
                            </div>
                        )}

                        {error && (
                            <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3">
                                <p className="text-sm text-red-300">{error}</p>
                            </div>
                        )}
                    </div>
                </section>
            </div>

            <aside className="xl:sticky xl:top-8 xl:self-start">
                <div className="rounded-3xl border border-slate-800 bg-slate-950/60 p-6">
                    <p className="text-sm font-medium uppercase tracking-[0.2em] text-sky-400">
                        Live Preview
                    </p>
                    <h2 className="mt-4 text-2xl font-bold text-white">
                        Public Feedback Form
                    </h2>
                    <p className="mt-3 text-sm leading-6 text-slate-400">
                        This is how the customer-facing form will appear.
                    </p>

                    <div className="mt-6 rounded-3xl border border-slate-700 bg-slate-900 p-6 shadow-inner">
                        <h3 className="text-2xl font-bold text-white">{form.headerText}</h3>

                        {form.headerDescription && (
                            <p className="mt-3 text-sm leading-7 text-slate-300">
                                {form.headerDescription}
                            </p>
                        )}

                        <div className="mt-6 grid grid-cols-1 gap-3">
                            {form.ratingLabels.map((label, index) => (
                                <div
                                    key={index}
                                    className="rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-4"
                                >
                                    <div className="text-lg font-bold text-white">{index + 1}</div>
                                    <div className="mt-2 text-sm leading-6 text-slate-400">
                                        {label}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {form.footerText && (
                            <p className="mt-6 border-t border-slate-800 pt-4 text-sm leading-6 text-slate-400">
                                {form.footerText}
                            </p>
                        )}

                        {form.skipForChannels.length > 0 && (
                            <div className="mt-5 rounded-2xl border border-slate-700 bg-slate-950/70 p-4">
                                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                                    Skipped Channels
                                </p>
                                <p className="mt-2 text-sm text-slate-300">
                                    {form.skipForChannels.join(", ")}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </aside>
        </div>
    );
}