import { formatMembersNumber, formatMoney } from "../formatting-utils";

describe("formatMoney", () => {
  it("should format money correctly when curency is USD and amount has fraction digits", () => {
    const amount = 1234.56;
    const currency = "USD";
    const formattedAmount = formatMoney(amount, currency);
    expect(formattedAmount).toBe("USD 1.234,56\xa0$");
  });

  it("should format money correctly when currency is EUR and amount does not have fraction digits", () => {
    const amount = 1;
    const currency = "EUR";
    const formattedAmount = formatMoney(amount, currency);
    expect(formattedAmount).toBe("EUR 1,00\xa0€");
  });

  it("should format money correctly when currency is GBP and amount is below 1", () => {
    const amount = .12;
    const currency = "GBP";
    const formattedAmount = formatMoney(amount, currency);
    expect(formattedAmount).toBe("GBP 0,12\xa0£");
  });

  it("should format money correctly when amount is 0", () => {
    const amount = 0;
    const currency = "GBP";
    const formattedAmount = formatMoney(amount, currency);
    expect(formattedAmount).toBe("GBP 0,00\xa0£");
  });

  it("should format money correctly when currency is undefined", () => {
    const amount = 123456;
    const formattedAmount = formatMoney(amount, undefined);
    expect(formattedAmount).toBe("123.456,00");
  });

  it("should return an empty string when amount is undefined", () => {
    const formattedAmount = formatMoney();
    expect(formattedAmount).toBe("");
  });
});

describe("formatMembersNumber", () => {
  it("should return the correct string when membersNumber is 1", () => {
    const membersNumber = 1;
    const formattedMembersNumber = formatMembersNumber(membersNumber);
    expect(formattedMembersNumber).toBe("1 member");
  });

  it("should return the correct string when membersNumber is greater than 1", () => {
    const membersNumber = 3;
    const formattedMembersNumber = formatMembersNumber(membersNumber);
    expect(formattedMembersNumber).toBe("3 members");
  });
});
