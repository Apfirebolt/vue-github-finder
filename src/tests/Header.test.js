import { describe, it, expect, beforeEach, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import Header from "../components/HeaderComponent.vue";

describe("Header Component", () => {
  let wrapper;

  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();

    // Mock window.matchMedia
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    // Reset scroll position
    window.scrollY = 0;

    wrapper = mount(Header, {
      global: {
        stubs: {
          "router-link": true,
          Disclosure: true,
          DisclosureButton: true,
          DisclosurePanel: true,
        },
      },
    });
  });

  it("renders the component", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("displays the GitHub logo and Finder text", () => {
    expect(wrapper.html()).toContain("Github Logo");
    expect(wrapper.text()).toContain("Finder");
  });

  it("initializes dark mode from localStorage", async () => {
    localStorage.setItem("darkMode", "true");

    wrapper = mount(Header, {
      global: {
        stubs: {
          "router-link": true,
          Disclosure: true,
          DisclosureButton: true,
          DisclosurePanel: true,
        },
      },
    });

    await nextTick();
    expect(wrapper.vm.isDarkMode).toBe(true);
  });

  it("toggles dark mode when button is clicked", async () => {
    const darkModeButton = wrapper.find("button");
    const initialMode = wrapper.vm.isDarkMode;

    await darkModeButton.trigger("click");

    expect(wrapper.vm.isDarkMode).toBe(!initialMode);
  });

  it("saves dark mode preference to localStorage", async () => {
    await wrapper.vm.toggleDarkMode();

    const savedMode = localStorage.getItem("darkMode");
    expect(savedMode).toBe(String(wrapper.vm.isDarkMode));
  });

  it("adds dark class to document when dark mode is enabled", async () => {
    wrapper.vm.setDarkMode(true);

    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("removes dark class from document when dark mode is disabled", async () => {
    wrapper.vm.setDarkMode(false);

    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });

  it("updates isScrolledDown when scrolling past 100px", async () => {
    window.scrollY = 150;
    wrapper.vm.checkScroll();

    expect(wrapper.vm.isScrolledDown).toBe(true);
  });

  it("keeps isScrolledDown false when scrolling less than 100px", async () => {
    window.scrollY = 50;
    wrapper.vm.checkScroll();

    expect(wrapper.vm.isScrolledDown).toBe(false);
  });

  it("displays correct dark mode button text when dark mode is off", () => {
    wrapper.vm.isDarkMode = false;

    expect(wrapper.text()).toContain("🌙 Dark");
  });

  it("displays correct dark mode button text when dark mode is on", async () => {
    wrapper.vm.isDarkMode = true;
    await nextTick();

    expect(wrapper.text()).toContain("☀️ Light");
  });

  it("uses system preference when no localStorage value exists", async () => {
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: true,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    wrapper = mount(Header, {
      global: {
        stubs: {
          "router-link": true,
          Disclosure: true,
          DisclosureButton: true,
          DisclosurePanel: true,
        },
      },
    });

    await nextTick();
    expect(wrapper.vm.isDarkMode).toBe(true);
  });
});
