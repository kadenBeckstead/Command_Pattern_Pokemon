import { ICommand, Attack } from "./types";
import { AttackCommand, UseItemCommand, RunAwayCommand } from "./commandList";
import { BattleService } from "./services/BattleService";
import { ItemService } from "./services/ItemService";
import { PokemonService } from "./services/PokemonService";

export class PokemonBattle {

  constructor() {}

  private battleService: BattleService = new BattleService();
  private itemService: ItemService = new ItemService();
  private pokemonService: PokemonService = new PokemonService();
  private rl = require('readline-sync');
  
  /*
  *
  * Starts a Pokemon Battle instance
  *
  */
  start_battle() {
    console.log(`\n\n\n\nA wild ${this.battleService.opponent.name} has appeared...\n\n\n`)
      while (true) {
      this.battleService.isBattleActive.subscribe((active: boolean) => {
        if (!active) {
          process.exit(0);
        }
      })
      this.printGenericOptions();
      this.selectOption();
    }
  }

  /*
  *
  * Prints the console menu options
  *
  */
  private printGenericOptions(): void {
    console.log('\nWhat will you do? (1 - 3):\n');
    console.log('1. Attack\n');
    console.log('2. Use an Item\n');
    console.log('3. Run\n\n');
  }

  /*
  *
  * Handles user input and is left completely out of the loop when it comes to handling the command logic
  * This command pattern is useful here because it allows for complete decoupling of our logic
  *
  */
  private selectOption() {
    let sel = this.rl.question('Your selection: ');
    switch (sel) {

      case '1':
        console.log(`\nChoose an attack (1-${this.pokemonService.attackList.length}):\n`);
        this.pokemonService.attackList.forEach((attack: Attack, i: number) => {
          console.log(`${i+1}. ${attack.name}`)
        })
        console.log('\n\n')
        let attackChoice = this.rl.question('Your Attack: ');
        console.clear();
        this.executeCommand(new AttackCommand(this.battleService), this.pokemonService.attackList[attackChoice-1])
        break;

      case '2':
        console.log(`\nChoose an item (1-${this.itemService.itemsList.length}):\n`);
        this.itemService.itemsList.forEach((item: string, i: number) => {
          console.log(`${i+1}. ${item}`)
        })
        console.log('\n\n')
        let itemChoice = this.rl.question('You chose: ');
        console.clear();
        this.executeCommand(new UseItemCommand(this.itemService), this.itemService.itemsList[itemChoice-1])
        break;

      case '3':
        console.clear();
        this.executeCommand(new RunAwayCommand(this.battleService), Math.random());
        break;

      default:
				console.log('Unknown Option!\n\n')
        process.exit(0);
    };
  }


  /*
  *
  * This class has no idea how/what to do with a given command other than 
  * to call .execute() on it.
  *
  */
  executeCommand(command: ICommand, args: any) {
    command.execute(args);
  }
}
