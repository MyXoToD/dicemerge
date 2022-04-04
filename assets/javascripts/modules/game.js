import { Config } from "./config.js";
import { Data } from "./data.js";
import { Dice } from "./dice.js";

export class Game {
    constructor() {
        this.mergables = document.querySelector('.mergables');
        this.slots = this.initSlots();

        this.diceSpawnInterval = setInterval(this.spawnDice.bind(this), Config.dice.spawnTime);
        this.tickInterval = setInterval(this.tick.bind(this), Config.game.tickSpeed);

        window.addEventListener('mouseup', this.dragEnd.bind(this));
        window.addEventListener('touchend', this.dragEnd.bind(this));
    }

    initSlots() {
        let slots = Array();

        for (let i = 0; i < Config.game.slots; i++) {
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

    tick() {
        this.rollDice();
        this.updateMoney();
    }

    rollDice() {
        let total = 0;

        this.slots.forEach(slot => {
            if (!slot.dice)
                return;
            total += slot.dice.roll();
        });

        Data.money += total;
    }

    updateMoney() {
        Config.elements.money.textContent = Data.money + '$';
    }

    spawnDice() {
        let slot = this.getFreeSlot();
        if (!slot)
            return;
        
        let dice = new Dice(0);
        this.slots[slot.id].dice = dice;
        slot.html.append(dice.element);
    }

    dragEnd() {
        let draggedDice = this.slots.find(slot => slot.dice.dragging); // FIXME: Sometimes nothing is returned
        console.log(draggedDice);
        draggedDice.dice.dragging = false;
        draggedDice.dice.element.classList.remove('dice--dragging');

        let droppedDice = document.elementFromPoint(draggedDice.dice.cursorPos.x, draggedDice.dice.cursorPos.y);
        if (!droppedDice.classList.contains('dice'))
            return;
        droppedDice = this.slots.find(slot => slot.dice.element == droppedDice);

        if (draggedDice != droppedDice && droppedDice.dice.id == draggedDice.dice.id) {
            // Merge
            draggedDice.html.innerHTML = '';
            draggedDice.dice = null;
            droppedDice.dice.levelUp();
        } else if (draggedDice != droppedDice) {
            // Switch
            let draggedDiceID = draggedDice.dice.id;
            let droppedDiceID = droppedDice.dice.id;
            draggedDice.dice = new Dice(droppedDiceID);
            draggedDice.html.innerHTML = '';
            draggedDice.html.append(draggedDice.dice.element);
            droppedDice.dice = new Dice(draggedDiceID);
            droppedDice.html.innerHTML = '';
            droppedDice.html.append(droppedDice.dice.element);
        }
    }

    getFreeSlot() {
        return this.slots.find(slot => slot.dice == null);
    }
}