import express from "express";
import cors from "cors";
import { pseudoRandom } from "./utils/pseudo-random";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/api/hello", (_, res) => {
    res.json({ message: "Hello from the server!" });
});

app.get("/api/days", (_, res) => {
    const usedIds = new Set<number>();
    const generator = pseudoRandom(1);
    const days: { day: number, id: number }[] = [];
    for (let day = 1; day < 25; day++) {
        const randomValue = generator();
        const id = (randomValue % 46) + 3;
        if (usedIds.has(id)) {
            day--;
            continue;
        }
        days.push({ day: day, id });
        usedIds.add(id);
    }
    res.json(days);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
