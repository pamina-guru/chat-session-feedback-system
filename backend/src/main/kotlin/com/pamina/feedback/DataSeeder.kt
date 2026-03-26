package com.pamina.feedback

import com.pamina.feedback.model.Channel
import com.pamina.feedback.model.FeedbackFormConfig
import com.pamina.feedback.model.FeedbackRequest
import com.pamina.feedback.repository.FeedbackFormConfigRepository
import com.pamina.feedback.repository.FeedbackRequestRepository
import org.springframework.boot.CommandLineRunner
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import java.time.Instant
import java.time.temporal.ChronoUnit

@Configuration
class DataSeeder {

    @Bean
    fun seedData(
        feedbackFormConfigRepository: FeedbackFormConfigRepository,
        feedbackRequestRepository: FeedbackRequestRepository
    ) = CommandLineRunner {
        if (feedbackFormConfigRepository.findByEnterpriseId("acme-bank") == null) {
            feedbackFormConfigRepository.save(
                FeedbackFormConfig(
                    enterpriseId = "acme-bank",
                    headerText = "How was your support session?",
                    headerDescription = "Please rate your recent chatbot session.",
                    footerText = "Thank you for helping us improve.",
                    ratingLabels = listOf("Very Bad", "Bad", "Okay", "Good", "Excellent"),
                    thankYouText = "Thank you for your feedback!",
                    invalidReplyText = "This feedback link is invalid.",
                    expiredReplyText = "This feedback link has expired.",
                    skipForChannels = listOf(Channel.INSTAGRAM)
                )
            )
        }

        if (feedbackRequestRepository.findByFeedbackId("fb-valid-001") == null) {
            feedbackRequestRepository.save(
                FeedbackRequest(
                    feedbackId = "fb-valid-001",
                    enterpriseId = "acme-bank",
                    channel = Channel.WEB,
                    expiresAt = Instant.now().plus(2, ChronoUnit.DAYS)
                )
            )
        }

        if (feedbackRequestRepository.findByFeedbackId("fb-expired-001") == null) {
            feedbackRequestRepository.save(
                FeedbackRequest(
                    feedbackId = "fb-expired-001",
                    enterpriseId = "acme-bank",
                    channel = Channel.WEB,
                    expiresAt = Instant.now().minus(2, ChronoUnit.DAYS)
                )
            )
        }

        if (feedbackRequestRepository.findByFeedbackId("fb-used-001") == null) {
            feedbackRequestRepository.save(
                FeedbackRequest(
                    feedbackId = "fb-used-001",
                    enterpriseId = "acme-bank",
                    channel = Channel.WEB,
                    expiresAt = Instant.now().plus(2, ChronoUnit.DAYS),
                    respondedAt = Instant.now().minus(1, ChronoUnit.HOURS),
                    rating = 4
                )
            )
        }

        if (feedbackRequestRepository.findByFeedbackId("fb-valid-002") == null) {
            feedbackRequestRepository.save(
                FeedbackRequest(
                    feedbackId = "fb-valid-002",
                    enterpriseId = "acme-bank",
                    channel = Channel.WEB,
                    expiresAt = Instant.now().plus(2, ChronoUnit.DAYS)
                )
            )
        }
    }
}