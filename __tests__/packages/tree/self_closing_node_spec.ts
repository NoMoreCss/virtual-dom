import { SelfClosingNode } from "../../../src/packages/tree/self_closing_node";
import { Node } from "../../../src/packages/tree/node";


describe(SelfClosingNode, () => {
  describe('#appendChild',  () => {
    it('should throw an error, since self closing elements cant have children', () => {
      const node = new SelfClosingNode('img');
      expect(() => node.appendChild(new Node())).toThrow();
    });
  })

  describe('#appendChildren', () => {
    it('should throw an error, since self closing elements cant have children', () => {
      const node = new SelfClosingNode('img');
      expect(() => node.appendChildren([new Node()])).toThrow();
    });
  });

  describe('#getHTMLFormattedOpeningTagName', () => {
    it('should format the tag name accordingly to its type', () => {
      const node = new SelfClosingNode('img');
      expect(node.getHTMLFormattedOpeningTagName()).toEqual('<img />');
    });
  });

  describe('#getHTMLFormattedClosingTagName', () => {
    it('should return an empty string since it doesnt have a closing tag', () => {
      const node = new SelfClosingNode('img');
      expect(node.getHTMLFormattedClosingTagName()).toEqual('');
    });
  });
});
