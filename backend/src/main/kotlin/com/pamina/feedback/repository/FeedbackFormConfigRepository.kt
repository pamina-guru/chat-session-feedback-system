package com.pamina.feedback.repository

import com.pamina.feedback.model.FeedbackFormConfig
import org.springframework.data.mongodb.repository.MongoRepository

interface FeedbackFormConfigRepository : MongoRepository<FeedbackFormConfig, String> {
    fun findByEnterpriseId(enterpriseId: String): FeedbackFormConfig?
}