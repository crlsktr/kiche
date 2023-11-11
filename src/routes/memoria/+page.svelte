<script lang="ts">
	import { shuffleArray } from '$lib';
	import { qijilal as time_dictionary, qijilal } from "$lib/dictionaries/q'ijilal-es";
	import { kibantajik_ri_jastaq as adjetives_dictionary } from "$lib/dictionaries/kib'antajik_ri jastaq-es";
	import { ri_tzij_kotbal_chyiaj as question_dictionary } from '$lib/dictionaries/ri_tzij_kotbal_chiaj-es';

	const instructions: string = 'Encontrá los pares de palabras que significan lo mismo';

	let aggregate: Translation[] = [];
	aggregate = aggregate.concat(...time_dictionary, ...adjetives_dictionary, ...question_dictionary);
	shuffleArray(aggregate);
	const localDictionary = aggregate.slice(0, 10);
	let words = localDictionary.map((w) => w.word);
	let translations = localDictionary.map((t) => t.translation);
	let solvedWords = new Set<string>();
	let solvedTranslations = new Set<string>();
	let combined: Translation[] = [];
	let wordToCheck: string;
	let translationToCheck: string;
	enum ChoiceType {
		word,
		translation
	}

	const reset = () => {
		shuffleArray(words);
		shuffleArray(translations);
		combined = words.map((x, i) => ({ word: x, translation: translations[i] }));
	};

	const addToCheckQueue = (selected: string, type: ChoiceType) => {
		type == ChoiceType.word ? (wordToCheck = selected) : (translationToCheck = selected);
		let found = localDictionary.find(
			(x) => x.word == wordToCheck && x.translation == translationToCheck
		);
		if (!!found) {
			solvedWords = new Set<string>([...solvedWords, wordToCheck]);
			solvedTranslations = new Set<string>([...solvedTranslations, translationToCheck]);
			wordToCheck = '';
			translationToCheck = '';
		}
	};

	reset();
</script>

<h2 class="h2 text-center">{instructions}</h2>
<div class="container py-8 mx-auto grid grid-cols-2 gap-4 overflow-auto max-h-screen">
	{#each combined as random_word}
		<button
			class="btn btn-m lg:text-5xl md:text-xl sm:text-base {`variant-${
				wordToCheck == random_word.word ? 'ghost' : 'filled'
			}-${solvedWords.has(random_word.word) ? 'success' : 'primary'}`}"
			on:click={() => {
				addToCheckQueue(random_word.word, ChoiceType.word);
			}}
			disabled={solvedWords.has(random_word.word)}
		>
			<span>{random_word.word}</span>
		</button>
		<button
			class="btn btn-m lg:text-5xl md:text-xl sm:text-base {`variant-${
				translationToCheck == random_word.translation ? 'ghost' : 'filled'
			}-${solvedTranslations.has(random_word.translation) ? 'success' : 'secondary'}`}"
			on:click={() => {
				addToCheckQueue(random_word.translation, ChoiceType.translation);
			}}
			disabled={solvedTranslations.has(random_word.translation)}
		>
			<span>{random_word.translation}</span>
		</button>
	{/each}
</div>
