import {render, screen} from "@testing-library/react";
import NewHeroForm from "./NewHeroForm";



describe("NewHeroForm", () => {
    const hero = {
        images: ["https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png?w=640"],
        nickname: "nickname",
        real_name: "real name",
        origin_description: "origin description",
        superpowers: "superpowers",
        catch_phrase: "catch_phrase"
    }

    test("render all inputs", () => {
        render(<NewHeroForm/>)

        const inputs = screen.getAllByRole("textbox");
        expect(inputs.length).toEqual(5);
    })

    test("render provided data", () => {
        render(<NewHeroForm hero={hero}/>)

        const nickname = screen.getByLabelText(/Nickname/)
        expect(nickname.value).toEqual(hero.nickname)

        const real_name = screen.getByLabelText(/Real Name/)
        expect(real_name.value).toEqual(hero.real_name)

        const origin_description = screen.getByLabelText(/Origin/)
        expect(origin_description.value).toEqual(hero.origin_description)

        const superpowers = screen.getByLabelText(/Superpowers/)
        expect(superpowers.value).toEqual(hero.superpowers)

        const catch_phrase = screen.getByLabelText(/Catch Phrase/)
        expect(catch_phrase.value).toEqual(hero.catch_phrase)

        const image = screen.getByAltText(/nickname/i)
        expect(image).toBeInTheDocument();
    })
})