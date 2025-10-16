package com.indoorlocalization.app.data

import androidx.lifecycle.LiveData
import androidx.room.*

@Dao
interface FingerprintDao {
    @Insert
    suspend fun insert(fingerprint: WifiFingerprint): Long

    @Update
    suspend fun update(fingerprint: WifiFingerprint)

    @Delete
    suspend fun delete(fingerprint: WifiFingerprint)

    @Query("SELECT * FROM wifi_fingerprints ORDER BY timestamp DESC")
    fun getAllFingerprints(): LiveData<List<WifiFingerprint>>

    @Query("SELECT * FROM wifi_fingerprints ORDER BY timestamp DESC")
    suspend fun getAllFingerprintsSync(): List<WifiFingerprint>

    @Query("SELECT * FROM wifi_fingerprints WHERE id = :id")
    suspend fun getFingerprintById(id: Long): WifiFingerprint?

    @Query("SELECT * FROM wifi_fingerprints WHERE floor = :floor")
    suspend fun getFingerprintsByFloor(floor: Int): List<WifiFingerprint>

    @Query("DELETE FROM wifi_fingerprints")
    suspend fun deleteAll()

    @Query("SELECT COUNT(*) FROM wifi_fingerprints")
    suspend fun getCount(): Int
}
