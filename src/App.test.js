import React from "react";
import ReactDOM from "react-dom";
import GameBoard from "./GameBoard";
import GameCard from "./GameCard";
import Enzyme, { shallow, mount } from "enzyme";
import sinon from "sinon";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

describe("<GameBoard />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<GameBoard />);
    expect(wrapper.exists()).toBe(true);
  });
});

describe("<GameCard />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<GameCard />);
    expect(wrapper.exists()).toBe(true);
  });

  it("renders shown cards", () => {
    const wrapper = mount(<GameCard shown={true} exists={true} />);
    expect(wrapper.update().find("div.show").length).toBe(1);
  });

  it("renders hidden cards", () => {
    const wrapper = mount(<GameCard shown={false} exists={true} />);
    expect(wrapper.update().find("div.hidden").length).toBe(1);
  });

  it("renders removed cards", () => {
    const wrapper = mount(<GameCard shown={false} exists={false} />);
    expect(wrapper.update().find("div.removed").length).toBe(1);
  });

  it("clicked card triggers showCard method", () => {
    const mockFunction = sinon.spy();
    const wrapper = mount(
      <GameCard
        value="A"
        id={1}
        shown={false}
        exists={true}
        showCard={mockFunction}
      />
    );
    wrapper.find("div.hidden").simulate("click");
    expect(mockFunction).toHaveProperty("callCount", 1);
  });
});
