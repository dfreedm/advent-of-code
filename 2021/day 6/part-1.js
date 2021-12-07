import {readFileSync} from 'fs';

const fish = readFileSync(new URL('./input.txt', import.meta.url), 'utf-8').split(',').map(Number);

for (let i = 0; i < 80; i++) {
  let fishLength = fish.length;
  for (let f = 0; f < fishLength; f++) {
    fish[f]--;
    if (fish[f] < 0) {
      fish[f] = 6;
      fish.push(8);
    }
  }
}

console.log(fish.length)