package com.indoorlocalization.app.sensors

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.net.wifi.WifiManager
import android.os.Build
import com.indoorlocalization.app.data.AccessPoint
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow

class WifiScanManager(private val context: Context) {
    private val wifiManager = context.applicationContext.getSystemService(Context.WIFI_SERVICE) as WifiManager
    
    private val _scanResultsFlow = MutableStateFlow<List<AccessPoint>>(emptyList())
    val scanResultsFlow: StateFlow<List<AccessPoint>> = _scanResultsFlow.asStateFlow()
    
    private val _isScanningFlow = MutableStateFlow(false)
    val isScanningFlow: StateFlow<Boolean> = _isScanningFlow.asStateFlow()
    
    private val wifiScanReceiver = object : BroadcastReceiver() {
        override fun onReceive(context: Context, intent: Intent) {
            val success = intent.getBooleanExtra(WifiManager.EXTRA_RESULTS_UPDATED, false)
            if (success) {
                scanSuccess()
            } else {
                scanFailure()
            }
        }
    }
    
    private var isReceiverRegistered = false
    
    fun startScanning() {
        if (!isReceiverRegistered) {
            val intentFilter = IntentFilter()
            intentFilter.addAction(WifiManager.SCAN_RESULTS_AVAILABLE_ACTION)
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
                context.registerReceiver(wifiScanReceiver, intentFilter, Context.RECEIVER_EXPORTED)
            } else {
                context.registerReceiver(wifiScanReceiver, intentFilter)
            }
            isReceiverRegistered = true
        }
        
        _isScanningFlow.value = true
        wifiManager.startScan()
    }
    
    fun stopScanning() {
        if (isReceiverRegistered) {
            try {
                context.unregisterReceiver(wifiScanReceiver)
                isReceiverRegistered = false
            } catch (e: IllegalArgumentException) {
                // Receiver was not registered
            }
        }
        _isScanningFlow.value = false
    }
    
    private fun scanSuccess() {
        val results = wifiManager.scanResults
        val accessPoints = results.map { scanResult ->
            AccessPoint(
                bssid = scanResult.BSSID,
                ssid = scanResult.SSID,
                rssi = scanResult.level,
                frequency = scanResult.frequency
            )
        }
        _scanResultsFlow.value = accessPoints
        _isScanningFlow.value = false
    }
    
    private fun scanFailure() {
        _isScanningFlow.value = false
    }
    
    fun getCurrentAccessPoints(): List<AccessPoint> {
        return _scanResultsFlow.value
    }
}
