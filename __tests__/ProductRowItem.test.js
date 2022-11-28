import { Provider } from "react-redux";
import { store } from "../store";
import { render, fireEvent, act } from "@testing-library/react-native";
import ProductRowItem from "../components/ProductRowItem";
import { addToCart } from "../slices/shoppingCartSlice";

const mockItemProp = {
  id: 1,
  colour: "Black",
  name: "Black Sheet Strappy Textured Glitter Bodycon Dress",
  price: 10,
  img: "http://cdn-img.prettylittlething.com/9/0/a/a/90aa90903a135ee59594f47c7685aa7ef3046e44_cly8063_1.jpg?imwidth=1024",
};

const mockItemPropArr = [mockItemProp];

jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");

const setup = (props = {}) => {
  const wrapper = render(
    <Provider store={store}>
      <ProductRowItem {...props} />
    </Provider>
  );
  return wrapper;
};

describe("Product Row Item unit tests", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it("renders correctly, snapshot test", () => {
    const tree = setup({ items: mockItemPropArr });
    expect(tree).toMatchSnapshot();
  });

  it("All parts in the row existance test", () => {
    const wrapper = setup({ items: mockItemPropArr });

    expect(wrapper.getByText("Remove")).toBeTruthy();
    expect(wrapper.getByTestId("product_img")).toBeTruthy();
    expect(
      wrapper.getByText("Black Sheet Strappy Textured Glitter Bodycon Dress")
    ).toBeTruthy();
    expect(wrapper.getByText("£ 10")).toBeTruthy();
  });

  it("Remove items by pressing Remove test", () => {
    // add item to the store
    act(() => {
      store.dispatch(addToCart(mockItemProp));
    });

    const wrapper = setup({ items: mockItemPropArr });
    const removeButton = wrapper.getByText("Remove");

    fireEvent.press(removeButton);

    expect(store.getState().cart.items).toEqual([]);
  });
});
