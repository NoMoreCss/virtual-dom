import { Node } from "./node";
import { SelfClosingNode } from "./self_closing_node";

export class RootNode    extends Node { constructor() { super('html')    }}
export class DivNode     extends Node { constructor() { super('div')     }}
export class H1Node      extends Node { constructor() { super('h1')      }}
export class H2Node      extends Node { constructor() { super('h2')      }}
export class H3Node      extends Node { constructor() { super('h3')      }}
export class PNode       extends Node { constructor() { super('p')       }}
export class ArticleNode extends Node { constructor() { super('article') }}
export class SpanNode    extends Node { constructor() { super('span')    }}
export class ANode       extends Node { constructor() { super('a')       }}
export class ButtonNode  extends Node { constructor() { super('button')  }}
export class ScriptNode  extends Node { constructor() { super('script')  }}
export class StyleNode   extends Node { constructor() { super('style')   }}
export class HeadNode    extends Node { constructor() { super('head')    }}
export class FormNode    extends Node { constructor() { super('form')    }}

export class ImgNode     extends SelfClosingNode { constructor() { super('img')  }}
export class InputNode   extends SelfClosingNode { constructor() { super('input')}}
