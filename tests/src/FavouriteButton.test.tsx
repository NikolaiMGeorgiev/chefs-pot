import { fireEvent, render, screen } from "@testing-library/react"
import FavouriteButton from "../../src/components/common/FavouriteButton"


describe("Favourite Button", () => {
    test("should render active button", () => {
        render(<FavouriteButton recipeId={123} isFavouriteInitial={true} />);
        expect(screen.getByRole("button")).toHaveClass("active");
    })

    test("should render inactive button", () => {
        render(<FavouriteButton recipeId={123} isFavouriteInitial={false} />);
        expect(screen.getByRole("button")).not.toHaveClass("active");
    })

    test("should toggle on click", () => {
        global.fetch = jest.fn();

        render(<FavouriteButton recipeId={123} isFavouriteInitial={false} />);

        const favButton = screen.getByRole("button");
        
        fireEvent.click(favButton);
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(favButton).toHaveClass("active");

        fireEvent.click(screen.getByRole("button"));
        expect(fetch).toHaveBeenCalledTimes(2);
        expect(favButton).not.toHaveClass("active");
    })
})