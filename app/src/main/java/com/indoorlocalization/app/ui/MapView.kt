package com.indoorlocalization.app.ui

import android.content.Context
import android.graphics.Canvas
import android.graphics.Color
import android.graphics.Paint
import android.util.AttributeSet
import android.view.View
import com.indoorlocalization.app.data.Position

class MapView @JvmOverloads constructor(
    context: Context,
    attrs: AttributeSet? = null,
    defStyleAttr: Int = 0
) : View(context, attrs, defStyleAttr) {
    
    private var currentPosition: Position? = null
    private val positionPaint = Paint().apply {
        color = Color.BLUE
        style = Paint.Style.FILL
        isAntiAlias = true
    }
    
    private val confidencePaint = Paint().apply {
        color = Color.parseColor("#4080C0FF")
        style = Paint.Style.FILL
        isAntiAlias = true
    }
    
    private val gridPaint = Paint().apply {
        color = Color.LTGRAY
        strokeWidth = 2f
        style = Paint.Style.STROKE
        isAntiAlias = true
    }
    
    private val textPaint = Paint().apply {
        color = Color.BLACK
        textSize = 32f
        isAntiAlias = true
    }
    
    private val scale = 5f
    
    fun updatePosition(position: Position) {
        currentPosition = position
        invalidate()
    }
    
    override fun onDraw(canvas: Canvas) {
        super.onDraw(canvas)
        
        drawGrid(canvas)
        
        currentPosition?.let { position ->
            val x = position.x * scale + width / 2
            val y = height / 2 - position.y * scale
            
            val confidenceRadius = 30f + (1f - position.confidence) * 50f
            canvas.drawCircle(x, y, confidenceRadius, confidencePaint)
            
            canvas.drawCircle(x, y, 15f, positionPaint)
            
            canvas.drawText(
                String.format("(%.1f, %.1f)", position.x, position.y),
                x + 20f,
                y - 20f,
                textPaint
            )
        }
    }
    
    private fun drawGrid(canvas: Canvas) {
        val centerX = width / 2f
        val centerY = height / 2f
        
        canvas.drawLine(0f, centerY, width.toFloat(), centerY, gridPaint)
        canvas.drawLine(centerX, 0f, centerX, height.toFloat(), gridPaint)
        
        for (i in -20..20 step 5) {
            val x = centerX + i * scale
            val y = centerY - i * scale
            
            if (x in 0f..width.toFloat()) {
                canvas.drawLine(x, 0f, x, height.toFloat(), gridPaint)
            }
            
            if (y in 0f..height.toFloat()) {
                canvas.drawLine(0f, y, width.toFloat(), y, gridPaint)
            }
        }
    }
}
