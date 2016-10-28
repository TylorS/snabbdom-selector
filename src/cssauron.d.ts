declare module "cssauron" {
  type Language = {
    tag: (node: any) => string;
    class: (node: any) => string;
    id: (node: any) => string;
    children: (node: any) => any[];
    parent: (node: any) => any;
    contents: (node: any) => string;
    attr: (node: any, attr: string) => any;
  };

  type Matches = (node: any) => any;
  type Selector = (selector: string) => Matches;
  const createSelector: (language: Language) => Selector;

  export = createSelector;
}
