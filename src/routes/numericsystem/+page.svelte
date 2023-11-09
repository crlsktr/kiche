<script lang='ts'>
	import MayanNumeral from "$lib/components/MayanNumeral.svelte";

	let arabicNumeral: number = 1821;
	let base = 20;

	let digits:number[] = [];
	let current = arabicNumeral;
	while(current > 0)
	{
		digits.unshift(current % base);
		digits = digits;
		current = Math.floor(current / base);
	}
</script>
<div>
	<input class="input" type="number" bind:value={arabicNumeral}>
	<span>{arabicNumeral}</span>
	{#each digits as digit}
		<MayanNumeral number="{digit}" />
	{/each}
</div>