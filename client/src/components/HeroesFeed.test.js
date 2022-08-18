import HeroesFeed from "./HeroesFeed";
import HeroesContext from "./Context/HeroesContextProvider";
import {render, screen} from "@testing-library/react";

describe('HeroesFeed', function () {
    const heroes = [{
        images: ["https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png?w=640"],
        nickname: "HeroTest",
        _id:"1"
    }]

    const fn = jest.fn();

    const params = {heroesArr: heroes, resetCounter: fn, setError: fn, loadingState: false,
        counter: 0, updateHeroes: fn, updateCounter: fn}

    test("render cards with heroes when provided", () => {
        render(<HeroesContext.Provider
            value={params}>
            <HeroesFeed />
        </HeroesContext.Provider>)
        const images = screen.getAllByAltText(heroes[0].nickname);
        expect(images.length).toEqual(heroes.length);
    })

    test("render error msg when no heroes provided", () => {
        render(<HeroesContext.Provider
            value={{...params, heroesArr: []}}>
            <HeroesFeed />
        </HeroesContext.Provider>)
        const msg = screen.getByText(/Try adding them with button below/i);
        expect(msg).toBeInTheDocument();
    })
})