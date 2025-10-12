// golet.js
// versi sederhana untuk Node 18+
// cek apakah alamat ETH tertentu ada di file remote

const SOURCE = 'https://litter.catbox.moe/fafc7i.txt';

// ambil argumen dari command line
const args = process.argv.slice(2);
if (args.length === 0) {
  console.error('❗ Gunakan: node golet.js <eth_address>');
  process.exit(1);
}

const target = args[0].trim().toLowerCase();
const isValid = /^0x[a-fA-F0-9]{40}$/.test(target);
if (!isValid) {
  console.error('❗ Format alamat ETH tidak valid. Gunakan 0x diikuti 40 karakter hex.');
  process.exit(1);
}

async function main() {
  try {
    console.log(`🔍 Mengambil data dari ${SOURCE} ...`);
    const res = await fetch(SOURCE);
    if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);

    const text = await res.text();
    const found = text.toLowerCase().includes(target);

    console.log('----------------------------------');
    if (found) {
      console.log(`✅ Alamat ditemukan: ${target}`);
    } else {
      console.log(`❌ Alamat tidak ditemukan: ${target}`);
    }
    console.log('----------------------------------');
  } catch (err) {
    console.error('🚨 Gagal fetch data:', err.message);
  }
}

main();
