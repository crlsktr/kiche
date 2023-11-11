<script lang="ts">
	import { shuffleArray, get_other_random } from '$lib/index';
	import { numberNames, numerals } from '$lib/numerals';
	import { animalOptions } from '$lib/animals';
	import MayanNumeral from '$lib/components/MayanNumeral.svelte';
	import { popup, type PopupSettings } from '@skeletonlabs/skeleton';

	let selected_animal_index: number = 0;
	let selected_number_index: number = 0;
	let animal_display: string[] = [];
	let possible_options: string[] = [];
	let tried_answers: Set<string> = new Set();
	let solved: boolean = false;
	let used_turn: boolean = false;
	let tries: number = 0;
	let correct: number = 0;

	const popupFeatured: PopupSettings = {
		event: 'hover',
		target: 'popupFeatured',
		placement: 'bottom'
	};

	const resetGame = () => {
		selected_animal_index = Math.floor(Math.random() * animalOptions.length);
		selected_number_index = Math.floor(Math.random() * numerals.length);
		animal_display = Array(selected_number_index);
		animal_display.fill(animalOptions[selected_animal_index]);
		solved = false;
		used_turn = false;
		possible_options = [
			numberNames[selected_number_index],
			get_other_random(numberNames[selected_number_index], numberNames),
			get_other_random(numberNames[selected_number_index], numberNames)
		];
		shuffleArray(possible_options);
		tried_answers.clear();
	};
	const checkAnswer = (ans: string) => {
		tried_answers = new Set([...tried_answers, ans]);
		if (solved) return;
		solved = ans === numberNames[selected_number_index];
		if (solved && !used_turn) correct++;
		if (!used_turn) {
			tries++;
			used_turn = true;
		}
	};

	resetGame();
</script>

<div class="container h-full mx-auto flex-column">
	<div class="flex flex-wrap">
		{#each animal_display as animal}
			{#if animalOptions[selected_animal_index] !== ''}
				<img class="animales" alt={animal} src={animal + '.png'} />
			{/if}
		{/each}
	</div>
	<MayanNumeral number={selected_number_index} />

	<!-- <div>{selected_number_index}</div> -->

	<div class="flex flex-row justify-center m-10">
		{#each possible_options as possible}
			<button
				class="btn btn-m variant-filled-primary"
				on:click={() => checkAnswer(possible)}
				disabled={tried_answers.has(possible)}
			>
				{possible}
			</button>
		{/each}
	</div>
	{#if tried_answers.size > 0}
		<div class="text-center">
			<h2>{solved ? '✔️' : '❌'}</h2>
			<button class="btn btn-m variant-filled-primary" on:click={() => resetGame()}>
				<span class="material-symbols-outlined">restart_alt</span>
			</button>
		</div>
	{/if}
	<hr class="border-4 m-8" />
	<div class="score text-center" use:popup={popupFeatured}>
		le rajlab'al: <span>{correct}/{tries}</span>
	</div>
	<div class="card card p-4 w-40 shadow-xl" data-popup="popupFeatured">
		<span>Resultados</span>
	</div>
</div>

<style>
	.animales {
		max-width: 20%;
	}
</style>
