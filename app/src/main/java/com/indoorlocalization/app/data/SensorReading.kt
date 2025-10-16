package com.indoorlocalization.app.data

data class SensorReading(
    val timestamp: Long,
    val accelerometer: FloatArray,
    val gyroscope: FloatArray,
    val magnetometer: FloatArray,
    val rotationMatrix: FloatArray? = null,
    val orientation: FloatArray? = null
) {
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as SensorReading

        if (timestamp != other.timestamp) return false
        if (!accelerometer.contentEquals(other.accelerometer)) return false
        if (!gyroscope.contentEquals(other.gyroscope)) return false
        if (!magnetometer.contentEquals(other.magnetometer)) return false

        return true
    }

    override fun hashCode(): Int {
        var result = timestamp.hashCode()
        result = 31 * result + accelerometer.contentHashCode()
        result = 31 * result + gyroscope.contentHashCode()
        result = 31 * result + magnetometer.contentHashCode()
        return result
    }
}

data class Position(
    val x: Float,
    val y: Float,
    val floor: Int,
    val confidence: Float,
    val timestamp: Long = System.currentTimeMillis()
)

data class Step(
    val timestamp: Long,
    val magnitude: Float,
    val heading: Float
)
