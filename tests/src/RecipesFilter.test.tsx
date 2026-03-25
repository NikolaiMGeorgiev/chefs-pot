import { fireEvent, render, screen, within } from "@testing-library/react";
import RecipesFilter from "../../src/components/recipes-filter/RecipesFilter";
import userEvent from '@testing-library/user-event';

const updateUrl = jest.fn();

beforeEach(() => {
    jest.resetAllMocks();
    // global.fetch = jest.fn();
})

describe("Recipes Filter", () => {
    test("should expand", () => {
        render(<RecipesFilter updateUrl={updateUrl} recipesType="original" />);

        expect(screen.getByTestId("recipe-filter")).not.toHaveClass(/expanded/);
        fireEvent.click(screen.getAllByRole("button")[0]);
        expect(screen.getByTestId("recipe-filter")).toHaveClass(/expanded/);
    })

    test("should collapse", () => {
        render(<RecipesFilter updateUrl={updateUrl} recipesType="original" />);

        fireEvent.click(screen.getAllByRole("button")[0]);
        fireEvent.click(screen.getAllByRole("button")[0]);
        expect(screen.getByTestId("recipe-filter")).not.toHaveClass(/expanded/);
    })

    test("should search for ingredient", async () => {
        render(<RecipesFilter updateUrl={updateUrl} recipesType="original" />);

        const searchBox = screen.getByRole("textbox");
        const searchValue = "quinoa";
        const expectedValues = [searchValue, `new ${searchValue}`, `qqq${searchValue}aa`];
        
        getIngredientFilterFetch(expectedValues);

        await userEvent.type(searchBox, searchValue);

        expect(screen.getByTestId("loader")).toBeInTheDocument();
        expect(searchBox).toHaveValue(searchValue);

        for (const value of expectedValues) {
            const regex = new RegExp(`^${value}$`)
            const ingredientButton = await within(screen.getByTestId("suggested-ingredients")).findByText(regex);
            expect(ingredientButton).toBeInTheDocument();
        }
    })

    test("should select ingredient on click", async () => {
        render(<RecipesFilter updateUrl={updateUrl} recipesType="original" />);
        
        const searchBox = screen.getByRole("textbox");
        const searchValue = "quinoa";
        const expectedValues = [searchValue, `new ${searchValue}`, `qqq${searchValue}aa`];
        const regex = new RegExp(`^${expectedValues[1]}$`);

        getIngredientFilterFetch(expectedValues);

        await userEvent.type(searchBox, searchValue);
        const suggestionIngredientBtn = await within(screen.getByTestId("suggested-ingredients")).findByText(regex);

        userEvent.click(screen.getByText(regex));
        const selectedIngredientBtn = await within(screen.getByTestId("selected-ingredients")).findByText(regex);

        expect(suggestionIngredientBtn).toHaveClass(/selected/);
        expect(selectedIngredientBtn).toBeInTheDocument();
    })
})

function getIngredientFilterFetch(ingredients: string[]) {
    global.fetch = jest.fn().mockImplementationOnce(() => Promise.resolve({
        ok: true,
        headers: {get: (_type: string) => "application/json"},
        json: async () => ({ ingredients }),
    }))
}