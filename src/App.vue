<template>
  <div id="app">
    <canvas
      ref="canvas"
      :width="500"
      :height="500"
      @mousemove="onMouseMove"
      @mousedown="mouseDown = true"
      @mouseup="mouseDown = false"
    ></canvas>

    <div class="toolbar">
      <button v-if="!id" @click="run">run</button>
      <button v-else @click="stop">stop</button>
      <button @click="renderNextGen">next</button>
      <button @click="reset">reset</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { render, nextGeneration } from "./gameoflife";
import template from './templates.json';

@Component
export default class App extends Vue {
  grid = new Set(template);
  zoom = 2;
  id: number = null;
  ctx: CanvasRenderingContext2D;
  origin: { x: number; y: number; };
  mouseDown = false;

  mounted() {
    const canvas = <HTMLCanvasElement> this.$refs.canvas;
    this.ctx = canvas.getContext('2d');
    this.origin = { x: canvas.width / 2, y: canvas.height / 2 }
    this.renderTheGrid()
  }

  onMouseMove(e: MouseEvent) {
    if (this.mouseDown) {
      this.origin.x += e.movementX;
      this.origin.y += e.movementY;
      this.renderTheGrid()
    }
  }

  renderNextGen() {
    this.grid = nextGeneration(this.grid);
    this.renderTheGrid()
  }

  renderTheGrid() {
    this.ctx.fillStyle = "#ffffff";
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.fillStyle = "#263238";
    render(this.ctx, this.grid, {
      zoom: this.zoom,
      originX: this.origin.x,
      originY: this.origin.y
    });
  }

  reset() {
    this.grid = new Set(template);
    this.renderTheGrid()
    this.stop()
  }

  run() {
    this.id = setInterval(this.renderNextGen, 30);
  }

  stop() {
    clearInterval(this.id);
    this.id = null;
  }
}
</script>
