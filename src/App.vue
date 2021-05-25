<template>
  <div id="app">
    <h1>The Sims 4 Build Generator</h1>
    <div class="picker">
      <div class="result">
        <span class="word size">{{ size }}</span>
        <span class="word style">{{ style }}</span>
        <span class="word type">{{ type }}</span>
      </div>
    </div>
    <div class="controls">
      <div :class="['start', cycling ? 'disabled' : 'enabled']" @click="startCycle">
        Generate
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import words from '@/assets/data/words.json';

@Component
export default class App extends Vue {
  private cycling = false;

  private size = 'Click';

  private style = 'Generate';

  private type = 'to Start!';

  private lastCycle = 0;

  private cycleDuration = 0;

  private cycle(): void {
    const now = Date.now();

    this.generate();

    this.cycleDuration -= (now - this.lastCycle);

    this.lastCycle = now;

    if (this.cycleDuration > 0) {
      Vue.nextTick(() => {
        window.requestAnimationFrame(() => {
          this.cycle();
        });
      });
    } else {
      this.cycling = false;
    }
  }

  private startCycle(): void {
    if (this.cycling) {
      return;
    }

    this.cycling = true;

    this.cycleDuration = 750 + 1000 * Math.random();
    this.lastCycle = Date.now();

    this.cycle();
  }

  // eslint-disable-next-line class-methods-use-this
  private static pickRandom(arr: string[]): string {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  private generate(): void {
    this.size = App.pickRandom(words.size);
    this.style = App.pickRandom(words.style);
    this.type = App.pickRandom(words.type);
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&display=swap');
* {
  box-sizing: border-box;
}
body {
  font-family: 'Nunito', sans-serif;
  font-weight: 400;
  background: #242424;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}

#app {
  width: 100%;
  max-width: 1000px;
}

h1 {
  text-align: center;
  margin-bottom: 40px;
}

.result {
  display: flex;

  .word {
    margin-right: 12px;

    &:last-child {
      margin-right: 0;
    }
  }
}

.picker {
  box-shadow: 0 0 8px #222;
  background: #1c4d8c;
  border-radius: 12px;
  padding: 12px;

  .result {
    display: flex;

    background: #7ba8e3;
    border-radius: 10px;
    overflow: hidden;
    justify-content: center;

    font-size: 42px;
    line-height: 34px;

    padding: 20px;

    .word {
      display: flex;
      align-items: center;
      font-weight: 700;
      color: white;
      text-shadow: 0 0 2px #103461;
    }
  }
}

.controls {
  display: flex;
  justify-content: center;
  margin-top: 24px;

  .start {
    cursor: pointer;
    background: #54a356;
    border-radius: 6px;
    padding: 8px 18px;
    font-size: 24px;
    font-weight: 700;

    &.enabled:hover {
      background: lighten(#54a356, 5%);
    }

    &.disabled {
      cursor: default;
      opacity: .5;
    }
  }
}
</style>
