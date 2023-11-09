require('esbuild')
    .build({
        entryPoints: ['./src/index.js'],
        bundle: true,
        format: 'esm',
        outfile: 'dist/index.js'
    })
    .catch(() => process.exit(1));
