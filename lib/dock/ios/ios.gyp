{
  'targets': [
    {
      'target_name': 'test_app',
      'product_name': 'Test App Gyp',
      'type': 'executable',
      'mac_bundle': 1,
      'sources': [
        './TestApp/AppDelegate.h',
        './TestApp/AppDelegate.mm',
        './TestApp/main.mm',
      ],
      'mac_bundle_resources': [
        './TestApp/Base.lproj/Main.storyboard',
        './TestApp/Base.lproj/LaunchScreen.xib'
      ],
      'link_settings': {
        'libraries': [
          '$(SDKROOT)/System/Library/Frameworks/UIKit.framework',
        ],
      },
      'xcode_settings': {
        'SDKROOT': 'iphoneos',
        'TARGETED_DEVICE_FAMILY': '1,2',
        'CODE_SIGN_IDENTITY': 'iPhone Developer',
        'IPHONEOS_DEPLOYMENT_TARGET': '5.0',
        'ARCHS': '$(ARCHS_STANDARD_32_64_BIT)',
        'INFOPLIST_FILE': './TestApp/Info.plist',
      },
    },
  ]
}