import { ICommand, Attack, Item } from './types';
import { BattleService } from './services/BattleService';
import { ItemService } from './services/ItemService';


/*
* ---- UseItemCommand ----
* Allows the user to use an item during a pokemon battle
*/
export class UseItemCommand extends ICommand {
	public constructor(private itemService: ItemService) {
		super()
	}

	execute(item: Item) {
		this.itemService.useItem(item)
	}
}


/*
* ---- AttackCommand ----
* Allows the user to select an attack to use in a pokemon battle
*/
export class AttackCommand extends ICommand { 
	public constructor(private battleService: BattleService) {
		super()
	}

	execute(attack: Attack) {
		this.battleService.attack(attack)
	}
}


/*
* ---- RunAwayCommand ----
* Allows the user to attempt to run away from the battle (50/50 chance)
*/
export class RunAwayCommand extends ICommand { 
	public constructor(private battleService: BattleService) {
		super()
	}

	execute(randInt: number) {
		this.battleService.runAway(randInt)
	}
}
