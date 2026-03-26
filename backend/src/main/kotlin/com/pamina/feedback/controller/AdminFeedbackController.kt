package com.pamina.feedback.controller

import com.pamina.feedback.model.FeedbackFormConfig
import com.pamina.feedback.repository.FeedbackFormConfigRepository
import org.springframework.web.bind.annotation.*

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

        val existing = feedbackFormConfigRepository.findByEnterpriseId(enterpriseId)

        val updated = request.copy(
            id = existing?.id, // preserve MongoDB document id
            enterpriseId = enterpriseId // enforce correct enterprise
        )

        return feedbackFormConfigRepository.save(updated)
    }
}