import { Node } from "./node";

export class RootNode extends Node {}

export class Tree {
  private root: RootNode;

  constructor() {
    this.root = new RootNode();
  }

  public getRoot() {
    return this.root;
  }
}
