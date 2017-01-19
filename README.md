# Animated GIF App

A simple application built with React that uses the Giphy API. User input in the search field will send a query to the API and return a set of results. The user can then drag and drop the search results into one of the four 'dropzones'.

## Note

This code was originally part of a coding challenge for a job interview. The basic setup of this application was coded by the engineers of this unnamed company, then provided for me to add functionality and styling.

## Getting Started

To run this code, first make sure you have Node installed.

[Download and install NodeJS here](https://nodejs.org/download/).

Clone this repo
```
git clone git@github.com:besseddrest/animated-gif-app.git
```

Navigate to the todo-app folder, and install the dependencies
```
cd animated-gif-app
npm install
```

After the packages are installed, start the local server
```
npm start
```

Open a browser and view the app at `http://localhost:3020`

To stop the server, press CTRL-C.

### Basic Functionality

- Hook search up to the [Giphy API](https://github.com/giphy/GiphyAPI)
  - uses public key
  - uses react-debounce-input to make a search request 300 ms after user's last keyup
  - populates sidebar with top 25 search results (Giphy API default)

### Features/Enhancements

- hooked up react-dnd to allow user to drag and drop gifs to drop zones
- included Bootstrap CSS (from CDN) to help create simple, responsive layout
- hovering over swatch in results sidebar will play gif
- image will stretch to fit dropzone based on orientation

### Other

- included [BEM](http://getbem.com/introduction/) CSS methodology
- moved scss files to new 'styles' folder
- changed DraggableTypes 'GIF' from Symbol to a string - otherwise app would not render in Safari

### Outstanding

- warning in browser re: .findDOMNode but can't seem to find source. App still functional.


## Attributions

This repository is based on gaearon's [react-transform-boilerplate](//github.com/gaearon/react-transform-boilerplate) which is distributed under the [CC0 (public domain) license](//github.com/gaearon/react-transform-boilerplate/blob/d682dc59b3626fe515cd10bcc1f546a42d1098a9/LICENSE).
