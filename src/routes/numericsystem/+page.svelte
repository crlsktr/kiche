<script lang="ts">
	import MayanNumeral from '$lib/components/MayanNumeral.svelte';
	import { writable } from 'svelte/store';

	let arabicNumeral = writable(1821);
	let base = 20;
	let transformedDigits: number[] = [];

	const getDigits = (n: number, b: number): number[] => {
		if (n === 0) return [0];
		let current = n;
		let digits: number[] = [];
		while (current > 0) {
			digits = [current % base, ...digits];
			current = Math.floor(current / base);
		}
		return digits;
	};

	arabicNumeral.subscribe((n) => (transformedDigits = getDigits(n, base)));
</script>

<div>
	<input class="input" type="number" bind:value={$arabicNumeral} />
	<span>{$arabicNumeral}</span>
	{#each transformedDigits as digit, index}
		<div>
			<span>20<sup>{transformedDigits.length - (index + 1)} ⨯ </sup></span><MayanNumeral
				number={digit}
			/>
		</div>
	{/each}
</div>
