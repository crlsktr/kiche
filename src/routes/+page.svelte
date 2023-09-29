<script lang="ts">
    import {shuffleArray, randomSelection,get_other_random} from "$lib/index";
    import {numberNames, numerals} from "$lib/numerals";
    import {animalOptions} from "$lib/animals";
    import MayanNumeral from "$lib/components/MayanNumeral.svelte";

    let selected_animal_index :number = 0;
    let selected_number_index :number = 0;
    let src:string = "";
    let possible_options:string[] = [];
    let latest_answer:string = "";
    let tries:number = 0;
    let correct: number = 0;

    const resetGame = () => {
        selected_animal_index= Math.floor(Math.random() * animalOptions.length);
        selected_number_index= Math.floor(Math.random() * numerals.length);
        src = animalOptions[selected_animal_index] + ".png";
        possible_options = [
            numberNames[selected_number_index],
            get_other_random(numberNames[selected_number_index],numberNames),
            get_other_random(numberNames[selected_number_index],numberNames)
        ];
        shuffleArray(possible_options);
        latest_answer = "";
    }
    resetGame();
    const checkAnswer = (ans:string) => {
        if (latest_answer!==""){
            latest_answer = ans;
            return;
        }
        tries++;
        ans === numberNames[selected_number_index] ? correct++:correct;
        latest_answer = ans;
    }
</script>
<style>
    @font-face {
        font-family: 'material-ui';
        src: url('/MaterialSymbolsOutlined.ttf')
    }
    img {
        width: 10%;
    }
    .material-symbols-outlined {
        font-variation-settings:
        'FILL' 0,
        'wght' 400,
        'GRAD' 0,
        'opsz' 24
    }
    span {
        font-family: 'material-ui';
    }
</style>
{#each Array(selected_number_index) as img,i}
    {#if animalOptions[selected_animal_index]!==""}
    <img alt="{animalOptions[selected_animal_index]}" {src}/>
    {/if}
{/each}
<MayanNumeral number="{selected_number_index}" />
<h2>{selected_number_index}</h2>
<div>
    {#each possible_options as possible}
    <button on:click={() => checkAnswer(possible)}>{possible}</button>
    {/each}
</div>
{#if latest_answer !=="" }
    <h2>{latest_answer === numberNames[selected_number_index] ? "✔️" : "❌"}</h2>
    <button on:click={() => resetGame()}>
        <span class="material-symbols-outlined">restart_alt</span>
    </button>
{/if}
<div>{correct}/{tries}</div>