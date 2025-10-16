package com.indoorlocalization.app.data

import androidx.room.Entity
import androidx.room.PrimaryKey
import androidx.room.TypeConverters

@Entity(tableName = "wifi_fingerprints")
@TypeConverters(Converters::class)
data class WifiFingerprint(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val locationName: String,
    val x: Float,
    val y: Float,
    val floor: Int,
    val timestamp: Long,
    val accessPoints: List<AccessPoint>
)

data class AccessPoint(
    val bssid: String,
    val ssid: String,
    val rssi: Int,
    val frequency: Int
)
