#!/usr/bin/env node // golet.js // Node script: fetch a remote text file and check whether a provided Ethereum address appears in it. // Usage: //   node golet.js <eth_address> // Example: //   node golet.js 0xFeB463cDa1701E33F7fa4ea35d4E4856385A7849

const SOURCE = 'https://litter.catbox.moe/fafc7i.txt'; const args = process.argv.slice(2);

if (args.length === 0) { console.error('Usage: node golet.js <eth_address>'); process.exit(2); }

const target = args[0].trim(); const ethRegexFull = /^0x[a-fA-F0-9]{40}$/; if (!ethRegexFull.test(target)) { console.error('Invalid Ethereum address format. Expect 0x followed by 40 hex characters.'); process.exit(3); }

// helper to get fetch (Node >=18 has global fetch) async function getFetch() { if (typeof fetch !== 'undefined') return fetch; try { const mod = await import('node-fetch'); return mod.default; } catch (err) { throw new Error('fetch is not available. Run on Node >=18 or install node-fetch (npm install node-fetch).'); } }

async function main() { const fetchFn = await getFetch(); console.error(Fetching: ${SOURCE});

let res; try { res = await fetchFn(SOURCE); } catch (err) { console.error('Network error while fetching source:', err.message || err); process.exitCode = 4; return; }

if (!res.ok) { console.error(HTTP error ${res.status} ${res.statusText}); process.exitCode = 5; return; }

const text = await res.text();

// We'll search using a case-insensitive regex for the exact address const findRegex = new RegExp(target, 'i'); const found = findRegex.test(text);

if (found) { // Optionally show the line(s) where it's found const lines = text.split(/ ? /); const matchedLines = lines.filter(l => findRegex.test(l));

console.log('FOUND: ' + target);
console.log('

Context lines:'); matchedLines.forEach((l, i) => { console.log(${i+1}: ${l}); }); } else { console.log('NOT FOUND: ' + target); } }

main().catch(err => { console.error('Unhandled error:', err); process.exit(1); });

