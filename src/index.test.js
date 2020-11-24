import { render, screen,fireEvent, waitFor } from "@testing-library/react";
import App from "../pages/index";

jest.mock(App.getNextGuy);

const People = {"name":"Luke Skywalker","height":"172","mass":"77","hair_color":"blond","skin_color":"fair","eye_color":"blue","birth_year":"19BBY","gender":"male","homeworld":"http://swapi.dev/api/planets/1/","films":["http://swapi.dev/api/films/1/","http://swapi.dev/api/films/2/","http://swapi.dev/api/films/3/","http://swapi.dev/api/films/6/"],"species":[],"vehicles":["http://swapi.dev/api/vehicles/14/","http://swapi.dev/api/vehicles/30/"],"starships":["http://swapi.dev/api/starships/12/","http://swapi.dev/api/starships/22/"],"created":"2014-12-09T13:50:51.644000Z","edited":"2014-12-20T21:17:56.891000Z","url":"http://swapi.dev/api/people/1/"}
describe("Index Page", () => {
  it("renders without crashing", () => {
   render(<App people={People}/>);

  });
});

describe("Initial Load from getStaticProps (Pre-render Server Side)", () => {
  it("Check for Content", () => {
    render(<App people={People}/>);
    Object.keys(People).map((val, k) => {
      expect(screen.findByText(People[`${val}`])).toBeTruthy();
    });
  });
});

test('Click Next and load data', async () => {
  render(<App people={People} />)

  fireEvent.click(screen.getByTestId('next'))

  await waitFor(() => screen.getByText('Loading people ....'))
  const alldetails = screen.getAllByRole('heading');
  expect(alldetails[0]).toHaveTextContent('name');
  expect(alldetails[1]).toHaveTextContent('height');
})

test('Click planets and load data', async () => {
  render(<App people={People} />)

  fireEvent.click(screen.getByTestId('planets'))

  await waitFor(() => screen.getByText('Loading planets ....'))
  const alldetails = screen.getAllByRole('heading');
  expect(alldetails[0]).toHaveTextContent('name');
  expect(alldetails[1]).toHaveTextContent('height');
})

test('Click species and load data', async () => {
  render(<App people={People} />)

  fireEvent.click(screen.getByTestId('species'))

  await waitFor(() => screen.getByText('Loading species ....'))
  const alldetails = screen.getAllByRole('heading');
  expect(alldetails[0]).toHaveTextContent('name');
  expect(alldetails[1]).toHaveTextContent('height');
})
