const tilesContainer = document.querySelector(".tiles-container");

// colors for our tiles
const colors = [
  "red",
  "green",
  "blue",
  "aquamarine",
  "orange",
  "yellow",
  "pink",
  "gold",
];
// make our colors twice
const duplicateColors = [...colors, ...colors];

// Tiles count
const tilesCount = duplicateColors.length; // length of our tiles

// Game state
let revealedCount = 0;
let activeTile = null;
let awaitingEndOfMove = false; // The two unmatched tiles waiting to be turned over again

function buildTiles(color) {
  const tiles = document.createElement("div");

  tiles.classList.add("tiles"); // add class to the tiles
  tiles.setAttribute("data-color", color); // set the data color to the color that has passed in
  tiles.setAttribute("data-revealed", false); // the tiles are not currently revealed

  // Reveal the color when it's clicked
  tiles.addEventListener("click", () => {
    const revealed = tiles.getAttribute("data-revealed");

    if (awaitingEndOfMove || revealed === "true" || tiles === activeTile) {
      // the two unmatched color will be turned around again
      // if revealed is true then return then don't do anything
      // if your trying to click on the same tile twice return and cancel the move
      return;
    }

    // Revealing the color when it's clicked
    tiles.style.backgroundColor = color;

    // if there is no active tile
    if (!activeTile) {
      activeTile = tiles; // the activeTile will be equal to the current tile

      return; // Cancel the enitre function, you need to choose a second tile to matched
    }

    // If the color Matched
    const colorToMatched = activeTile.getAttribute("data-color");

    if (colorToMatched === color) {
      tiles.setAttribute("data-revealed", true);
      activeTile.setAttribute("data-revealed", true); // set the activetile and tile's attribute to true when it's matched

      awaitingEndOfMove = false; // Make this both again in order to not hide the matched colors
      activeTile = null;
      revealedCount += 2; // If the color Matched revealedCount +2

      if (revealedCount === tilesCount) {
        alert("You Win! Please Refresh to play again");
      }
      return;
    }

    // If the user chosen the incorrect match of tiles
    awaitingEndOfMove = true; // awaitingEndOfMove set to true to activate the setTimeout

    setTimeout(() => {
      tiles.style.backgroundColor = null; // set the background color for tiles and activeTiles to be black again
      activeTile.style.backgroundColor = null;

      awaitingEndOfMove = false; // set both again in order to start again
      activeTile = null;
    }, 1000); // After 1 seconds we want to hide the tiles once again
  });
  return tiles;
}

// Building up the tiles
for (let i = 0; i < tilesCount; i++) {
  const randomIndex = Math.floor(Math.random() * duplicateColors.length); //returns randomindex from the duplicate colors
  const color = duplicateColors[randomIndex]; // returns the value of the index which is the colors
  const tiles = buildTiles(color); // passed the color that chosen in the color variable

  duplicateColors.splice(randomIndex, 1); // makes two unique colors for each tile
  tilesContainer.appendChild(tiles);
}
