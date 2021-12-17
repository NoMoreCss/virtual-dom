import { Node } from "./node";

export class SelfClosingNode extends Node {
  constructor(tagName: string) {
    super(tagName, true);
  }

  public appendChild(child: Node): void {
    throw new Error('Cannot append child to self closing node');
  }

  public appendChildren(children: Node[]): void {
    throw new Error('Cannot append children to self closing node');
  }
}
