/**
 * 개발자 전용 — Firebase Realtime Database 랭킹 초기화 스크립트
 *
 * 사용법:
 *   1. Firebase Console → 프로젝트 설정 → 서비스 계정 → 새 비공개 키 생성
 *   2. 다운로드된 JSON 파일을 프로젝트 루트에 `firebase-service-account.json`으로 저장
 *   3. node scripts/resetRanking.js
 *
 * 주의: firebase-service-account.json은 .gitignore에 포함되어 있어 git에 커밋되지 않습니다.
 */

const admin = require("firebase-admin");
const readline = require("readline");

const SERVICE_ACCOUNT_PATH = "./firebase-service-account.json";
const DATABASE_URL = "https://element-breaker-55a61-default-rtdb.asia-southeast1.firebasedatabase.app";

const RANKING_PATHS = [
  "ranking_normal",
  "ranking_easy",
  "ranking_hard",
];

async function main() {
  let serviceAccount;
  try {
    serviceAccount = require(require("path").resolve(SERVICE_ACCOUNT_PATH));
  } catch {
    console.error(`\n[ERROR] ${SERVICE_ACCOUNT_PATH} 파일을 찾을 수 없습니다.`);
    console.error("Firebase Console → 프로젝트 설정 → 서비스 계정 → 새 비공개 키 생성 후");
    console.error("프로젝트 루트에 firebase-service-account.json으로 저장하세요.\n");
    process.exit(1);
  }

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: DATABASE_URL,
  });

  const db = admin.database();

  console.log("\n========================================");
  console.log("  랭킹 초기화 스크립트");
  console.log("========================================");
  console.log("\n삭제 대상 경로:");
  for (const path of RANKING_PATHS) {
    const snapshot = await db.ref(path).once("value");
    const count = snapshot.exists() ? Object.keys(snapshot.val()).length : 0;
    console.log(`  - ${path} (${count}개 문서)`);
  }

  console.log("\n[경고] 위 경로의 모든 랭킹 데이터가 영구 삭제됩니다.");
  console.log('계속하려면 "RESET RANKING"을 정확히 입력하세요:\n');

  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const answer = await new Promise((resolve) => rl.question("> ", resolve));
  rl.close();

  if (answer !== "RESET RANKING") {
    console.log("\n입력이 일치하지 않습니다. 초기화를 취소합니다.\n");
    process.exit(0);
  }

  let totalDeleted = 0;
  for (const path of RANKING_PATHS) {
    const snapshot = await db.ref(path).once("value");
    const count = snapshot.exists() ? Object.keys(snapshot.val()).length : 0;
    await db.ref(path).remove();
    totalDeleted += count;
    console.log(`  [삭제 완료] ${path}: ${count}개 삭제`);
  }

  console.log(`\n총 ${totalDeleted}개 문서 삭제 완료.\n`);
  process.exit(0);
}

main().catch((e) => {
  console.error("Error:", e);
  process.exit(1);
});
