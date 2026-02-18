import { describe, expect, it } from "bun:test";
import { dynamic, metadata } from "./page";

describe("/now route contract", () => {
  it("is configured as dynamic", () => {
    expect(dynamic).toBe("force-dynamic");
  });

  it("exposes page metadata", () => {
    expect(metadata.title).toBe("Now");
    expect(metadata.alternates?.canonical).toBe("/now");
  });
});
