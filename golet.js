// search
import fetch from "node-fetch";

// URL file kamu di Litterbox
const url = "https://litter.catbox.moe/fafc7i.txt";

// Ambil keyword dari argumen terminal
const keyword = process.argv[2];

if (!keyword) {
  console.log("⚠️  Harap masukkan kata kunci setelah perintah. Contoh:");
  console.log("   node search_addresses.js jakarta\n");
  process.exit(1);
}

async function main() {
  console.log(`🔍 Mengambil data dari: ${url} ...`);
  const res = await fetch(url);

  if (!res.ok) throw new Error(`Gagal fetch file (${res.status})`);

  const text = await res.text();
  console.log("✅ File berhasil diambil.\n");

  const lines = text.split(/\r?\n/);
  const matches = lines.filter(line =>
    line.toLowerCase().includes(keyword.toLowerCase())
  );

  console.log(`📊 Jumlah baris total: ${lines.length.toLocaleString()}`);
  console.log(`📍 Jumlah yang mengandung kata "${keyword}": ${matches.length.toLocaleString()}\n`);

  if (matches.length > 0) {
    console.log("🪄 Contoh hasil yang cocok:\n");
    console.log(matches.slice(0, 5).join("\n"));
  } else {
    console.log("😶 Tidak ada hasil yang cocok dengan kata kunci tersebut.");
  }

  console.log("\n✨ Analisis singkat:");
  if (matches.length === 0) {
    console.log(`- Tidak ditemukan kemunculan kata "${keyword}" di dataset.`);
  } else if (matches.length < 10) {
    console.log(`- Kata "${keyword}" muncul jarang — area ini mungkin minoritas.`);
  } else if (matches.length < 1000) {
    console.log(`- Kata "${keyword}" muncul cukup sering — area ini punya representasi moderat.`);
  } else {
    console.log(`- Wow! Kata "${keyword}" sangat sering muncul — kemungkinan besar ini area utama di data tersebut.`);
  }
}

main().catch(console.error);
