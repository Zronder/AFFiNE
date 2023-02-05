const plugins = [];

if (process.env.NODE_ENV === 'development' || process.env.COVERAGE === 'true') {
  console.log(
    'Detected development environment. Instrumenting code for coverage.'
  );
  plugins.push('istanbul');
}

module.exports = {
  presets: ['next/babel'],
  plugins,
};