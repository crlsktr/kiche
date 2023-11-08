<script lang="ts">
	import { shuffleArray } from '$lib';
	import { qijilal as dictionary, qijilal } from "$lib/dictionaries/q'ijilal-es";

	let word = dictionary.map((w) => w.word);
	let translations = dictionary.map((t) => t.translation);
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
		shuffleArray(word);
		shuffleArray(translations);
		combined = word.map((x, i) => ({ word: x, translation: translations[i] }));
	};

	const addToCheckQueue = (selected: string, type: ChoiceType) => {
		type == ChoiceType.word ? (wordToCheck = selected) : (translationToCheck = selected);
		let found = dictionary.find(x => x.word == wordToCheck && x.translation == translationToCheck)
		if (!!found)
		{
			solvedWords.add(wordToCheck);
			solvedTranslations.add(translationToCheck);
			wordToCheck = '';
			translationToCheck = '';
			solvedWords = solvedWords;
			solvedTranslations = solvedTranslations;
		}
	};

	reset();
</script>

<div class="container mx-auto grid grid-cols-2 gap-4 overflow-auto max-h-screen">
	{#each combined as random_word}
		<button
			class="btn btn-m lg:text-5xl md:text-xl sm:text-base {`variant-${wordToCheck==random_word.word ? 'ghost' : 'filled'}-${solvedWords.has(random_word.word) ? 'success': 'primary'}`}" 
			on:click={() => {
				addToCheckQueue(random_word.word, ChoiceType.word);
			}}
			disabled={solvedWords.has(random_word.word)}
		>
			<span>{random_word.word}</span>
		</button>
		<button
			class="btn btn-m lg:text-5xl md:text-xl sm:text-base {`variant-${translationToCheck==random_word.translation ? 'ghost' : 'filled'}-${solvedTranslations.has(random_word.translation) ? 'success': 'primary'}`}"
			on:click={() => {
				addToCheckQueue(random_word.translation, ChoiceType.translation);
			}}
			disabled={solvedTranslations.has(random_word.translation)}
		>
			<span>{random_word.translation}</span>
		</button>
	{/each}
</div>
