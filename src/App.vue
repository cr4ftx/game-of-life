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
      <button @click="reset">reset</button>
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
  grid = template;
  zoom = 3;
  id: number;
  ctx: CanvasRenderingContext2D;
  runOrStop = "run";

  mounted() {
    const canvas = <HTMLCanvasElement> this.$refs.canvas;
    this.ctx = canvas.getContext('2d');
    this.renderTheGrid()
  }

  onWheel(e: WheelEvent) {
    this.zoom += e.deltaY < 0
      ? this.zoom >= 0.05 ? -0.05 : 0
      : 0.05;

    this.renderTheGrid()
  }

  renderNextGen() {
    this.grid = nextGeneration(this.grid);
    this.renderTheGrid()
  }

  reset() {
    this.grid = template;
    this.renderTheGrid()
  }

  resetZoom() {
    this.zoom = 3
    this.renderTheGrid()
  }

  renderTheGrid() {
    this.ctx.fillStyle = "#ffffff";
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.fillStyle = "#263238";
    render(this.ctx, this.grid, this.zoom);
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
