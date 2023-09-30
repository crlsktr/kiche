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
    const checkAnswer = (ans:string) => {
        if (latest_answer!==""){
            latest_answer = ans;
            return;
        }
        tries++;
        ans === numberNames[selected_number_index] ? correct++:correct;
        latest_answer = ans;
    }

    resetGame();
</script>
<style>
    @font-face {
        font-family: 'material-ui';
        src: url('/MaterialSymbolsOutlined.ttf')
    }
    img {
        height: auto;
        width: auto;
        max-width: 150px;
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
    button {
        font-size: x-large;
    }
    div.options{
        display: flex;
        flex-direction: row;
        align-items: stretch;
        justify-content:space-evenly;
    }
    div {
        font-size: 320%;
    }
    .score {
        border: 1px solid black;
        border-radius: 14px;
        margin-top: 10px;
    }
</style>
<div class="animales">
{#each Array(selected_number_index) as img,i}
    {#if animalOptions[selected_animal_index]!==""}
    <img alt="{animalOptions[selected_animal_index]}" {src}/>
    {/if}
{/each}
</div>
<MayanNumeral number="{selected_number_index}" />
<div>{selected_number_index}</div>

<div class="options">
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
<div class="score">{correct}/{tries}</div>