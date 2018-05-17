package com.spelletjes;

import android.app.Application;
import android.content.Context;
import android.support.multidex.MultiDex;

import com.reactnativenavigation.NavigationApplication;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import io.sentry.RNSentryPackage;
import com.cmcewen.blurview.BlurViewPackage;

import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends NavigationApplication {
  // implements ReactInstanceHolder {

    @Override
    protected void attachBaseContext(Context base) {
        super.attachBaseContext(base);
        MultiDex.install(this);
    }


    @Override
    public boolean isDebug() {
        return BuildConfig.DEBUG;
    }

    protected List<ReactPackage> getPackages() {
        return Arrays.<ReactPackage>asList(
          new ReactNativeConfigPackage(),
          new RNSentryPackage(MainApplication.this),
          new BlurViewPackage()
        );
    }

    @Override
    public List<ReactPackage> createAdditionalReactPackages() {
        return getPackages();
    }

    // @Override
    // public ReactInstanceManager getReactInstanceManager() {
    //     return getReactNativeHost().getReactInstanceManager();
    // }
}
