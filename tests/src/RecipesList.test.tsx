import { fireEvent, render, screen, within } from "@testing-library/react";
import RecipeList from "../../src/components/recipes/RecipesList"
import { recipesSummaryData } from "../data/recipeSummaryData";
import { MemoryRouter } from "react-router-dom";
import { NO_RECIPES } from "../../src/data/texts";

const updateUrl = jest.fn();
const updateCursor = jest.fn()

describe("Recipes List", () => {
    test("should render recipes data", () => {
        render(
            <MemoryRouter>
                <RecipeList 
                    data={recipesSummaryData} 
                    updateUrl={updateUrl} 
                    type="original" 
                    updateCursor={updateCursor} 
                    isLoading={false} 
                />
            </MemoryRouter>
        );

        const recipeSection = screen.getAllByRole("region", {name: "Recipe Ingredients"});

        Object.values(recipesSummaryData).forEach((recipeData, i) => {
            const ingredients = recipeData.ingredients.map(ingredient => ingredient.name);
            const spices = recipeData.spices.map(ingredient => ingredient.name);

            [...ingredients, ...spices].forEach(ingredient => {
                const regex = new RegExp(`^${ingredient}$`);
                expect(within(recipeSection[i]).getByText(regex)).toBeInTheDocument()
            });

            expect(screen.getByText(recipeData.title)).toBeInTheDocument();
        })
    })

    test("should show text when data's empty", () => {
        render(
            <MemoryRouter>
                <RecipeList 
                    data={[]} 
                    updateUrl={updateUrl} 
                    type="original" 
                    updateCursor={updateCursor} 
                    isLoading={false} 
                />
            </MemoryRouter>
        );

        expect(screen.getByText(NO_RECIPES)).toBeInTheDocument();
    })

    test("should show loader when loading", () => {
        render(
            <MemoryRouter>
                <RecipeList 
                    data={[]} 
                    updateUrl={updateUrl} 
                    type="original" 
                    updateCursor={updateCursor} 
                    isLoading={true} 
                />
            </MemoryRouter>
        );

        expect(screen.getByTestId("loader")).toBeInTheDocument();
    })

    test("should load while new data is fetched", () => {
        render(
            <MemoryRouter>
                <RecipeList 
                    data={recipesSummaryData} 
                    updateUrl={updateUrl} 
                    type="original" 
                    updateCursor={updateCursor} 
                    isLoading={true} 
                />
            </MemoryRouter>
        );
        expect(screen.getByTestId("loader")).toBeInTheDocument();
    })

    test("should update cursor when scrolled to bottom", () => {
        render(
            <MemoryRouter>
                <RecipeList 
                    data={recipesSummaryData} 
                    updateUrl={updateUrl} 
                    type="original" 
                    updateCursor={updateCursor} 
                    isLoading={false} 
                />
            </MemoryRouter>
        );

        const scrollableElement = screen.getByTestId("recipes");
        const recipes = Object.values(recipesSummaryData);
        Object.defineProperty(scrollableElement, "scrollTop", { value: 10000 });
        fireEvent.scroll(scrollableElement);
        expect(updateCursor).toHaveBeenCalledTimes(1);
        expect(updateCursor).toHaveBeenCalledWith(recipes[recipes.length - 1].id);
    })
})