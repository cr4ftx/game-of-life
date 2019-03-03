<template>
  <div id="app">
    <div class="canvas">
      <canvas
        ref="canvas"
        :width="500"
        :height="500"
        @wheel="onWheel"
      ></canvas>
    </div>

    <div class="toolbar">
      <button @click="run">{{ runOrStop }}</button>
      <button @click="renderNextGen">next</button>
      <button @click="resetZoom">reset zoom</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { render, nextGeneration } from "./gameoflife";
import template from "./template"

@Component
export default class App extends Vue {
  gameOfLife = template;
  zoom = 1;
  id: number;
  ctx: CanvasRenderingContext2D;
  runOrStop = "run";

  mounted() {
    const canvas = <HTMLCanvasElement> this.$refs.canvas;
    this.ctx = canvas.getContext('2d');
    render(this.ctx, this.gameOfLife, this.zoom);
  }

  onWheel(e: WheelEvent) {
    this.zoom += e.deltaY < 0
      ? this.zoom > 0 ? -0.05 : 0
      : 0.05;

    render(this.ctx, this.gameOfLife, this.zoom);
  }

  renderNextGen() {
    this.gameOfLife = nextGeneration(this.gameOfLife);
    render(this.ctx, this.gameOfLife, this.zoom);
  }

  resetZoom() {
    this.zoom = 1
    render(this.ctx, this.gameOfLife, this.zoom);
  }

  run() {
    if (this.id) {
      this.runOrStop = "run";
      window.clearInterval(this.id);
      this.id = null;
    } else {
      this.runOrStop = "stop";
      this.id = window.setInterval(this.renderNextGen, 30);
    }
  }
}
</script>

<style scoped>
#app {
  text-align: center;
  font-family: 'Times New Roman', Times, serif;
}

.canvas canvas {
  border: solid 1px #78909C;
}

button {
  min-width: 60px;
  height: 35px;
  background-color: #455A64;
  color: white;
  border: none;
  font-size: 16px;
  box-shadow: 0px 3px 1px -2px rgba(0,0,0,0.2);
  border-radius: 2px;
}
</style>
