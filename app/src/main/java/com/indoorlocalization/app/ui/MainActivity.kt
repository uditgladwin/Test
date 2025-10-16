package com.indoorlocalization.app.ui

import android.Manifest
import android.content.Intent
import android.content.pm.PackageManager
import android.os.Build
import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import androidx.lifecycle.lifecycleScope
import com.indoorlocalization.app.data.FingerprintDatabase
import com.indoorlocalization.app.databinding.ActivityMainBinding
import kotlinx.coroutines.launch

class MainActivity : AppCompatActivity() {
    private lateinit var binding: ActivityMainBinding
    private val PERMISSION_REQUEST_CODE = 1001
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)
        
        setupUI()
        checkPermissions()
    }
    
    private fun setupUI() {
        binding.btnTraining.setOnClickListener {
            if (hasPermissions()) {
                startActivity(Intent(this, TrainingActivity::class.java))
            } else {
                requestPermissions()
            }
        }
        
        binding.btnLocalization.setOnClickListener {
            if (hasPermissions()) {
                lifecycleScope.launch {
                    val db = FingerprintDatabase.getDatabase(this@MainActivity)
                    val count = db.fingerprintDao().getCount()
                    if (count > 0) {
                        startActivity(Intent(this@MainActivity, LocalizationActivity::class.java))
                    } else {
                        Toast.makeText(
                            this@MainActivity,
                            "No fingerprints available. Please collect training data first.",
                            Toast.LENGTH_LONG
                        ).show()
                    }
                }
            } else {
                requestPermissions()
            }
        }
        
        binding.btnViewFingerprints.setOnClickListener {
            startActivity(Intent(this, FingerprintListActivity::class.java))
        }
        
        updateFingerprintCount()
    }
    
    private fun updateFingerprintCount() {
        lifecycleScope.launch {
            val db = FingerprintDatabase.getDatabase(this@MainActivity)
            val count = db.fingerprintDao().getCount()
            binding.tvFingerprintCount.text = "Stored Fingerprints: $count"
        }
    }
    
    override fun onResume() {
        super.onResume()
        updateFingerprintCount()
    }
    
    private fun checkPermissions() {
        if (!hasPermissions()) {
            requestPermissions()
        }
    }
    
    private fun hasPermissions(): Boolean {
        val permissions = getRequiredPermissions()
        return permissions.all { permission ->
            ContextCompat.checkSelfPermission(this, permission) == PackageManager.PERMISSION_GRANTED
        }
    }
    
    private fun requestPermissions() {
        ActivityCompat.requestPermissions(
            this,
            getRequiredPermissions(),
            PERMISSION_REQUEST_CODE
        )
    }
    
    private fun getRequiredPermissions(): Array<String> {
        val permissions = mutableListOf(
            Manifest.permission.ACCESS_FINE_LOCATION,
            Manifest.permission.ACCESS_COARSE_LOCATION,
            Manifest.permission.ACCESS_WIFI_STATE,
            Manifest.permission.CHANGE_WIFI_STATE
        )
        
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            permissions.add(Manifest.permission.NEARBY_WIFI_DEVICES)
        }
        
        return permissions.toTypedArray()
    }
    
    override fun onRequestPermissionsResult(
        requestCode: Int,
        permissions: Array<out String>,
        grantResults: IntArray
    ) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)
        
        if (requestCode == PERMISSION_REQUEST_CODE) {
            if (grantResults.all { it == PackageManager.PERMISSION_GRANTED }) {
                Toast.makeText(this, "Permissions granted", Toast.LENGTH_SHORT).show()
            } else {
                Toast.makeText(
                    this,
                    "Permissions are required for this app to work",
                    Toast.LENGTH_LONG
                ).show()
            }
        }
    }
}
