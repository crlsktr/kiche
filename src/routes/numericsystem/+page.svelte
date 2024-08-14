<script lang="ts">
	import { changeNumericBase } from '$lib';
	import MayanNumeral from '$lib/components/MayanNumeral.svelte';
	import { writable } from 'svelte/store';

	let arabicNumeral = writable(2022);
	let base = 20;
	let transformedDigits: number[] = [];

	arabicNumeral.subscribe((n) => (transformedDigits = changeNumericBase(n, base)));
</script>

<div>
	<div>
		<input class="input text-center inline" type="number" bind:value={$arabicNumeral} />
	</div>

	<div class="flex flex-row justify-center">
		<div>
			{#each transformedDigits as digit, index}
				<div>
					<span>20<sup>{transformedDigits.length - (index + 1)}</sup>⨯</span><MayanNumeral
						number={digit}
					/> = {20 ** (transformedDigits.length - index - 1) * digit}
				</div>
			{/each}
		</div>
	</div>
</div>
