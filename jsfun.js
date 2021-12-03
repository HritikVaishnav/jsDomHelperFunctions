function $onDomLoad(callback) {
  if (document.readyState !== "loading") callback();
  else window.addEventListener("DOMContentLoaded", callback);
}
function $onDocumentReady(callback) {
  if (document.readyState === "complete") callback();
  else {
    document.addEventListener("readystatechange", function () {
      if (document.readyState === "complete") {
        callback();
      }
    });
  }
}
function $id(e) {
  return document.getElementById(e);
}
function $cls(e) {
  return document.getElementsByClassName(e);
}
function $tag(e) {
  return document.getElementsByTagName(e);
}
function $q(query, parent) {
  parent ? null : (parent = document);
  if (query[0] === "@") {
    let temp = query.substr(1);
    return parent.querySelectorAll(temp);
  } else {
    return parent.querySelector(query);
  }
}
function $qmulti(query, parent, oneArray) {
  let queries = query.split(",");
  let list = [];
  for (let i = 0; i < queries.length; i++) {
    let elements = this.$q(queries[i], parent);
    if (elements) {
      if (elements.length === undefined) list.push(elements);
      else
        elements[0]
          ? oneArray
            ? (list = list.concat(Array.from(elements)))
            : list.push(elements)
          : null;
    }
  }
  return list;
}
function $qtill(start, end, endPoints = true, textNodes = false) {
  if (!start || !end) return console.error("argument missing");

  let list = [];
  let parsedObj;
  $isElem(start) ? null : (start = $q(start));
  $isElem(end) ? null : (parsedObj = $parseElem(end));
  let current = start;
  endPoints ? list.push(start) : null;
  while (!list.complete) {
    current = textNodes ? current.nextSibling : current.nextElementSibling;
    if (current === null) list.complete = true;
    else {
      if (checkWithEnd(current)) {
        endPoints ? list.push(current) : null;
        list.complete = true;
      } else list.push(current);
    }
  }
  return list; //function output

  function checkWithEnd(elem) {
    if (!$isElem(elem)) return false;
    if (!parsedObj) {
      if (elem === end) return true;
    } else {
      return $checkElemWithParsedElem(elem, parsedObj);
    }
  }
}
function $closest(tofind, origin, nest_level) {
  let nest_counter = 0;
  let inputs = $parseElem(tofind);
  inputs.array = tofind.split("|");
  return find(origin);

  function find(origin) {
    let temp;
    if (nest_counter) {
      temp = checkElem(origin);
      if (!temp) {
        temp = checkAdjacent(origin);
        if (temp) return temp;
      } else return temp;
    } else {
      temp = checkAdjacent(origin);
      if (temp) return temp;
    }

    temp = origin.parentElement;
    if (temp && nest_counter < nest_level) {
      nest_counter++;
      return find(temp);
    } else return null;
  }
  function checkAdjacent(origin) {
    let e = check(origin) || check(origin, true);
    return e;

    function check(origin, searchDown) {
      let sibling = searchDown
        ? origin.nextElementSibling
        : origin.previousElementSibling;
      if (sibling) {
        if (checkElem(sibling)) return sibling;
        else {
          let temp = sibling.querySelectorAll(inputs.array);
          if (temp[0]) {
            if (searchDown) return temp[0];
            else return temp[temp.length - 1];
          } else return check(sibling, searchDown);
        }
      } else {
        return false;
      }
    }
  }
  function checkElem(elem) {
    return $checkElemWithParsedElem(elem, inputs);
  }
}
function $wrap(to_wrap, wrap_in) {
  if (to_wrap) {
    let wrapper;
    if (wrap_in) {
      wrapper = $isElem(wrap_in) ? wrap_in : $newElem(wrap_in);
    } else {
      wrapper = $newElem("div");
    }
    if (to_wrap[0]) {
      $for(to_wrap, function (elem) {
        elem ? wrapper.appendChild(elem) : null;
      });
    } else {
      wrapper.appendChild(to_wrap);
    }
    return wrapper;
  } else {
    return null;
  }
}
function $directTxt(elem) {
  return Array.prototype.reduce.call(
    elem.childNodes,
    function (a, b) {
      return a + (b.nodeType === 3 ? b.textContent.trim() : "");
    },
    ""
  );
}
function $findBracketPairs(str, openBracket, closeBracket) {
  var open = [];
  var pairs = [];
  for (var i = 0; i < str.length; i++) {
    if (str[i] === openBracket) open.push(i);
    else if (open.length > 0) {
      if (str[i] === closeBracket) {
        var a = open.pop();
        pairs.push([a, i]);
      }
    }
  }
  return pairs;
}
function $newBlock(query) {
  let codeBlocks = [];
  let bracketBlocks = $findBracketPairs(query, "{", "}");
  $for(bracketBlocks, function (pair, index) {
    console.log(query);
    let code = query.substring(pair[0], pair[1] + 1);
    let codeId = "~" + index;
    query = query.replace(
      code,
      codeId + "_".repeat(code.length - codeId.length)
    );
    codeBlocks.push(code.slice(1, -1));
  });
  return createBlock(query);

  function createBlock(input) {
    let tree = new DocumentFragment();
    let current = tree;
    let rootLevel = input.split(">");
    $for(rootLevel, function (str) {
      if (str.indexOf("+") > -1) {
        str.split("+").every(function (e) {
          let elem = createElem(e);
          current.appendChild(elem);
          return true;
        });
      } else {
        let elem = createElem(str);
        current.appendChild(elem);
        current = elem;
      }
    });
    return tree;
  }
  function createElem(query) {
    let elem = null;
    if (query[0] === "~") {
      let index = parseInt(query.substr(1, 2));
      elem = createBlock(codeBlocks[index]);
    } else {
      elem = $newElem(query);
    }
    return elem;
  }
}
function $cloneAndReplace(elem, deepClone = true) {
  if ($type(elem, "array")) {
    let clones = [];
    $for(elem, function (e) {
      clones.push(cr_logic(e));
    });
    return clones;
  } else return cr_logic(elem);

  function cr_logic(item) {
    let clone = item.cloneNode(deepClone);
    item.parentNode.replaceChild(clone, item);
    return clone;
  }
}
function $addChildren(elems, parent) {
  if (!elems || !parent) return console.error("arguments missing or invalid");
  let fragment = new DocumentFragment();
  $for(elems, function (elem) {
    if (elem) {
      switch ($type(elem)) {
        case "array":
          $addChildren(elem, fragment);
          break;
        case "string":
          fragment.appendChild(document.createTextNode(elem));
          break;
        default:
          if (elem.nodeType) fragment.appendChild(elem);
          break;
      }
    }
  });
  parent.appendChild(fragment);
}
function $cs(props, elem, pseudoElem = null) {
  let output = [];
  let computedStyles = window.getComputedStyle(elem, pseudoElem);
  props = props.split(",");
  $for(props, function (prop) {
    let value;
    if (prop[0] === "@") {
      value = computedStyles.getPropertyValue(prop.slice(1));
      let temp = $parseNum(value, true);
      if (temp !== null) {
        value = temp;
      }
    } else {
      value = computedStyles.getPropertyValue(prop);
    }
    output.push(value);
  });
  return output.length < 2 ? output[0] : output;
}
function $style(css, elem) {
  css = css.split(",");
  let prop, value;
  css.every(function (style) {
    style = style.split(":");
    prop = style[0];
    value = style[1];
    if (value[0] === "!") {
      elem.style.setProperty(prop, value.substr(1), "important");
    } else {
      elem.style.setProperty(prop, value);
    }
    return true;
  });
}
function $addCssRule(rule, options = {}) {
  if (!options.sheet) {
    let sheets = document.styleSheets;
    options.sheet = sheets[sheets.length - 1];
  }
  options.sheet.insertRule(
    rule,
    options.index || options.sheet.cssRules.length
  );
}
function $removeCssRule({ rule, selector, index, sheet }) {
  let sheets = document.styleSheets;
  switch ($type(sheet)) {
    case "string":
      $for(sheets, function (s) {
        rmFromSheet(s);
      });
      break;
    case "cssstylesheet":
      rmFromSheet(sheet);
      break;

    default:
      let lastSheet = sheets[sheets.length - 1];
      rmFromSheet(lastSheet);
      break;
  }
  function rmFromSheet(sheet) {
    if (index) {
      if (typeof index === "number") sheet.deleteRule(index);
    } else if (selector) {
      $for(sheet.cssRules, function (r, i) {
        if (r.selectorText === selector) {
          sheet.deleteRule(i);
          return true;
        }
      });
    } else if (rule) {
      rule = getCssTxtFormat(rule);
      $for(sheet.cssRules, function (r, i) {
        if (r.cssText === rule) {
          sheet.deleteRule(i);
          return true;
        }
      });
    }
  }
  function getCssTxtFormat(rule) {
    let disabledSheet =
      $id("tempDisabledSheet") || $newElem("style#tempDisabledSheet");
    if (!disabledSheet.sheet) {
      document.body.appendChild(disabledSheet);
      disabledSheet.disabled = true;
    }
    disabledSheet.appendChild(document.createTextNode(rule));
    let formatedTxt = disabledSheet.sheet.cssRules[0].cssText;
    disabledSheet.innerText = "";
    return formatedTxt;
  }
}
function $parseNum(string, float = false) {
  let strNums = string.match(/\d*\.?\d+/g);
  if (!strNums) return null;
  let nums = [];
  if (float) {
    $for(strNums, function (num) {
      nums.push(parseFloat(num));
    });
  } else {
    $for(strNums, function (num) {
      nums.push(parseInt(num));
    });
  }
  return isNaN(nums[1]) ? nums[0] : nums;
}
class $mObserver {
  constructor(attr, child, subtree) {
    let rthis = this;
    this.todo = [];
    this.callback = function (mutationsList) {
      for (let i = 0; i < mutationsList.length; i++) {
        let key = mutationsList[i].target.mocall;
        if (key) {
          rthis.todo[key](mutationsList[i]);
        } else {
          console.log(mutationsList[i]);
        }
      }
    };
    this.mutaion = new MutationObserver(this.callback);
    this.config = {
      attributes: attr || true,
      childList: child || true,
      subtree: subtree || true,
    };
  }

  startObserving(elem, callback) {
    if (callback) {
      if (elem.mocall) {
        this.todo[elem.mocall] = callback;
      } else {
        elem.mocall = this.todo.length + "";
        this.todo.push(callback);
      }
    }
    this.mutaion.observe(elem, this.config);
    console.log("observing mutations");
  }
  stopObserving() {
    this.mutaion.disconnect();
    console.log("observer disconnected");
  }
}
class $iObserver {
  constructor(options) {
    let rthis = this;
    this.options = options || { root: null, threshold: 0.25 };
    this.todo = [];
    this.callback = function (entries) {
      $for(entries, function (entry) {
        let key = entry.target.iocall;
        if (key) {
          rthis.todo[key](entry);
        } else {
          console.log(entry);
        }
      });
    };
    this.observer = new IntersectionObserver(this.callback, this.options);
  }

  startObserving(elem, callback) {
    if (callback) {
      if (elem.iocall) {
        this.todo[elem.iocall] = callback;
      } else {
        elem.iocall = this.todo.length + "";
        this.todo.push(callback);
      }
    }
    this.observer.observe(elem);
  }
  stopObserving(elem) {
    this.observer.unobserve(elem);
  }
}
function $scrolltoElem(elem) {
  if (elem) {
    $isElem(elem) ? null : (elem = $q(elem));
    var boundings = elem.getBoundingClientRect();
    window.scrollTo({
      top: window.pageYOffset + boundings.top - 80,
      behavior: "smooth",
    });
  }
}
function $switchPositions(elem1, elem2) {
  if (!elem1 || !elem2) return console.error("invalid or missing argument");
  let reference =
    checkTruthy(["afterEnd", elem1.previousElementSibling]) ||
    checkTruthy(["beforeBegin", elem1.nextElementSibling]) ||
    checkTruthy(["afterBegin", elem1.parentElement]);
  elem2.insertAdjacentElement("afterEnd", elem1);
  reference[1].insertAdjacentElement(reference[0], elem2);

  function checkTruthy(array) {
    if (array[1]) return array;
    return false;
  }
}
function $for(array, callback) {
  for (let i = 0; i < array.length; i++) {
    let _return = callback(array[i], i);
    if (_return !== undefined) return _return;
  }
}
function $type(obj, checkType) {
  let type = obj ? obj.constructor.name.toLowerCase() : typeof obj;
  if (checkType) {
    if (type === checkType) return true;
    return false;
  }
  return type;
}
function $isElem(obj) {
  if (obj && obj.nodeType === Node.ELEMENT_NODE) return true;
  return false;
}
function $parseElem(query) {
  if (!query || $type(query) !== "string")
    return console.error("invalid or missing argument");

  query = query.split(/[,|]/);
  let output = [];
  for (let i = 0; i < query.length; i++) {
    let parseOutput = parse(query[i]);
    parseOutput ? output.push(parseOutput) : null;
  }
  return output;

  function parse(string) {
    let elem = {};
    let elemProps = string.match(/^\w+|([#.]|@[ap]\[).*?(?=@[ap]\[|\.|#|$)/g);
    if (!elemProps) return null;
    for (let i = 0; i < elemProps.length; i++) {
      switch (elemProps[i][0]) {
        case "#":
          elem.id = elemProps[i].substr(1);
          break;
        case ".":
          let cls = elemProps[i].substr(1);
          elem.class ? elem.class.push(cls) : (elem.class = [cls]);
          break;
        case "@":
          let toSet = elemProps[i].slice(3, -1).split("=");
          if (elemProps[i][1] === "a") {
            elem.attribute
              ? elem.attribute.push(toSet)
              : (elem.attribute = [toSet]);
          } else {
            elem.property
              ? elem.property.push(toSet)
              : (elem.property = [toSet]);
          }
          break;

        default:
          elem.tag = elemProps[i];
          break;
      }
    }
    return elem;
  }
}
function $checkElemWithParsedElem(elem, parsedObjs) {
  if (!$isElem(elem) || !$type(parsedObjs, "array"))
    return console.error("invalid or missing arguments");
  elemProps = {
    tag: elem.tagName.toLowerCase(),
    cls: elem.className.split(" "),
    id: elem.id,
    attr: elem.attributes,
  };
  let returnFlag = parsedObjs.some(function (obj) {
    let keys = Object.keys(obj);
    return keys.every(function (key) {
      switch (key) {
        case "tag":
          if (elemProps.tag === obj.tag) return true;
          break;
        case "id":
          if (elemProps.id === obj.id) return true;
          break;
        case "class":
          if (elemProps.cls.length >= obj.class.length) {
            return obj.class.every(function (c) {
              if (elemProps.cls.indexOf(c) > -1) return true;
            });
          }
          break;
        case "attribute":
          if (elemProps.attr.length >= obj.attribute.length) {
            return obj.attribute.every(function (attr) {
              if (elemProps.attr[attr[0]].value === attr[1]) return true;
            });
          }
          break;

        default:
          break;
      }
    });
  });

  if (returnFlag) return elem;
  return false;
}
function $newElem(query, callback) {
  if (!query || !$type(query, "string"))
    return console.error("invalid or missing argument");

  let input = $parseElem(query)[0];
  let elem = document.createElement(input.tag || "div");
  elem.id = input.id || "";
  elem.className = input.class ? input.class.join(" ") : "";
  elem.innerText = input.innerText || "";
  if ((attr = input.attribute)) {
    $for(attr, function (a) {
      elem.setAttribute(a[0], a[1]);
    });
  }
  if ((prop = input.property)) {
    $for(prop, function (a) {
      elem[a[0]] = a[1];
    });
  }
  if (callback) return callback(elem);
  return elem;
}
function $makeStr(length, characters) {
  let result = "";
  let chars =
    characters ||
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let charactersLength = chars.length;
  if (charactersLength === 1) {
    result += chars[0].repeat(length);
  } else {
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * charactersLength));
    }
  }
  return result;
}
function $arraySplit(array, seperator) {
  let output = [];
  let temp = [];
  $for(array, function (item) {
    if (item === seperator) {
      output.push(temp);
      temp = [];
    } else {
      temp.push(item);
    }
  });
  if (temp[0]) output.push(temp);
  return output;
}
function $arraySum(array) {
  let sum = 0;
  $for(array, function (item) {
    if (typeof item === "number") sum += item;
  });
  return sum;
}
function $newFragment(children) {
  let frag = new DocumentFragment();
  if (children) {
    $for(children, function (child) {
      if (child) frag.appendChild(child);
    });
  }
  return frag;
}
function $checkOverflow(elem) {
  let csHeight = $cs("@height,@padding-top,@padding-bottom", elem);
  let scrHeight = elem.scrollHeight;
  if (scrHeight > $arraySum(csHeight)) return true;
  else return false;
}
// end
