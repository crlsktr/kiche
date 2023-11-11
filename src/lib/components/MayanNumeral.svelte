<!-- This only supports numbers up to 20 -->
<script lang="ts">
	export let number: number = 0;
	import { numerals } from '$lib/numerals';
</script>

<span class="text-8xl text-center">{numerals[number]}</span>

<style>
	@font-face {
		font-family: 'MayanNumerals';
		src: url('/MayanNumerals.ttf');
	}
	span {
		font-family: 'MayanNumerals', sans-serif;
	}
</style>
