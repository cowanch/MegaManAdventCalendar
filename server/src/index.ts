import express from "express";
import cors from "cors";
import { pseudoRandom, seededShuffle } from "./utils/pseudo-random";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.get("/api/hello", (_, res) => {
    res.json({ message: "Hello from the server!" });
});

app.get("/api/days", (_, res) => {
    const usedIds = new Set<number>();
    const generator = pseudoRandom(1);
    const days: { day: number, id: number | undefined }[] = [];
    const today = new Date();
    const currentDay = today.getDate();
    const christmasDay = new Date(2025, 12, 25);
    for (let day = 1; day < 25; day++) {
        const randomValue = generator();
        const id = (today > christmasDay || day <= currentDay) ? (randomValue % 46) + 3 : undefined;
        if (id && usedIds.has(id)) {
            day--;
            continue;
        }
        days.push({ day, id });
        if (id) {
            usedIds.add(id);
        }
    }
    seededShuffle(days, 2);
    res.json(days);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
