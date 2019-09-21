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
      <button @click="generateNextGen">next</button>
      <button @click="reset">reset</button>
      <select v-model="template">
        <option v-for="t in Object.keys(templates)" :value="t">{{ t }}</option>
      </select>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { render, nextGeneration } from "./gameoflife";
import templates from "./templates.json";

type Template = "template1" | "glider";

@Component({
  watch: {
    template() {
      this.grid = new Set(this.templates[this.template]);
    },
    grid() {
      this.renderTheGrid();
    }
  }
})
export default class App extends Vue {
  grid: Set<string> = null;
  templates = templates;
  template: Template = "template1";
  zoom = 2;
  id: number = null;
  ctx: CanvasRenderingContext2D = null;
  options = {
    zoom: 2,
    originX: 250,
    originY: 250,
    width: 1
  };
  mouseDown = false;

  mounted() {
    const canvas = <HTMLCanvasElement> this.$refs.canvas;
    this.ctx = canvas.getContext('2d');
    this.grid = new Set(this.templates["template1"]);
  }

  renderTheGrid() {
    this.ctx.fillStyle = "#ffffff";
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.fillStyle = "#263238";
    render(this.ctx, this.grid, this.options);
  }

  generateNextGen() {
    this.grid = nextGeneration(this.grid);
  }

  run() {
    this.id = setInterval(this.generateNextGen, 30);
  }

  stop() {
    clearInterval(this.id);
    this.id = null;
  }

  reset() {
    this.grid = new Set(this.templates[this.template]);
    this.stop();
  }

  onMouseMove(e: MouseEvent) {
    if (this.mouseDown) {
      this.options.originX += e.movementX;
      this.options.originY += e.movementY;
      this.renderTheGrid();
    }
  }
}
</script>
