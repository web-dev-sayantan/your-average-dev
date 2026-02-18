import { describe, expect, it } from "bun:test";
import { nowContent } from "./content";

const allItemLists = [
  nowContent.reading.books,
  nowContent.reading.blogs,
  nowContent.watching.series,
  nowContent.watching.movies,
  nowContent.watching.sports,
];

describe("nowContent", () => {
  it("contains all required sections", () => {
    expect(nowContent.reading).toBeDefined();
    expect(nowContent.watching).toBeDefined();
  });

  it("keeps every item title non-empty", () => {
    for (const list of allItemLists) {
      expect(Array.isArray(list)).toBe(true);
      for (const item of list) {
        expect(item.title.trim().length).toBeGreaterThan(0);
      }
    }
  });
});
