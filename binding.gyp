{
  'targets': [
    {
      'target_name': 'enetnat',
      'type': 'shared_library',
      'sources': [ "enet.cc" ],
      'libraries': ['-lenet'],
      'library_dirs': [
         '/usr/lib','/usr/local/lib'
      ],
      'cflags!': [ '-fno-exceptions' ],
      'cflags_cc!': [ '-fno-exceptions' ]
    }
  ]
}
