package com.pamina.feedback.controller

import com.pamina.feedback.dto.RespondFeedbackRequest
import com.pamina.feedback.repository.FeedbackFormConfigRepository
import com.pamina.feedback.repository.FeedbackRequestRepository
import org.springframework.web.bind.annotation.*
import java.time.Instant

@CrossOrigin(origins = ["http://localhost:3000"])
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
            feedbackRequest.expiresAt.isBefore(Instant.now()) -> "EXPIRED"
            else -> "ACTIVE"
        }

        return mapOf(
            "feedbackId" to feedbackRequest.feedbackId,
            "enterpriseId" to feedbackRequest.enterpriseId,
            "status" to status,
            "formConfig" to formConfig
        )
    }

    @PostMapping("/{feedbackId}/respond")
    fun respondToFeedback(
        @PathVariable feedbackId: String,
        @RequestBody request: RespondFeedbackRequest
    ): Map<String, Any> {

        val feedbackRequest = feedbackRequestRepository.findByFeedbackId(feedbackId)
            ?: return mapOf(
                "code" to "INVALID",
                "message" to "Feedback request not found."
            )

        if (feedbackRequest.respondedAt != null) {
            return mapOf(
                "code" to "ALREADY_RESPONDED",
                "message" to "This feedback request has already been used."
            )
        }

        if (feedbackRequest.expiresAt.isBefore(Instant.now())) {
            return mapOf(
                "code" to "EXPIRED",
                "message" to "This feedback request has expired."
            )
        }

        if (request.rating !in 1..5) {
            return mapOf(
                "code" to "VALIDATION_ERROR",
                "message" to "Rating must be between 1 and 5."
            )
        }

        val updatedRequest = feedbackRequest.copy(
            rating = request.rating,
            respondedAt = Instant.now()
        )

        feedbackRequestRepository.save(updatedRequest)

        return mapOf(
            "code" to "SUCCESS",
            "message" to "Feedback submitted successfully."
        )
    }
}