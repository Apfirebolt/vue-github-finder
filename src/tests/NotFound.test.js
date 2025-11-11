import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import NotFound from "../views/NotFound.vue";

describe("NotFound", () => {
  it("renders the component", () => {
    const wrapper = mount(NotFound);
    expect(wrapper.exists()).toBe(true);
  });

  it('displays the "Not Found" heading', () => {
    const wrapper = mount(NotFound);
    const heading = wrapper.find("h1");
    expect(heading.exists()).toBe(true);
    expect(heading.text()).toBe("Not Found");
  });

  it("applies correct CSS classes to heading", () => {
    const wrapper = mount(NotFound);
    const heading = wrapper.find("h1");
    expect(heading.classes()).toContain("text-4xl");
    expect(heading.classes()).toContain("text-red-700");
    expect(heading.classes()).toContain("font-semibold");
  });

  it("displays the error message paragraph", () => {
    const wrapper = mount(NotFound);
    const paragraph = wrapper.find("p");
    expect(paragraph.exists()).toBe(true);
    expect(paragraph.text()).toContain(
      "The page you are looking for does not exist"
    );
  });

  it("applies correct CSS classes to paragraph", () => {
    const wrapper = mount(NotFound);
    const paragraph = wrapper.find("p");
    expect(paragraph.classes()).toContain("text-lg");
    expect(paragraph.classes()).toContain("text-red-700");
    expect(paragraph.classes()).toContain("text-center");
  });
});
