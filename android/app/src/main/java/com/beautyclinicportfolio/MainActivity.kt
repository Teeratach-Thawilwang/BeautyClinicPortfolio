package com.beautyclinicportfolio

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import android.os.Bundle;
import org.devio.rn.splashscreen.SplashScreen
import com.beautyclinicportfolio.R

class MainActivity : ReactActivity() {

  override fun onCreate(savedInstanceState: Bundle?) {
      // แสดง Splash Screen ก่อนโหลด React Native
      SplashScreen.show(this) 

      // เปลี่ยน Theme กลับเป็น AppTheme ก่อนแสดง React Native
      setTheme(R.style.AppTheme)

      super.onCreate(savedInstanceState)
  }

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  override fun getMainComponentName(): String = "BeautyClinicPortfolio"

  /**
   * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
   * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
}
