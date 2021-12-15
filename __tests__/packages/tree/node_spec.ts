import { Node } from '../../../src/packages/tree/node';

const getNewNode = () => new Node();

describe(Node, () => {
  describe('children', () => {
    it('should be able to get the children of a node', () => {
      const node = getNewNode();
      expect(node.getChildren()).toEqual([]);
    });

    it('should be able to push more children', () => {
      const node = getNewNode();
      const otherNode = getNewNode();

      node.appendChild(otherNode);
      expect(node.getChildren()).toEqual([otherNode]);
    });

    it('should be able to insert an array of children', () => {
      const node = getNewNode();
      const otherNodes = [getNewNode(), getNewNode()];

      node.appendChildren(otherNodes);
      expect(node.getChildren()).toEqual(otherNodes);
    });
  });

  describe('id', () => {
    it('should be able to get the id of a node', () => {
      const node = getNewNode();
      node.setId('test');

      expect(node.getId()).toEqual('test');
    });

    it('should return null if the node doesnt have an id', () => {
      const node = getNewNode();
      expect(node.getId()).toEqual(null);
    });
  });

  describe('classList', () => {
    it('should return an array of classes', () => {
      const node = getNewNode();
      expect(node.getClassList()).toEqual([]);

      node.addClass('test');
      expect(node.getClassList()).toEqual(['test']);
    });

    it('should return an empty array if there is no elements with that class', () => {
      const node = getNewNode();
      expect(node.getElementsByClass('test')).toEqual([]);
    });
  });

  describe('tagName', () => {
    it('should return the tagName', () => {
      const node = new Node('div');
      expect(node.getTagName()).toEqual('div');
    });

    it('should throw an error if the node doesnt have a tagName', () => {
      const node = new Node();
      expect(node.getTagName).toThrow();
    });

    it('should get the opening tag of a node', () => {
      const node = new Node('div');
      expect(node.getHTMLFormattedOpeningTagName()).toEqual('<div>');
    });

    it('should return the closing tag of a node', () => {
      const node = new Node('div');
      expect(node.getHTMLFormattedClosingTagName()).toEqual('</div>');
    });
  });

  describe('#getElementsByClass', () => {
    it('should be able to search by classes', () => {
      const node = getNewNode();
      const child = getNewNode();

      node.addClass('test');
      child.addClass('test');

      expect(node.getElementsByClass('test')).toEqual([node]);
      node.appendChild(child);
      expect(node.getElementsByClass('test')).toEqual([node, child]);
    });

    it('should return an empty array if there is no element with a given class', () => {
      const node = getNewNode();
      expect(node.getElementsByClass('test')).toEqual([]);
    });
  });

  describe('#getElementByClass', () => {
    it('should fetch the first node that has a class', () => {
      const node = getNewNode();
      const child = getNewNode();

      node.addClass('test');
      child.addClass('test');

      expect(node.getElementByClass('test')).toEqual(node);
      node.appendChild(child);
      expect(node.getElementByClass('test')).toEqual(node);
    });

    it('should return the child if the parent element has no such class', () => {
      const node = getNewNode();
      const child = getNewNode();

      child.addClass('test');
      node.appendChild(child);

      expect(node.getElementByClass('test')).toEqual(child);
    });

    it('should return undefined if there is no such class', () => {
      const node = getNewNode();
      const child = getNewNode();

      node.appendChild(child);
      expect(node.getElementByClass('test')).toEqual(undefined);
    });
  });

  describe('#getElementById', () => {
    it('should find the root element by id', () => {
      const node = getNewNode();
      node.setId('test');

      expect(node.getElementById('test')).toEqual(node);
    });

    it('should return undefined if it could not find the node by id', () => {
      const node = getNewNode();
      expect(node.getElementById('test')).toEqual(undefined);
    });

    it('should return the chidren that has the id if the root doesnt have it', () => {
      const node = getNewNode();
      const child = getNewNode();


      node.appendChild(child);
      expect(node.getElementById('test')).toEqual(undefined);

      child.setId('test');

      expect(node.getElementById('test')).toEqual(child);
    });
  });

  describe('#getElementsById', () => {
    it('should return the list of all the nodes with the given id', () => {
      const node = getNewNode();
      const child = getNewNode();
      const otherChild = getNewNode();

      child.setId('test');
      otherChild.setId('test');

      node.appendChild(child);
      node.appendChild(otherChild);

      expect(node.getElementsById('test')).toEqual([child, otherChild]);
    });

    it('should return an empty array if there is no elements with the id', () => {
      const node = getNewNode();
      expect(node.getElementsById('test')).toEqual([]);
    });

    it('should return an array with only the child if its the only with the id', () => {
      const node = getNewNode();
      const child = getNewNode();

      child.setId('test');
      node.appendChild(child);

      expect(node.getElementsById('test')).toEqual([child]);
    });
  });

  describe('#querySelector', () => {
    it('should be able to find a node by its id', () => {
      const node = getNewNode();
      node.setId('test');

      expect(node.querySelector('#test')).toEqual(node);
    });

    it('should return undefined if there is no node with that id', () => {
      const node = getNewNode();
      expect(node.querySelector('#test')).toEqual(undefined);
    });

    it('should throw an exception if an invalid selector is given', () => {
      const node = getNewNode();
      expect(() => node.querySelector('^test')).toThrow();
    });

    it('should be able to find a node by its class', () => {
      const node = getNewNode();
      node.addClass('test');

      expect(node.querySelector('.test')).toEqual(node);
    });

    it('shoud return undefined if there is no node node with that class', () => {
      const node = getNewNode();
      expect(node.querySelector('.test')).toEqual(undefined);
    });
  });

  describe('#querySelectorAll', () => {
    it('should be able to find all nodes by their id', () => {
      const node = getNewNode();
      const child = getNewNode();
      const otherChild = getNewNode();

      child.setId('test');
      otherChild.setId('test');

      node.appendChild(child);
      node.appendChild(otherChild);

      expect(node.querySelectorAll('#test')).toEqual([child, otherChild]);
    });

    it('should return an empty array if there is no nodes with the id', () => {
      const node = getNewNode();
      expect(node.querySelectorAll('#test')).toEqual([]);
    });

    it('should return an array with only the child if its the only with the id', () => {
      const node = getNewNode();
      const child = getNewNode();

      child.setId('test');
      node.appendChild(child);

      expect(node.querySelectorAll('#test')).toEqual([child]);
    });

    it('should return an empty array if there is no nodes with the id', () => {
      const node = getNewNode();
      expect(node.querySelectorAll('#test')).toEqual([]);
    });

    it('should be able to find all nodes by their class', () => {
      const node = getNewNode();
      const child = getNewNode();
      const otherChild = getNewNode();

      child.addClass('test');
      otherChild.addClass('test');

      node.appendChild(child);
      node.appendChild(otherChild);

      expect(node.querySelectorAll('.test')).toEqual([child, otherChild]);
    });

    it('should return an empty array if there is no nodes with the class', () => {
      const node = getNewNode();
      expect(node.querySelectorAll('.test')).toEqual([]);
    });
  });
});
