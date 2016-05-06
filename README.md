# Gulp Bootstrap Starter
[View Bootstrap Documentation](http://getbootstrap.com)

## Quick Start
1. run `npm install`
2. visit ./config.json and ensure paths and settings are correct.
3. run `gulp serve`
4. See gulpfile.js for individual tasks. e.g. sass, buildScripts, svg-store

**Important** By default we are not minifying CSS or JS. Visit the `gulpfile.js` to enable this by uncommenting `//.pipe(cssnano())` or `// .pipe(uglify())` in the `styles()` and `buildScripts()` tasks.

## Configuration
Visit `config.json` to find app configuration. There you can define paths to folders and such.

Each JS partial you create must make it into the `mainJsFiles` array. Start with 3rd party vendor scripts followed by your custom scripts and end with the `main.init.js` to trigger all the scripts. **Important:** `scripts/main.init.js` must be last in that list for build reasons. There is a `/scripts/partials/_starter-template.js` which is a great starting point for a JS file.

### Front end development utilizes a few helpful tools:
* Using Sass for CSS preprocessing.
* Using Gulp.js for the following tasks
 * Watch - watching changes in JS, HTML, Sass, images etc.
 * Autoprefixer - handles vendor prefixes - author simply writes standard
 * Browsersync - handles injection/browser reload
 * Imagemin - Minifies images
 * Uglify - Minifies JS
 * SVGmin - Minifies SVG
 * Sass - Scss format

#### NPM
1. Make sure you have NPM running on your computer (`npm -v`), if not go download: http://npmjs.org
2. Install Gulp.js (if you haven't already): `npm install -g gulp`
3. from within the theme directory run `npm install`

#### Bower
1. run `npm install -g bower` if you don't have it installed.
2. run `bower install` to setup any bower dependancies.

#### Run the app:
`gulp serve`

### Javascript
Gulp handles concatenation and minification of JavasScript. It is encouraged to create partials for each main function vs. one huge file. These partials should live in `scripts/partials` and should be named clearly.

To accommodate the partials environment we've setup a global variable called `Engine` that is defined in `scripts/main.js` We build upon the `ui` object. e.g. `Engine.ui.functionName();` is used to trigger the function in `main.init.js`.

* `/scripts/main.js` - defines Engine objects
* `/scripts/main.init.js` - triggers functions
* `/scripts/partials/**.js` - partial JS files
  * `/scripts/main.min.js` - minified js file
  * `/scripts/vendor` - 3rd party js files

### Sass
We are leveraging a modular approach to Sass. Each .scss file includes inline media queries to keep dev/maintanence of these modules all in one place. Styles are setup like this:

* `/styles/main.scss` - main .scss file
* `/styles/main.min.css` - minified css file
  * `/styles/layouts` - structural styles
  * `/styles/partials` - main partials
  * `/styles/partials/elements` - more granular elements
  * `/styles/vendor/` - 3rd party css


### Webfonts & Icon Fonts
Webfonts/Icon Fonts are stored in `/styles/fonts/` folder. The icon fonts are Icomoon based and .json file is located there as well for modification of that suite. You will find `/styles/svg` and it contains svg versions of these icons. Not currently being used but could be in the future.

Folder structure differs from that of Icomoons default export. Find the Sass file for icon fonts here: `/styles/partials/_icon-fonts.scss`
