package com.pamina.feedback.controller

import com.pamina.feedback.model.FeedbackFormConfig
import com.pamina.feedback.repository.FeedbackFormConfigRepository
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*
import org.springframework.web.server.ResponseStatusException

@CrossOrigin(origins = ["http://localhost:3000", "http://localhost:3001"])
@RestController
@RequestMapping("/api/admin/enterprises")
class AdminFeedbackController(
    private val feedbackFormConfigRepository: FeedbackFormConfigRepository
) {

    @GetMapping("/{enterpriseId}/session-feedback-form")
    fun getFeedbackForm(@PathVariable enterpriseId: String): FeedbackFormConfig? {
        return feedbackFormConfigRepository.findByEnterpriseId(enterpriseId)
    }

    @PutMapping("/{enterpriseId}/session-feedback-form")
    fun updateFeedbackForm(
        @PathVariable enterpriseId: String,
        @RequestBody request: FeedbackFormConfig
    ): FeedbackFormConfig {
        validateFeedbackForm(request)

        val existing = feedbackFormConfigRepository.findByEnterpriseId(enterpriseId)

        val updated = request.copy(
            id = existing?.id,
            enterpriseId = enterpriseId
        )

        return feedbackFormConfigRepository.save(updated)
    }

    private fun validateFeedbackForm(request: FeedbackFormConfig) {
        if (request.headerText.isBlank()) {
            throw ResponseStatusException(HttpStatus.BAD_REQUEST, "Header text must not be blank.")
        }

        if (request.thankYouText.isBlank()) {
            throw ResponseStatusException(HttpStatus.BAD_REQUEST, "Thank you text must not be blank.")
        }

        if (request.invalidReplyText.isBlank()) {
            throw ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid reply text must not be blank.")
        }

        if (request.expiredReplyText.isBlank()) {
            throw ResponseStatusException(HttpStatus.BAD_REQUEST, "Expired reply text must not be blank.")
        }

        if (request.ratingLabels.size != 5) {
            throw ResponseStatusException(HttpStatus.BAD_REQUEST, "Exactly 5 rating labels are required.")
        }

        if (request.ratingLabels.any { it.isBlank() }) {
            throw ResponseStatusException(HttpStatus.BAD_REQUEST, "Rating labels must not be blank.")
        }

        if (request.skipForChannels.size != request.skipForChannels.distinct().size) {
            throw ResponseStatusException(HttpStatus.BAD_REQUEST, "Duplicate skip channels are not allowed.")
        }
    }
}