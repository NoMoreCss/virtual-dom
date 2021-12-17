enum SelectorType {
  CLASS,
  ID,
}

class Selector {
  constructor(private readonly type: SelectorType, public readonly value: string) {}
}

class ClassSelector extends Selector {
  constructor(value: string) {
    super(SelectorType.CLASS, value);
  }
}

class IdSelector extends Selector {
  constructor(value: string) {
    super(SelectorType.ID, value);
  }
}

export class Node {
  private children: Node[];
  private classList: string[];
  private id: string | null;
  private tagName: string | null;
  private isSelfClosing: boolean;

  constructor(tagName: string | null = null, isSelfClosing = false) {
    this.children = [];
    this.classList = [];
    this.id = null;
    this.tagName = tagName;
    this.isSelfClosing = isSelfClosing;
  }

  public getChildren() {
    return this.children;
  }

  public getClassList() {
    return this.classList;
  }

  public getId() {
    return this.id;
  }

  public setId(id: string) {
    this.id = id;
  }

  public addClass(className: string) {
    this.classList.push(className);
  }

  public appendChild(child: Node) {
    this.children.push(child);
  }

  public appendChildren(children: Node[]) {
    this.children = this.children.concat(children);
  }

  public getElementByClass(className: string) : Node | undefined {
    if (this.classList.includes(className)) {
      return this;
    }

    return this.children.find(child => child.getElementByClass(className));
  }

  public getElementById(id: string) : Node | undefined {
    if (this.id === id) {
      return this;
    }

    return this.children.find(child => child.getElementById(id));
  }

  public getElementsById(id: string, elements: Node[] = []) {
    if (this.id === id) {
      elements.push(this);
    }

    this.children.forEach(child => child.getElementsById(id, elements));

    return elements;
  }

  public getElementsByClass(className: string, elements: Node[] = []) {
    if (this.classList.includes(className)) {
      elements.push(this);
    }

    this.children.forEach(child => child.getElementsByClass(className, elements));

    return elements;
  }

  public querySelector(selector: string) {
    const actualSelector = Node.parseSelector(selector);

    if (actualSelector instanceof ClassSelector) {
      return this.getElementByClass(actualSelector.value);
    }

    return this.getElementById(actualSelector.value);
  }

  public querySelectorAll(selector: string) {
    const actualSelector = Node.parseSelector(selector);

    if (actualSelector instanceof ClassSelector) {
      return this.getElementsByClass(actualSelector.value);
    }

    return this.getElementsById(actualSelector.value);
  }

  public getTagName() {
    if (!this.tagName) {
      throw new Error('Abstract element cannot have a tag name');
    }

    return this.tagName;
  }

  public getHTMLFormattedOpeningTagName() {
    if (!this.tagName) {
      throw new Error('Abstract element cannot have a tag name');
    }

    if (this.isSelfClosing) {
      return `<${this.getTagName()} />`;
    }

    return `<${this.getTagName()}>`;
  }

  public getHTMLFormattedClosingTagName() {
    if (!this.tagName) {
      throw new Error('Abstract element cannot have a tag name');
    }

    if (this.isSelfClosing) {
      return '';
    }

    return `</${this.getTagName()}>`;
  }

  private static parseSelector(selector: string) : Selector {
    const selectorType = selector[0];
    const selectorValue = selector.slice(1);

    if (selectorType == '.') {
      return new ClassSelector(selectorValue);
    }

    if (selectorType == '#') {
      return new IdSelector(selectorValue);
    }

    throw new Error('Invalid selector type');
  }
}
