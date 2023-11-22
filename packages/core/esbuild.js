require('esbuild')
    .build({
        entryPoints: ['./src/index.js'],
        bundle: true,
        format: 'esm',
        outfile: 'dist/index.esm.js'
    })
    .catch(() => process.exit(1));

require('esbuild')
    .build({
        entryPoints: ['./src/index.js'],
        bundle: true,
        format: 'cjs',
        outfile: 'dist/index.cjs.js'
    })
    .catch(() => process.exit(1));
