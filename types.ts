
export abstract class ICommand {	
	abstract execute(args: any): void

	// abstract undo(): void  // <-- The command pattern, makes having a stack of commands to undo/redo over very easy
	// abstract redo(): void  // <-- The command pattern, makes having a stack of commands to undo/redo over very easy
}

export type Attack = {
	name: string,
	power: number
}

export type Item = string;

export type Pokemon = { 
	name: string, 
	hp: number, 
	maxHp: number 
}

