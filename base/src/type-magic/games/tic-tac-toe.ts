type Cell = "X" | "O" | "-";

type X = "X";
type O = "O";
type Empty = "-";

type Grid = [[Cell, Cell, Cell], [Cell, Cell, Cell], [Cell, Cell, Cell]];

type Base = [
  [Empty, Empty, Empty],
  [Empty, Empty, Empty],
  [Empty, Empty, Empty]
];

type Indexify<T> = T extends unknown[]
  ? {
      [P in keyof T]: [P, Indexify<T[P]>];
    }
  : T;

type Head<T> = T extends [infer U, ...unknown[]] ? U : never;
type Tail<T> = T extends [unknown, ...infer Rest] ? Rest : [];

type HeadTest = Head<[1, 2, 3]>;
type TailTest = Tail<[1, 2, 3]>;

type BaseWithIndex = Indexify<Base>;

type SetAt<T, Index, NewValue> = T extends []
  ? []
  : Head<T> extends [Index, unknown]
  ? [["Okokok", NewValue], ...SetAt<Tail<T>, Index, NewValue>]
  : [Head<T>, ...SetAt<Tail<T>, Index, NewValue>];

type SetAtTest = SetAt<[["0", 100], ["1", 200]], "0", 1234>;

type TupleKeyAt<T, Index> = Index extends keyof T ? Index : never;

type TupleKeyAtTest = TupleKeyAt<[1, 2, 3], 30>;

type At<T, Index> = T extends []
  ? never
  : Head<T> extends [Index, infer Value]
  ? Value
  : At<Tail<T>, Index>;

type AtTest = At<At<BaseWithIndex, "0">, "0">;

// type WithIndex<T> = {
//   [P in keyof T]: [P, T[P]];
// };

type BaseTest = Base extends Grid ? true : false;

type Last<T> = T extends [...infer _, infer V] ? V : never;

type LastTest = Last<[1, 2, 3]>;

type IndexedBase<Type> = {
  [Property in keyof Type]: any;
};

type TestIndexedBase = keyof IndexedBase<Base>;

type SetMove<Board extends Grid, X, Y, Cell> = X extends string
  ? Y extends string
    ? keyof IndexedBase<Board>
    : never
  : never;

type SetMoveTest = SetMove<Base, "0", "0", X>;

export {};
