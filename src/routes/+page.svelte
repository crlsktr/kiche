<script lang="ts">
    import {shuffleArray, randomSelection,get_other_random} from "$lib/index";
    import {numberNames, numerals} from "$lib/numerals";
    import {animalOptions} from "$lib/animals";
    import MayanNumeral from "$lib/components/MayanNumeral.svelte";

    let selected_animal_index :number = Math.floor(Math.random() * animalOptions.length);
    let selected_number_index :number = Math.floor(Math.random() * numerals.length);
    let src = animalOptions[selected_animal_index] + ".png";
    let possible_options = [
        numberNames[selected_number_index],
        get_other_random(numberNames[selected_number_index],numberNames),
        get_other_random(numberNames[selected_number_index],numberNames)
    ];
    shuffleArray(possible_options);
    let latest_answer:string = "";
    const checkAnswer = (ans:string) => {latest_answer = ans;}
</script>
<style>
    img {
        width: 10%;
    }
</style>
{#each Array(selected_number_index + 1) as img,i}
    {#if animalOptions[selected_animal_index]!==""}
    <img alt="{animalOptions[selected_animal_index]}" {src}/>
    {/if}
{/each}
<MayanNumeral number="{selected_number_index}" />
<!-- <h2>{numerals[selected_number_index]}</h2> -->
<h2>{selected_number_index}</h2>

{#each possible_options as possible}
    <button on:click={() => checkAnswer(possible)}>{possible}</button>
{/each}
{#if latest_answer !=="" }<h2>{latest_answer === numberNames[selected_number_index] ? "✔️" : "❌"}</h2>{/if}