import HeroCard from "./HeroCard";
import {render, screen} from "@testing-library/react";

describe('HeroCard', function () {
    const hero = {
        images: ["https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png?w=640"],
        nickname: "HeroTest"
    }

    test("render nickname and image when provided", () => {
        render(<HeroCard hero={hero}/>)
        const element = screen.getByText(hero.nickname);
        expect(element).toBeInTheDocument();
        const image = screen.getByAltText(hero.nickname);
        expect(image).toBeInTheDocument();
    })
});