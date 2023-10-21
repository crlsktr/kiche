<script lang="ts">
    import {shuffleArray, randomSelection,get_other_random} from "$lib/index";
    import {numberNames, numerals} from "$lib/numerals";
    import {animalOptions} from "$lib/animals";
    import MayanNumeral from "$lib/components/MayanNumeral.svelte";
	import { popup, type PopupSettings } from "@skeletonlabs/skeleton";

    let selected_animal_index :number = 0;
    let selected_number_index :number = 0;
    let src:string = "";
    let possible_options:string[] = [];
    let latest_answer:string = "";
    let tries:number = 0;
    let correct: number = 0;

    const popupFeatured: PopupSettings = {
        event: 'hover',
        target: 'popupFeatured',
        placement: 'bottom',
    };

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
    .animales {
        max-width: 20%;
    }
</style>

<div class="container h-full mx-auto flex-column">
    <div class="flex flex-wrap">
        {#each Array(selected_number_index) as img,i}
            {#if animalOptions[selected_animal_index]!==""}
            <img class="animales" alt="{animalOptions[selected_animal_index]}" {src}/>
            {/if}
        {/each}
    </div>
        <MayanNumeral number="{selected_number_index}" />
        
        <!-- <div>{selected_number_index}</div> -->
        
        <div class="flex flex-row justify-center m-10">
            {#each possible_options as possible}
            <button class="btn btn-m variant-filled-primary" on:click={() => checkAnswer(possible)}>{possible}</button>
            {/each}
        </div>
        {#if latest_answer !=="" }
        <div class="text-center">
            <h2>{latest_answer === numberNames[selected_number_index] ? "✔️" : "❌"}</h2>
            <button class="btn btn-m variant-filled-primary" on:click={() => resetGame()}>
                <span class="material-symbols-outlined">restart_alt</span>
            </button>
        </div>
        {/if}
        <hr class="border-4 m-8" />
        <div class="score text-center" use:popup={popupFeatured}>
            le rajlab'al: <span>{correct}/{tries}</span></div>
        <div class="card card p-4 w-40 shadow-xl" data-popup="popupFeatured">
            <span>Resultados</span>
        </div>
</div>