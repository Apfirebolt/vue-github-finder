import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount, flushPromises } from "@vue/test-utils";
import axios from "axios";
import UserDetailPage from "../views/UserDetail.vue";
import LoaderComponent from "../components/Loader.vue";

vi.mock("axios");

describe("UserDetailPage", () => {
  const mockUser = {
    login: "testuser",
    name: "Test User",
    avatar_url: "https://example.com/avatar.jpg",
    bio: "Test bio",
    email: "test@example.com",
    html_url: "https://github.com/testuser",
    followers: 100,
    following: 50,
    public_repos: 25,
    public_gists: 10,
    location: "Test City",
  };

  const mockRepos = [
    {
      id: 1,
      name: "repo1",
      description: "Repo 1 description",
      html_url: "https://github.com/testuser/repo1",
    },
    {
      id: 2,
      name: "repo2",
      description: "Repo 2 description",
      html_url: "https://github.com/testuser/repo2",
    },
    {
      id: 3,
      name: "repo3",
      description: null,
      html_url: "https://github.com/testuser/repo3",
    },
  ];

  const mockRoute = {
    params: { username: "testuser" },
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render component", () => {
    const wrapper = mount(UserDetailPage, {
      global: {
        mocks: {
          $route: mockRoute,
        },
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it("should show loader when loading", async () => {
    axios.get.mockImplementation(() => new Promise(() => {}));

    const wrapper = mount(UserDetailPage, {
      global: {
        mocks: {
          $route: mockRoute,
        },
      },
    });

    await flushPromises();
    expect(wrapper.findComponent(LoaderComponent).exists()).toBe(true);
  });

  it("should fetch user details on mount", async () => {
    axios.get.mockImplementation((url) => {
      if (url.includes("/repos")) {
        return Promise.resolve({ data: mockRepos });
      }
      return Promise.resolve({ data: mockUser });
    });

    mount(UserDetailPage, {
      global: {
        mocks: {
          $route: mockRoute,
        },
      },
    });

    await flushPromises();
    expect(axios.get).toHaveBeenCalledWith(
      "https://api.github.com/users/testuser"
    );
    expect(axios.get).toHaveBeenCalledWith(
      "https://api.github.com/users/testuser/repos?per_page=5&sort=created:asc"
    );
  });

  it("should display user information after loading", async () => {
    axios.get.mockImplementation((url) => {
      if (url.includes("/repos")) {
        return Promise.resolve({ data: mockRepos });
      }
      return Promise.resolve({ data: mockUser });
    });

    const wrapper = mount(UserDetailPage, {
      global: {
        mocks: {
          $route: mockRoute,
        },
      },
    });

    await flushPromises();
    expect(wrapper.text()).toContain("Test User");
    expect(wrapper.text()).toContain("@testuser");
    expect(wrapper.text()).toContain("Test bio");
    expect(wrapper.text()).toContain("test@example.com");
  });

  it("should display user statistics", async () => {
    axios.get.mockImplementation((url) => {
      if (url.includes("/repos")) {
        return Promise.resolve({ data: mockRepos });
      }
      return Promise.resolve({ data: mockUser });
    });

    const wrapper = mount(UserDetailPage, {
      global: {
        mocks: {
          $route: mockRoute,
        },
      },
    });

    await flushPromises();
    expect(wrapper.text()).toContain("100");
    expect(wrapper.text()).toContain("Followers");
    expect(wrapper.text()).toContain("50");
    expect(wrapper.text()).toContain("Following");
    expect(wrapper.text()).toContain("25");
    expect(wrapper.text()).toContain("Repositories");
    expect(wrapper.text()).toContain("10");
    expect(wrapper.text()).toContain("Gists");
  });

  it("should display location if available", async () => {
    axios.get.mockImplementation((url) => {
      if (url.includes("/repos")) {
        return Promise.resolve({ data: mockRepos });
      }
      return Promise.resolve({ data: mockUser });
    });

    const wrapper = mount(UserDetailPage, {
      global: {
        mocks: {
          $route: mockRoute,
        },
      },
    });

    await flushPromises();
    expect(wrapper.text()).toContain("Test City");
  });

  it("should not display email if not available", async () => {
    const userWithoutEmail = { ...mockUser, email: null };
    axios.get.mockImplementation((url) => {
      if (url.includes("/repos")) {
        return Promise.resolve({ data: mockRepos });
      }
      return Promise.resolve({ data: userWithoutEmail });
    });

    const wrapper = mount(UserDetailPage, {
      global: {
        mocks: {
          $route: mockRoute,
        },
      },
    });

    await flushPromises();
    expect(wrapper.html()).not.toContain("test@example.com");
  });

  it("should display repositories", async () => {
    axios.get.mockImplementation((url) => {
      if (url.includes("/repos")) {
        return Promise.resolve({ data: mockRepos });
      }
      return Promise.resolve({ data: mockUser });
    });

    const wrapper = mount(UserDetailPage, {
      global: {
        mocks: {
          $route: mockRoute,
        },
      },
    });

    await flushPromises();
    expect(wrapper.text()).toContain("repo1");
    expect(wrapper.text()).toContain("Repo 1 description");
    expect(wrapper.text()).toContain("repo2");
    expect(wrapper.text()).toContain("repo3");
  });

  it('should display "No description available" for repos without description', async () => {
    axios.get.mockImplementation((url) => {
      if (url.includes("/repos")) {
        return Promise.resolve({ data: mockRepos });
      }
      return Promise.resolve({ data: mockUser });
    });

    const wrapper = mount(UserDetailPage, {
      global: {
        mocks: {
          $route: mockRoute,
        },
      },
    });

    await flushPromises();
    expect(wrapper.text()).toContain("No description available");
  });

  it("should handle API errors gracefully", async () => {
    const consoleLogSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    axios.get.mockRejectedValue(new Error("API Error"));

    const wrapper = mount(UserDetailPage, {
      global: {
        mocks: {
          $route: mockRoute,
        },
      },
    });

    await flushPromises();
    expect(consoleLogSpy).toHaveBeenCalled();
    expect(wrapper.findComponent(LoaderComponent).exists()).toBe(false);
  });

  it("should render avatar image with correct src", async () => {
    axios.get.mockImplementation((url) => {
      if (url.includes("/repos")) {
        return Promise.resolve({ data: mockRepos });
      }
      return Promise.resolve({ data: mockUser });
    });

    const wrapper = mount(UserDetailPage, {
      global: {
        mocks: {
          $route: mockRoute,
        },
      },
    });

    await flushPromises();
    const img = wrapper.find('img[alt="User Avatar"]');
    expect(img.attributes("src")).toBe("https://example.com/avatar.jpg");
  });

  it("should render profile link with correct href", async () => {
    axios.get.mockImplementation((url) => {
      if (url.includes("/repos")) {
        return Promise.resolve({ data: mockRepos });
      }
      return Promise.resolve({ data: mockUser });
    });

    const wrapper = mount(UserDetailPage, {
      global: {
        mocks: {
          $route: mockRoute,
        },
      },
    });

    await flushPromises();
    const profileLink = wrapper
      .findAll("a")
      .find((a) => a.text().includes("View Profile"));
    expect(profileLink.attributes("href")).toBe("https://github.com/testuser");
    expect(profileLink.attributes("target")).toBe("_blank");
  });
});
