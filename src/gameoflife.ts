export function nextGeneration(grid: Set<string>): Set<string> {
  const counter = new Map<string, number>();
  const newGrid: Set<string> = new Set();

  grid.forEach((cell) => {
    const [x, y] = stringToCoord(cell);

    getNeighbors(x, y).forEach((neighbor) => {
      const nb = counter.get(neighbor) || 0;
      counter.set(neighbor, nb + 1);
    });
  });

  counter.forEach((v, k) => {
    if (v === 3 || grid.has(k) && v === 2) {
      newGrid.add(k);
    }
  });

  return newGrid;
}

export const getNeighbors = (x: number, y: number) => [
  `${x},${y + 1}`,
  `${x + 1},${y + 1}`,
  `${x + 1},${y}`,
  `${x + 1},${y - 1}`,
  `${x},${y - 1}`,
  `${x - 1},${y - 1}`,
  `${x - 1},${y}`,
  `${x - 1},${y + 1}`
];

export const stringToCoord = (str: string) => str
  .split(",")
  .map((c) => parseInt(c, 10));

interface IRenderOptions {
  zoom: number;
  originX: number;
  originY: number;
}

export function render(ctx: CanvasRenderingContext2D, grid: Set<string>, options: IRenderOptions) {
  const { zoom, originX, originY } = options;
  const width = 1;

  grid.forEach((cell) => {
    const [x, y] = stringToCoord(cell);

    ctx.fillRect(
      originX + x * width * zoom,
      originY + y * width * zoom,
      width * zoom,
      width * zoom
    );
  });
}
