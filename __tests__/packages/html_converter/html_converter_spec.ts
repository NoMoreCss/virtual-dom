import { HTMLConverter } from "../../../src/packages/html_converter/html_converter";
import { RootNode, DivNode, ImgNode } from "../../../src/packages/tree/node_types";
import { TextualNode } from "../../../src/packages/tree/textual_node";

describe(HTMLConverter, () => {
  describe('#parse', () => {
    it('should return an empty string if no node is providen', () => {
      const converter = new HTMLConverter(null);
      expect(converter.parse()).toEqual('');
    });

    it('should return just a opening and closing html tag if only the root is given', () => {
      const node = new RootNode();
      const converter = new HTMLConverter(node);

      expect(converter.parse()).toEqual('<html></html>');
    });

    it('should parse the tree if the root has children', () => {
      const node = new RootNode();
      node.appendChild(new DivNode());

      const converter = new HTMLConverter(node);
      expect(converter.parse()).toEqual('<html><div></div></html>');

      node.appendChild(new DivNode());
      expect(converter.parse()).toEqual('<html><div></div><div></div></html>');
    });

    it('should parse correctly even if it has a self closing node', () => {
      const node = new RootNode();
      node.appendChild(new ImgNode());

      const converter = new HTMLConverter(node);
      expect(converter.parse()).toEqual('<html><img /></html>');
    });

    it('should parse one class accordding to the spec', () => {
      const node = new RootNode();
      const div = new DivNode();

      div.getClassList().push('test');
      node.appendChild(div);

      const converter = new HTMLConverter(node);

      expect(converter.parse()).toEqual('<html><div class="test"></div></html>');
    });

    it('should parse multiple classes acordding to the spec', () => {
      const node = new RootNode();
      const div = new DivNode();

      div.getClassList().push('test');
      div.getClassList().push('other-test');

      node.appendChild(div);

      const converter = new HTMLConverter(node);

      expect(converter.parse()).toEqual('<html><div class="test other-test"></div></html>');
    });

    it('should insert the id property only if set', () => {
      const node = new RootNode();
      const div = new DivNode();

      div.setId('test');
      node.appendChild(div);

      const converter = new HTMLConverter(node);

      expect(converter.parse()).toEqual('<html><div id="test"></div></html>');
    });

    it('should position the class before the id if its set', () => {
      const node = new RootNode();
      const div = new DivNode();

      div.setId('test');
      div.getClassList().push('test');
      node.appendChild(div);

      const converter = new HTMLConverter(node);

      expect(converter.parse()).toEqual('<html><div class="test" id="test"></div></html>');
    });

    it('should be able to produce a valid output if multiple classes and an id is given', () => {
      const node = new RootNode();
      const div = new DivNode();

      div.setId('test');
      div.getClassList().push('test');
      div.getClassList().push('other-test');
      node.appendChild(div);

      const converter = new HTMLConverter(node);

      expect(converter.parse()).toEqual('<html><div class="test other-test" id="test"></div></html>');
    });

    it('should be able to produce the correct formatted output if it is a self closing tag', () => {
      const node = new RootNode();
      const img = new ImgNode();

      img.setId('test');
      img.getClassList().push('test');
      img.getClassList().push('other-test');
      node.appendChild(img);

      const converter = new HTMLConverter(node);

      expect(converter.parse()).toEqual('<html><img class="test other-test" id="test" /></html>');
    });

    it('should properly display the attributes of a node', () => {
      const node = new RootNode();
      const div = new DivNode();

      div.setAttribute('data-test', 'test');
      node.appendChild(div);

      const converter = new HTMLConverter(node);

      expect(converter.parse()).toEqual('<html><div data-test="test"></div></html>');
    });

    it('should properly display the attributes of a node if it has more than one', () => {
      const node = new RootNode();
      const div = new DivNode();

      div.setAttribute('data-test', 'test');
      div.setAttribute('data-test2', 'test2');
      node.appendChild(div);

      const converter = new HTMLConverter(node);

      expect(converter.parse()).toEqual('<html><div data-test="test" data-test2="test2"></div></html>');
    });

    it('should properly display a textual element', () => {
      const node = new RootNode();
      const textContent = 'this is a textual element';
      const textualNode = new TextualNode(textContent);

      node.appendChild(textualNode);
      const converter = new HTMLConverter(node);

      expect(converter.parse()).toEqual(`<html>${textContent}</html>`);
    });
  });
});
