<!-- This only supports numbers up to 20 -->
<script lang="ts">
    export let number:number = 0;
    import {numerals} from "$lib/numerals"
</script>
<style>
    @font-face {
        font-family: 'MayanNumerals';
        src: url('/MayanNumerals.ttf');
    }
    div {
        font-family: 'MayanNumerals', sans-serif;
    }
</style>
<div class="text-8xl text-center">{numerals[number]}</div>