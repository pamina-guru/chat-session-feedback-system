package com.pamina.feedback.repository

import com.pamina.feedback.model.Channel
import com.pamina.feedback.model.FeedbackRequest
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertNotNull
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import java.time.Instant
import java.time.temporal.ChronoUnit

@SpringBootTest
class FeedbackRequestRepositoryTest {

    @Autowired
    lateinit var repository: FeedbackRequestRepository

    @BeforeEach
    fun setUp() {
        repository.deleteAll()
    }

    @Test
    fun `should find feedback request by feedbackId`() {
        val request = FeedbackRequest(
            feedbackId = "test-repo-001",
            enterpriseId = "acme-bank",
            channel = Channel.WEB,
            expiresAt = Instant.now().plus(1, ChronoUnit.DAYS)
        )

        repository.save(request)

        val result = repository.findByFeedbackId("test-repo-001")

        assertNotNull(result)
        assertEquals("test-repo-001", result?.feedbackId)
        assertEquals("acme-bank", result?.enterpriseId)
    }
}