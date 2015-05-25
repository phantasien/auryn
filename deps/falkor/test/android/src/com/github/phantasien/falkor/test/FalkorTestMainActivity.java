package com.github.phantasien.falkor.test;

import android.app.Activity;
import android.os.Bundle;

public class FalkorTestMainActivity extends Activity
{
  /** Called when the activity is first created. */
  @Override
  public void onCreate(Bundle savedInstanceState)
  {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.main);
    run();
  }

  public native void run();

  static {
    System.loadLibrary("falkor-test");
  }
}
