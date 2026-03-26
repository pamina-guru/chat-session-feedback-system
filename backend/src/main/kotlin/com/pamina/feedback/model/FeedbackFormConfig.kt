package com.pamina.feedback.model

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document

@Document(collection = "feedback_form_configs")
data class FeedbackFormConfig(
    @Id
    val id: String? = null,
    val enterpriseId: String,
    val headerText: String,
    val headerDescription: String? = null,
    val footerText: String? = null,
    val ratingLabels: List<String>,
    val thankYouText: String,
    val invalidReplyText: String,
    val expiredReplyText: String,
    val skipForChannels: List<Channel> = emptyList()
)