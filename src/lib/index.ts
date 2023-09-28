// place files you want to import through the `$lib` alias in this folder.
export const shuffleArray = (array:any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
    }
}

export const randomSelection = (options:any[]) => options[Math.floor(Math.random() * options.length)];
export const get_other_random = (not_this_one:string, fromThisList:any[]) => randomSelection(fromThisList.filter(x => x !== not_this_one))