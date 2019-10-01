In this project I chose to use React and modern JavaScript to create a front end UI based version of the classic memory game. I also chose a mobile first approach to simplify design and make the game more accesible.

The Grid and Card components were supplied from MaterilUi and I added some additional styling via CSS.

My plan for the project was to have stateless functional Card components that when clicked would trigger game logic. The information about whether or not to show a given card would be passed in via props from the smart parent GameBoard Component.

Basically the GameBoard Component handles all the game logic and when showCard is fired there is a series of checks to determine whether to remove a match, keep the card shown or flip both the shown cards back down.

I have also included some tests to cover some basic use cases.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the Jest/Enzyme tests in the interactive watch mode.<br>
