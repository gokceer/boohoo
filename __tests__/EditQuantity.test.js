import { Provider } from "react-redux";
import { store } from "../store";
import { fireEvent, render } from "@testing-library/react-native";
import EditQuantity from "../components/EditQuantity";

const mockItemProp = {
  id: 1,
  colour: "Black",
  name: "Black Sheet Strappy Textured Glitter Bodycon Dress",
  price: 10,
  img: "http://cdn-img.prettylittlething.com/9/0/a/a/90aa90903a135ee59594f47c7685aa7ef3046e44_cly8063_1.jpg?imwidth=1024",
};

jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");

const setup = (props = { itemInfo: mockItemProp }) => {
  const wrapper = render(
    <Provider store={store}>
      <EditQuantity {...props} />
    </Provider>
  );
  return wrapper;
};

describe("Edit Quantity unit tests", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it("renders correctly, snapshot test", () => {
    const tree = setup();
    expect(tree).toMatchSnapshot();
  });

  it("Quantity incrementation test", () => {
    const wrapper = setup();
    const incrementButton = wrapper.getByTestId("increment_btn");

    fireEvent.press(incrementButton);

    expect(wrapper.getByText("1")).toBeTruthy();
  });

  it("Quantity decrementation test", () => {
    const wrapper = setup();
    const decrementButton = wrapper.getByTestId("decrement_btn");

    fireEvent.press(decrementButton);

    expect(wrapper.getByText("0")).toBeTruthy();
  });
});
