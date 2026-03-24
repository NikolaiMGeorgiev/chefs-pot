import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import RecipeSummary from "../../src/components/recipes/RecipeSummary"
import { recipesSummaryData } from "../data/recipeSummaryData"

describe("Recipe Summary", () => {
    test("should render recipe summary", () => {
        const recipeData = recipesSummaryData[0];
        const ingredients = recipeData.ingredients.map(ingredient => ingredient.name);
        const spices = recipeData.spices.map(ingredient => ingredient.name);

        render(
            <MemoryRouter>
                <RecipeSummary
                    key={recipeData.id}
                    type="original"
                    {...recipeData}
                />
            </MemoryRouter>
        );

        expect(screen.getByText(recipeData.title)).toBeInTheDocument();
        
        [...ingredients, ...spices].forEach(ingredient => {
            const regex = new RegExp(`^${ingredient}$`);
            expect(screen.getByText(regex)).toBeInTheDocument()
        });
    })
})