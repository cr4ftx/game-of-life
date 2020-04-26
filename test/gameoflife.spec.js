import { nextGeneration, render } from '../src/gameoflife';

describe('gameoflife', () => {
  describe('nextGeneration', () => {
    it('should kill a living cell with less than two neighbors', () => {
      const cells = new Set(['1,1', '1,2']);
      const newGrid = nextGeneration(cells);

      expect(newGrid).toEqual(new Set([]));
    });

    it('should let a living cell with 2 neighbors alive', () => {
      const cells = new Set(['1,1', '1,2', '2,1']);
      const newGrid = nextGeneration(cells);

      const expected = [...cells].every(cell => newGrid.has(cell));

      expect(expected).toBeTruthy();
    });

    it('should let a living cell with 3 neighbors alive', () => {
      const cells = new Set(['1,1', '1,2', '2,1', '2,2']);

      expect(nextGeneration(cells)).toEqual(cells);
    });

    it('should resurrect a dead cell with 3 living neighbors', () => {
      const cells = new Set(['0,0', '1,0', '2,0']);
      const newGrid = nextGeneration(cells);

      const expected = ['1,1', '1,-1'].every(cell => newGrid.has(cell));

      expect(expected).toBeTruthy();
    });

    it('should kill a living cell with more than tree living neighbors', () => {
      const cells = new Set(['0,0', '1,0', '2,0', '0,1', '1,1']);
      const newGrid = nextGeneration(cells);

      const oneOne = newGrid.has('1,1');

      expect(oneOne).toBeFalsy();
    });
  });

  describe('render', () => {
    it('should render living cells on the context', () => {
      const cells = new Set(['1,1', '1,2', '2,1']);

      const ctx = {
        fillRect: jest.fn()
      };

      render(ctx, cells, {
        offsetX: 50,
        offsetY: 50,
        width: 2,
        zoom: 2
      });

      expect(ctx.fillRect).toHaveBeenNthCalledWith(1, 104, 104, 4, 4);
      expect(ctx.fillRect).toHaveBeenNthCalledWith(2, 104, 108, 4, 4);
      expect(ctx.fillRect).toHaveBeenNthCalledWith(3, 108, 104, 4, 4);
    });
  });
});
