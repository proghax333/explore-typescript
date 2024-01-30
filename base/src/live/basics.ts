type Container<T> = {
  value: T;
};

const oneContainer: Container<number> = {
  value: 100,
};

function useState<T>(initialValue: T): [T, any] {
  return [initialValue, () => {}];
}

const [value, setValue] = useState<number>(100);

type NumberOrString = string | number;

const name: NumberOrString = 123;

type ErrorType = {
  status: number;
  message: string;

  [P: string]: any;
};

const obj: ErrorType = {
  status: 500,
  message: "Internal Error",
};

type MyBoolean = true | false;
type FirstFiveEvenNumbers = [0, 2, 4, 6, 8];

type PublicVisitor = {
  role: "public";
  page: {
    content: string;
  };
};

type AdminVisitor = {
  role: "admin";
  page: {
    content: string;
    viewCount: number;
  };
};

type WebsiteVisitor = PublicVisitor | AdminVisitor;

const isSuccess: MyBoolean = true;
const firstFiveEvents: FirstFiveEvenNumbers = [0, 2, 4, 6, 8];

const basicViewer: WebsiteVisitor = {
  role: "admin",
  page: {
    content: "100123",
    viewCount: 100,
  },
};

export {};
