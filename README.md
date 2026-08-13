# Tic Tac Toe

The required modules were given in the assignment note, but I overcompleted issues by overthinking the app. I wanted to produce something perfect, like write perfect code. But as the codebase grew larger, I knew it was a bad idea to want to write a perfect looking code when the programme was not in place yet.

## The GameBoard

The gameboard is the first thing the programme needs. Of course not on the viewport, but something to store the player markers and measure the outcome of the players' moves -- a draw or win. I looked it up and saw soemthing that looked like an array of arrays. Sadly, the array discribed here is not the traditional "2D" arrays. It was a nesting of three arrays (columns) in three other arrays (rows) that were themselves nested in another array (board).  

It should help to give you a painful snippet of my board printing code.  
```js
const board = [];
for (let i = 0; i < 3; i++) {
    let row = [];
    board.push(row);
    for (let j = 0; j < 3; j++) {
        let column = [];
        row.push(column);
    }
}
``` 

As I reflect on this piece of code now, I realise that not only had I written too many lines of code but also that I had written a piece of my programme that requires extra memory resourses. More so, instead of quietly returning the board, I added a method with which to print the board. Bear in mind that the code above was only a part of a `gameBoard` module. The new `GameBoard` module only returns the board. Neat and simple.  

## In the end

AI guidance was used throughout the architectural and debugging process of this console-based Tic-Tac-Toe project. The primary challenges involved understanding module patterns, state management, execution flow, and responsibility separation between objects such as `Gameboard`, `Player`, and `GameController`.

Rather than fully mastering these concepts during the project, I was mainly exposed to foundational software engineering ideas including encapsulation, modular design, abstraction, and game state flow. The guidance helped simplify an initially over-engineered approach into a more maintainable console application structure while providing practical exposure to JavaScript factory functions and module patterns.

[!INFO]
##Update:

### Tic-Tac-Toe

A browser-based Tic-Tac-Toe game built with vanilla HTML, CSS, and JavaScript.

The project focuses on understanding **JavaScript modules, game state management, DOM manipulation, event handling, separation of concerns, and SOLID design principles** rather than simply completing a project specification.

### Architecture

The implementation separates the game into distinct responsibilities:

- **Gameboard** — manages board state and valid moves.
- **Player** — represents players and their markers.
- **ComputerPlayer** — determines the computer's moves.
- **GameRules** — handles win and draw conditions.
- **GameView** — manages DOM presentation and user interaction.
- **GameController** — coordinates game flow and player turns.

### Purpose

The project serves primarily as a **code-reading and architecture exercise**, with emphasis on understanding why each responsibility belongs where it does and how the components interact to produce a complete application.

### Technologies

- HTML
- CSS
- JavaScript
- DOM API

### Status

Functional and continuously refactored as part of JavaScript and software design practice.
