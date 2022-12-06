export const Griderator = (grid) => {
    this.grid = grid;
    this.forEach = (action) => {
        for (let x = 0; x < this.grid.length; x++) {
            for (let y = 0; y < this.grid[x].length; y++) {
                action(x, y, grid);
            }
        }
    }
};