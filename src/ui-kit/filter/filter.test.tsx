import { render, screen, userEvent } from "@/test/utils";
import { Filter } from ".";

describe("Filter", () => {
  it("renders a filter with checkbox", () => {
    render(<Filter label='' value='poet' onChange={vi.fn()} />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
  });

  it("renders a filter with label", () => {
    render(<Filter label='poet' value='poet' onChange={vi.fn()} />);
    const label = screen.getByText("poet");
    expect(label).toBeInTheDocument();
  });

  it("changes to checked onclick of label", async () => {
    const onClick = vi.fn();
    render(<Filter label='poet' value='poet' onChange={onClick} />);

    const checkbox: HTMLInputElement = screen.getByRole("checkbox", {name: /poet/i}) as HTMLInputElement;

    const label = screen.getByText("poet");
    await userEvent.click(label);
    expect(checkbox).toBeChecked();
    expect(onClick).toHaveBeenCalledOnce();
  });

});
