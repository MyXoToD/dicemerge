import { Game } from "./modules/game.js";
import { Screen } from "./modules/screen.js";

document.addEventListener('DOMContentLoaded', (e) => {
    new Screen();
    new Game();
});