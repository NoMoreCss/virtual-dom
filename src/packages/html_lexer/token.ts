export enum Type {
  OPEN_TAG,
  CLOSE_TAG,
  TEXTUAL_ELEMENT,
  EOF
}

export class Token {
  constructor(
    public readonly type: Type,
    public readonly value: string
  ) {}
}

export class OpeningTagToken extends Token {
  constructor(value: string) {
    super(Type.OPEN_TAG, value);
  }
}

export class ClosingTagToken extends Token {
  constructor(value: string) {
    super(Type.CLOSE_TAG, value);
  }
}

export class EOFToken extends Token {
  constructor() {
    super(Type.EOF, '');
  }
}

export class TextualElementToken extends Token {
  constructor(value: string) {
    super(Type.TEXTUAL_ELEMENT, value);
  }
}
