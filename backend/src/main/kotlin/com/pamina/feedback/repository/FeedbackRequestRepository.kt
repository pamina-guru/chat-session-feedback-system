package com.pamina.feedback.repository

import com.pamina.feedback.model.FeedbackRequest
import org.springframework.data.mongodb.repository.MongoRepository

interface FeedbackRequestRepository : MongoRepository<FeedbackRequest, String> {
    fun findByFeedbackId(feedbackId: String): FeedbackRequest?
}