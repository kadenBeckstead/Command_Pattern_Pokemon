
/*
*  ---- ItemService ----
* This service handles all logic around using an item during an ongoing Pokemon Battle
*
* In a real-world scenario, the logic in a service like this would probably take place 
*   in the backend, which is why the command pattern is so useful.
*/
export class ItemService {
	public itemsList = ['Ultra Ball', 'Antidote', 'Full Heal', 'Max Potion', 'Parlyz Heal']

	public useItem(item: string) {
		console.log(`Used: a ${item}...`)
	}
}
