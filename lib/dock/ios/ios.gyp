{
  'targets': [
    {
      'target_name': '{{snake project.name}}',
      'product_name': '{{project.name}}',
      'type': 'executable',
      'mac_bundle': 1,
      'sources': [
        './{{pascal project.name}}/AppDelegate.h',
        './{{pascal project.name}}/AppDelegate.mm',
        './{{pascal project.name}}/main.mm',
      ],
      'mac_bundle_resources': [
        './{{pascal project.name}}/Base.lproj/Main.storyboard',
        './{{pascal project.name}}/Base.lproj/LaunchScreen.xib'
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
        'INFOPLIST_FILE': './{{pascal project.name}}/Info.plist',
      },
    },
  ]
}