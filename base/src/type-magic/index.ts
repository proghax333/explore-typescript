type Expr<T> = T extends "" ? T : AddExpr<T>;

type AddExpr<T> = T extends `${infer U} + ${infer V}`
  ? AddExpr<U> extends never
    ? Factor<T>
    : Factor<V> extends never
    ? Factor<T>
    : {
        left: AddExpr<U>;
        right: Factor<V>;
      }
  : Factor<T>;

type Factor<T> = T extends `(${infer U})`
  ? Expr<U> extends never
    ? never
    : Expr<U>
  : T extends Plus<T, Letter>
  ? {
      value: T;
    }
  : Expr<T>;

// type Test = Expr<"a + (a + b) + b">;
type Test = Expr<"a + (b + c)">;

// type Inferer<T> = T extends `${infer U} + ${infer K}` ? [U, ...Inferer<K>] : [];

// type InfererTest = Inferer<"10 + (a + b) + b">;

type LowerCaseLetter =
  | "a"
  | "b"
  | "c"
  | "d"
  | "e"
  | "f"
  | "g"
  | "h"
  | "i"
  | "j"
  | "k"
  | "l"
  | "m"
  | "n"
  | "o"
  | "p"
  | "q"
  | "r"
  | "s"
  | "t"
  | "u"
  | "v"
  | "w"
  | "x"
  | "y"
  | "z";

type CapitalLetter = Capitalize<LowerCaseLetter>;

type Letter = LowerCaseLetter | CapitalLetter;

type Star<T, C extends string> = T extends ""
  ? ``
  : T extends `${infer U extends C}${infer X}`
  ? `${U}${Star<X, C>}`
  : never;

type Plus<T, C extends string> = T extends ""
  ? never
  : T extends `${infer U extends C}${infer X}`
  ? `${U}${Star<X, C>}`
  : never;

type Hello = Star<"Hello", Letter>;

type LengthTest = number;
