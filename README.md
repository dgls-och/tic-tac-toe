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

