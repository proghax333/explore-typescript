// import { Box } from "./box";

function fn(x: string): string;
function fn(x: boolean): string;
function fn(x: string | boolean) {
  return "okay";
}

interface Box<T> {
  thing: number;
}
const t = Math.random() > 0.5 ? "hello" : [0];

type X = {
  thing: number;
  okay: string;

  aos: string;
  asdas: string;

  aoa: string;
};

interface Y {
  thing: number;
  okey: string;

  dokey: string;

  haha: string;
  baba: string;
}

interface Y {
  okey: string;
}

type TX = {
  okey: string;
};

type TY = {
  okey: number;
};

type TXTY = TX & TY;

type Either2dOr3d = [number, number, number?, number?];

function setCoordinate(coord: Either2dOr3d) {
  const [x, y, z] = coord;

  console.log(`Provided coordinates had ${coord.length} dimensions`);
}
// GIVES `never`
// const x: TXTY = {
//   okey: 100,
// }
interface GenericIdentityFn<Type> {
  (arg: Type): Type;
}

function identity<Type>(arg: Type): Type {
  return arg;
}

let myIdentity: GenericIdentityFn<unknown> = identity;

function runIdentity<T>(id: GenericIdentityFn<T>, x: T) {
  return id(x);
}

const result = runIdentity(myIdentity, 100);

class Animal {}

class Cat extends Animal {}

class Dog extends Animal {}

function show<T extends Animal>(items: T[]) {
  for (const item of items) {
    console.log(item);
  }
}

show([new Cat(), new Cat(), new Dog(), new Cat()]);

interface Container<T, U> {
  x: [T, U];
}

interface Container<T, U = HTMLDivElement, W = never> {}

declare function create<T extends HTMLElement = HTMLDivElement, U = T[]>(
  element?: T,
  children?: U
): Container<T, U>;

// const div = create();

// const p = create(new HTMLParagraphElement());

type nop = () => void;

type ReturnTypeMy<Type> = Type extends (...args: any[]) => infer R ? R : never;

type RetNop = ReturnTypeMy<nop>;

const myArray = [
  { name: "Alice", age: 15 },
  { name: "Bob", age: 23 },
  { name: "Eve", age: 38 },
];

// type Person = typeof myArray[2];

interface IdLabel {
  id: number /* some fields */;
}
interface NameLabel {
  name: string /* other fields */;
}

function createLabel(id: number): IdLabel;
function createLabel(name: string): NameLabel;
function createLabel(nameOrId: string | number): IdLabel | NameLabel {
  throw "unimplemented";
}

type OptionsFlags<Type> = {
  [P in keyof Type]: boolean;
};

interface Duck {
  quack: () => void;
  swim: () => void;
}

type Maybe<Type> = {
  [P in keyof Type]+?: Type[P];
};

type MaybeDuck = Maybe<Duck>;

type Getters<Type> = {
  [Property in keyof Type as `get${Capitalize<
    string & Property
  >}`]: () => Type[Property];
};

type Setters<Type> = {
  [Property in keyof Type as `set${Capitalize<Property & string>}`]: (
    value: Type[Property]
  ) => void;
};

interface Person {
  name: string;
  age: number;
  location: string;
}

type X22 = {
  hello: number;
};

type LazyPerson = Getters<Person> & Setters<Person>;
let person: LazyPerson;

type TestKeys = keyof String;

type MyExclude<Type, Field> = Field extends Type ? never : Type;

type RemoveField<Type, Field extends keyof Type> = {
  [Property in keyof Type as MyExclude<Property, Field>]: Type[Property];
};

type PersonWithoutLocation = RemoveField<Person, "location">;

type EventConfig<Events extends { kind: string }> = {
  [E in Events as E["kind"]]: (event: E) => void;
};

type TestEvent = { kind: string };

type TestEventConfig = EventConfig<TestEvent>;

// type SquareEvent = { kind: "square", x: number, y: number };
// type CircleEvent = { kind: "circle", radius: number };

// type Config = EventConfig<SquareEvent | CircleEvent>

type Names = "Atmanand" | "Roshan" | "Raj";

type Greetings = `Hello, ${Names}`;

type PropEventSource<Type> = {
  on<Key extends string & keyof Type>(
    event: `${Key}Changed`,
    callback: (newValue: Type[Key]) => void
  ): number;
};

declare function makeWithEventHandlers<T>(obj: T): T & PropEventSource<T>;

const user = {
  name: "Atmanand Nagpure",
  age: 21,
  location: "Aurangabad",
};

type User = typeof user;

type Optional<T> = {
  [P in keyof T]+?: T[P];
};

type ChangeTypeIf<T, OriginalKey, TargetKey, NewType> =
  OriginalKey extends TargetKey ? NewType : T;

type ChangeType<T, TargetKey, NewType> = {
  [P in keyof T as Uppercase<P extends string ? P : never>]: ChangeTypeIf<
    T[P],
    P,
    TargetKey,
    NewType
  >;
};

type OptionalUser = Optional<User>;
type StrictUser = ChangeType<User, "age", string>;

const userWithHandlers = makeWithEventHandlers(user);

userWithHandlers.on("locationChanged", (value) => {});

type TestRec = " " | " "[];
const spacesArray: TestRec = [" ", " ", " "];

type GetParts<Type> = Type extends `${infer X} = ${infer Y}` ? [X, Y] : never;
type VarsTest = GetParts<"x = 10">;

class Thing {
  constructor() {}
}

type TestClassAlias1 = Thing;
type TestClassAlias2 = typeof Thing;

type TestClassAliasMain = TestClassAlias2 extends TestClassAlias1
  ? true
  : false;

abstract class Base {
  abstract printName(): void;
}

class Derived extends Base {
  printName(): void {
    console.log("[Derived] called printName");
  }
}

function greet(ctor: new () => Base) {
  const instance = new ctor();
  instance.printName();
}
greet(Derived);

// console.log(tyThing);
