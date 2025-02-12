import { render, screen, userEvent } from "@/test/utils";
import { describe, it, expect, vi } from "vitest";
import { Toast } from "./toast";

describe("Toast Component", () => {
  it("renders the error variant by default", () => {
    render(<Toast onClose={vi.fn()} />);
    expect(screen.getByText("Sorry, something went wrong")).toBeInTheDocument();
  });

  it("renders the success variant", () => {
    render(<Toast $variant="success" onClose={vi.fn()} />);
    expect(screen.getByText("Success!")).toBeInTheDocument();
  });

  it("renders a custom message", () => {
    const customMessage = "You've successfully removed Ana Henrique.";
    render(<Toast $message={customMessage} onClose={vi.fn()} />);
    expect(screen.getByText(customMessage)).toBeInTheDocument();
  });

  it("calls $handleOnClose when close button is clicked", async () => {
    const handleOnClose = vi.fn();
    render(<Toast onClose={handleOnClose} />);
    await userEvent.click(screen.getByRole("button"));
    expect(handleOnClose).toHaveBeenCalledTimes(1);
  });
});
