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
        './{{pascal project.name}}/main.mm'
      ],
      'mac_bundle_resources': [
        './{{pascal project.name}}/Base.lproj/Main.storyboard',
        './{{pascal project.name}}/Base.lproj/LaunchScreen.xib',
        './package'
      ],
      'include_dirs': [
        '{{falkor.base}}/include',
        '{{falkor.base}}/deps/bastian/include',
      ],
      'link_settings': {
        'libraries': [
          '$(SDKROOT)/System/Library/Frameworks/UIKit.framework',
          '$(SDKROOT)/System/Library/Frameworks/JavascriptCore.framework',
          '/Applications/Xcode.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator.sdk/usr/lib/libstdc++.dylib',
          '/Applications/Xcode.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator.sdk/usr/lib/libstdc++.6.dylib',
          '{{falkor.base}}/out/jsc-ios-simulator/bastian.build/Debug-iphonesimulator/bastian.build/Objects-normal/x86_64/libbastian.a',
          '{{falkor.base}}/out/jsc-ios-simulator/falkor.build/Debug-iphonesimulator/falkor.build/Objects-normal/x86_64/libfalkor.a',
        ],
      },
      'xcode_settings': {
        'SDKROOT': 'iphonesimulator',
        'CODE_SIGN_IDENTITY': 'iPhone Developer',
        'IPHONEOS_DEPLOYMENT_TARGET': '5.0',
        'GCC_VERSION': 'com.apple.compilers.llvm.clang.1_0',
        'ARCHS': '$(ARCHS_STANDARD_64_BIT)',
        'INFOPLIST_FILE': './{{pascal project.name}}/Info.plist',
      },
    },
  ]
}