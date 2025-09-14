import { render, screen } from "@testing-library/react";
import App from "../src/App";

test("renders Navbar buttons", () => {
  render(<App />);
  expect(screen.getByText(/Subir Imagen/i)).toBeInTheDocument();
  expect(screen.getByText(/Video en Tiempo Real/i)).toBeInTheDocument();
});