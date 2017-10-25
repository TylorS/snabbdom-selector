declare var global: any;

let root: any;
if (typeof self !== 'undefined') {
  root = self;
} else if (typeof window !== 'undefined') {
  root = window;
} else if (typeof global !== 'undefined') {
  root = global;
} else {
  root = Function('return this')();
}

const Symbol = root.Symbol;

let parentSymbol: symbol;
if (typeof Symbol === 'function') {
  parentSymbol = Symbol('parent');
} else {
  parentSymbol = '@@snabbdom-selector-parent' as any;
}

export default parentSymbol;
