function gridChallenge(grid) {
  for (let i = 0; i < grid.length; i++) {
    grid[i] = grid[i].split("").sort().join("");
  }
  for (let j = 0; j < grid[0].length; j++) {
    let sorted = grid
      .map((col) => col[j].split(""))
      .sort()
      .join("");
    let currCol = grid.map((col) => col[j].split("")).join("");
    if (sorted !== currCol) return "NO";
  }
  return "YES";
}