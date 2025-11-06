package com.tripsync

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class TripSyncApplication

fun main(args: Array<String>) {
    runApplication<TripSyncApplication>(*args)
}
