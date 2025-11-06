package com.tripsync.controller

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import reactor.core.publisher.Mono

@RestController
@RequestMapping("/health")
class HealthController {

    @GetMapping
    fun health(): Mono<Map<String, String>> {
        return Mono.just(
            mapOf(
                "status" to "UP",
                "service" to "TripSync Backend",
                "version" to "0.0.1"
            )
        )
    }
}
