import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

//mocking jwt-decode function
jest.mock("jwt-decode", () => () => ({}));

Enzyme.configure({ adapter: new Adapter() });
