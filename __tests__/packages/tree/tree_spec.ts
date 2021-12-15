import { Tree, RootNode } from '../../../src/packages/tree/tree';


describe(Tree, () => {
  const tree = new Tree();

  it('should be able to create a new tree', () => {
    expect(tree).toBeInstanceOf(Tree);
  });

  it('should be able to fetch the root element of a tree', () => {
    expect(tree.getRoot()).toBeInstanceOf(RootNode);
  });
});
