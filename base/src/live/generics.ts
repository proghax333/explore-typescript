// type KeyValue = "name = Roshan";

// const value: number = 10;

// type Greet<T extends string, U extends string> = `Hello, ${T} ${U}`;

// type GreetVivek = Greet<"Vivek", "Chavan">;

type KeyValueObject<T extends string> = T extends `${infer U} = ${infer V}`
  ? {
      key: U;
      value: V;
    }
  : never;

type TestKeyValueObject = KeyValueObject<"name = Roshan">;

const tempX: TestKeyValueObject = {
  key: "name",
  value: "Roshan",
};

// console.log(tempX);

type Query = {
  [K: string]: any;
};

type QueryStr<T extends string> = KeyValueObject<T>;

type Make<U extends string, V> = {
  [P in U]: V;
};

type FromQueryString<U extends string> = KeyValueObject<U> extends {
  key: infer Key extends string;
  value: infer Value;
}
  ? Make<Key, Value>
  : never;

type WhereType<T> = <U extends string>(
  query: U
) => QueryBuilder<T & FromQueryString<U>>;

interface QueryBuilder<T extends Query = {}> {
  where: WhereType<T>;
  execute: (
    cb: (value: T) => any
  ) => QueryBuilder<T>;
}

// let qb: QueryBuilder;

// let result22 = qb
//   .where("name = Roshan")
//   .where("author = Vivek")
//   .where("id = 23")
//   .where("location = Navi Mumbai")
//   .where("wow = This is nice")
//   .execute((value) => {});

// result22.execute((value) => {
//   // value.
// });

type TypeOfQueryBuilder<T> = T extends QueryBuilder<infer MainType>
  ? MainType
  : never;

type BasicUser = {
  name: string;
  salary: number;
  location: string;
};

let basicUser1: BasicUser;

type MakeGetters<T> = {
  [P in keyof T as `get${Capitalize<P & string>}`]: () => T[P];
};

type MakeSetters<T> = {
  [P in keyof T as `set${Capitalize<P & string>}`]: (value: T[P]) => void;
};

type TestMakeGetters = MakeGetters<BasicUser>;
type TestMakeSetters = MakeSetters<BasicUser>;

type BasicUserStandard = BasicUser &
  MakeGetters<BasicUser> &
  MakeSetters<BasicUser>;

declare const basicUserStandard1: BasicUserStandard;

class BasicUserStandardImpl implements BasicUserStandard {
  constructor(
    public name: string,
    public salary: number,
    public location: string
  ) {}

  getName() {
    return this.name;
  }
  getSalary() {
    return this.salary;
  }
  getLocation() {
    return this.location;
  }
  setName(name: string) {
    this.name = name;
  }
  setSalary(salary: number) {
    this.salary = salary;
  }
  setLocation(location: string) {
    this.location = location;
  }
}

type MakeReadonly<T> = {
  readonly [P in keyof T]: T[P];
};

type RemoveReadonly<T> = {
  -readonly [P in keyof T]: T[P];
};

type TestMakeReadonly = MakeReadonly<BasicUser>;
type TestRemoveReadonly = RemoveReadonly<TestMakeReadonly>;

function displayDetails(user: BasicUser) {
  user.name = "new nmae";
  console.log(user);
}
const constUser = {
  name: "Simple",
} as const;

const sampleUser: BasicUser = {
  name: "sample",
  location: "OK",
  salary: 100,
};

const readonlySampleUser: Readonly<BasicUser> = sampleUser;

displayDetails(readonlySampleUser);

export {};
