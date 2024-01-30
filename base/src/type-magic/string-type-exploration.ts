type StrHead<T extends string> = T extends `${infer U}${infer _}` ? U : never;
type TestStrHead = StrHead<"Hello">;

type StrTail<T extends string> = T extends `${infer _}${infer V}` ? V : never;
type TestStrTail = StrTail<"Hello">;

type StrReverse<T extends string> = T extends ""
  ? ""
  : `${StrReverse<StrTail<T>>}${StrHead<T>}`;
type TestStrReverse = StrReverse<"Hello">;

// str to array of chars
type StringToArray<T extends string> = T extends ""
  ? []
  : [StrHead<T>, ...StringToArray<StrTail<T>>];
type TestStringToArray = StringToArray<"Hello">;

// Array stuff
type ArrHead<T extends unknown[]> = T extends [infer U, ...unknown[]]
  ? U
  : never;

type ArrTail<T extends unknown[]> = T extends [unknown, ...infer V] ? V : never;

type ArrayToUnion<T extends unknown[]> = T extends []
  ? never
  : ArrHead<T> | ArrayToUnion<ArrTail<T>>;

type TestArrayToUnion = ArrayToUnion<StringToArray<"Hello">>;

type Curried<Fn extends (...args: any[]) => unknown> = Fn extends (
  ...args: infer Args
) => infer R
  ? Args extends []
    ? R
    : Args extends [infer V, ...infer Rest]
    ? (v: V) => Curried<(...args: Rest) => R>
    : never
  : never;

type TestCurried = Curried<(a: number, b: number) => number>;

type RemoveIf<T, V> = T extends V ? never : T;
type RemoveFromUnion<T, V> = T extends T ? RemoveIf<T, V> : never;

type TestRemoveFromUnion = RemoveFromUnion<1 | 2 | 3, 3>;

type IsUnion<T, U extends T = T> = (
  T extends any ? (U extends T ? true : false) : never
) extends true
  ? false
  : true;

type TestIsUnion = IsUnion<"okay" | "okay2">;

type TestExtends = string extends string | number ? "OK" : "BAD";

// type Equals<T, V> = T extends T
//   ? T extends V
//     ? V extends T
//       ? true
//       : false
//     : false
//   : false;

export type Equals<T, S> = [T] extends [S]
  ? [S] extends [T]
    ? true
    : false
  : false;

type EqualsTest1 = Equals<number, number>;
type EqualsTest2 = Equals<number | string, number>;
type EqualsTest3 = Equals<number, number | string>;

// type F<T> = T extends infer U | infer V ? U & F<V> : never;
// type TestF = F<"1" | 2 | 3>;

// type UnionToArray<T, U = []> = T extends infer U | infer V
//   ? V extends never
//     ? "bad"
//     : U
//   : never;

// type TestUnionToArray = UnionToArray<1 | 2 | 3>;

type User = {
  readonly id: string;
  readonly name: string;
};

type X = keyof User;

export {};
