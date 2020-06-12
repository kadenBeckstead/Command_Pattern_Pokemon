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
	public pokemon: Pokemon;
	public isBattleActive: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
	private pokemonService: PokemonService = new PokemonService();

	constructor() {
		this.opponent = this.pokemonService.getOpponent();
		this.pokemon = this.pokemonService.pokemonList[9];
	}

	private attackEffectiveness(attackMax: number) {
		let power = Math.random() * (10 - 1) + 1;
		if (power >=0 && power <2) {
			return { damage: 0, message: 'It missed!' }
		} else if (power >=2 && power <4) {
			return { damage: Math.floor(.15 * attackMax), message: 'Not very effective...' }
		} else if (power >=4 && power <7) {
			return { damage: Math.floor(.35 * attackMax), message: 'It\'s effective.' }
		}else if (power >=7 && power <9) {
			return { damage: Math.floor(.65 * attackMax), message: 'It\'s super effective!' }
		} 
		return { damage: attackMax, message: 'Critical hit!' }
	}

	private opponentCounterAttack() {
		console.log(`Enemy ${this.opponent.name} is attacking...`);
		let results = this.attackEffectiveness(this.opponent.attack);
		this.pokemon.hp -= results.damage;
		console.log(results.message);
		if (this.pokemon.hp <= 0) {
			console.log(`Your ${this.pokemon.name} has fainted!\nYou lose\n\n\n`);
			this.isBattleActive.next(false);
		} else {
			console.log(`${this.opponent.name} dealt ${results.damage} damage`)
		}
	}

	private didRunAway(success: boolean) {
		if (success) {
			console.log('Ran away successfully...\n'); 
			process.exit(0);
		} else {
			console.log('Couldn\'t escape!')
		}
	}

	public runAway(randInt: number) {
		const isStrong = this.opponent.maxHp >= 50;
		const isHurt = (this.opponent.hp/this.opponent.maxHp) < .60;

		if (isStrong) {
			if (!isHurt) {
				this.didRunAway(randInt <= 0.2);
			} else {
				this.didRunAway(randInt <= 0.5);
			}
		} else {
			if (!isHurt) {
			this.didRunAway(randInt <= 0.5);
			} else {
				this.didRunAway(randInt <= 0.85);
			}
		}
	}

	public async attack(attack: Attack) {
		console.log(`\n\n${this.pokemon.name} used: ${attack.name}!`)
		let results = this.attackEffectiveness(attack.power);
		console.log(results.message);
		console.log(`Your ${this.pokemon.name} dealt ${results.damage} damage\n\n`)
		this.opponent.hp -= results.damage;
		if (this.opponent.hp <= 0) {
			console.log(`${this.opponent.name} has fainted! \n You win!\n\n\n`);
			this.isBattleActive.next(false);
		} else {
			this.opponentCounterAttack();
			console.log(`\n\nYour ${this.pokemon.name} still has ${((this.pokemon.hp/this.pokemon.maxHp) * 100).toFixed(0)}% HP left`)
			console.log(`Enemy ${this.opponent.name} still has ${((this.opponent.hp/this.opponent.maxHp) * 100).toFixed(0)}% HP left\n\n`)
		}
	}
}
