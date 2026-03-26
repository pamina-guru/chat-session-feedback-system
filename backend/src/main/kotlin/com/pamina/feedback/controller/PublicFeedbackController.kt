package com.pamina.feedback.controller

import com.pamina.feedback.repository.FeedbackFormConfigRepository
import com.pamina.feedback.repository.FeedbackRequestRepository
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/public/feedback")
class PublicFeedbackController(
    private val feedbackRequestRepository: FeedbackRequestRepository,
    private val feedbackFormConfigRepository: FeedbackFormConfigRepository
) {

    @GetMapping("/{feedbackId}")
    fun getFeedback(@PathVariable feedbackId: String): Map<String, Any?> {
        val feedbackRequest = feedbackRequestRepository.findByFeedbackId(feedbackId)
            ?: return mapOf(
                "feedbackId" to feedbackId,
                "status" to "INVALID"
            )

        val formConfig = feedbackFormConfigRepository.findByEnterpriseId(feedbackRequest.enterpriseId)

        val status = when {
            feedbackRequest.respondedAt != null -> "ALREADY_RESPONDED"
            feedbackRequest.expiresAt.isBefore(java.time.Instant.now()) -> "EXPIRED"
            else -> "ACTIVE"
        }

        return mapOf(
            "feedbackId" to feedbackRequest.feedbackId,
            "enterpriseId" to feedbackRequest.enterpriseId,
            "status" to status,
            "formConfig" to formConfig
        )
    }
}