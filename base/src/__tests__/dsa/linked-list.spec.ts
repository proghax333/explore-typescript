
import { describe, expect, test } from "@jest/globals";
import { LinkedList } from "../../dsa/linked-list";

describe("linked list module", () => {
  test("create a linked list", () => {
    const list = new LinkedList<number>();

    const items = [1, 2, 3, 4, 5];
    items.forEach(item => list.insertBack(item));

    const linkedListItems = Array.from(list.iterator());

    expect(linkedListItems).toEqual(items);
  });
});
