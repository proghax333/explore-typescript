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

// STRING MANIPULATION TOOLS
type First<T extends string> = T extends `${infer U}${string}` ? U : "";
type RemoveFirst<T extends string> = T extends `${string}${infer U}` ? U : "";

type Reverse<U extends string> = U extends ""
  ? ""
  : U extends "1" | "0"
  ? U
  : `${Reverse<RemoveFirst<U>>}${First<U>}`;

type Last<T extends string> = First<Reverse<T>>;
type RemoveLast<T extends string> = Reverse<RemoveFirst<Reverse<T>>>;

// TAPE DATA STRUCTURE
type Tape = { left: string; current: string; right: string };

// TRANSITIONS
type MoveLeft<T extends Tape> = {
  left: RemoveLast<T["left"]>;
  current: Last<T["left"]>;
  right: `${T["current"]}${T["right"]}`;
};

type MoveRight<T extends Tape> = {
  left: `${T["left"]}${T["current"]}`;
  current: First<T["right"]>;
  right: RemoveFirst<T["right"]>;
};

type Write<T extends Tape, Value extends Letter> = {
  left: T["left"];
  current: Value;
  right: T["right"];
};

// STATES
// program is 3 state busy beaver
// type StateA<T extends Tape> = T['current'] extends '1'
//   ? StateC<MoveLeft<T>>
//   : StateB<MoveRight<Write<T, '1'>>>

// type StateB<T extends Tape> = T['current'] extends '1'
//   ? StateB<MoveRight<T>>
//   : StateA<MoveLeft<Write<T, '1'>>>

// type StateC<T extends Tape> = T['current'] extends '1'
//   ? Halt<MoveRight<T>>
//   : StateB<MoveLeft<Write<T, '1'>>>

// Write all to 1
// type StateA<T extends Tape> = T['current'] extends ''
//   ? StateB<MoveRight<T>>
//   : StateA<MoveLeft<Write<T, "1">>>;

// type StateB<T extends Tape> = T['current'] extends ''
//   ? Halt<T>
//   : T['current'] extends '1'
//     ? StateB<MoveRight<T>>
//     : StateB<MoveRight<Write<T, "1">>>;

type Log<Message extends string, Extra = null, Status = "log"> = {
  status: Status;
  message: Message;
} & (Extra extends null ? {} : { extra: Extra });

type Q0<T extends Tape> = T["current"] extends "a"
  ? Q1<MoveRight<Write<T, "X">>>
  : T["current"] extends "Y"
  ? Q4<T>
  : Log<`Invalid character encountered: ${T["current"]} at Q0`, T>;

type Q1<T extends Tape> = T["current"] extends "b" | "a"
  ? Q1<MoveRight<T>>
  : T["current"] extends "B" | "Y"
  ? Q2<MoveLeft<T>>
  : Log<`Invalid character encountered: ${T["current"]} at Q1`, T>;

type Q2<T extends Tape> = T["current"] extends "b"
  ? Q3<MoveLeft<Write<T, "Y">>>
  : Log<`Invalid character encountered: ${T["current"]} at Q2`, T>;

// type Q3<T extends Tape> = T

type Q3<T extends Tape> = T["current"] extends "a" | "b"
  ? Q3<MoveLeft<T>>
  : T["current"] extends "X"
  ? Q0<MoveRight<T>>
  : Log<`Invalid character encountered: ${T["current"]} at Q2`, T>;
//   : T["current"] extends "X"
//     ? Q0<MoveRight<T>>
//   : "q3 problem";

type Q4<T extends Tape> = Halt<T>;

type Halt<T extends Tape> = `${T["left"]}${T["current"]}${T["right"]}`;
type Start = { left: "B"; current: "a"; right: "aabbbB" };

// RESULTS
type Result = Q0<Start>;
// type Result = "BXXXYYYB"

type SplitKeyValue<T extends string> = T extends `${infer U} = ${infer V}`
  ? { key: U; value: V }
  : T;

export {};
