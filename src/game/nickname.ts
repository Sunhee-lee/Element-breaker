const ELEMENTS = [
  "수소","헬륨","리튬","베릴륨","붕소","탄소","질소","산소","플루오린","네온",
  "나트륨","마그네슘","알루미늄","규소","인","황","염소","아르곤","칼륨","칼슘",
  "스칸듐","타이타늄","바나듐","크로뮴","망가니즈","철","코발트","니켈","구리","아연",
  "갈륨","저마늄","비소","셀레늄","브로민","크립톤","루비듐","스트론튬","이트륨","지르코늄",
  "나이오븀","몰리브데넘","테크네튬","루테늄","로듐","팔라듐","은","카드뮴","인듐","주석",
  "안티모니","텔루륨","아이오딘","제논","세슘","바륨","란타넘","세륨","프라세오디뮴","네오디뮴",
  "프로메튬","사마륨","유로퓸","가돌리늄","터븀","디스프로슘","홀뮴","어븀","툴륨","이터븀",
  "루테튬","하프늄","탄탈럼","텅스텐","레늄","오스뮴","이리듐","백금","금","수은",
  "탈륨","납","비스무트","폴로늄","아스타틴","라돈","프랑슘","라듐","악티늄","토륨",
  "프로트악티늄","우라늄","넵투늄","플루토늄",
];

const TITLES = [
  "브레이커","마스터","헌터","전사","러너","챌린저","가디언","수집가","탐험가",
];

const LS_KEY = "elementBreakerNickname";

export function generateNickname(): string {
  const el = ELEMENTS[Math.floor(Math.random() * ELEMENTS.length)];
  const title = TITLES[Math.floor(Math.random() * TITLES.length)];
  const num = String(Math.floor(Math.random() * 900) + 100);
  return `${el}${title}${num}`;
}

export function getNickname(): string {
  if (typeof window === "undefined") return generateNickname();
  const saved = localStorage.getItem(LS_KEY);
  if (saved) return saved;
  const nick = generateNickname();
  localStorage.setItem(LS_KEY, nick);
  return nick;
}

export function refreshNickname(): string {
  const nick = generateNickname();
  if (typeof window !== "undefined") localStorage.setItem(LS_KEY, nick);
  return nick;
}

export function resetLocalNickname(): void {
  if (typeof window !== "undefined") localStorage.removeItem(LS_KEY);
}
