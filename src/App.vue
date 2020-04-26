<template>
  <div id="app">
    <canvas
      ref="canvas"
      :width="width"
      :height="height"
      :class="{ grabbing: mouseDown }"
      @mousemove="onMouseMove"
      @mousedown="mouseDown = true"
      @mouseup="mouseDown = false"
      @wheel="onWheel"
    />
  </div>
</template>

<script>
import { render, nextGeneration } from './gameoflife';
import template from './template.json';

export default {
  name: 'App',

  data() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
      grid: new Set(template),
      mouseDown: false,
      offsetX: window.innerWidth / 2,
      offsetY: window.innerHeight / 2,
      zoom: 1
    };
  },

  watch: {
    grid() {
      this.renderTheGrid();
    }
  },

  mounted() {
    setInterval(() => {
      this.grid = nextGeneration(this.grid);
    }, 30);

    window.addEventListener('resize', () => {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
    });
  },

  methods: {
    renderTheGrid() {
      const ctx = this.$refs.canvas.getContext('2d');

      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.fillStyle = '#263238';
      render(ctx, this.grid, {
        offsetX: this.offsetX,
        offsetY: this.offsetY,
        zoom: this.zoom
      });
    },

    onMouseMove(e) {
      if (this.mouseDown) {
        this.offsetX += e.movementX / this.zoom;
        this.offsetY += e.movementY / this.zoom;
      }
    },

    onWheel(e) {
      const beforeX = e.clientX / this.zoom - this.offsetX;
      const beforeY = e.clientY / this.zoom - this.offsetY;

      if (e.deltaY > 0) {
        this.zoom *= 0.9;
      } else {
        this.zoom *= 1.1;
      }

      const afterX = e.clientX / this.zoom - this.offsetX;
      const afterY = e.clientY / this.zoom - this.offsetY;

      this.offsetX += afterX - beforeX;
      this.offsetY += afterY - beforeY;
    }
  }
};
</script>

<style>
#app {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  display: flex;
}

canvas {
  cursor: pointer;
}

.grabbing {
  cursor: grabbing;
}
</style>
