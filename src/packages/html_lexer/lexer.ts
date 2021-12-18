import { Token, ClosingTagToken, OpeningTagToken, EOFToken, TextualElementToken} from "./token";

export class Lexer {
  private index: number = -1;

  constructor(private readonly contentToParse: string) {}

  public lex(): Token[] {
    const tokens: Token[] = [];

    if (this.contentToParse.length === 0) {
      return tokens;
    }

    try {
      while (true) {
        const token = this.nextToken();

        tokens.push(token);
      }
    } catch(e) {
      tokens.push(new EOFToken());
    }


    return tokens;
  }

  private nextToken(): Token {
    const char = this.next();

    if (char == '<') {
      return this.parseTag();
    }

    // Check if the next char is a character or a number
    if (char.match(/[a-zA-Z0-9]/)) {
      return new TextualElementToken(this.parseTextualToken(char));
    }

    throw new Error(`Invalid character: ${char}`);
  }

  private parseTextualToken(firstChar: string): string {
    let textContent = firstChar;

    while (true) {
      const nextChar = this.peek();
      if (nextChar.match(/[a-zA-Z0-9]/)) {
        textContent += this.next();
      } else {
        return textContent;
      }
    }
  }


  private parseTag(): Token {
    let tagContent = '';
    // Advance the cursor until we find the end of the tag or an />

    if (this.peek() === '/') {
      // Close tag
      return new ClosingTagToken(this.parseCloseTag());

    }

    while (true) {
      const char = this.next();
      tagContent += char;

      if (char === '>') {
        return new OpeningTagToken(tagContent.substring(0, tagContent.length - 1));
      }

      if (char === '/') {
        // We found an />, so it means that the tag is self-closing
        return new OpeningTagToken(
          tagContent.substring(0, tagContent.length - 2),
          { isSelfClosing: true }
        );
      }
    }
  }

  private parseCloseTag(): string {
    let tagContent = '';

    while (true) {
      const char = this.next();
      tagContent += char;

      if (char === '>') {
        return tagContent.substring(1, tagContent.length - 1);
      }
    }
  }

  private next(): string {
    if (this.index >= this.contentToParse.length - 1) {
      throw new Error('EOF');
    }

    this.index++;
    return this.contentToParse[this.index];
  }

  private peek() {
    return this.contentToParse[this.index + 1];
  }
}
