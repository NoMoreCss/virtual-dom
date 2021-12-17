import { Node } from "./node";

export class TextualNode extends Node {
  constructor(private readonly textContent: string) {
    super();
  }

  public getHTMLFormattedOpeningTagName() {
    return this.textContent;
  }

  public getHTMLFormattedClosingTagName() {
    return '';
  }

  public appendChildren(_: Node[]): void {
    throw new Error('Cannot append children to a simple textual element.');
  }

  public appendChild(_: Node): void {
    throw new Error('Cannot append children to a simple textual element.');
  }

  public setAttribute(_: string, __: string): void {
    throw new Error('Cannot set attributes on a simple textual element.');
  }

  public getAttribute(_: string) : string {
    throw new Error('Cannot get attributes on a simple textual element.');
  }
}
