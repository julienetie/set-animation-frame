import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';

export default {
	moduleName: 'SAF',
	entry: 'set-animation-frame.es.js',
	plugins: [babel({
			exclude: './node_modules/**',
            presets: 'es2015-rollup'
		}),
		nodeResolve({ jsnext: false })
	],
	format: 'umd',
	dest: 'set-animation-frame.js'
};