import { fireEvent, render, screen } from "@testing-library/react";
import RecipeTypeSelector, { recipeTypes } from "../../src/components/recipes/RecipeTypeSelector";

const setSelectedTypes = jest.fn();
const typeTexts = recipeTypes.map(type => type.text);

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Recipe Type Selector", () => {
    test("should show all types", () => {
        const selectedTypes =  recipeTypes.map(type => type.type);
        
        render(<RecipeTypeSelector selectedTypes={selectedTypes} setSelectedTypes={setSelectedTypes} />);

        typeTexts.forEach(type => {
            const regex = new RegExp(`^${type}$`);
            expect(screen.getByText(regex)).toBeInTheDocument();
        })
    })

    test("should set only selected types as active", () => {
        const selectedTypes = [recipeTypes[1].type];
        
        render(<RecipeTypeSelector selectedTypes={selectedTypes} setSelectedTypes={setSelectedTypes} />);

        recipeTypes.forEach(recipeType => {
            const regex = new RegExp(`^${recipeType.text}$`);
            if (selectedTypes.some(type => type == recipeType.type)) {
                expect(screen.getByText(regex).parentNode).toHaveClass("selected");
            } else {
                expect(screen.getByText(regex).parentNode).not.toHaveClass("selected");
            }
        })
    })

    test("should unselect a selected type on click", async () => {
        const allTypes = [...recipeTypes];
        allTypes.pop();
        const selectedTypes = allTypes.map(type => type.type);
        
        render(<RecipeTypeSelector selectedTypes={selectedTypes} setSelectedTypes={setSelectedTypes} />);

        const firstTypeButton = screen.getAllByRole("button")[0];
        const expectedSelectedTypes = selectedTypes.filter(type => type != selectedTypes[0])
        
        fireEvent.click(firstTypeButton);
        expect(setSelectedTypes).toHaveBeenCalledTimes(1);
        expect(setSelectedTypes).toHaveBeenCalledWith(expectedSelectedTypes);
    })

    test("should select an unselected type on click", async () => {
        const allTypes = [...recipeTypes];
        allTypes.pop();
        const selectedTypes = allTypes.map(type => type.type);
        
        render(<RecipeTypeSelector selectedTypes={selectedTypes} setSelectedTypes={setSelectedTypes} />);

        const lastTypeButton = screen.getAllByRole("button")[selectedTypes.length];
        const expectedSelectedTypes = [...selectedTypes, recipeTypes[selectedTypes.length].type]
        
        fireEvent.click(lastTypeButton);
        expect(setSelectedTypes).toHaveBeenCalledTimes(1);
        expect(setSelectedTypes).toHaveBeenCalledWith(expectedSelectedTypes);
    })
})