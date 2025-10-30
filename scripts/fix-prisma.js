// scripts/fix-prisma.js
import fs from "fs";
import path from "path";

const clientDir = path.join("node_modules", ".prisma", "client");
const target1 = path.join("node_modules", "@prisma", "client");
const target2 = path.join("node_modules", "@prisma", "engines");

console.log("🔧 Fixing Prisma client packaging for Vercel...");

if (fs.existsSync(clientDir)) {
  try {
    // Copia .prisma/client inteiro para @prisma/client
    fs.cpSync(clientDir, target1, { recursive: true });
    console.log("✅ Copied .prisma/client to @prisma/client");
  } catch (err) {
    console.error("⚠️ Copy to @prisma/client failed:", err);
  }

  try {
    fs.cpSync(clientDir, target2, { recursive: true });
    console.log("✅ Copied .prisma/client to @prisma/engines");
  } catch (err) {
    console.error("⚠️ Copy to @prisma/engines failed:", err);
  }
} else {
  console.warn("⚠️ No .prisma/client directory found — did prisma generate run?");
}

console.log("✅ Prisma fix script completed");
