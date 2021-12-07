
# Javascript Dom Helper Functions

### JavaScript functions to help facilitate DOM related tasks like querying or creating elements.  
These are the functions i created to help me in my personal projects. Feel free to point out mistakes, add to list or improve upone it.  

**Funcation Usage :**

**`$id(elemId:string)`**
> Shorthand for `document.getElementById`

---

**`$cls(elemClass:string)`**
> Shorthand for `document.getElementsByClassName`

---

**`$tag(elemTag:string)`**
> Shorthand for `document.getElementsByTagName`

---

**`$onDomLoad(callback)`**
> Function to run a piece of code when DOM loads.

---

**`$onDocumentReady(callback)`**
> Function to run a piece of code after document.ready event has fired.

---

**`$q(query,parent)`**
> **Arg types -**  `query : string`  `parent : string | elem`

> Shorthand for querySelector & querySelectorAll
> _Default value of **parent** : document_
> Returns : element | nodelist | null
- Prefix query argument with '@' to use querySelectorAll
> usage : **`$q('div')`**  **`$q('@div')`**

---

**`$qmulti(query,parent,arrayOne)`**
> **Arg types -**  `query : string`  `parent : string | elem`  `arrayOne : boolean`

> To fetch multiple elements with multiple queries
> _Default value of **parent** : document._ >_Default value of **arrayOne** : false._
> Returns : array | empty-array
- By default return array can contain both elements and nodelists. Assigning **arrayOne** as **true** will return array with only elements, nodelists are concataned with the return array.
> usage : **`$qmulti('div,span')`**  **`$qmulti('@div,span,@h2')`**  **`$qmulti('@div,@span',document,true)`**

---

**`$qtill(start,end,endPoints,textNodes)`**
> **Arg types -**  `start,end: elem|string`  `endPoints,textNodes: boolean`

> To fetch all elements from start element to end element within a single hierarchy.
> _Default value of **endPoints** : true._ >_Default value of **textNodes** : false._
> Returns : array | empty-array
-  _endPoints_ as false will not include start & end elements in the return array.
-  _textNodes_ as true will include textNodes in the return array.
> usage : **`$qtill('#child1','#child8','#parent')`**

---

**`$closest(tofind,origin,nest_level)`**
> **Arg types -**  `tofind: string`  `origin: element`  `nest_level: number`

> To get closest required element from origin irrespective of direct ancestory.
> _Default value of **nest_level** : undefined._
> Returns : element | null

- _nest_level_ indicates the depth of traversal.
> usage : **`$closest('h1',originElem)`**  **`$closest('div.container|span',originElem)`**

---

**`$wrap(to_wrap,wrap_in)`**
> **Arg types -**  `to_wrap: elem|array of elem`  `wrap_in: element|string`

> To wrap a element or a group of elements in a wrapper element.
> _Default value of **wrap_in** : div._
> Returns : element | null
> usage : **`$wrap([elem1,elem2],'section.wrapper')`**

---

**`$directTxt(elem)`**
> **Arg types -**  `elem: string|elem`

> To get direct text content of an element excluding its children.
> Returns : string
> usage : **`$directTxt('.container')`**

---

**`$newBlock(query)`**
> **Arg types -**  `query: string`

> To create DOM templates with ease.
> Returns : element | null

**usage : query examples**
-  `div>span` : returns div with span as child
-  `div>span+span` : returns div with 2 span elems as it's children
-  `div#test>{div>span+span}+div` : returns div of id test with 2 children, first one div with 2 span elem as its children and a second div.
- `div.class1+div.class2` : return two div's with respective classes inside a document fragment.
- `div+{div>span}`: return two div's inside a document fragment. 2nd div with span as its child.

---

### --Incomplete Documentation -Will complete as soon as i can .
