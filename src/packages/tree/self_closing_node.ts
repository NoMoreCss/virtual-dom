import { Node } from "./node";

export class SelfClosingNode extends Node {
  constructor(tagName: string) {
    super(tagName, true);
  }

  public appendChild(_: Node): void {
    throw new Error('Cannot append child to self closing node');
  }

  public appendChildren(_: Node[]): void {
    throw new Error('Cannot append children to self closing node');
  }
}
