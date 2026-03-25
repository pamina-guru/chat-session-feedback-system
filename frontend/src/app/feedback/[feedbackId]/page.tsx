type PublicFeedbackPageProps = {
    params: Promise<{
        feedbackId: string;
    }>;
};

export default async function PublicFeedbackPage({ params }: PublicFeedbackPageProps) {
    const { feedbackId } = await params;

    return (
        <main className="min-h-screen p-6">
            <div className="mx-auto max-w-3xl">
                <h1 className="text-3xl font-bold">Session Feedback</h1>
                <p className="mt-2 text-gray-600">Feedback ID: {feedbackId}</p>

                <div className="mt-8 rounded-lg border p-6">
                    <p className="text-sm text-gray-500">
                        Public feedback page will be implemented here.
                    </p>
                </div>
            </div>
        </main>
    );
}