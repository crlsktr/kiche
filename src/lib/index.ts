// place files you want to import through the `$lib` alias in this folder.
export const shuffleArray = <T>(array: T[]) => {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
};

export const randomSelection = <T>(options: T[]) =>
	options[Math.floor(Math.random() * options.length)];

export const get_other_random = <T>(not_this_one: T, fromThisList: T[]) =>
	randomSelection(fromThisList.filter((x) => x !== not_this_one));

export const changeNumericBase = (n: number, b: number): number[] => {
	if (n === 0) return [0];
	let current = n;
	let digits: number[] = [];
	while (current > 0) {
		digits = [current % b, ...digits];
		current = Math.floor(current / b);
	}
	return digits;
};
