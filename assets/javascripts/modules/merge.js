import { Dice } from "./dice.js";

export class Merge {
    constructor() {
        console.log('Merge');

        for (let i = 0; i<5; i++) {
            new Dice();
        }
    }
}