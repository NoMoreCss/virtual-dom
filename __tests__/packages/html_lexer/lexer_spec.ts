import { Lexer } from '../../../src/packages/html_lexer/lexer';

import {
  ClosingTagToken,
  EOFToken,
  OpeningTagToken,
  TextualElementToken
} from "../../../src/packages/html_lexer/token";

describe(Lexer, () => {
  describe('#lex', () => {
    it('should return an empty array of tokens if the given input is empty', () => {
      const lexer = new Lexer('');
      expect(lexer.lex()).toEqual([]);
    });

    it('should return an array containing all the elements', () => {
      const lexer = new Lexer('<html><div></div></html>');

      const tokens = lexer.lex();
      expect(tokens.length).toEqual(5);

      expect(tokens).toEqual([
        new OpeningTagToken('html'),
        new OpeningTagToken('div'),
        new ClosingTagToken('div'),
        new ClosingTagToken('html'),
        new EOFToken(),
      ]);
    });

    it('should be able to parse the classes of an element', () => {
      const lexer = new Lexer('<div class="test"></div>');

      const tokens = lexer.lex();
      expect(tokens.length).toEqual(3);

      expect(tokens).toEqual([
        new OpeningTagToken('div class="test"'),
        new ClosingTagToken('div'),
        new EOFToken(),
      ]);
    });

    it('should be able textual nodes', () => {
      const lexer = new Lexer('<div class="bla bla">Hello</div>');

      const tokens = lexer.lex();
      expect(tokens.length).toEqual(4);

      expect(tokens).toEqual([
        new OpeningTagToken('div class="bla bla"'),
        new TextualElementToken('Hello'),
        new ClosingTagToken('div'),
        new EOFToken(),
      ]);
    });
  });
});
