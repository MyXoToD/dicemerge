import { Config } from "./config.js";
import { Dice } from "./dice.js";

export class Merge {
    constructor() {
        this.mergables = document.querySelector('.mergables');
        this.slots = this.initSlots();

        this.diceSpawnInterval = setInterval(this.spawnDice.bind(this), Config.dice.spawnTime);
    }

    initSlots() {
        let slots = Array();

        for (let i = 0; i < Config.merge.slots; i++) {
            let slot = this.createSlot(i);
            slots.push({
                id: i,
                html: slot,
                dice: null
            });
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

    spawnDice() {
        let slot = this.getFreeSlot();
        if (!slot)
            return;
        
        let dice = new Dice(0);
        this.slots[slot.id].dice = dice;
        slot.html.append(dice.element);
    }

    getFreeSlot() {
        return this.slots.find(slot => slot.dice == null);
    }
}