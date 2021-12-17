import { Node } from "./node";
import { SelfClosingNode } from "./self_closing_node";

// TODO: Add all listed tags: https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element

export class RootNode    extends Node { constructor() { super('html')    }}
export class HeadNode    extends Node { constructor() { super('head')    }}
export class ScriptNode  extends Node { constructor() { super('script')  }}
export class StyleNode   extends Node { constructor() { super('style')   }}
export class TitleNode   extends Node { constructor() { super('title')   }}

export class HeaderNode  extends Node { constructor() { super('header')  }}
export class NavNode     extends Node { constructor() { super('nav')     }}
export class MainNode    extends Node { constructor() { super('main')    }}
export class FooterNode  extends Node { constructor() { super('footer')  }}
export class DivNode     extends Node { constructor() { super('div')     }}
export class ArticleNode extends Node { constructor() { super('article') }}
export class SpanNode    extends Node { constructor() { super('span')    }}
export class SectionNode extends Node { constructor() { super('section') }}
export class AsideNode   extends Node { constructor() { super('aside')   }}
export class AddressNode extends Node { constructor() { super('address') }}

export class H1Node      extends Node { constructor() { super('h1')      }}
export class H2Node      extends Node { constructor() { super('h2')      }}
export class H3Node      extends Node { constructor() { super('h3')      }}
export class H4Node      extends Node { constructor() { super('h4')      }}
export class H5Node      extends Node { constructor() { super('h5')      }}
export class H6Node      extends Node { constructor() { super('h6')      }}
export class PNode       extends Node { constructor() { super('p')       }}
export class ANode       extends Node { constructor() { super('a')       }}

export class ButtonNode  extends Node { constructor() { super('button')  }}
export class FormNode    extends Node { constructor() { super('form')    }}

export class UlNode      extends Node { constructor() { super('ul')      }}
export class LiNode      extends Node { constructor() { super('li')      }}
export class OlNode      extends Node { constructor() { super('ol')      }}


// Self closing nodes
export class ImgNode   extends SelfClosingNode { constructor() { super('img')   }}
export class InputNode extends SelfClosingNode { constructor() { super('input') }}
export class MetaNode  extends SelfClosingNode { constructor() { super('meta')  }}
export class LinkNode  extends SelfClosingNode { constructor() { super('link')  }}
export class BrNode    extends SelfClosingNode { constructor() { super('br')    }}
export class HrNode    extends SelfClosingNode { constructor() { super('hr')    }}

