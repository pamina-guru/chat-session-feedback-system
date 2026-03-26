package com.pamina.feedback.model

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document
import java.time.Instant

@Document(collection = "feedback_requests")
data class FeedbackRequest(
    @Id
    val id: String? = null,
    val feedbackId: String,
    val enterpriseId: String,
    val channel: Channel,
    val expiresAt: Instant,
    val respondedAt: Instant? = null,
    val rating: Int? = null
)