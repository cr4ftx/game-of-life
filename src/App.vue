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
      options: {
        zoom: 3,
        originX: window.innerWidth / 2,
        originY: window.innerHeight / 2,
        width: 1
      }
    };
  },

  watch: {
    grid: {
      handler() {
        this.renderTheGrid();
      }
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
      render(ctx, this.grid, this.options);
    },

    onMouseMove(e) {
      if (this.mouseDown) {
        this.options.originX += e.movementX;
        this.options.originY += e.movementY;
        this.renderTheGrid();
      }
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
