export function pseudoRandom(seed: number): () => number {
    let value = seed;
    return () => {
        value = (value * 48271) % 2147483647;
        return value;
    };
}

export function seededShuffle(array: any[], seed: number) {
    const random = pseudoRandom(seed); // Initialize the seeded PRNG

    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(random() % currentIndex); // Use the seeded random
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}
