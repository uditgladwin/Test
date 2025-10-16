package com.indoorlocalization.app.sensors

import android.content.Context
import android.hardware.Sensor
import android.hardware.SensorEvent
import android.hardware.SensorEventListener
import android.hardware.SensorManager
import com.indoorlocalization.app.data.SensorReading
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlin.math.sqrt

class SensorFusionManager(context: Context) : SensorEventListener {
    private val sensorManager = context.getSystemService(Context.SENSOR_SERVICE) as SensorManager
    
    private val accelerometerSensor = sensorManager.getDefaultSensor(Sensor.TYPE_ACCELEROMETER)
    private val gyroscopeSensor = sensorManager.getDefaultSensor(Sensor.TYPE_GYROSCOPE)
    private val magnetometerSensor = sensorManager.getDefaultSensor(Sensor.TYPE_MAGNETIC_FIELD)
    
    private val accelerometerData = FloatArray(3)
    private val gyroscopeData = FloatArray(3)
    private val magnetometerData = FloatArray(3)
    
    private val rotationMatrix = FloatArray(9)
    private val orientationAngles = FloatArray(3)
    
    private var lastUpdateTime = 0L
    
    private val _sensorReadingFlow = MutableStateFlow<SensorReading?>(null)
    val sensorReadingFlow: StateFlow<SensorReading?> = _sensorReadingFlow.asStateFlow()
    
    private val _stepDetectedFlow = MutableStateFlow<Float?>(null)
    val stepDetectedFlow: StateFlow<Float?> = _stepDetectedFlow.asStateFlow()
    
    private var accelerometerUpdated = false
    private var gyroscopeUpdated = false
    private var magnetometerUpdated = false
    
    private var lastAccelMagnitude = 0f
    private val stepThreshold = 12f
    private var isStepDetected = false
    
    fun start() {
        accelerometerSensor?.let {
            sensorManager.registerListener(this, it, SensorManager.SENSOR_DELAY_GAME)
        }
        gyroscopeSensor?.let {
            sensorManager.registerListener(this, it, SensorManager.SENSOR_DELAY_GAME)
        }
        magnetometerSensor?.let {
            sensorManager.registerListener(this, it, SensorManager.SENSOR_DELAY_GAME)
        }
    }
    
    fun stop() {
        sensorManager.unregisterListener(this)
    }
    
    override fun onSensorChanged(event: SensorEvent) {
        when (event.sensor.type) {
            Sensor.TYPE_ACCELEROMETER -> {
                System.arraycopy(event.values, 0, accelerometerData, 0, 3)
                accelerometerUpdated = true
                detectStep()
            }
            Sensor.TYPE_GYROSCOPE -> {
                System.arraycopy(event.values, 0, gyroscopeData, 0, 3)
                gyroscopeUpdated = true
            }
            Sensor.TYPE_MAGNETIC_FIELD -> {
                System.arraycopy(event.values, 0, magnetometerData, 0, 3)
                magnetometerUpdated = true
            }
        }
        
        if (accelerometerUpdated && gyroscopeUpdated && magnetometerUpdated) {
            updateSensorFusion()
        }
    }
    
    private fun detectStep() {
        val magnitude = sqrt(
            accelerometerData[0] * accelerometerData[0] +
            accelerometerData[1] * accelerometerData[1] +
            accelerometerData[2] * accelerometerData[2]
        )
        
        if (!isStepDetected && magnitude > stepThreshold && lastAccelMagnitude < stepThreshold) {
            isStepDetected = true
            val currentOrientation = getOrientation()
            _stepDetectedFlow.value = currentOrientation
        } else if (magnitude < stepThreshold) {
            isStepDetected = false
        }
        
        lastAccelMagnitude = magnitude
    }
    
    private fun updateSensorFusion() {
        val currentTime = System.currentTimeMillis()
        
        val success = SensorManager.getRotationMatrix(
            rotationMatrix,
            null,
            accelerometerData,
            magnetometerData
        )
        
        val orientation = if (success) {
            SensorManager.getOrientation(rotationMatrix, orientationAngles)
            orientationAngles.copyOf()
        } else {
            null
        }
        
        val reading = SensorReading(
            timestamp = currentTime,
            accelerometer = accelerometerData.copyOf(),
            gyroscope = gyroscopeData.copyOf(),
            magnetometer = magnetometerData.copyOf(),
            rotationMatrix = if (success) rotationMatrix.copyOf() else null,
            orientation = orientation
        )
        
        _sensorReadingFlow.value = reading
        lastUpdateTime = currentTime
    }
    
    fun getOrientation(): Float {
        SensorManager.getRotationMatrix(
            rotationMatrix,
            null,
            accelerometerData,
            magnetometerData
        )
        SensorManager.getOrientation(rotationMatrix, orientationAngles)
        return Math.toDegrees(orientationAngles[0].toDouble()).toFloat()
    }
    
    override fun onAccuracyChanged(sensor: Sensor?, accuracy: Int) {
        // Not used in this implementation
    }
}
