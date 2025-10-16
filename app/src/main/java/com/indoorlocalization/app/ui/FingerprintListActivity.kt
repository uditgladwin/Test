package com.indoorlocalization.app.ui

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.indoorlocalization.app.R
import com.indoorlocalization.app.data.FingerprintDatabase
import com.indoorlocalization.app.data.WifiFingerprint
import com.indoorlocalization.app.databinding.ActivityFingerprintListBinding
import kotlinx.coroutines.launch
import java.text.SimpleDateFormat
import java.util.*

class FingerprintListActivity : AppCompatActivity() {
    private lateinit var binding: ActivityFingerprintListBinding
    private lateinit var database: FingerprintDatabase
    private lateinit var adapter: FingerprintAdapter
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityFingerprintListBinding.inflate(layoutInflater)
        setContentView(binding.root)
        
        supportActionBar?.setDisplayHomeAsUpEnabled(true)
        supportActionBar?.title = "Fingerprints"
        
        database = FingerprintDatabase.getDatabase(this)
        
        setupRecyclerView()
        loadFingerprints()
        
        binding.btnClearAll.setOnClickListener {
            showClearAllDialog()
        }
    }
    
    private fun setupRecyclerView() {
        adapter = FingerprintAdapter { fingerprint ->
            showDeleteDialog(fingerprint)
        }
        binding.recyclerView.layoutManager = LinearLayoutManager(this)
        binding.recyclerView.adapter = adapter
    }
    
    private fun loadFingerprints() {
        database.fingerprintDao().getAllFingerprints().observe(this) { fingerprints ->
            adapter.submitList(fingerprints)
            binding.tvEmpty.visibility = if (fingerprints.isEmpty()) View.VISIBLE else View.GONE
        }
    }
    
    private fun showDeleteDialog(fingerprint: WifiFingerprint) {
        AlertDialog.Builder(this)
            .setTitle("Delete Fingerprint")
            .setMessage("Are you sure you want to delete this fingerprint?")
            .setPositiveButton("Delete") { _, _ ->
                lifecycleScope.launch {
                    database.fingerprintDao().delete(fingerprint)
                }
            }
            .setNegativeButton("Cancel", null)
            .show()
    }
    
    private fun showClearAllDialog() {
        AlertDialog.Builder(this)
            .setTitle("Clear All")
            .setMessage("Are you sure you want to delete all fingerprints?")
            .setPositiveButton("Delete All") { _, _ ->
                lifecycleScope.launch {
                    database.fingerprintDao().deleteAll()
                }
            }
            .setNegativeButton("Cancel", null)
            .show()
    }
    
    override fun onSupportNavigateUp(): Boolean {
        finish()
        return true
    }
}

class FingerprintAdapter(
    private val onDeleteClick: (WifiFingerprint) -> Unit
) : RecyclerView.Adapter<FingerprintAdapter.ViewHolder>() {
    
    private var fingerprints = listOf<WifiFingerprint>()
    private val dateFormat = SimpleDateFormat("yyyy-MM-dd HH:mm:ss", Locale.getDefault())
    
    fun submitList(list: List<WifiFingerprint>) {
        fingerprints = list
        notifyDataSetChanged()
    }
    
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val view = LayoutInflater.from(parent.context)
            .inflate(R.layout.item_fingerprint, parent, false)
        return ViewHolder(view)
    }
    
    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        holder.bind(fingerprints[position])
    }
    
    override fun getItemCount() = fingerprints.size
    
    inner class ViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        private val tvLocationName: TextView = itemView.findViewById(R.id.tvLocationName)
        private val tvCoordinates: TextView = itemView.findViewById(R.id.tvCoordinates)
        private val tvApCount: TextView = itemView.findViewById(R.id.tvApCount)
        private val tvTimestamp: TextView = itemView.findViewById(R.id.tvTimestamp)
        private val btnDelete: View = itemView.findViewById(R.id.btnDelete)
        
        fun bind(fingerprint: WifiFingerprint) {
            tvLocationName.text = fingerprint.locationName
            tvCoordinates.text = "Position: (${fingerprint.x}, ${fingerprint.y}), Floor: ${fingerprint.floor}"
            tvApCount.text = "${fingerprint.accessPoints.size} Access Points"
            tvTimestamp.text = dateFormat.format(Date(fingerprint.timestamp))
            
            btnDelete.setOnClickListener {
                onDeleteClick(fingerprint)
            }
        }
    }
}
