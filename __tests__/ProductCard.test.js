import { Provider } from "react-redux";
import { store } from "../store";
import { fireEvent, render } from "@testing-library/react-native";
import ProductCard from "../components/ProductCard";

const mockedNavigate = jest.fn();
const mockItemProp = {
  id: 1,
  colour: "Black",
  name: "Black Sheet Strappy Textured Glitter Bodycon Dress",
  price: 10,
  img: "http://cdn-img.prettylittlething.com/9/0/a/a/90aa90903a135ee59594f47c7685aa7ef3046e44_cly8063_1.jpg?imwidth=1024",
};

jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");
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
      <ProductCard {...props} />
    </Provider>
  );
  return wrapper;
};

describe("Product Card unit tests", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it("renders correctly, snapshot test", () => {
    const tree = setup(mockItemProp);
    expect(tree).toMatchSnapshot();
  });

  it("All parts in the product card existance test", () => {
    const wrapper = setup(mockItemProp);

    expect(wrapper.getByTestId("product_img")).toBeTruthy();
    expect(
      wrapper.getByText("Black Sheet Strappy Textured Glitter Bodycon Dress")
    ).toBeTruthy();
    expect(wrapper.getByText("£ 10")).toBeTruthy();
  });

  it("Touchable opacity onpress navigate to ProductDetail screen test", () => {
    const wrapper = setup(mockItemProp);
    const detailButton = wrapper.getByTestId("detail_btn");

    fireEvent.press(detailButton);

    expect(mockedNavigate).toHaveBeenCalledWith("ProductDetail", mockItemProp);
  });
});
