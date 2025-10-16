# Build Instructions for Indoor Localization App

## Prerequisites

Before building this project, ensure you have the following installed:

### Required Software
1. **Java Development Kit (JDK) 17**
   - Download from: https://adoptium.net/temurin/releases/
   - Set JAVA_HOME environment variable

2. **Android Studio** (Recommended) or Android Command Line Tools
   - Download from: https://developer.android.com/studio
   - Minimum version: Arctic Fox (2020.3.1) or later

3. **Android SDK Components**
   - Android SDK Platform 34 (Android 14)
   - Android SDK Build-Tools 34.0.0 or later
   - Android SDK Command-line Tools

### Environment Setup

#### Option 1: Using Android Studio (Recommended)

1. **Install Android Studio**
   - Download and install from https://developer.android.com/studio
   - Launch Android Studio and complete the setup wizard

2. **Install Required SDK Components**
   - Open Android Studio
   - Go to: Tools → SDK Manager
   - In the "SDK Platforms" tab, check:
     - Android 14.0 (API level 34)
   - In the "SDK Tools" tab, check:
     - Android SDK Build-Tools
     - Android SDK Command-line Tools
     - Android SDK Platform-Tools
   - Click "Apply" to install

3. **Open the Project**
   - Extract the IndoorLocalization.zip file
   - Open Android Studio
   - Select "Open an existing project"
   - Navigate to the extracted folder and select it
   - Android Studio will automatically sync Gradle

4. **Build the Project**
   - Wait for Gradle sync to complete
   - Build → Make Project (Ctrl+F9 / Cmd+F9)
   - Or Build → Generate Signed Bundle / APK

5. **Run on Device**
   - Connect an Android 14+ device via USB
   - Enable USB debugging on the device
   - Select your device from the device dropdown
   - Click the "Run" button (Shift+F10 / Ctrl+R)

#### Option 2: Using Command Line

1. **Install Android Command Line Tools**
   ```bash
   # Download from:
   # https://developer.android.com/studio#command-tools
   
   # Extract to a location, e.g., /opt/android-sdk
   export ANDROID_HOME=/opt/android-sdk
   export PATH=$PATH:$ANDROID_HOME/cmdline-tools/latest/bin
   export PATH=$PATH:$ANDROID_HOME/platform-tools
   ```

2. **Install SDK Components**
   ```bash
   sdkmanager "platform-tools" "platforms;android-34" "build-tools;34.0.0"
   ```

3. **Set Environment Variables**
   ```bash
   export JAVA_HOME=/path/to/jdk-17
   export ANDROID_HOME=/path/to/android-sdk
   ```

4. **Build the Project**
   ```bash
   # Navigate to project directory
   cd IndoorLocalization
   
   # Make gradlew executable (on Unix-based systems)
   chmod +x gradlew
   
   # Build debug APK
   ./gradlew assembleDebug
   
   # Output will be at:
   # app/build/outputs/apk/debug/app-debug.apk
   ```

5. **Install on Device**
   ```bash
   # List connected devices
   adb devices
   
   # Install APK
   adb install app/build/outputs/apk/debug/app-debug.apk
   ```

## Project Configuration

### Create local.properties File

If building from command line, create a `local.properties` file in the project root:

```properties
sdk.dir=/path/to/android-sdk
```

For example:
- Windows: `sdk.dir=C:\\Users\\YourName\\AppData\\Local\\Android\\Sdk`
- macOS: `sdk.dir=/Users/YourName/Library/Android/sdk`
- Linux: `sdk.dir=/home/YourName/Android/Sdk`

## Build Variants

### Debug Build
```bash
./gradlew assembleDebug
```
- Includes debugging information
- Not optimized
- Can be installed alongside release builds

### Release Build
```bash
./gradlew assembleRelease
```
- Optimized code
- Requires signing configuration
- Smaller APK size

## Signing the Release Build

To create a signed release APK:

1. **Create a Keystore**
   ```bash
   keytool -genkey -v -keystore my-release-key.jks \
     -keyalg RSA -keysize 2048 -validity 10000 \
     -alias my-key-alias
   ```

2. **Configure Signing in build.gradle.kts**
   ```kotlin
   android {
       signingConfigs {
           create("release") {
               storeFile = file("my-release-key.jks")
               storePassword = "your-password"
               keyAlias = "my-key-alias"
               keyPassword = "your-password"
           }
       }
       buildTypes {
           release {
               signingConfig = signingConfigs.getByName("release")
           }
       }
   }
   ```

3. **Build Signed APK**
   ```bash
   ./gradlew assembleRelease
   ```

## Common Build Issues and Solutions

### Issue 1: SDK Not Found
**Error**: `SDK location not found`
**Solution**: Create `local.properties` with correct SDK path

### Issue 2: Java Version Mismatch
**Error**: `Unsupported Java version`
**Solution**: Ensure JDK 17 is installed and JAVA_HOME is set correctly

### Issue 3: Gradle Daemon Issues
**Error**: Build stuck or Gradle daemon errors
**Solution**:
```bash
./gradlew --stop
./gradlew clean build
```

### Issue 4: Dependency Resolution Failure
**Error**: Cannot resolve dependencies
**Solution**: Check internet connection and try:
```bash
./gradlew build --refresh-dependencies
```

### Issue 5: Insufficient Memory
**Error**: Out of memory during build
**Solution**: Increase Gradle memory in `gradle.properties`:
```properties
org.gradle.jvmargs=-Xmx4096m -Dfile.encoding=UTF-8
```

## Testing on Device

### Device Requirements
- Android 14 (API level 34) or higher
- Physical device (sensors don't work well in emulators)
- Wi-Fi capability
- Accelerometer, gyroscope, and magnetometer sensors

### Permissions
The app will request the following permissions at runtime:
- Location (Fine and Coarse)
- Wi-Fi State
- Change Wi-Fi State

Grant all permissions when prompted for the app to function correctly.

## Gradle Tasks Reference

```bash
# List all available tasks
./gradlew tasks

# Clean build directory
./gradlew clean

# Build debug APK
./gradlew assembleDebug

# Build release APK
./gradlew assembleRelease

# Run unit tests
./gradlew test

# Run Android instrumentation tests
./gradlew connectedAndroidTest

# Generate code coverage report
./gradlew jacocoTestReport

# Check for dependency updates
./gradlew dependencyUpdates
```

## Troubleshooting

### Build Successful but App Crashes
1. Check device Android version (must be 14+)
2. Verify all permissions are granted
3. Check logcat for error messages:
   ```bash
   adb logcat | grep IndoorLocalization
   ```

### Wi-Fi Scanning Not Working
- Ensure location services are enabled on the device
- Grant location permissions
- Check if Wi-Fi is enabled

### Sensors Not Responding
- Verify device has required sensors
- Check sensor permissions
- Restart the app

## Additional Resources

- [Android Developer Documentation](https://developer.android.com/docs)
- [Gradle Build Tool](https://gradle.org/guides/)
- [Kotlin Documentation](https://kotlinx.org/docs/)
- [Android Room Database](https://developer.android.com/training/data-storage/room)

## Support

For build issues or questions:
1. Check the README.md for project overview
2. Review error messages carefully
3. Ensure all prerequisites are met
4. Verify environment variables are set correctly

## Version Information

- Gradle: 8.7
- Android Gradle Plugin: 8.6.1
- Kotlin: 2.0.20
- Target SDK: 34 (Android 14)
- Min SDK: 34 (Android 14)
- Compile SDK: 34
