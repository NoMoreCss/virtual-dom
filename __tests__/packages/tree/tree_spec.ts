import { Tree } from '../../../src/packages/tree/tree';
import { DivNode, RootNode } from '../../../src/packages/tree/node_types';


describe(Tree, () => {
  it('should be able to create a new tree', () => {
    const tree = new Tree();
    expect(tree).toBeInstanceOf(Tree);
  });

  it('should be able to fetch the root element of a tree', () => {
    const tree = new Tree();
    expect(tree.getRoot()).toBeInstanceOf(RootNode);
  });

  describe('#toHTML', () => {
    it('should return just the html tags if the tree is empty', () => {
      const tree = new Tree();
      expect(tree.toHTML()).toEqual('<html></html>');
    });

    it('should return the correct HTML string if the the tree has children', () => {
      const tree = new Tree();

      tree.getRoot().appendChild(new DivNode());
      expect(tree.toHTML()).toEqual('<html><div></div></html>');

      tree.getRoot().appendChild(new DivNode());
      expect(tree.toHTML()).toEqual('<html><div></div><div></div></html>');
    });

  });
});
