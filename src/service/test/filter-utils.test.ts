import { Employment, employments } from "@/types/employment";
import { getEmploymentToFilterBy, sanitiseParam } from "../filter-utils";

describe("getEmploymentToFilterBy", () => {
  it("should return the employment when there is only one filter", () => {
    const filters: Employment[] = employments.slice(0, 1);
    const result = getEmploymentToFilterBy(filters);
    expect(result).toEqual(employments[0]);
  });

  it("should return undefined when all filters are selected", () => {
    const filters: Employment[] = [...employments];
    const result = getEmploymentToFilterBy(filters);
    expect(result).toEqual(undefined);
  });

  it("should return undefined when no filters are selected", () => {
    const filters: Employment[] = [];
    const result = getEmploymentToFilterBy(filters);
    expect(result).toEqual(undefined);
  });

});

describe("sanitiseParam", () => {
  it("should replace spaces with plus signs and trim the trailing spaces", () => {
    const input = "Chris Colgan ";
    const result = sanitiseParam(input);
    expect(result).toEqual("Chris+Colgan");
  });

  it("should remove special characters", () => {
    const input = "?Chris&=";
    const result = sanitiseParam(input);
    expect(result).toEqual("Chris");
  });
});
