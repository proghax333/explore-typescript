type ReplaceIf<
  T,
  Index,
  Target extends number,
  NewValue
> = Index extends `${Target}` ? NewValue : T;

type SetAtIndex<T, Target extends number, NewValue> = {
  [Property in keyof T]: ReplaceIf<T[Property], Property, Target, NewValue>;
};

type SetAtIndexTest = SetAtIndex<SetAtIndex<[1, 2, 3], 0, 1000>, 2, 2000>;

type Length<T extends unknown[]> = T["length"] extends infer Length
  ? Length
  : never;

type LengthTest = Length<[1, 2, 3, 4, 5, 6]>;

export {};
