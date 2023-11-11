<script lang="ts">
	import { changeNumericBase } from '$lib';
	import MayanNumeral from '$lib/components/MayanNumeral.svelte';
	import { writable } from 'svelte/store';

	let arabicNumeral = writable(1821);
	let base = 20;
	let transformedDigits: number[] = [];

	arabicNumeral.subscribe((n) => (transformedDigits = changeNumericBase(n, base)));
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
