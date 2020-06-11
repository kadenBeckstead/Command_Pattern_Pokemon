
/*
*   ---- PokemonService ----
* 
* This service has hard-coded data that would likely be pulled in from the backend in a real-world scenario
*
*/
export class PokemonService {

	public pokemonList = [
		{ name: 'Pikachu',   hp: 35,  maxHp: 35  },
		{ name: 'Caterpie',  hp: 45,  maxHp: 45  },
		{ name: 'Geodude',   hp: 40,  maxHp: 40  },
		{ name: 'Onix',      hp: 35,  maxHp: 35  },
		{ name: 'Magicarp',  hp: 20,  maxHp: 20  },
		{ name: 'Oddish',    hp: 45,  maxHp: 45  },
		{ name: 'Abra',      hp: 25,  maxHp: 25  },
		{ name: 'Scyther',   hp: 75,  maxHp: 75  },
		{ name: 'Machop',    hp: 70,  maxHp: 70  },
		{ name: 'Charizard', hp: 78,  maxHp: 78  },
		{ name: 'Mewtwo',    hp: 106, maxHp: 106 }
	]

	public attackList = [
		{name: 'Tackle', power: 4},
		{name: 'Flamethrower', power: 90},
		{name: 'Leer', power: 0},
		{name: 'Slash', power: 70}
	]

	public getOpponent(): {name: string, hp: number, maxHp: number} {
		let pokemonList = this.pokemonList;
		let dice: number = Math.floor(Math.random() * (pokemonList.length - 1) + 1);
		return pokemonList[dice];
	}


}
