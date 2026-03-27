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

    companion object {
        private const val MAX_HEADER_TEXT_LENGTH = 120
        private const val MAX_HEADER_DESCRIPTION_LENGTH = 300
        private const val MAX_FOOTER_TEXT_LENGTH = 200
        private const val MAX_RATING_LABEL_LENGTH = 30
        private const val MAX_THANK_YOU_TEXT_LENGTH = 200
        private const val MAX_INVALID_REPLY_TEXT_LENGTH = 200
        private const val MAX_EXPIRED_REPLY_TEXT_LENGTH = 200
    }

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

        if (request.headerText.length > MAX_HEADER_TEXT_LENGTH) {
            throw ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                "Header text must not exceed $MAX_HEADER_TEXT_LENGTH characters."
            )
        }

        if (!request.headerDescription.isNullOrBlank() &&
            request.headerDescription.length > MAX_HEADER_DESCRIPTION_LENGTH
        ) {
            throw ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                "Header description must not exceed $MAX_HEADER_DESCRIPTION_LENGTH characters."
            )
        }

        if (!request.footerText.isNullOrBlank() &&
            request.footerText.length > MAX_FOOTER_TEXT_LENGTH
        ) {
            throw ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                "Footer text must not exceed $MAX_FOOTER_TEXT_LENGTH characters."
            )
        }

        if (request.thankYouText.isBlank()) {
            throw ResponseStatusException(HttpStatus.BAD_REQUEST, "Thank you text must not be blank.")
        }

        if (request.thankYouText.length > MAX_THANK_YOU_TEXT_LENGTH) {
            throw ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                "Thank you text must not exceed $MAX_THANK_YOU_TEXT_LENGTH characters."
            )
        }

        if (request.invalidReplyText.isBlank()) {
            throw ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid reply text must not be blank.")
        }

        if (request.invalidReplyText.length > MAX_INVALID_REPLY_TEXT_LENGTH) {
            throw ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                "Invalid reply text must not exceed $MAX_INVALID_REPLY_TEXT_LENGTH characters."
            )
        }

        if (request.expiredReplyText.isBlank()) {
            throw ResponseStatusException(HttpStatus.BAD_REQUEST, "Expired reply text must not be blank.")
        }

        if (request.expiredReplyText.length > MAX_EXPIRED_REPLY_TEXT_LENGTH) {
            throw ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                "Expired reply text must not exceed $MAX_EXPIRED_REPLY_TEXT_LENGTH characters."
            )
        }

        if (request.ratingLabels.size != 5) {
            throw ResponseStatusException(HttpStatus.BAD_REQUEST, "Exactly 5 rating labels are required.")
        }

        if (request.ratingLabels.any { it.isBlank() }) {
            throw ResponseStatusException(HttpStatus.BAD_REQUEST, "Rating labels must not be blank.")
        }

        if (request.ratingLabels.any { it.length > MAX_RATING_LABEL_LENGTH }) {
            throw ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                "Each rating label must not exceed $MAX_RATING_LABEL_LENGTH characters."
            )
        }

        if (request.skipForChannels.size != request.skipForChannels.distinct().size) {
            throw ResponseStatusException(HttpStatus.BAD_REQUEST, "Duplicate skip channels are not allowed.")
        }
    }
}