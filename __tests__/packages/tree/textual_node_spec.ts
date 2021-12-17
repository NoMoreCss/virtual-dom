import { TextualNode } from "../../../src/packages/tree/textual_node";

describe(TextualNode, () => {
  it('should not be able to append a child or children to it', () => {
    const node = new TextualNode('test');
    expect(() => node.appendChild(new TextualNode('test'))).toThrow();
    expect(() => node.appendChildren([new TextualNode('test')])).toThrow();
  });

  it('should return the text content', () => {
    const node = new TextualNode('test');
    expect(node.getHTMLFormattedOpeningTagName()).toEqual('test');
  });

  it('should return an empty string for the closing tag', () => {
    const node = new TextualNode('test');
    expect(node.getHTMLFormattedClosingTagName()).toEqual('');
  });

  it('should not be able to set nor get attributes', () => {
    const node = new TextualNode('test');
    expect(() => node.setAttribute('test', 'test')).toThrow();
    expect(() => node.getAttribute('test')).toThrow();
  });
});
