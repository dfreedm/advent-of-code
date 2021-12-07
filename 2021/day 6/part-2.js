import {readFileSync} from 'fs';

const initialFish = readFileSync(new URL('./input.txt', import.meta.url), 'utf-8').split(',').map(Number);

/**
 * The naive way of allocating an array item per fish to track just breaks down
 * at n=200
 * 
 * Instead, you only need to track how many fish are in each cycle day, and
 * move that around.
 * 
 * Credit to @rictic for saving me the headache
 */

const dayTracker = Array(9).fill(0);

for (const fish of initialFish) {
  dayTracker[fish]++;
}

for (let rounds = 0; rounds < 256; rounds++) {
  const spawningFish = dayTracker[0];
  for (let i = 1; i < 9; i++) {
    dayTracker[i - 1] = dayTracker[i];
  }
  // add the fish from day 0 back to day 6, as they have reset
  dayTracker[6] += spawningFish;
  // new fish spawned by the day 0 fish
  dayTracker[8] = spawningFish;
}

console.log(dayTracker.reduce((acc, f) => acc + f, 0));