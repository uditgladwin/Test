package com.indoorlocalization.app.ui

import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import com.indoorlocalization.app.data.FingerprintDatabase
import com.indoorlocalization.app.data.WifiFingerprint
import com.indoorlocalization.app.databinding.ActivityTrainingBinding
import com.indoorlocalization.app.sensors.SensorFusionManager
import com.indoorlocalization.app.sensors.WifiScanManager
import kotlinx.coroutines.launch

class TrainingActivity : AppCompatActivity() {
    private lateinit var binding: ActivityTrainingBinding
    private lateinit var wifiScanManager: WifiScanManager
    private lateinit var sensorFusionManager: SensorFusionManager
    private lateinit var database: FingerprintDatabase
    
    private var isCollecting = false
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityTrainingBinding.inflate(layoutInflater)
        setContentView(binding.root)
        
        supportActionBar?.setDisplayHomeAsUpEnabled(true)
        supportActionBar?.title = "Training Mode"
        
        wifiScanManager = WifiScanManager(this)
        sensorFusionManager = SensorFusionManager(this)
        database = FingerprintDatabase.getDatabase(this)
        
        setupUI()
        setupObservers()
    }
    
    private fun setupUI() {
        binding.btnCollect.setOnClickListener {
            if (!isCollecting) {
                collectFingerprint()
            }
        }
        
        binding.btnScan.setOnClickListener {
            performWifiScan()
        }
    }
    
    private fun setupObservers() {
        lifecycleScope.launch {
            wifiScanManager.scanResultsFlow.collect { accessPoints ->
                binding.tvApCount.text = "Access Points Detected: ${accessPoints.size}"
                
                val apText = accessPoints.joinToString("\n") { ap ->
                    "${ap.ssid} (${ap.bssid}): ${ap.rssi} dBm"
                }
                binding.tvApList.text = if (apText.isEmpty()) "No access points detected" else apText
            }
        }
        
        lifecycleScope.launch {
            sensorFusionManager.sensorReadingFlow.collect { reading ->
                reading?.let {
                    val orientation = it.orientation
                    if (orientation != null) {
                        val azimuth = Math.toDegrees(orientation[0].toDouble()).toFloat()
                        binding.tvOrientation.text = String.format("Orientation: %.1f°", azimuth)
                    }
                }
            }
        }
    }
    
    private fun performWifiScan() {
        binding.btnScan.isEnabled = false
        binding.tvStatus.text = "Scanning..."
        wifiScanManager.startScanning()
        
        binding.btnScan.postDelayed({
            binding.btnScan.isEnabled = true
            binding.tvStatus.text = "Ready"
        }, 2000)
    }
    
    private fun collectFingerprint() {
        val locationName = binding.etLocationName.text.toString().trim()
        val xStr = binding.etX.text.toString().trim()
        val yStr = binding.etY.text.toString().trim()
        val floorStr = binding.etFloor.text.toString().trim()
        
        if (locationName.isEmpty()) {
            Toast.makeText(this, "Please enter location name", Toast.LENGTH_SHORT).show()
            return
        }
        
        if (xStr.isEmpty() || yStr.isEmpty() || floorStr.isEmpty()) {
            Toast.makeText(this, "Please enter coordinates", Toast.LENGTH_SHORT).show()
            return
        }
        
        val x = xStr.toFloatOrNull() ?: 0f
        val y = yStr.toFloatOrNull() ?: 0f
        val floor = floorStr.toIntOrNull() ?: 0
        
        isCollecting = true
        binding.btnCollect.isEnabled = false
        binding.tvStatus.text = "Collecting data..."
        
        wifiScanManager.startScanning()
        
        binding.btnCollect.postDelayed({
            val accessPoints = wifiScanManager.getCurrentAccessPoints()
            
            if (accessPoints.isEmpty()) {
                Toast.makeText(this, "No Wi-Fi access points found", Toast.LENGTH_SHORT).show()
                binding.tvStatus.text = "Failed - No APs"
            } else {
                val fingerprint = WifiFingerprint(
                    locationName = locationName,
                    x = x,
                    y = y,
                    floor = floor,
                    timestamp = System.currentTimeMillis(),
                    accessPoints = accessPoints
                )
                
                lifecycleScope.launch {
                    database.fingerprintDao().insert(fingerprint)
                    Toast.makeText(
                        this@TrainingActivity,
                        "Fingerprint saved: ${accessPoints.size} APs",
                        Toast.LENGTH_SHORT
                    ).show()
                    binding.tvStatus.text = "Saved successfully"
                }
            }
            
            isCollecting = false
            binding.btnCollect.isEnabled = true
        }, 2000)
    }
    
    override fun onResume() {
        super.onResume()
        sensorFusionManager.start()
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
