// ============================================================
// Element Breaker – Firebase Ranking System
// Mode-based rankings: ranking_easy / ranking_normal / ranking_hard
// ============================================================

import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, get, query, orderByChild, equalTo, update } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyB9zBeqnYsckglsUuWcKOZuuHddfBf6Aro",
  authDomain: "element-breaker-55a61.firebaseapp.com",
  databaseURL: "https://element-breaker-55a61-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "element-breaker-55a61",
  storageBucket: "element-breaker-55a61.firebasestorage.app",
  messagingSenderId: "395231375755",
  appId: "1:395231375755:web:2524ae1dbea706e54e3f8e",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export interface RankEntry {
  player_name: string;
  score: number;
  level: number;
  mode: string;
  timestamp: number;
}

/** Save a score — only keep highest score per nickname */
export async function saveRank(mode: string, name: string, score: number, level: number): Promise<void> {
  try {
    const rankRef = ref(db, `ranking_${mode}`);
    const q = query(rankRef, orderByChild("player_name"), equalTo(name));
    const snapshot = await get(q);

    if (snapshot.exists()) {
      let bestKey: string | null = null;
      let bestScore = -1;
      const keysToRemove: string[] = [];

      snapshot.forEach((child) => {
        const val = child.val() as RankEntry;
        if (val.score > bestScore) {
          if (bestKey) keysToRemove.push(bestKey);
          bestScore = val.score;
          bestKey = child.key;
        } else {
          keysToRemove.push(child.key!);
        }
      });

      if (score > bestScore && bestKey) {
        const updates: Record<string, unknown> = {};
        updates[bestKey] = { player_name: name, score, level, mode, timestamp: Date.now() };
        for (const k of keysToRemove) updates[k] = null;
        await update(rankRef, updates);
      } else if (score <= bestScore) {
        if (keysToRemove.length > 0) {
          const updates: Record<string, null> = {};
          for (const k of keysToRemove) updates[k] = null;
          await update(rankRef, updates);
        }
      }
    } else {
      await push(rankRef, {
        player_name: name,
        score,
        level,
        mode,
        timestamp: Date.now(),
      });
    }
  } catch (e) {
    console.error("Failed to save rank:", e);
  }
}

/** Get top N rankings for a specific mode, sorted by score desc then timestamp asc */
export async function getTopRanks(mode: string, n: number = 50): Promise<RankEntry[]> {
  try {
    const rankRef = ref(db, `ranking_${mode}`);
    const snapshot = await get(rankRef);
    if (!snapshot.exists()) return [];
    const entries: RankEntry[] = [];
    snapshot.forEach((child) => {
      entries.push(child.val() as RankEntry);
    });
    return entries
      .sort((a, b) => b.score - a.score || a.timestamp - b.timestamp)
      .slice(0, n);
  } catch (e) {
    console.error("Failed to get ranks:", e);
    return [];
  }
}
