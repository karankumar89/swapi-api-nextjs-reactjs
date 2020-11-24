import { render, screen,fireEvent, waitFor } from "@testing-library/react";
import App from "../pages/people/[peopleId]";


const People = {"name":"C-3PO","height":"167","mass":"75","hair_color":"n/a","skin_color":"gold","eye_color":"yellow","birth_year":"112BBY","gender":"n/a","homeworld":"http://swapi.dev/api/planets/1/","films":["http://swapi.dev/api/films/1/","http://swapi.dev/api/films/2/","http://swapi.dev/api/films/3/","http://swapi.dev/api/films/4/","http://swapi.dev/api/films/5/","http://swapi.dev/api/films/6/"],"species":["http://swapi.dev/api/species/2/"],"vehicles":[],"starships":[],"created":"2014-12-10T15:10:51.357000Z","edited":"2014-12-20T21:17:50.309000Z","url":"http://swapi.dev/api/people/2/"}
describe("People page", () => {
  it("renders without crashing", () => {
   render(<App people={People}/>);

  });
});

describe("getInitialProps", () => {
  it("Check for Content", () => {
    render(<App people={People}/>);
    waitFor(() => screen.getByText('Back to home'))
    Object.keys(People).map((val, k) => {
      expect(screen.findByText(People[`${val}`])).toBeTruthy();
    });
  });
});

