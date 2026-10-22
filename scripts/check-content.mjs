import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import vm from 'node:vm';

const html = readFileSync(new URL('../public/index.html', import.meta.url), 'utf8');
const data = html.slice(html.indexOf('const credentials ='), html.indexOf('const grid ='));
const { credentials, credentialDetails } = vm.runInNewContext(`${data}; ({ credentials, credentialDetails })`);
assert.equal(credentials.length, 33);
assert.equal(credentials.filter(item => item.type === 'certificate').length, 25);
assert.equal(new Set(credentials.map(item => item.provider)).size, 9);
assert.equal(Object.keys(credentialDetails).length, credentials.length);
for (const item of credentials) {
  assert.ok(existsSync(new URL(`../public/assets/credentials/${item.image}`, import.meta.url)), item.image);
  assert.ok(credentialDetails[item.image]?.summary.length > 30, item.image);
}
assert.equal(credentialDetails['github-foundations-cert.png'].expires, '6 April 2028');
assert.equal(credentialDetails['oracle-java-foundations-cert.png'].issued, '19 May 2026');
assert.equal(credentialDetails['cisco-javascript-essentials-1-cert.png'].issued, '14 April 2026');
assert.equal(credentialDetails['aws-data-engineer-associate-cert.png'].kind, 'Exam preparation');
assert.equal(credentialDetails['aws-cloud-club-csmu-hackathon-cert.png'].kind, 'Event participation');
for (const link of html.matchAll(/href="#([^"]+)"/g)) {
  assert.ok(html.includes(`id="${link[1]}"`), `Missing anchor: ${link[1]}`);
}
for (const script of html.matchAll(/<script>([\s\S]*?)<\/script>/g)) new vm.Script(script[1]);
console.log('PASS: 33 credential descriptions, document metadata, image paths, section anchors, and script syntax.');
