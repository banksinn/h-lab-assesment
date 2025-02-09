import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserProfile from "./UserProfile";

describe("UserProfile Component", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("displays loading state initially", () => {
    jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({}),
    });

    render(<UserProfile userId={1} />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("displays error message when fetch fails", async () => {
    jest.fn().mockRejectedValueOnce(new Error("Failed to fetch user data"));

    render(<UserProfile userId={1} />);

    await waitFor(() => {
      expect(screen.getByText("Failed to fetch user data")).toBeInTheDocument();
    });
  });

  test("displays user data when fetch is successful", async () => {
    const mockUser = {
      id: 1,
      name: "banksinn1",
      email: "banksinn1@yopmail.com",
    };

    jest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => mockUser,
    });

    render(<UserProfile userId={1} />);

    await waitFor(() => {
      expect(screen.getByText("banksinn1")).toBeInTheDocument();
      expect(
        screen.getByText("Email: banksinn1@yopmail.com")
      ).toBeInTheDocument();
    });
  });
});
