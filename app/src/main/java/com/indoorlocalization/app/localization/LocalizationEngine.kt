package com.indoorlocalization.app.localization

import com.indoorlocalization.app.data.AccessPoint
import com.indoorlocalization.app.data.Position
import com.indoorlocalization.app.data.WifiFingerprint
import kotlin.math.pow
import kotlin.math.sqrt

class LocalizationEngine {
    private var referenceFingerprints = listOf<WifiFingerprint>()
    private var currentPosition: Position? = null
    
    fun updateReferenceFingerprints(fingerprints: List<WifiFingerprint>) {
        referenceFingerprints = fingerprints
    }
    
    fun estimatePosition(currentAPs: List<AccessPoint>, k: Int = 5): Position? {
        if (referenceFingerprints.isEmpty() || currentAPs.isEmpty()) {
            return null
        }
        
        val distances = referenceFingerprints.map { fingerprint ->
            val distance = calculateEuclideanDistance(currentAPs, fingerprint.accessPoints)
            Pair(fingerprint, distance)
        }.sortedBy { it.second }
        
        val nearestK = distances.take(k)
        
        if (nearestK.isEmpty()) {
            return null
        }
        
        val totalWeight = nearestK.sumOf { 1.0 / (it.second + 1.0) }
        
        var weightedX = 0.0
        var weightedY = 0.0
        var floor = nearestK[0].first.floor
        
        nearestK.forEach { (fingerprint, distance) ->
            val weight = (1.0 / (distance + 1.0)) / totalWeight
            weightedX += fingerprint.x * weight
            weightedY += fingerprint.y * weight
        }
        
        val maxDistance = nearestK.maxOf { it.second }
        val minDistance = nearestK.minOf { it.second }
        val confidence = if (maxDistance > 0) {
            (1.0f - (minDistance / maxDistance).toFloat()).coerceIn(0f, 1f)
        } else {
            1.0f
        }
        
        currentPosition = Position(
            x = weightedX.toFloat(),
            y = weightedY.toFloat(),
            floor = floor,
            confidence = confidence,
            timestamp = System.currentTimeMillis()
        )
        
        return currentPosition
    }
    
    private fun calculateEuclideanDistance(
        currentAPs: List<AccessPoint>,
        referenceAPs: List<AccessPoint>
    ): Double {
        val currentMap = currentAPs.associateBy { it.bssid }
        val referenceMap = referenceAPs.associateBy { it.bssid }
        
        val allBssids = (currentMap.keys + referenceMap.keys).toSet()
        
        var sumSquaredDiff = 0.0
        
        allBssids.forEach { bssid ->
            val currentRssi = currentMap[bssid]?.rssi?.toDouble() ?: -100.0
            val referenceRssi = referenceMap[bssid]?.rssi?.toDouble() ?: -100.0
            sumSquaredDiff += (currentRssi - referenceRssi).pow(2)
        }
        
        return sqrt(sumSquaredDiff)
    }
    
    fun updatePositionWithDeadReckoning(
        stepLength: Float,
        heading: Float
    ): Position? {
        val current = currentPosition ?: return null
        
        val headingRad = Math.toRadians(heading.toDouble())
        val deltaX = stepLength * kotlin.math.cos(headingRad).toFloat()
        val deltaY = stepLength * kotlin.math.sin(headingRad).toFloat()
        
        val newPosition = Position(
            x = current.x + deltaX,
            y = current.y + deltaY,
            floor = current.floor,
            confidence = current.confidence * 0.95f,
            timestamp = System.currentTimeMillis()
        )
        
        currentPosition = newPosition
        return newPosition
    }
    
    fun getCurrentPosition(): Position? = currentPosition
    
    fun reset() {
        currentPosition = null
    }
}
