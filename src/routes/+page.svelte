<script lang="ts">
    const animal_options:string[] = ["jaguar"];
    const numerals:string[] = ["𝋠","𝋡","𝋢","𝋣","𝋤","𝋥","𝋦","𝋧","𝋨","𝋩","𝋪","𝋫","𝋬","𝋭","𝋮","𝋯","𝋰","𝋱","𝋲","𝋳"];
    const numbers:string[] = ["Majb’al","Jun","Keb’","Oxib’","Kajib’","Job’","Waqib’","Wuqub’","Wajxaqib’","B’elejeb’","Lajuj","Julajuj","Kab’lajuj","Oxlajuj","Kajlajuj","Jolajuj","Waqlajuj","Wuqlajuj","Wajxaqlajuj","B’elejlajuj","juwinaq"]
    const shuffleArray = (array:any[]) => {
        for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
        }
    }
    let selected_animal :number = Math.floor(Math.random() * animal_options.length);
    let selected_number :number = Math.floor(Math.random() * numerals.length);
    let images = Array(selected_number+1).join(animal_options[selected_animal]+",").split(",");
    let src = animal_options[selected_animal] + ".png";
    const random_selection = (options:any[]) => options[Math.floor(Math.random() * options.length)];
    let get_other_random = (not_this_one:string) => random_selection(numbers.filter(x => x !== not_this_one))
    let possible_options = [numbers[selected_number],get_other_random(numbers[selected_number]),get_other_random(numbers[selected_number])];
    shuffleArray(possible_options);
    let latest_answer:string = "";
    const checkAnswer = (ans:string) => {latest_answer = ans;}
</script>
<style>
    @font-face {
        font-family: 'MayanNumerals';
        src: url('/MayanNumerals.ttf');
    }
    img {
        width: 10%;
    }
    h2 {
        font-family: 'MayanNumerals', sans-serif;
    }
</style>
{#each images as img}
    {#if img!=="" && img.length>0}
    <img alt="{img}" src={img+".png"}/>
    {/if}
{/each}
<h2>{numerals[selected_number]}</h2>
<h2>{selected_number}</h2>

{#each possible_options as possible}
    <button on:click={() => checkAnswer(possible)}>{possible}</button>
{/each}
{#if latest_answer !=="" }<h2>{latest_answer === numbers[selected_number] ? "✔️" : "❌"}</h2>{/if}