package com.indoorlocalization.app.data

import android.content.Context
import androidx.room.Database
import androidx.room.Room
import androidx.room.RoomDatabase
import androidx.room.TypeConverters

@Database(entities = [WifiFingerprint::class], version = 1, exportSchema = false)
@TypeConverters(Converters::class)
abstract class FingerprintDatabase : RoomDatabase() {
    abstract fun fingerprintDao(): FingerprintDao

    companion object {
        @Volatile
        private var INSTANCE: FingerprintDatabase? = null

        fun getDatabase(context: Context): FingerprintDatabase {
            return INSTANCE ?: synchronized(this) {
                val instance = Room.databaseBuilder(
                    context.applicationContext,
                    FingerprintDatabase::class.java,
                    "fingerprint_database"
                ).build()
                INSTANCE = instance
                instance
            }
        }
    }
}
