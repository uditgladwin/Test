package com.indoorlocalization.app.localization

import com.indoorlocalization.app.data.Position
import kotlin.math.exp
import kotlin.math.pow
import kotlin.random.Random

class ParticleFilter(
    private val numParticles: Int = 1000,
    private val mapWidth: Float = 100f,
    private val mapHeight: Float = 100f
) {
    private var particles = mutableListOf<Particle>()
    
    data class Particle(
        var x: Float,
        var y: Float,
        var orientation: Float,
        var weight: Float = 1.0f / 1000
    )
    
    init {
        initializeParticles()
    }
    
    private fun initializeParticles() {
        particles.clear()
        repeat(numParticles) {
            particles.add(
                Particle(
                    x = Random.nextFloat() * mapWidth,
                    y = Random.nextFloat() * mapHeight,
                    orientation = Random.nextFloat() * 360f,
                    weight = 1.0f / numParticles
                )
            )
        }
    }
    
    fun predict(stepLength: Float, heading: Float, noise: Float = 0.1f) {
        particles.forEach { particle ->
            val headingRad = Math.toRadians((heading + Random.nextFloat() * noise).toDouble())
            val length = stepLength + Random.nextFloat() * noise
            
            particle.x += (length * kotlin.math.cos(headingRad)).toFloat()
            particle.y += (length * kotlin.math.sin(headingRad)).toFloat()
            particle.orientation = heading
            
            particle.x = particle.x.coerceIn(0f, mapWidth)
            particle.y = particle.y.coerceIn(0f, mapHeight)
        }
    }
    
    fun update(measurement: Position) {
        var totalWeight = 0.0f
        
        particles.forEach { particle ->
            val distance = kotlin.math.sqrt(
                (particle.x - measurement.x).pow(2) +
                (particle.y - measurement.y).pow(2)
            )
            
            particle.weight = exp(-distance / 10.0).toFloat()
            totalWeight += particle.weight
        }
        
        if (totalWeight > 0) {
            particles.forEach { particle ->
                particle.weight /= totalWeight
            }
        }
        
        resample()
    }
    
    private fun resample() {
        val newParticles = mutableListOf<Particle>()
        val weights = particles.map { it.weight }
        
        repeat(numParticles) {
            val selected = weightedRandomSelection(particles, weights)
            newParticles.add(selected.copy())
        }
        
        particles = newParticles
    }
    
    private fun weightedRandomSelection(
        particles: List<Particle>,
        weights: List<Float>
    ): Particle {
        val cumSum = weights.runningFold(0.0f) { acc, weight -> acc + weight }
        val rand = Random.nextFloat() * cumSum.last()
        
        val index = cumSum.indexOfFirst { it > rand } - 1
        return particles[index.coerceAtLeast(0)]
    }
    
    fun getEstimatedPosition(floor: Int): Position {
        val avgX = particles.map { it.x }.average().toFloat()
        val avgY = particles.map { it.y }.average().toFloat()
        val avgWeight = particles.map { it.weight }.average().toFloat()
        
        return Position(
            x = avgX,
            y = avgY,
            floor = floor,
            confidence = avgWeight * numParticles,
            timestamp = System.currentTimeMillis()
        )
    }
    
    fun reset() {
        initializeParticles()
    }
}
