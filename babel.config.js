module.exports = {
  presets: [
    '@vue/app'
  ],
  plugins: [
    [
      'component',
      {
        'libraryName': '@leafs/ui',
        'styleLibrary': {
          'name': 'theme-chalk',
          'path': '[module].css'
        },
      }
    ]
  ]
}
