# Indoor Localization App

An Android indoor localization application using Wi-Fi fingerprinting combined with inertial measurement unit (IMU) sensors for accurate indoor positioning.

## Features

- **Wi-Fi Fingerprinting**: Collects and matches Wi-Fi access point signals for location estimation
- **Sensor Fusion**: Integrates data from accelerometer, gyroscope, and magnetometer sensors
- **Dead Reckoning**: Uses step detection and orientation tracking for continuous positioning
- **Particle Filter**: Advanced algorithm for improved position estimation
- **Training Mode**: Easy collection of reference fingerprints at known locations
- **Real-time Localization**: Live position tracking with visual feedback
- **Database Management**: Store and manage Wi-Fi fingerprints locally

## Technology Stack

- **Target Platform**: Android 14+ (API Level 34+)
- **Language**: Kotlin
- **Build System**: Gradle 8.7 with Android Gradle Plugin 8.6.1
- **Architecture Components**:
  - Room Database for local storage
  - Coroutines for asynchronous operations
  - LiveData and ViewModel for reactive UI
  - View Binding for type-safe view access

## Sensors Used

1. **Wi-Fi Scanner**: Collects RSSI values from nearby access points
2. **Accelerometer**: Detects movement and steps
3. **Gyroscope**: Tracks rotation and orientation changes
4. **Magnetometer**: Provides compass heading information

**Note**: Barometer data is explicitly excluded from this implementation.

## Algorithms

### Wi-Fi Fingerprinting
- K-Nearest Neighbors (KNN) algorithm with k=5 by default
- Weighted average based on Euclidean distance in signal space
- Handles missing access points gracefully

### Sensor Fusion
- Step detection using accelerometer magnitude threshold
- Orientation estimation using rotation matrix from accelerometer and magnetometer
- Dead reckoning between Wi-Fi scans

### Particle Filter
- 500 particles for position estimation
- Prediction step based on detected steps and heading
- Update step using Wi-Fi fingerprint matches
- Resampling for improved accuracy

## Project Structure

```
app/
├── src/main/
│   ├── java/com/indoorlocalization/app/
│   │   ├── data/              # Data models and database
│   │   │   ├── WifiFingerprint.kt
│   │   │   ├── SensorReading.kt
│   │   │   ├── FingerprintDao.kt
│   │   │   └── FingerprintDatabase.kt
│   │   ├── sensors/           # Sensor management
│   │   │   ├── SensorFusionManager.kt
│   │   │   └── WifiScanManager.kt
│   │   ├── localization/      # Positioning algorithms
│   │   │   ├── LocalizationEngine.kt
│   │   │   └── ParticleFilter.kt
│   │   └── ui/                # Activities and views
│   │       ├── MainActivity.kt
│   │       ├── TrainingActivity.kt
│   │       ├── LocalizationActivity.kt
│   │       ├── FingerprintListActivity.kt
│   │       └── MapView.kt
│   └── res/                   # Resources (layouts, values, etc.)
```

## Setup and Installation

### Prerequisites
- Android Studio Arctic Fox or later
- Android SDK 34 (Android 14)
- Kotlin 2.0.20 or later
- JDK 17

### Build Instructions

1. Clone or extract the project
2. Open the project in Android Studio
3. Sync Gradle files
4. Build the project: `./gradlew build`
5. Run on a physical device (emulator won't have accurate sensors)

### Command Line Build

```bash
# Clean and build
./gradlew clean build

# Build debug APK
./gradlew assembleDebug

# Install on connected device
./gradlew installDebug
```

## Usage

### Training Mode

1. Open the app and tap "Training Mode"
2. Enter a location name and coordinates (x, y, floor)
3. Tap "Scan Wi-Fi" to see available access points
4. Tap "Collect Fingerprint" to save the current location's Wi-Fi signature
5. Repeat at multiple locations to build your fingerprint database

### Localization Mode

1. Ensure you have collected training data (fingerprints)
2. Tap "Localization Mode" from the main screen
3. Tap "Start" to begin real-time positioning
4. Walk around and see your position updated on the map
5. The system uses both Wi-Fi scans and step detection for continuous tracking

### Managing Fingerprints

1. Tap "View Fingerprints" from the main screen
2. See all collected fingerprints with details
3. Delete individual fingerprints or clear all data

## Permissions Required

- `ACCESS_FINE_LOCATION`: Required for Wi-Fi scanning
- `ACCESS_COARSE_LOCATION`: Required for location services
- `ACCESS_WIFI_STATE`: Required to access Wi-Fi information
- `CHANGE_WIFI_STATE`: Required to initiate Wi-Fi scans

## Performance Considerations

- Wi-Fi scanning is performed every 3 seconds during localization
- Step detection operates at the sensor's native rate (typically 50-200 Hz)
- Database operations are performed asynchronously
- Particle filter uses 500 particles for balance between accuracy and performance

## Limitations

- Requires Android 14+ (API Level 34)
- Works best in environments with multiple Wi-Fi access points (3+)
- Accuracy depends on the density and distribution of training data
- Physical device required (sensors don't work well in emulators)
- Wi-Fi scanning may be throttled by Android depending on system settings

## Future Enhancements

- Floor plan import and display
- Bluetooth beacon support
- Machine learning-based positioning
- Multi-building support
- Export/import fingerprint database
- Kalman filter integration
- Enhanced visualization

## License

This project is provided as-is for educational and research purposes.

## Support

For issues, questions, or contributions, please refer to the project documentation.
