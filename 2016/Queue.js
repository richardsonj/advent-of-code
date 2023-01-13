export default class Queue {
  constructor() {
    this.elements = {};
    this.frontIndex = 0;
    this.backIndex = 0;
    this.length = 0;
  }

  add(...items) {
    for (const item of items) {
      this.elements[this.backIndex++] = item;
      this.length++;
    }
  }

  remove() {
    const item = this.elements[this.frontIndex];
    delete this.elements[this.frontIndex++];
    this.length--;
    return item;
  }
}
