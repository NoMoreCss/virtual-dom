import { OpeningTagToken } from "../../../src/packages/html_lexer/token";

describe(OpeningTagToken, () => {
  it('should be able to return the list of classes of a token', () => {
    const token = new OpeningTagToken('div class="test"');
    expect(token.getClasses()).toEqual(['test']);

    const token2 = new OpeningTagToken('div class="test test2"');
    expect(token2.getClasses()).toEqual(['test', 'test2']);

    const token3 = new OpeningTagToken('div');
    expect(token3.getClasses()).toEqual([]);

    const token4 = new OpeningTagToken('div class="test test2" class="test3"');

    // test3 should be ignored, since it is not the first class
    expect(token4.getClasses()).toEqual(['test', 'test2']);
  });
});
