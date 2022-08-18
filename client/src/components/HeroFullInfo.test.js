import HeroFullInfo from "./HeroFullInfo";
import {render, screen} from "@testing-library/react";

describe("HeroFullInfo", () => {

    const hero = {
        images: ["https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png?w=640"],
        nickname: "HeroTest"
    }

    test("render nickname and image when provided", () => {
        render(<HeroFullInfo item={hero}/>)
        const element = screen.getByText(hero.nickname);
        expect(element).toBeInTheDocument();
        const image = screen.getByAltText(hero.nickname);
        expect(image).toBeInTheDocument();
    })

    test("render all sections when not provided", () => {
        render(<HeroFullInfo />)
        const fields = screen.getAllByRole("heading");
        expect(fields.length).toEqual(5);
    })
})