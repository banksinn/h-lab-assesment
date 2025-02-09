import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserProfile from "./UserProfile";

describe("UserProfile Component", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("displays loading state initially", () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({}),
    });

    render(<UserProfile userId={1} />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("displays error message when fetch fails", async () => {
    global.fetch = jest
      .fn()
      .mockRejectedValue(new Error("Failed to fetch user data"));

    render(<UserProfile userId={1} />);

    await waitFor(() => {
      expect(
        screen.getByText("Error: Failed to fetch user data")
      ).toBeInTheDocument();
    });
  });

  test("displays user data when fetch is successful", async () => {
    const mockUser = {
      id: 1,
      name: "banksinn1",
      email: "banksinn1@yopmail.com",
    };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockUser),
      })
    ) as jest.Mock;

    render(<UserProfile userId={1} />);

    await waitFor(() => {
      expect(screen.getByText("banksinn1")).toBeInTheDocument();
      expect(
        screen.getByText("Email: banksinn1@yopmail.com")
      ).toBeInTheDocument();
    });
  });
});
