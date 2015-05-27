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
        './TestApp/Base.lproj/Main.storyboard'
      ],
      'link_settings': {
        'libraries': [
          '$(SDKROOT)/System/Library/Frameworks/Cocoa.framework',
        ],
      },
      'xcode_settings': {
        'INFOPLIST_FILE': './TestApp/Info.plist',
      },
    },
  ]
}