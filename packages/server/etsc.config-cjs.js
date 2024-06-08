const {globSync} = require('glob');

const sourceFiles = globSync('src/**/*.ts');

/**
 * @type import('esbuild-node-tsc/dist/config').Config
 */
const config = {
  esbuild: {
    entryPoints: sourceFiles,
    outdir: 'dist',
    platform: 'node',
    format: 'cjs',
  }
}

module.exports = config;
