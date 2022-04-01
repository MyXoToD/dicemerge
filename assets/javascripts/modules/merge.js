import { Config } from "./config.js";
import { Dice } from "./dice.js";

export class Merge {
    constructor() {
        this.mergables = document.querySelector('.mergables');
        this.slots = this.initSlots();
    }

    initSlots() {
        let slots = Array();

        for (let i = 0; i < Config.merge.slots; i++) {
            let slot = this.createSlot(i);
            slots.push(slot);
            this.mergables.append(slot);
        }
        
        return slots;
    }
    
    createSlot(id) {
        let slot = document.createElement('div');
        slot.classList.add('mergables__slot');
        slot.setAttribute('data-slot', id);

        return slot;
    }
}