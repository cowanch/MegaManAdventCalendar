import express from 'express';
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import { pseudoRandom, seededShuffle } from "./utils/pseudo-random";

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors());
app.use(express.static(path.join(__dirname, "../../client/dist")));

app.get("/api/days", (_, res) => {
    const usedIds = new Set<number>();
    const generator = pseudoRandom(parseInt(process.env.ROBO_SEED || "1"));
    const days: { day: number, id: number | undefined }[] = [];
    const today = new Date();
    const currentDay = today.getDate();
    const christmasDay = new Date(2025, 12, 25);
    let startCalendar = true;
    if (process.env.START_DATE) {
        const startDate = new Date(process.env.START_DATE);
        if (today < startDate) {
            startCalendar = false;
        }
    }
    for (let day = 1; day < 25; day++) {
        const randomValue = generator();
        const id = (startCalendar && (today > christmasDay || day <= currentDay)) ? (randomValue % 46) + 3 : undefined;
        if (id && usedIds.has(id)) {
            day--;
            continue;
        }
        days.push({ day, id });
        if (id) {
            usedIds.add(id);
        }
    }
    seededShuffle(days, parseInt(process.env.SHUFFLE_SEED || "2"));
    res.json(days);
});

// SPA fallback
app.use((req, res, next) => {
    if (req.path.startsWith("/api")) return next();
    res.sendFile(path.join(__dirname, "../../client/dist/index.html"));
});

export default app;
