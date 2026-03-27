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
        seedFeedbackFormConfig(feedbackFormConfigRepository)
        seedFeedbackRequests(feedbackRequestRepository)
    }

    private fun seedFeedbackFormConfig(
        feedbackFormConfigRepository: FeedbackFormConfigRepository
    ) {
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
    }

    private fun seedFeedbackRequests(
        feedbackRequestRepository: FeedbackRequestRepository
    ) {
        val now = Instant.now()

        saveIfMissing(
            feedbackRequestRepository = feedbackRequestRepository,
            feedbackRequest = FeedbackRequest(
                feedbackId = "fb-valid-001",
                enterpriseId = "acme-bank",
                channel = Channel.WEB,
                expiresAt = now.plus(2, ChronoUnit.DAYS)
            )
        )

        saveIfMissing(
            feedbackRequestRepository = feedbackRequestRepository,
            feedbackRequest = FeedbackRequest(
                feedbackId = "fb-valid-002",
                enterpriseId = "acme-bank",
                channel = Channel.WEB,
                expiresAt = now.plus(2, ChronoUnit.DAYS)
            )
        )

        saveIfMissing(
            feedbackRequestRepository = feedbackRequestRepository,
            feedbackRequest = FeedbackRequest(
                feedbackId = "fb-valid-003",
                enterpriseId = "acme-bank",
                channel = Channel.WEB,
                expiresAt = now.plus(2, ChronoUnit.DAYS)
            )
        )

        saveIfMissing(
            feedbackRequestRepository = feedbackRequestRepository,
            feedbackRequest = FeedbackRequest(
                feedbackId = "fb-valid-004",
                enterpriseId = "acme-bank",
                channel = Channel.WEB,
                expiresAt = now.plus(2, ChronoUnit.DAYS)
            )
        )

        saveIfMissing(
            feedbackRequestRepository = feedbackRequestRepository,
            feedbackRequest = FeedbackRequest(
                feedbackId = "fb-valid-005",
                enterpriseId = "acme-bank",
                channel = Channel.WEB,
                expiresAt = now.plus(2, ChronoUnit.DAYS)
            )
        )

        saveIfMissing(
            feedbackRequestRepository = feedbackRequestRepository,
            feedbackRequest = FeedbackRequest(
                feedbackId = "fb-expired-001",
                enterpriseId = "acme-bank",
                channel = Channel.WEB,
                expiresAt = now.minus(2, ChronoUnit.DAYS)
            )
        )

        saveIfMissing(
            feedbackRequestRepository = feedbackRequestRepository,
            feedbackRequest = FeedbackRequest(
                feedbackId = "fb-used-001",
                enterpriseId = "acme-bank",
                channel = Channel.WEB,
                expiresAt = now.plus(2, ChronoUnit.DAYS),
                respondedAt = now.minus(1, ChronoUnit.HOURS),
                rating = 4
            )
        )
    }

    private fun saveIfMissing(
        feedbackRequestRepository: FeedbackRequestRepository,
        feedbackRequest: FeedbackRequest
    ) {
        if (feedbackRequestRepository.findByFeedbackId(feedbackRequest.feedbackId) == null) {
            feedbackRequestRepository.save(feedbackRequest)
        }
    }
}