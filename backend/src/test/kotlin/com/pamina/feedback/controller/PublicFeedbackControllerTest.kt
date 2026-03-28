package com.pamina.feedback.controller

import com.pamina.feedback.dto.RespondFeedbackRequest
import com.pamina.feedback.model.Channel
import com.pamina.feedback.model.FeedbackFormConfig
import com.pamina.feedback.model.FeedbackRequest
import com.pamina.feedback.repository.FeedbackFormConfigRepository
import com.pamina.feedback.repository.FeedbackRequestRepository
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import org.mockito.Mockito.`when`
import org.mockito.Mockito.mock
import java.time.Instant
import java.time.temporal.ChronoUnit

class PublicFeedbackControllerTest {

    private val feedbackRequestRepository: FeedbackRequestRepository =
        mock(FeedbackRequestRepository::class.java)

    private val feedbackFormConfigRepository: FeedbackFormConfigRepository =
        mock(FeedbackFormConfigRepository::class.java)

    private val controller = PublicFeedbackController(
        feedbackRequestRepository,
        feedbackFormConfigRepository
    )

    private fun validRequest(): FeedbackRequest {
        return FeedbackRequest(
            feedbackId = "fb-test-001",
            enterpriseId = "acme-bank",
            channel = Channel.WEB,
            expiresAt = Instant.now().plus(1, ChronoUnit.DAYS)
        )
    }

    private fun formConfig(): FeedbackFormConfig {
        return FeedbackFormConfig(
            enterpriseId = "acme-bank",
            headerText = "Header",
            headerDescription = "Desc",
            footerText = "Footer",
            ratingLabels = listOf("1", "2", "3", "4", "5"),
            thankYouText = "Thanks",
            invalidReplyText = "Invalid",
            expiredReplyText = "Expired message",
            skipForChannels = emptyList()
        )
    }

    // ✅ SUCCESS
    @Test
    fun `should submit feedback successfully`() {
        val request = validRequest()

        `when`(feedbackRequestRepository.findByFeedbackId("fb-test-001"))
            .thenReturn(request)

        `when`(feedbackFormConfigRepository.findByEnterpriseId("acme-bank"))
            .thenReturn(formConfig())

        val response = controller.respondToFeedback(
            "fb-test-001",
            RespondFeedbackRequest(rating = 5)
        )

        assertEquals("SUCCESS", response["code"])
        assertEquals("Feedback submitted successfully.", response["message"])
    }

    // ❌ INVALID (not found)
    @Test
    fun `should return invalid when feedbackId not found`() {
        `when`(feedbackRequestRepository.findByFeedbackId("invalid-id"))
            .thenReturn(null)

        val response = controller.respondToFeedback(
            "invalid-id",
            RespondFeedbackRequest(rating = 5)
        )

        assertEquals("INVALID", response["code"])
    }

    // ❌ ALREADY RESPONDED
    @Test
    fun `should return already responded when already used`() {
        val request = validRequest().copy(
            respondedAt = Instant.now()
        )

        `when`(feedbackRequestRepository.findByFeedbackId("fb-test-001"))
            .thenReturn(request)

        val response = controller.respondToFeedback(
            "fb-test-001",
            RespondFeedbackRequest(rating = 4)
        )

        assertEquals("ALREADY_RESPONDED", response["code"])
    }

    // ❌ EXPIRED
    @Test
    fun `should return expired when request is expired`() {
        val request = validRequest().copy(
            expiresAt = Instant.now().minus(1, ChronoUnit.DAYS)
        )

        `when`(feedbackRequestRepository.findByFeedbackId("fb-test-001"))
            .thenReturn(request)

        `when`(feedbackFormConfigRepository.findByEnterpriseId("acme-bank"))
            .thenReturn(formConfig())

        val response = controller.respondToFeedback(
            "fb-test-001",
            RespondFeedbackRequest(rating = 4)
        )

        assertEquals("EXPIRED", response["code"])
        assertEquals("Expired message", response["message"])
    }

    // ❌ VALIDATION ERROR
    @Test
    fun `should reject invalid rating`() {
        val request = validRequest()

        `when`(feedbackRequestRepository.findByFeedbackId("fb-test-001"))
            .thenReturn(request)

        val response = controller.respondToFeedback(
            "fb-test-001",
            RespondFeedbackRequest(rating = 10)
        )

        assertEquals("VALIDATION_ERROR", response["code"])
        assertEquals("Rating must be between 1 and 5.", response["message"])
    }
}