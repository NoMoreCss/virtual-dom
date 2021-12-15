import { Node } from "../tree/node";

export class HTMLConverter {
  constructor(private readonly rootNode: Node | null) {}

  public parse() : string {
    if (!this.rootNode) {
      return '';
    }

    let result = this.rootNode.getHTMLFormattedOpeningTagName();

    this.rootNode.getChildren().forEach(child => {
      const parser = new HTMLConverter(child);
      result += parser.parse();
    });

    result += this.rootNode.getHTMLFormattedClosingTagName();

    return result;
  }
}
