export function pseudoRandom(seed: number): () => number {
    let value = seed;
    return () => {
        value = (value * 48271) % 2147483647;
        return value;
    };
}
