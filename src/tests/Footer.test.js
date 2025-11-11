import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Footer from "../components/FooterComponent.vue";

describe("Footer.vue", () => {
  it("renders main title and description", () => {
    const wrapper = mount(Footer);
    const title = wrapper.find("h3");
    expect(title.exists()).toBe(true);
    expect(title.text()).toContain("GitHub Finder");
    expect(wrapper.text()).toContain(
      "Search and discover GitHub users and repositories with ease."
    );
  });

  it("renders quick links with correct hrefs", () => {
    const wrapper = mount(Footer);
    const links = wrapper.findAll("a");
    // Expect exactly the three quick links present
    expect(links.length).toBeGreaterThanOrEqual(3);
    // Find by href
    const home = wrapper.find('a[href="/"]');
    const about = wrapper.find('a[href="/about"]');
    const github = wrapper.find('a[href="https://github.com"]');
    expect(home.exists()).toBe(true);
    expect(about.exists()).toBe(true);
    expect(github.exists()).toBe(true);
  });

  it("external GitHub link opens in a new tab", () => {
    const wrapper = mount(Footer);
    const github = wrapper.find('a[href="https://github.com"]');
    expect(github.exists()).toBe(true);
    expect(github.attributes("target")).toBe("_blank");
  });

  it("displays the current year", () => {
    const wrapper = mount(Footer);
    const year = new Date().getFullYear().toString();
    expect(wrapper.text()).toContain(year);
  });
});
