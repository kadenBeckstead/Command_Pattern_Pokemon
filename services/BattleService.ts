import { Pokemon, Attack } from "../types"
import { BehaviorSubject } from 'rxjs';
import { PokemonService } from "./PokemonService";

/*
*  ---- BattleService ----
* This service handles all logic regarding an ongoing Pokemon Battle
*
* In a real-world scenario, the logic in a service like this would probably take place 
*   in the backend, which is why the command pattern is so useful.
*/
export class BattleService {
	public opponent: Pokemon;
	public isBattleActive: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
	private pokemonService: PokemonService = new PokemonService();

	constructor() {
		this.opponent = this.pokemonService.getOpponent();
	}

	private attackEffectiveness(attackMax: number) {
		let power = Math.random() * (10 - 1) + 1;
		if (power >=0 && power <2) {
			return 'You missed!'
		} else if (power >=2 && power <4) {
			this.opponent.hp -= Math.floor(.15 * attackMax);
			return 'Not very effective...'
		} else if (power >=4 && power <7) {
			this.opponent.hp -= Math.floor(.35 * attackMax)
			return 'It\'s effective.'
		}else if (power >=7 && power <9) {
			this.opponent.hp -= Math.floor(.65 * attackMax)
			return 'It\'s super effective!'
		} 
		this.opponent.hp -= attackMax;
		return 'Critical hit!'
	}

	public runAway(randInt: number) {
		if (randInt >= 0.5) {
			console.log('Ran away successfully...\n')
			process.exit(0);
		} else {
			console.log('Couldn\'t escape!')
		}
	}

	public attack(attack: Attack) {
		console.log(`Used: ${attack.name}`)
		let results = this.attackEffectiveness(attack.power);
		if (this.opponent.hp <= 0) {
			console.log(results)
			console.log(`${this.opponent.name} was defeated!\n\n\n`);
			this.isBattleActive.next(false);
		}
		console.log(results)
		console.log(`${this.opponent.name} still has ${((this.opponent.hp/this.opponent.maxHp) * 100).toFixed(0)}% HP left`)
	}
}
