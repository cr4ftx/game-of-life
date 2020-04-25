const getNeighbors = (x, y) => [
  `${x},${y + 1}`,
  `${x + 1},${y + 1}`,
  `${x + 1},${y}`,
  `${x + 1},${y - 1}`,
  `${x},${y - 1}`,
  `${x - 1},${y - 1}`,
  `${x - 1},${y}`,
  `${x - 1},${y + 1}`
];

const stringToCoord = str => str.split(',').map(c => parseInt(c, 10));

export function nextGeneration(grid) {
  const counter = new Map();
  const newGrid = new Set();

  grid.forEach(cell => {
    const [x, y] = stringToCoord(cell);

    getNeighbors(x, y).forEach(neighbor => {
      const nb = counter.get(neighbor) || 0;
      counter.set(neighbor, nb + 1);
    });
  });

  counter.forEach((v, k) => {
    if (v === 3 || (grid.has(k) && v === 2)) {
      newGrid.add(k);
    }
  });

  return newGrid;
}

export function render(ctx, grid, options) {
  const { zoom, originX, originY, width } = options;

  grid.forEach(cell => {
    const [x, y] = stringToCoord(cell);

    ctx.fillRect(
      originX + x * width * zoom,
      originY + y * width * zoom,
      width * zoom,
      width * zoom
    );
  });
}
