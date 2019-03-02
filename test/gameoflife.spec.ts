import {
  getNeighbors,
  nextGeneration,
  stringToCoord
} from "../src/gameoflife";

describe("gameoflife", () => {
  describe("nextGeneration", () => {
    it("should kill a live cell with less than two neighbors", () => {
      const newGrid = nextGeneration(["1,1", "1,2"]);

      expect(newGrid).toEqual([]);
    });

    it("should let a live cell with 2 neighbors alive", () => {
      const cells = ["1,1", "1,2", "2,1"];
      const newGrid = nextGeneration(cells);

      const expected = cells.every((cell) => newGrid.includes(cell));

      expect(expected).toBeTruthy();
    });

    it("should let a live cell with 3 neighbors alive", () => {
      const cells = ["1,1", "1,2", "2,1", "2,2"];
      const newGrid = nextGeneration(cells);

      const expected = cells.every((cell) => newGrid.includes(cell));

      expect(expected).toBeTruthy();
    });

    it("should resurrect a dead cell with 3 live neighbors", () => {
      const newGrid = nextGeneration(["0,0", "1,0", "2,0"]);

      const expected = ["1,1", "1,-1"]
        .every((cell) => newGrid.includes(cell));

      expect(expected).toBeTruthy();
    });

    it("should kill a live cell with more than tree live neighbors", () => {
      const newGrid = nextGeneration(["0,0", "1,0", "2,0", "0,1", "1,1"]);

      const oneOne = newGrid.find((cell) => cell === "1,1");

      expect(oneOne).toBeFalsy();
    });
  });

  describe("getNeighbors", () => {
    it("should return all neighbors of a cell", () => {
      const neighbors = getNeighbors(1, 1);

      expect(neighbors).toEqual([
        "1,2",
        "2,2",
        "2,1",
        "2,0",
        "1,0",
        "0,0",
        "0,1",
        "0,2"
      ]);
    });
  });

  describe("stringToCoord", () => {
    it("should convert 2,1 into [2, 1]", () => {
      expect(stringToCoord("2,1")).toEqual([2, 1]);
    });
  });
});
