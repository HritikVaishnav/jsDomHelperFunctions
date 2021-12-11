# Javascript Dom Helper Functions

> JavaScript functions to help facilitate DOM related tasks like
> querying or creating elements.

These are the functions i created to help me in my personal projects. Feel free to point out mistakes, add to list or improve upone it.

**Function Usage :**

| Function Usage               |                                                                                          Shorthand                                                                                           |
|------------------------------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
| `$id(elemId:string)`         |                                                                                   document.getElementById                                                                                    |
| `$cls(elemClass:string)`     |                                                                               document.getElementsByClassName                                                                                |
| `$tag(elemTag:string)`       |                                                                                document.getElementsByTagName                                                                                 |
| `$onDomLoad(callback)`       |                                                                       Function to run a piece of code when DOM loads.                                                                        |
| `$onDocumentReady(callback)` |                                                            Function to run a piece of code after document.ready event has fired.                                                             |
| `$q(query,parent)`           |     **Arg types -** `query : string` `parent : string elem` Shorthand for querySelector & querySelectorAll _Default value of **parent** : document_ Returns : element , nodelist , null      |
| `$onDocumentReady(callback)` |                                                            Function to run a piece of code after document.ready event has fired.                                                             |
---

- Prefix query argument with '@' to use querySelectorAll

> usage : **`$q('div')`** **`$q('@div')`**

---

**`$qmulti(query,parent,arrayOne)`**

> **Arg types -** `query : string` `parent : string | elem` `arrayOne : boolean`
> To fetch multiple elements with multiple queries
> _Default value of **parent** : document._ >_Default value of **arrayOne** : false._
> Returns : array | empty-array

- By default return array can contain both elements and nodelists. Assigning **arrayOne** as **true** will return array with only elements, nodelists are concataned with the return array.

> usage : **`$qmulti('div,span')`** **`$qmulti('@div,span,@h2')`** **`$qmulti('@div,@span',document,true)`**

---

**`$qtill(start,end,endPoints,textNodes)`**

> **Arg types -** `start,end: elem|string` `endPoints,textNodes: boolean`
> To fetch all elements from start element to end element within a single hierarchy.
> _Default value of **endPoints** : true._ >_Default value of **textNodes** : false._
> Returns : array | empty-array

- _endPoints_ as false will not include start & end elements in the return array.
- _textNodes_ as true will include textNodes in the return array.

> usage : **`$qtill('#child1','#child8','#parent')`**

---

<mark> TODO </mark>: Incomplete Documentation -Will complete as soon as i can.
