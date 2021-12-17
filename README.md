# Javascript Dom Helper Functions

### JavaScript functions to help facilitate DOM related tasks like querying or creating elements.
These are the functions I created to help me in my personal projects. Feel free to point out mistakes, add to list or improve upone it.

  

**Funcation Usage :**
**`$id(elemId:string)`**
- Shorthand for `document.getElementById`
---
**`$cls(elemClass:string)`**
- Shorthand for `document.getElementsByClassName`
---
**`$tag(elemTag:string)`**
- Shorthand for `document.getElementsByTagName`
---
**`$onDomLoad(callback)`**
- Function to run a piece of code when DOM loads.
---
**`$onDocumentReady(callback)`**
- Function to run a piece of code after document.ready event has fired.
---
**`$q(query,parent)`**
> **Arg types -**  `query : string`  `parent : string | elem`
- Shorthand for querySelector & querySelectorAll
- _Default value of **parent** : document_
- Returns : element | nodelist | null
- Prefix query argument with '@' to use querySelectorAll

**usage :** 
> **`$q('div')`**  **`$q('@div')`**
---  
**`$qmulti(query,parent,arrayOne)`**
> **Arg types -**  `query : string`  `parent : string | elem`  `arrayOne : boolean`
- To fetch multiple elements with multiple queries
- _Default value of **parent** : document._ >_Default value of **arrayOne** : false._
- Returns : array | empty-array
- By default return array can contain both elements and nodelists. Assigning **arrayOne** as **true** will return array with only elements, nodelists are concataned with the return array.

**usage :** 
> **`$qmulti('div,span')`**  **`$qmulti('@div,span,@h2')`**  **`$qmulti('@div,@span',document,true)`**
---
**`$qtill(start,end,endPoints,textNodes)`**
> **Arg types -**  `start,end: elem|string`  `endPoints,textNodes: boolean`
- To fetch all elements from start element to end element within a single hierarchy.
- _Default value of **endPoints** : true._ >_Default value of **textNodes** : false._
- Returns : array | empty-array
-  _endPoints_ as false will not include start & end elements in the return array.
-  _textNodes_ as true will include textNodes in the return array.

**usage :** 
>**`$qtill('#child1','#child8','#parent')`**

---  
**`$closest(tofind,origin,nest_level)`**
> **Arg types -**  `tofind: string`  `origin: element`  `nest_level: number`
- To get closest required element from origin irrespective of direct ancestory.
- _Default value of **nest_level** : undefined._
- Returns : element | null
- _nest_level_ indicates the depth of traversal.

**usage :**  
>**`$closest('h1',originElem)`** **`$closest('div.container|span',originElem)`**

---
**`$wrap(to_wrap,wrap_in)`**
> **Arg types -**  `to_wrap: elem|array of elem`  `wrap_in: element|string`
- To wrap a element or a group of elements in a wrapper element.
- _Default value of **wrap_in** : div._
- Returns : element | null

**usage :** 
>**`$wrap([elem1,elem2],'section.wrapper')`**

---
**`$directTxt(elem)`**
> **Arg types -**  `elem: string|elem`
- To get direct text content of an element excluding its children.
- Returns : string

**usage :** 
>**`$directTxt('.container')`**

---
**`$newElem(query, callback)`**
> **Arg types -**  `query: string`  `callback: function`
- To facilitate easily creation of DOM elements using string input.
- Callback can be used do something after the creation of element.
- Callback has a default argument `e` which is the element created.
- Returns : element

**Constructing string input :**
-  `div#test` returns a ***div*** with ***id = "test".***
-  `div.test` returns a ***div*** with ***class = "test".***
-  `div#test.test` returns a ***div*** with ***id = "test" & class="test".***
-  `div@a[data-test=dummyData]` returns a ***div*** with *attribute **data-test = dummyData***.
-  `div@p[innerText=dummyData]` returns a ***div*** with ***inner-text set to dummyData***.
- Id is prefixed with `#`
- Class is prefixed with `.`
- Attributes can be set with prefix `@a` with attribute and its value inside squred brackets `[]` in the given format : `attributeName:value`
- Properties can be set with prefix `@p` with property and its value inside squred brackets `[]` in the given format : `propertyName:value`

**usage :**  
>**`$newElem('div.class1#id@a[style=color{red}]')`**

---
**`$newBlock(query)`**
> **Arg types -**  `query: string`
- To create DOM templates with ease.
- Returns : Document Fragment | null

**usage : query examples**
-  `div>span` : returns div with span as child
-  `div>span+span` : returns div with 2 span elems as it's children
-  `div#test>{div>span+span}+div` : returns div of id test with 2 children, first one div with 2 span elem as its children and a second div.
-  `div.class1+div.class2` : return two div's with respective classes inside a document fragment.
-  `div+{div>span}`: return two div's inside a document fragment. 2nd div has span as its child.

---
**`$cloneAndReplace(elem, deepClone)`**
> **Arg types -**  `elem: array|elem`  `deepClone: boolean`
- To clone and replace an element for specific usecases like deattatching event listeners.
- _Default value of **deepClone** : true._
- Returns : elem | clones

**usage :**  
>**`$cloneAndReplace([elem1,elem2])`**

---
**`$addChildren(elems, parent)`**
> **Arg types -**  `elems: array of nodes`  `parent: elem`
- To add child nodes array to a parent.
- Returns : undefined

**usage :** 
>**`$addChildren([elem1,elem2,'txt'],parentElem)`**

---
**`$cs(props, elem, pseudoElem)`**
> **Arg types -**  `props: string`  `elem: elem`  `pseudoElem: string`
- _Default value of **pseudoElem** : null._
- _Values of **pseudoElem** : `after`  `before`._
- prefixing prop with `@` returns the value after number parsing.
- To fetch computed styles of an element.
- Returns : Array

**usage :** 
>**`$cs('@width,@height',elem1)`**  **`$cs('color,@padding',elem2)`**

---
**`$style(css, elem)`**
> **Arg types -**  `css: string`  `elem: elem`
- To set style of an element.
- Prefixing the property value with `!` set's it with important flag.
- Returns : undefined

**usage :** 
> **`$style('color:red,font-size:2em',elem1)`**  **`$style('color:!black')`**

---
**`$addCssRule(rule, {index,sheet}:options)`**
> **Arg types -**  `rule: string`  `index: number`  `sheet: stylesheet`
- _Default value of **options** : {}._
- To set a css rules. By default rule is added to the stylesheet of highest proprity.
- Returns : Undefined

**usage :**  
>**`$addCssRule('#id{color:white; background:black}')`**

---
**`$removeCssRule({ rule, selector, index, sheet })`**
> **Arg types -**  `rule, selector: string`  `index: number`  `sheet: stylesheet`
- _rule, selector, index : only one of the parameters required_
- _stylesheet : parameter required_
- To delete a css rule from a specific stylesheet. The rule can be removed by one of the three options.
	- By rule : example : `body { color : black }`  `.class { font-size : 2em }`
	- By css selectors : `#id`  `.class.class2`  `div>span`
	- By index : Index of the rule in stylesheet.
- Returns : Undefined

**usage :** 
>**`$removeCssRule( { rule:'body{overflow:hidden}', sheet:styleElem } )`**  **`$removeCssRule( { selector:'no_overflow', sheet:styleElem } )`**

---
**`$parseNum(string, ?float)`**
> **Arg types -**  `string: string`  `float: boolean`
> _Default value of **float** : false._
- To parse numbers or array or numbers from a string.
- By default float numbers are not parsed.
- Returns : number | array of numbers

**usage :** 
>**`$parseNum("str 123 124 125.5 str end") : returns array[123,124]`**
>**`$parseNum("str 123 124 125.5 str end",true) : returns array[123,124,125.5]`**

---
**`Class : $mObserver(attr, child, subtree)`**
> **Arg types -**  `attr,child,subtree: boolean`
- _Default value of **attr, child, subtree** : true._
- To use mutation ovserver in an easier way. It constructs an object of mutation observer with specified options. That object then can be used to observe elements with their respective callback functions.
- Returns : $mObserver Object
- $mObserver has two methods **startObserving** & **stopObserving**, both returns undefined.
- syntax of methods : `startObserving(elem,callback)`  `stopObserving()`
- Allows to observer multiple elements with respective callback functions.
- stopObserving method stops observing all elements.

**usage :**

    let observer = new $mObserver()
    observer.startObserving(elem1,function(mutation){console.log(mutation)})
    observer.startObserving(elem2,function(mutation){//logic here})
    observer.stopObserving()

---
**`Class : $iObserver({}:options)`**
> **Arg types -**  `options: object`
- ***options** : Options of native intersection observer .*
- _Default value of **options** : { root: null, threshold: 0.25 }._
- To use intersection observer in an easier faster way. It constructs an object of intersection observer with specified options. That object then can be used to observe elements with their respective callback functions.
- Returns : $iObserver Object
- $mObserver has two methods **startObserving** & **stopObserving**, both returns undefined.
- syntax of methods : `startObserving(elem,callback)`  `stopObserving(elem)`
- Allows to observer multiple elements with respective callback functions.

**usage :**

	let observer = new $iObserver();
	observer.startObserving(elem1,function(entry){console.log(entry)});
	observer.startObserving(elem2,function(entry){//logic here});
	observer.stopObserving(elem1);
	observer.stopObserving(elem2);

---
**`$scrolltoElem(elem)`**
> **Arg types -**  `elem: elem|string`
- To scroll to an element in the viewport.
- Returns : undefined

**usage :**  
>**`$scrolltoElem('#id')`**  **`$scrolltoElem('.class')`**

---
**`$switchPositions(elem1, elem2)`**
> **Arg types -**  `elem1,elem2: elem`
- To switch positions of two element in the viewport.
- Returns : undefined

**usage :** 
>**`$switchPositions(elem1, elem2)`**

---
**`$type(obj, ?checkType)`**
> **Arg types -**  `obj: anything`  `checkType: string-lowercase`
- To get or check the constructor name of any object.
- *checkType is optional, can be used to find if the object is of certain type. Using checkType will make function return a boolean*
- Returns : string | bloolean

  

**usage :**
> **`$type(div) : return 'htmldivelement'`**
> **`$type([],'array') : return true`**

---
**`$isElem(obj)`**
> **Arg types -**  `obj: anything`
- To check if an object is a DOM Element of type 1.
- Returns : boolean

**usage :**  
>**`$isElem(textNode) : return false`**

---
**`$checkOverflow(elem)`**
> **Arg types -**  `elem: elem`
- To check if element's scroll height is higher than its offset height.
- Returns : boolean

**usage :** 
>**`$checkOverflow(elem1)`**

---
**`$newFragment(children)`**
> **Arg types -**  `children: array`
- To make it easier and faster to use fragments.
- *children: array of elements to append to fragment*.
- Returns : document-fragment

**usage :**  
>**`$newFragment([elem1,elem2])`**

---
**`$makeStr(length, ?characters)`**
> **Arg types -**  `length: number`  `characters: string`
- To make a random string of specified length.
- Characters argument is optional and can be used construct a string using specific set of characters.
- _Default value of **characters** : All alphabets and numbers._
- Returns : string

**usage :**  
>**`$makeStr(5)`**  **`$makeStr(5,'ac') : returns somethig like 'accac'`**

---
**`$arraySplit(array, seperator)`**
> **Arg types -**  `array: array`  `seperator: array item`
- Similar to string.split but for array.
- Returns : array of array's

**usage :**  
>**`$arraySplit([a,b,c,d,e],c) : return [[a,b],[d,e]]`**

---