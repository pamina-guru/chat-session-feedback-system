type AdminPageProps = {
    params: Promise<{
        enterpriseId: string;
    }>;
};

export default async function AdminSessionFeedbackFormPage({ params }: AdminPageProps) {
    const { enterpriseId } = await params;

    return (
        <main className="min-h-screen p-6">
            <div className="mx-auto max-w-5xl">
                <h1 className="text-3xl font-bold">Session Feedback Form Admin</h1>
                <p className="mt-2 text-gray-600">Enterprise ID: {enterpriseId}</p>

                <div className="mt-8 rounded-lg border p-6">
                    <p className="text-sm text-gray-500">
                        Admin feedback form editor will be implemented here.
                    </p>
                </div>
            </div>
        </main>
    );
}