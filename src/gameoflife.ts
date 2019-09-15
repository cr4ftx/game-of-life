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

export function getNeighbors(x: number, y: number): string[] {
  return [
    `${x},${y + 1}`,
    `${x + 1},${y + 1}`,
    `${x + 1},${y}`,
    `${x + 1},${y - 1}`,
    `${x},${y - 1}`,
    `${x - 1},${y - 1}`,
    `${x - 1},${y}`,
    `${x - 1},${y + 1}`
  ];
}

export function stringToCoord(str: string): number[] {
  return str
    .split(",")
    .map((c) => parseInt(c, 10));
}

export interface IContext {
  fillStyle: string | CanvasGradient | CanvasPattern;
  fillRect: (x: number, y: number, width: number, heigth: number) => void;
  canvas: { width: number, height: number };
}

export function render(ctx: IContext, grid: Set<string>, zoom: number) {
  const width = 1;
  const x0 = ctx.canvas.width / 2;
  const y0 = ctx.canvas.height / 2;

  ctx.fillStyle = "#263238";
  grid.forEach((cell) => {
    const [x, y] = stringToCoord(cell);

    ctx.fillRect(x0 + x * width * zoom, y0 + y * width * zoom, width * zoom, width * zoom);
  });
}
