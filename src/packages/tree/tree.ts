import { HTMLConverter } from "../html_converter/html_converter";
import { RootNode } from "./node_types";

export class Tree {
  private root: RootNode;

  constructor() {
    this.root = new RootNode();
  }

  public getRoot() {
    return this.root;
  }

  public toHTML() {
    return new HTMLConverter(this.root).parse();
  }
}
