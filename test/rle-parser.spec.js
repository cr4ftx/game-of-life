import { parseRle } from '../src/rle-parser';

describe('Rle parser', () => {
  it('should parse dead cells', () => {
    const grid = parseRle(file`
      x = 3, y = 3
      3b!
    `);

    expect(grid).toEqual(new Set());
  });

  it('should parse living cells', () => {
    const grid = parseRle(file`
      x = 3, y = 3
      3o!
    `);

    expect(grid).toEqual(new Set(['0,0', '1,0', '2,0']));
  });

  it('should parse several lines of cells', () => {
    const grid = parseRle(file`
      x = 3, y = 3
      3o$2o!
    `);

    expect(grid).toEqual(new Set(['0,0', '1,0', '2,0', '0,1', '1,1']));
  });

  it('should parse several cells on the same line', () => {
    const grid = parseRle(file`
        x = 3, y = 3
        bo$2bo$3o!
    `);

    expect(grid).toEqual(new Set(['1,0', '2,1', '0,2', '1,2', '2,2']));
  });

  it('should ignore comments', () => {
    const grid = parseRle(file`
      #N Gosper glider gun
      #C This was the first gun discovered.
      #C As its name suggets, it was discovered by Bill Gosper.
      x = 3, y = 3
      bo$2bo$3o!
    `);

    expect(grid).toEqual(new Set(['1,0', '2,1', '0,2', '1,2', '2,2']));
  });

  it('should throw an error if encounter an invalid token', () => {
    expect(() => {
      parseRle(file`
        x = 3, y = 3
        2o$2$o!
      `);
    }).toThrow(new Error('Invalid token'));
  });
});

const file = ([string]) =>
  string
    .split('\n')
    .map(s => s.trim())
    .filter(s => !!s)
    .join('\n');
