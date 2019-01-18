// These values come from package.json npm test command
process.env['NODE_ENV'] = 'test';
process.env['PORT'] = '8080';
process.env['MONGO_URL'] = 'mongodb://localhost:27017/mern-test';
                
module.exports = function (wallaby) {
    return {
      files: [
        // app code folders excluding test specs
        'client/**/*.js',
        '!client/**/*.spec.js',
        'server/**/*.js',
        '!server/**/*.spec.js',
        'Intl/**/*.js',
        '!Intl/**/*.spec.js',
        { pattern: '**/*.css', load: false, instrument: false },
        { pattern: '**/*.svg', load: false, instrument: false },
        { pattern: '**/*.png', load: false, instrument: false },
        { pattern: '**/*.jpg', load: false, instrument: false },
      ],
  
      tests: [
        // source: package.json ava section
        'client/**/__tests__/*.spec.js',
        'server/**/__tests__/*.spec.js',
      ],
  
      env: {
        type: 'node',
        runner: 'node',
      },
      compilers: {
        '**/*.js': wallaby.compilers.babel({
          // source: .babelrc presets
          presets: ["react", "es2015", "stage-0"]
        })
      },
      testFramework: 'ava',
      setup: function () {
        // source: package.json ava require
        require("./server/util/setup-test-env.js");
      },
    };
  };