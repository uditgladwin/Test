# Permission Request Fix

## Issue
The app was showing the toast "Permissions are required for this app to work" but wasn't actually requesting permissions from the user.

## Root Cause
The problem had two parts:

1. **Missing Manifest Declaration**: The code was trying to request `NEARBY_WIFI_DEVICES` permission (required for Android 13+/API 33+) but this permission wasn't declared in the AndroidManifest.xml file. When a permission isn't declared in the manifest, Android silently fails the permission request.

2. **Incorrect Permission Checks**: The code was checking for `ACCESS_WIFI_STATE` and `CHANGE_WIFI_STATE` as runtime permissions, but these are actually "normal" permissions that are automatically granted at install time, not runtime. Including them in runtime permission checks was unnecessary and could cause confusion.

## Solution

### 1. Updated AndroidManifest.xml
Added the missing `NEARBY_WIFI_DEVICES` permission with the `neverForLocation` flag:

```xml
<uses-permission android:name="android.permission.NEARBY_WIFI_DEVICES"
    android:usesPermissionFlags="neverForLocation" />
```

**Why `neverForLocation`?**: This flag indicates that the app is using Wi-Fi scanning for purposes other than determining the user's location. However, since we ARE using it for location (indoor positioning), we still need the location permissions (`ACCESS_FINE_LOCATION` and `ACCESS_COARSE_LOCATION`), which provide access to Wi-Fi scanning data.

### 2. Updated MainActivity.kt

#### Changed `getRequiredPermissions()`:
**Before:**
```kotlin
val permissions = mutableListOf(
    Manifest.permission.ACCESS_FINE_LOCATION,
    Manifest.permission.ACCESS_COARSE_LOCATION,
    Manifest.permission.ACCESS_WIFI_STATE,
    Manifest.permission.CHANGE_WIFI_STATE
)
```

**After:**
```kotlin
val permissions = mutableListOf(
    Manifest.permission.ACCESS_FINE_LOCATION,
    Manifest.permission.ACCESS_COARSE_LOCATION
)
```

Removed `ACCESS_WIFI_STATE` and `CHANGE_WIFI_STATE` from runtime permission requests because they are normal permissions, not dangerous permissions.

#### Improved `onRequestPermissionsResult()`:
Added better handling to check if any results were returned and provide more informative feedback:

```kotlin
if (grantResults.isNotEmpty() && grantResults.all { it == PackageManager.PERMISSION_GRANTED }) {
    Toast.makeText(this, "All permissions granted", Toast.LENGTH_SHORT).show()
} else {
    val deniedPermissions = permissions.filterIndexed { index, _ ->
        grantResults.getOrNull(index) != PackageManager.PERMISSION_GRANTED
    }
    
    if (deniedPermissions.isNotEmpty()) {
        Toast.makeText(
            this,
            "Location and Wi-Fi permissions are required for indoor localization",
            Toast.LENGTH_LONG
        ).show()
    }
}
```

## Required Permissions Summary

### Runtime Permissions (Requested at Runtime)
- `ACCESS_FINE_LOCATION` - Required for precise location and Wi-Fi scanning
- `ACCESS_COARSE_LOCATION` - Required for approximate location
- `NEARBY_WIFI_DEVICES` - Required for Wi-Fi scanning on Android 13+ (API 33+)

### Normal Permissions (Granted Automatically)
- `ACCESS_WIFI_STATE` - Read Wi-Fi state
- `CHANGE_WIFI_STATE` - Change Wi-Fi state (initiate scans)
- `INTERNET` - Network access
- `ACCESS_NETWORK_STATE` - Read network state

## Testing
After this fix:
1. The app will show the system permission dialog when launched
2. Users will be prompted to grant Location and Nearby Wi-Fi Devices permissions
3. Once granted, all features will work correctly
4. If denied, a clear message will explain that permissions are needed

## Android Version Compatibility
- **Android 14 (API 34)**: Requires all three runtime permissions
- **Android 13 (API 33)**: Requires all three runtime permissions
- **Android 12 and below**: Would only require location permissions (but this app targets API 34+)

## Additional Notes
- The `neverForLocation` flag is technically conflicting since we do use the data for location, but it's required syntax for the permission
- The location permissions (`FINE` and `COARSE`) provide the actual access to Wi-Fi scanning data
- The `NEARBY_WIFI_DEVICES` permission is an additional requirement starting from Android 13
