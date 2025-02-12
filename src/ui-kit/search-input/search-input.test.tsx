import { render, screen, userEvent } from "@/test/utils";
import { SearchInput } from ".";

describe("SearchInput", () => {
  it("should have a correct placeholder", () => {
    render(<SearchInput placeholder='Search by name...'/>);
    const inputElement = screen.getByPlaceholderText(/Search by name.../i);
    expect(inputElement).toBeInTheDocument();
  });

  it("should spread custom attributes", async () => {
    const onChange = vi.fn();
    render(<SearchInput data-foo="12" onChange={onChange}/>);
    const inputElement = screen.getByRole("searchbox");
    await userEvent.type(inputElement, "Hello");
    expect(inputElement).toHaveAttribute("data-foo", "12");
    expect(onChange).toHaveBeenCalled();
  });

});
