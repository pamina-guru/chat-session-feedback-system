package com.pamina.feedback.controller

import com.pamina.feedback.model.FeedbackFormConfig
import com.pamina.feedback.repository.FeedbackFormConfigRepository
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

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
}