package com.indoorlocalization.app.data

import androidx.room.TypeConverter
import com.google.gson.Gson
import com.google.gson.reflect.TypeToken

class Converters {
    private val gson = Gson()

    @TypeConverter
    fun fromAccessPointList(value: List<AccessPoint>): String {
        return gson.toJson(value)
    }

    @TypeConverter
    fun toAccessPointList(value: String): List<AccessPoint> {
        val listType = object : TypeToken<List<AccessPoint>>() {}.type
        return gson.fromJson(value, listType)
    }
}
