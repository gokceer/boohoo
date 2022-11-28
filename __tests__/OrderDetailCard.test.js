import { Provider } from "react-redux";
import { store } from "../store";
import { render, act } from "@testing-library/react-native";
import OrderDetailCard from "../components/OrderDetailCard";
import { addToCart } from "../slices/shoppingCartSlice";

const mockItemProp = {
  id: 1,
  colour: "Black",
  name: "Black Sheet Strappy Textured Glitter Bodycon Dress",
  price: 10,
  img: "http://cdn-img.prettylittlething.com/9/0/a/a/90aa90903a135ee59594f47c7685aa7ef3046e44_cly8063_1.jpg?imwidth=1024",
};

const setup = (props = {}) => {
  const wrapper = render(
    <Provider store={store}>
      <OrderDetailCard {...props} />
    </Provider>
  );
  return wrapper;
};

describe("Order Detail unit tests", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it("renders correctly, snapshot test", () => {
    const tree = setup();
    expect(tree).toMatchSnapshot();
  });

  it("Empty cart OrderDetailCard not exists test", () => {
    const wrapper = setup();
    expect(wrapper.queryByText("Subtotal")).not.toBeTruthy();
    expect(wrapper.queryByText("Delivery Fee")).not.toBeTruthy();
    expect(wrapper.queryByText("Order Total")).not.toBeTruthy();
  });

  it("OrderDetailCard existance test", () => {
    const wrapper = setup();

    // add item to the store
    act(() => {
      store.dispatch(addToCart(mockItemProp));
    });

    expect(wrapper.queryByText("Subtotal")).toBeTruthy();
    expect(wrapper.queryByText("£ 10")).toBeTruthy();

    expect(wrapper.queryByText("Delivery Fee")).toBeTruthy();
    expect(wrapper.queryByText("£ 5")).toBeTruthy();

    expect(wrapper.queryByText("Order Total")).toBeTruthy();
    expect(wrapper.queryByText("£ 15")).toBeTruthy();
  });
});
