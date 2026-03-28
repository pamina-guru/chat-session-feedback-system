export type Channel = "WHATSAPP" | "INSTAGRAM" | "MESSENGER" | "WEB";

export type FeedbackFormConfig = {
    enterpriseId: string;
    headerText: string;
    headerDescription?: string | null;
    footerText?: string | null;
    ratingLabels: string[];
    thankYouText: string;
    invalidReplyText: string;
    expiredReplyText: string;
    skipForChannels: Channel[];
};

export type FeedbackRequestStatus =
    | "ACTIVE"
    | "EXPIRED"
    | "ALREADY_RESPONDED"
    | "INVALID";

export type PublicFeedbackView = {
    feedbackId: string;
    enterpriseId: string;
    status: FeedbackRequestStatus;
    expiresAt?: string;
    respondedAt?: string | null;
    formConfig?: FeedbackFormConfig;
};

export type RespondFeedbackRequest = {
    rating: number;
};

export type ApiErrorResponse = {
    code: string;
    message: string;
    fieldErrors?: Record<string, string>;
};