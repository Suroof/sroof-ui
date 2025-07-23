import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import json from '@rollup/plugin-json';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      exports: 'named',
      sourcemap: true
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      exports: 'named',
      sourcemap: true
    }
  ],
  plugins: [
    peerDepsExternal(),
    resolve({
      browser: true
    }),
    commonjs(),
    json(),
    typescript({
      tsconfig: './tsconfig.build.json',
      exclude: [
        '**/*.test.tsx',
        '**/*.test.ts',
        '**/*.stories.tsx',
        'src/App.tsx',
        'src/index.tsx'
      ]
    }),
    postcss({
      extract: true,
      minimize: true,
      modules: true
    })
  ],
  external: ['react', 'react-dom']
};