import { describe, it, expect, beforeEach, vi } from "vitest";
import { mount, flushPromises } from "@vue/test-utils";
import axios from "axios";
import HomePage from "../views/Home.vue";
import Pagination from "../components/Pagination.vue";
import LoaderComponent from "../components/Loader.vue";

vi.mock("axios");
vi.mock("aos", () => ({
  default: {
    init: vi.fn(),
  },
}));

describe("HomePage", () => {
  let wrapper;
  const mockUsers = {
    data: {
      items: [
        { id: 1, login: "user1", avatar_url: "url1", html_url: "profile1" },
        { id: 2, login: "user2", avatar_url: "url2", html_url: "profile2" },
      ],
      total_count: 100,
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
    axios.get.mockResolvedValue(mockUsers);
  });

  it("renders the component correctly", () => {
    wrapper = mount(HomePage);
    expect(wrapper.find("h1").text()).toBe("GitHub User Finder");
  });

  it("initializes with default data", () => {
    wrapper = mount(HomePage);
    expect(wrapper.vm.searchTerm).toBe("vue");
    expect(wrapper.vm.itemsPerPage).toBe(10);
    expect(wrapper.vm.currentPage).toBe(1);
    expect(wrapper.vm.loading).toBe(false);
  });

  it("calls searchUser on mount", async () => {
    wrapper = mount(HomePage);
    await flushPromises();
    expect(axios.get).toHaveBeenCalledWith(
      "https://api.github.com/search/users?q=vue&per_page=10&page=1"
    );
  });

  it("displays loader when loading is true", async () => {
    wrapper = mount(HomePage);
    await wrapper.setData({ loading: true });
    expect(wrapper.findComponent(LoaderComponent).exists()).toBe(true);
  });

  it("displays users after successful search", async () => {
    wrapper = mount(HomePage);
    await flushPromises();
    expect(wrapper.vm.users).toEqual(mockUsers.data.items);
    expect(wrapper.vm.totalItems).toBe(100);
  });

  it("updates search term on input", async () => {
    wrapper = mount(HomePage);
    const input = wrapper.find('input[type="text"]');
    await input.setValue("react");
    expect(wrapper.vm.searchTerm).toBe("react");
  });

  it("calls searchUser when search button is clicked", async () => {
    wrapper = mount(HomePage);
    await flushPromises();
    vi.clearAllMocks();

    const button = wrapper.find("button");
    await button.trigger("click");
    await flushPromises();

    expect(axios.get).toHaveBeenCalled();
  });

  it("calls searchUser when Enter key is pressed", async () => {
    wrapper = mount(HomePage);
    await flushPromises();
    vi.clearAllMocks();

    const input = wrapper.find('input[type="text"]');
    await input.trigger("keyup.enter");
    await flushPromises();

    expect(axios.get).toHaveBeenCalled();
  });

  it("changes items per page", async () => {
    wrapper = mount(HomePage);
    await flushPromises();

    const select = wrapper.find("select");
    await select.setValue("25");

    expect(wrapper.vm.itemsPerPage).toBe("25");
  });

  it("displays pagination when users exist", async () => {
    wrapper = mount(HomePage);
    await flushPromises();
    expect(wrapper.findComponent(Pagination).exists()).toBe(true);
  });

  it("increments page on goToNextPage", async () => {
    wrapper = mount(HomePage);
    await flushPromises();

    wrapper.vm.goToNextPage();
    expect(wrapper.vm.currentPage).toBe(2);
  });

  it("decrements page on goToPreviousPage", async () => {
    wrapper = mount(HomePage);
    await wrapper.setData({ currentPage: 2 });

    wrapper.vm.goToPreviousPage();
    expect(wrapper.vm.currentPage).toBe(1);
  });

  it("navigates to user details", () => {
    const mockRouter = { push: vi.fn() };
    wrapper = mount(HomePage, {
      global: {
        mocks: {
          $router: mockRouter,
        },
      },
    });

    wrapper.vm.goToDetails("testuser");
    expect(mockRouter.push).toHaveBeenCalledWith({
      name: "UserDetail",
      params: { username: "testuser" },
    });
  });

  it('displays "no users found" message when users array is empty', async () => {
    axios.get.mockResolvedValue({ data: { items: [], total_count: 0 } });
    wrapper = mount(HomePage);
    await flushPromises();

    expect(wrapper.text()).toContain("No users found");
  });

  it("handles API error gracefully", async () => {
    const consoleLogSpy = vi.spyOn(console, "log");
    axios.get.mockRejectedValue(new Error("API Error"));

    wrapper = mount(HomePage);
    await flushPromises();

    expect(wrapper.vm.loading).toBe(false);
    expect(consoleLogSpy).toHaveBeenCalled();
  });

  it("renders user cards with correct data", async () => {
    wrapper = mount(HomePage);
    await flushPromises();

    const userCards = wrapper.findAll(".bg-gradient-to-br");
    expect(userCards).toHaveLength(2);
    expect(userCards[0].text()).toContain("user1");
  });

  it("watches itemsPerPage and triggers search", async () => {
    wrapper = mount(HomePage);
    await flushPromises();
    vi.clearAllMocks();

    await wrapper.setData({ itemsPerPage: 50 });
    await flushPromises();

    expect(axios.get).toHaveBeenCalledWith(
      expect.stringContaining("per_page=50")
    );
  });
});
