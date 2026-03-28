package com.pamina.feedback.controller

import com.pamina.feedback.model.Channel
import com.pamina.feedback.model.FeedbackFormConfig
import com.pamina.feedback.repository.FeedbackFormConfigRepository
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertNotNull
import org.junit.jupiter.api.Assertions.assertThrows
import org.junit.jupiter.api.Test
import org.mockito.ArgumentMatchers.any
import org.mockito.Mockito.`when`
import org.mockito.Mockito.mock
import org.springframework.http.HttpStatus
import org.springframework.web.server.ResponseStatusException

class AdminFeedbackControllerTest {

    private val repository: FeedbackFormConfigRepository =
        mock(FeedbackFormConfigRepository::class.java)

    private val controller = AdminFeedbackController(repository)

    private fun validConfig(): FeedbackFormConfig {
        return FeedbackFormConfig(
            enterpriseId = "acme-bank",
            headerText = "How was your experience?",
            headerDescription = "Please rate your recent support session.",
            footerText = "Thank you for your time.",
            ratingLabels = listOf("Very Bad", "Bad", "Okay", "Good", "Excellent"),
            thankYouText = "Thanks for your feedback!",
            invalidReplyText = "Invalid feedback link.",
            expiredReplyText = "This link has expired.",
            skipForChannels = listOf(Channel.INSTAGRAM)
        )
    }

    @Test
    fun `should save valid feedback form config`() {
        val request = validConfig()

        `when`(repository.findByEnterpriseId("acme-bank")).thenReturn(null)
        `when`(repository.save(any(FeedbackFormConfig::class.java))).thenAnswer { invocation ->
            invocation.arguments[0] as FeedbackFormConfig
        }

        val result = controller.updateFeedbackForm("acme-bank", request)

        assertNotNull(result)
        assertEquals("acme-bank", result.enterpriseId)
        assertEquals("How was your experience?", result.headerText)
    }

    @Test
    fun `should reject blank header text`() {
        val request = validConfig().copy(headerText = "")

        val ex = assertThrows(ResponseStatusException::class.java) {
            controller.updateFeedbackForm("acme-bank", request)
        }

        assertEquals(HttpStatus.BAD_REQUEST, ex.statusCode)
        assertEquals("Header text must not be blank.", ex.reason)
    }

    @Test
    fun `should reject rating labels when not exactly five`() {
        val request = validConfig().copy(
            ratingLabels = listOf("Bad", "Okay", "Good")
        )

        val ex = assertThrows(ResponseStatusException::class.java) {
            controller.updateFeedbackForm("acme-bank", request)
        }

        assertEquals(HttpStatus.BAD_REQUEST, ex.statusCode)
        assertEquals("Exactly 5 rating labels are required.", ex.reason)
    }

    @Test
    fun `should reject duplicate skip channels`() {
        val request = validConfig().copy(
            skipForChannels = listOf(Channel.INSTAGRAM, Channel.INSTAGRAM)
        )

        val ex = assertThrows(ResponseStatusException::class.java) {
            controller.updateFeedbackForm("acme-bank", request)
        }

        assertEquals(HttpStatus.BAD_REQUEST, ex.statusCode)
        assertEquals("Duplicate skip channels are not allowed.", ex.reason)
    }
}