# Jekyll-based Styleguide
This is a fork of [Jekyll Styleguide](https://github.com/jeromecoupe/jekyllstyleguide) and has been tweaked to fit in with my workflow. I've added *Brand Colors*, and a *Jump To Section* dropdown.

![Example of Styleguide](https://s3-us-west-2.amazonaws.com/s.cdpn.io/15309/sg.png)

## Setup
Install Jekyll `gem install jekyll`. Requires [Ruby](https://www.ruby-lang.org/en/documentation/installation/). If you have troubles visit the [troubleshooting page](https://jekyllrb.com/docs/troubleshooting/) for more information.

## Commands
From the root of the project:

`jekyll build` - builds the static styleguide

`jekyll serve` - serves the static styleguide

## Configuration
Visit the `_config.yml` file for configuration options. Follow [Jekyll's documentation](https://jekyllrb.com/docs/home/) for how to manage the static styleguide. The default `build` folder is within the root directory `destination: styleguide` This can be changed to any folder e.g. `../styleguide`

## Custom Colors
Visit the `_data` folder to add to the brand colors that sit at the top of the styleguide. This is a simple `.yml` file.

```
- name: brightBlue
  hex: "#48f1fd"

- name: anotherColor
  hex: "#eeeeee"
```

## Styles/Sass
Have your project's build system copy/build CSS to the `/css` folder or work within the styleguide using Jekyll's Sass support. The styleguide has it's own CSS file that jekyll will build `/css/screen.css` as well. Update the `/layouts/default.html` file to point to the required CSS for your project. Jekyll will move all these styles when it builds. The styleguide has very little in terms of opinionated base styling so that it will take on the look and feel of your project's style.

I've included a couple dummy CSS files to get you going. All you need is `screen.css` and the other styles should be your project's styles.

```
<link rel="stylesheet" href="css/screen.css" media="screen">
```
```
<link rel="stylesheet" href="css/base.min.css" media="screen">
<link rel="stylesheet" href="css/main.min.css" media="screen">
```

## JavaScript
Have your project build your JavaScript to the `/scripts` folder and update the `_layouts/default.html` file to call the appropriate scripts. e.g.

```
<script src="scripts/main.min.js"></script>
```


## Components
To create a component visit the `_components` folder and create the html file. Use the following format.

```
---
title: Buttons
scss: '/styles/partials/sections/_buttons.scss'
type: buttons
fullwidth: false
itemId: buttons
---
<a href="#" class="btn btn-primary">Primary Button</a>
<a href="#" class="btn btn-default">Default</a>
```

- `title` The title of the component.
- `scss` The path to the Sass file partial
- `type` Used for grouping like-minded components
- `fullwidth` If set to `true` the component will go full width of viewport instead of having padding.
- `itemID` A unique `ID` used for the *Jump To* selector.
