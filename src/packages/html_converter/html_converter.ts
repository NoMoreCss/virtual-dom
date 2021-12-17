import { Node } from "../tree/node";

export class HTMLConverter {
  constructor(private readonly node: Node | null) {}

  public parse() : string {
    if (!this.node) return '';

    const result = this.node.getChildren().reduce((acc, child) => {
      const parser = new HTMLConverter(child);
      return acc + parser.parse();
    }, this.node.getHTMLFormattedOpeningTagName());

    return `${result}${this.node.getHTMLFormattedClosingTagName()}`;
  }
}
