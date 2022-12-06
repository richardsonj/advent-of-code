let idSequence = 0;

class Node {
  constructor() {
    this.neighbors = [];
    this.left = null;
    this.right = null;
    this.name = "";
    this.visited = false;
    this.top = "";
    this.bottom = "";
    this.id = idSequence++;
  }
}

export default Node;
