import { render, screen, userEvent } from "@/test/utils";
import { Button } from ".";
import { BrowserRouter } from "react-router-dom";

describe("Button", () => {
  it("renders an accessible button", () => {
    render(<Button>Hello</Button>);

    const button = screen.getByRole("button", {name: /Hello/i});
    expect(button).toHaveAttribute("type", "button");
    expect(button).toHaveTextContent("Hello");
  });

  it("spreads custom attributes", async () => {
    const onClick = vi.fn();
    render(
      <Button data-foo="12" onClick={onClick}>
        Hello
      </Button>
    );

    const button = screen.getByRole("button");
    await userEvent.click(button);

    expect(button).toHaveAttribute("data-foo", "12");
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("renders an icon", () => {
    render(
      <Button $icon={<svg data-testid="icon" />} onClick={vi.fn()}>
        Hello
      </Button>
    );

    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("renders as a react-router-dom Link when as is specified as a", async () => {
    render(
      <BrowserRouter>
        <Button as="a" to="/foo">
          Hello
        </Button>
      </BrowserRouter>
    );

    const link = screen.getByRole("link", {name: /Hello/i});
    expect(link).toHaveAttribute("href", "/foo");
    await userEvent.click(link);
    expect(window.location.pathname).toBe("/foo");
  });
});
