{
  'targets': [
    {
      'target_name': 'falkor',
      'type': 'static_library',
      'includes': [
        './deps/bastian/common.gypi'
      ],
      'dependencies': [
        './deps/bastian/bastian.gyp:bastian',
      ],
      'include_dirs': [
        './deps/bastian/include',
        './deps/bastian/deps/v8/include'
      ],
      'sources': [
        'src/engine.cc',
      ]
    }
  ]
}