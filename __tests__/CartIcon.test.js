import { Provider } from "react-redux";
import { store } from "../store";
import { fireEvent, render } from "@testing-library/react-native";
import CartIcon from "../components/CartIcon";

const mockedNavigate = jest.fn();

jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
  };
});

const setup = (props = {}) => {
  const wrapper = render(
    <Provider store={store}>
      <CartIcon {...props} />
    </Provider>
  );
  return wrapper;
};

describe("Cart icon unit tests", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it("renders correctly, snapshot test", () => {
    const tree = setup();
    expect(tree).toMatchSnapshot();
  });

  it("Icon existance and quantity text test", () => {
    const wrapper = setup();
    expect(wrapper.getByTestId("cart_icon")).toBeTruthy();
    expect(wrapper.getByText("0")).toBeTruthy();
  });

  it("Touchable opacity onpress navigate to ShoppingCart screen test", () => {
    const wrapper = setup();
    const cartButton = wrapper.getByTestId("cart_btn");

    fireEvent.press(cartButton);

    expect(mockedNavigate).toHaveBeenCalledWith("ShoppingCart");
  });
});
