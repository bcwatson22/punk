# Punk API

I wanted to build this fun little project from the ground up without the use of a framework, to illustrate my abilities outside the safety net of a React or a Vue.

I used Laravel Mix, which is a way of automating some of the more common **Webpack** workflow tasks such as copying files, compiling **Sass**, **Babel**-ifying scripts and spinning up a local server.

It also allows for finer control by using the `mix.webpackConfig()` override - which I’ve used for a Sass glob import.

## Running the project

I had Node version **10.13.0** installed at the time of dev - newer or older versions might be fine but if you encounter problems install this specific one. To get started, run `npm i` in the project root and then:

### Development
* `npm run dev`
* Copies all relevant files from */src* to */dist*
* Compiles **Sass** into **CSS**
* Bundles **ES6** modules with **Babel**
* Spins up a **browserSync** server
* Opens a tab at http://localhost:1234

### Production
* `npm run prod`
* Copies all relevant files from */src* to */dist*
* Compiles and minifies styles
* Bundles and minifies scripts
* Processes images

### Testing
* `npm run test`
* Runs JavaScript unit tests written in **Jest**

## Structure

* Kept everything modular
	* Each component has its own CSS and JS file
	* Allows ease of maintenance and scalability
* Things kept clean, lean and DRY without sacrificing too much readability

## Unit testing

* Created some unit tests with **Jest**
* Testing the `delay()` method exported from *utils.js*
	* This is an asynchronous function that returns a `promise`, essentially allowing you to use a `timeout` with confidence
* Only wrote a couple of unit tests, but wanted to illustrate potential approach

## Components

### Header
* **CSS flex** used for layout
* System fonts used for performance and familiarity
* Link underline animation - uses a gradient `background-image` so has multiline support

### Slider
* Employs the **Tiny Slider** module
* Leverages its built-in lazyloading to avoid loading and initialising another plugin
* Buttons created with CSS to keep things lean and allow granular control without an extra network request
* Images used from a Brewdog advertising campaign

### Accordion
* Marked up with the oft-overlooked but semantically spot-on `<details>` / `<summary>` elements
* This approach naturally falls back for non-JS users and is controllable with the keyboard, improving accessibility
* Used `fetch()` to grab data from the API, then`map()` over it to build the markup
	* This is then injected with `insertAdjacentHTML()` for increased speed and security
	* **Loading**, **success** and **error** states are handled gracefully, with the user informed of what's going on in conversational tones
* Employed `promise` to ensure asynchronous functions are called in order
* Leveraged **CSS Vars** to keep the animation lightweight and clean
	* These are kept unitless for speed and flexibility, with the actual height worked out with `calc(var(--max-height) * 0.1rem)`   
* Recalculate the heights on `resize` or `orientationchange`, but only if the vertical height has changed
	* This avoids false triggers from mobile browser bars collapsing
	* Wrap in a `debounce()` to wait for resizing to finish and avoid a performance hit
* Mouse tracking used for a jazzy hover effect (again via **CSS Vars**)
	* Use `requestAnimationFrame()` to keep things optimised and **60fps**
* Toggle the `aria-expanded` attribute to increase accessibility and allow screen readers to keep track of what's going on

### Tiles
* Uses **CSS Grid** to style the grid which breaks out into more columns as the screen size increases
* Employs a similar approach as the accordion to get data and inject into the DOM
	* 25 beers are fetched, which are then shuffled with `sort()` before 12 are extracted with `slice()` 
* For a bit of fun, I used the **Vibrant** plugin for an extra effect
	*	Finds the dominant colour from the beer image returned from the API
	*	Use this on the label on the decorative beer bottle vector, the `<svg>` is inline so can just `fill: var(--colour)` with CSS
	*	Adds a custom decorative touch, but called after the content is rendered to avoid interrupting page functionality
	*	Colours are saved to swerve having to get colours again
* The beer grid is then controllable via a `<select>` element, allowing the user to sort the beers from weakest to strongest and vice versa
	* This uses `sort()` on an existing array that I saved from before, to avoid doing another `fetch()` request
	* Because the beer label colour was saved earlier, we can stick this straight in
