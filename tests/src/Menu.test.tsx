import { describe } from "node:test";
import { fireEvent, render, screen } from '@testing-library/react';
import Menu, { linksData } from "../../src/components/common/Menu";
import { MemoryRouter, Route, Routes } from "react-router-dom";

describe("Menu", () => {
    test("should expand", () => {
        render(
            <MemoryRouter>
                <Menu/>
            </MemoryRouter>
        );

        const expandButton = screen.getByRole("button");

        expect(expandButton.getAttribute("aria-expanded")).toBe("false");
        fireEvent.click(expandButton);
        expect(expandButton.getAttribute("aria-expanded")).toBe("true");
    })

    test("should collapse", () => {
        render(
            <MemoryRouter>
                <Menu/>
            </MemoryRouter>
        );

        const expandButton = screen.getByRole("button");

        fireEvent.click(expandButton);
        fireEvent.click(expandButton);
        expect(expandButton.getAttribute("aria-expanded")).toBe("false");
    })

    test("link should be active", () => {
        render(
            <MemoryRouter>
                <Menu/>
            </MemoryRouter>
        );

        const expandButton = screen.getByRole("button");
        const links = screen.getAllByRole("link");

        expect(links[0]).toHaveClass("active");
        fireEvent.click(expandButton);

        fireEvent.click(links[1]);
        expect(links[0]).not.toHaveClass("active");
        expect(links[1]).toHaveClass("active");
    })

    test("link should navigate to page", () => {
        render(
            <MemoryRouter>
                <Menu/>
                <Routes>
                    <Route path={Object.keys(linksData)[0]} element="Current page" />
                    <Route path={Object.keys(linksData)[1]} element="New page" />
                </Routes>
            </MemoryRouter>
        );

        const expandButton = screen.getByRole("button");
        const links = screen.getAllByRole("link");

        fireEvent.click(expandButton);
        expect(screen.getByText("Current page")).toBeInTheDocument();

        fireEvent.click(links[1]);
        expect(screen.queryByText("Current page")).not.toBeInTheDocument();
        expect(screen.getByText("New page")).toBeInTheDocument();
    })
})