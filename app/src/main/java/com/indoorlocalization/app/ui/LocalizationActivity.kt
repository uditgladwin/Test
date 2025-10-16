package com.indoorlocalization.app.ui

import android.graphics.Canvas
import android.graphics.Color
import android.graphics.Paint
import android.os.Bundle
import android.view.View
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import com.indoorlocalization.app.data.FingerprintDatabase
import com.indoorlocalization.app.data.Position
import com.indoorlocalization.app.databinding.ActivityLocalizationBinding
import com.indoorlocalization.app.localization.LocalizationEngine
import com.indoorlocalization.app.localization.ParticleFilter
import com.indoorlocalization.app.sensors.SensorFusionManager
import com.indoorlocalization.app.sensors.WifiScanManager
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch

class LocalizationActivity : AppCompatActivity() {
    private lateinit var binding: ActivityLocalizationBinding
    private lateinit var wifiScanManager: WifiScanManager
    private lateinit var sensorFusionManager: SensorFusionManager
    private lateinit var localizationEngine: LocalizationEngine
    private lateinit var particleFilter: ParticleFilter
    private lateinit var database: FingerprintDatabase
    
    private var isLocalizing = false
    private var currentPosition: Position? = null
    private val stepLength = 0.7f
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityLocalizationBinding.inflate(layoutInflater)
        setContentView(binding.root)
        
        supportActionBar?.setDisplayHomeAsUpEnabled(true)
        supportActionBar?.title = "Localization"
        
        wifiScanManager = WifiScanManager(this)
        sensorFusionManager = SensorFusionManager(this)
        localizationEngine = LocalizationEngine()
        particleFilter = ParticleFilter(numParticles = 500)
        database = FingerprintDatabase.getDatabase(this)
        
        setupUI()
        loadFingerprints()
        setupObservers()
    }
    
    private fun setupUI() {
        binding.btnStartStop.setOnClickListener {
            if (isLocalizing) {
                stopLocalization()
            } else {
                startLocalization()
            }
        }
        
        binding.btnReset.setOnClickListener {
            resetLocalization()
        }
    }
    
    private fun loadFingerprints() {
        lifecycleScope.launch {
            val fingerprints = database.fingerprintDao().getAllFingerprintsSync()
            localizationEngine.updateReferenceFingerprints(fingerprints)
            binding.tvFingerprintCount.text = "Loaded ${fingerprints.size} fingerprints"
        }
    }
    
    private fun setupObservers() {
        lifecycleScope.launch {
            sensorFusionManager.stepDetectedFlow.collect { heading ->
                if (isLocalizing && heading != null) {
                    handleStepDetected(heading)
                }
            }
        }
    }
    
    private fun startLocalization() {
        isLocalizing = true
        binding.btnStartStop.text = "Stop"
        binding.tvStatus.text = "Localizing..."
        
        sensorFusionManager.start()
        
        lifecycleScope.launch {
            while (isLocalizing) {
                performLocalization()
                delay(3000)
            }
        }
    }
    
    private fun stopLocalization() {
        isLocalizing = false
        binding.btnStartStop.text = "Start"
        binding.tvStatus.text = "Stopped"
        sensorFusionManager.stop()
        wifiScanManager.stopScanning()
    }
    
    private fun resetLocalization() {
        localizationEngine.reset()
        particleFilter.reset()
        currentPosition = null
        updatePositionDisplay(null)
        binding.tvStatus.text = "Reset"
    }
    
    private fun performLocalization() {
        wifiScanManager.startScanning()
        
        lifecycleScope.launch {
            delay(1500)
            
            val accessPoints = wifiScanManager.getCurrentAccessPoints()
            
            if (accessPoints.isNotEmpty()) {
                val position = localizationEngine.estimatePosition(accessPoints, k = 5)
                
                if (position != null) {
                    particleFilter.update(position)
                    currentPosition = particleFilter.getEstimatedPosition(position.floor)
                    updatePositionDisplay(currentPosition)
                }
            }
        }
    }
    
    private fun handleStepDetected(heading: Float) {
        val position = localizationEngine.updatePositionWithDeadReckoning(stepLength, heading)
        if (position != null) {
            particleFilter.predict(stepLength, heading)
            currentPosition = particleFilter.getEstimatedPosition(position.floor)
            updatePositionDisplay(currentPosition)
        }
    }
    
    private fun updatePositionDisplay(position: Position?) {
        if (position != null) {
            binding.tvPosition.text = String.format(
                "Position: (%.2f, %.2f)\nFloor: %d\nConfidence: %.2f%%",
                position.x,
                position.y,
                position.floor,
                position.confidence * 100
            )
            
            binding.mapView.updatePosition(position)
        } else {
            binding.tvPosition.text = "Position: Unknown"
        }
    }
    
    override fun onResume() {
        super.onResume()
        if (isLocalizing) {
            sensorFusionManager.start()
        }
    }
    
    override fun onPause() {
        super.onPause()
        sensorFusionManager.stop()
        wifiScanManager.stopScanning()
    }
    
    override fun onSupportNavigateUp(): Boolean {
        finish()
        return true
    }
}
