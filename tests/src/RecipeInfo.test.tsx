import { render, screen } from "@testing-library/react"
import RecipeInfo from "../../src/components/recipes/RecipeInfo"

describe("Recipe Info", () => {
    test("should render data", () => {
        render(<RecipeInfo favouriteCount={1234} created={new Date("2025-11-25T12:00:00.000Z")} />);
        expect(screen.getByText(1234)).toBeInTheDocument();
        expect(screen.getByText("25.11.2025")).toBeInTheDocument();
    })
})