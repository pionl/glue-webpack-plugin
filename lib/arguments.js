/**
 * Taken/inspired from https://github.com/frontainer/gulp-sprite-glue/blob/master/lib/options.js
 * @author frontainer <frontainer@gmail.com> (http://frontainer.com)
 */
/**
 * The list of supported commands that will be used
 * @type {{algorithm: string, crop: string, caat: string, cachebuster: string, cachebusterFilename: string, cachebusterFilenameOnlySprites: string, cocos2d: string, css: string, img: string, cssTemplate: string, force: string, followLinks: string, html: string, json: string, jsonFormat: string, less: string, lessTemplate: string, margin: string, namespace: string, noImg: string, noCss: string, ordering: string, padding: string, png8: string, project: string, pseudoClassSeparator: string, quiet: string, recursive: string, ratios: string, retina: string, source: string, output: string, scss: string, scssTemplate: string, separator: string, spriteNamespace: string, url: string}}
 */
var arguments = {
    algorithm: '--algorithm=%val%',
    crop: '--crop',
    caat: '--caat',
    cachebuster: '--cachebuster',
    cachebusterFilename: '--cachebuster-filename',
    cachebusterFilenameOnlySprites: '--cachebuster-filename-only-sprites',
    cocos2d: '--cocos2d',
    css: '--css=%val%',
    img: '--img=%val%',
    cssTemplate: '--css-template=%val%',
    force: '--force',
    followLinks: '--follow-links',
    html: '--html',
    json: '--json',
    jsonFormat: '--json-format=%val%',
    less: '--less',
    lessTemplate: '--less-template=%val%',
    margin: '--margin=%val%',
    namespace: '--namespace=%val%',
    noImg: '--no-img',
    noCss: '--no-css',
    ordering: '--ordering=%val%',
    padding: '--padding=%val%',
    png8: '--png8',
    project: '--project',
    pseudoClassSeparator: '--pseudo-class-separator=%val%',
    quiet: '--quiet',
    recursive: '--recursive',
    ratios: '--ratios=%val%',
    retina: '--retina',
    scss: '--scss%val%',
    scssTemplate: '--scss-template=%val%',
    separator: '--separator=%val%',
    spriteNamespace: '--sprite-namespace=%val%',
    url: '--url=%val%',
    watch: '--watch'
};

module.exports = arguments;