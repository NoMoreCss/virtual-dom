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
  private attributes: { [key: string]: string };

  constructor(tagName: string | null = null, isSelfClosing = false) {
    this.children = [];
    this.classList = [];
    this.id = null;
    this.tagName = tagName;
    this.isSelfClosing = isSelfClosing;
    this.attributes = {};
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

    let opening = `<${this.getTagName()}`;
    let closing = '>';

    if (this.isSelfClosing) {
      closing = ' />';
    }

    if (this.hasClasses()) {
      opening = `${opening} class="${this.formatClasses()}"`;
    }

    if (this.hasId()) {
      opening = `${opening} id="${this.id}"`;
    }

    if (this.hasAttributes()) {
      opening = `${opening}${this.getFormattedHTMLAttributes()}`;
    }

    return `${opening}${closing}`;
  }

  private hasAttributes() {
    return Object.keys(this.attributes).length > 0;
  }

  private hasId() {
    return this.id !== null;
  }

  private hasClasses() {
    return this.classList.length > 0;
  }

  private formatClasses() {
    return this.classList.join(' ');
  }

  private getFormattedHTMLAttributes() {
    return Object.keys(this.attributes).reduce((acc, attribute) =>
      acc + ` ${attribute}="${this.attributes[attribute]}"`
    , '');
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

  public setAttribute(name: string, value: string) {
    this.attributes[name] = value;
  }

  public getAttribute(name: string) {
    if (!this.attributes[name]) {
      throw new Error(`Attribute ${name} does not exist`);
    }

    return this.attributes[name];
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
