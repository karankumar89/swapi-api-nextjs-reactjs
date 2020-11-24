import Link from "next/link";
import axios, { AxiosInstance, AxiosPromise, AxiosResponse } from 'axios';

function People({ people }: { people: JSON }) {
  return (
    <div>
      <Link href="/">
        <a>Back to home</a>
      </Link>
      {Object.keys(people).map((val, k) => {
        if (val === "homeworld" && people[`${val}`])
          return (<h4 key={k}> {val}:
            <Link href={`/planets/[planetId]`} as={`/planets/${people[`${val}`].charAt(people[`${val}`].length - 2)}`}>
              <a>
                {people[`${val}`]}
              </a>
            </Link>
          </h4>)
        else if (val === "species" && people[`${val}`].length > 0)
          return (<h4 key={k}> {val}:
            <Link href={`/species/[speciesId]`} as={`/species/${people[`${val}`][0].charAt(people[`${val}`][0].length - 2)}`}>
              <a>
                {people[`${val}`]}
              </a>
            </Link>
          </h4>)
        else
          return (<h4 key={k}>{val}: {people[`${val}`]}</h4>)
      })
      }
    </div>
  )
}

People.getInitialProps = async (ctx: Object) => {
  const { peopleId }: { peopleId: string } = ctx.query;
  const res  = await axios.get('https://swapi.dev/api/people/' + peopleId).catch(error => error);
  const people = (!res.isAxiosError) ? await res.data : await res.message;
  return { people };
}

export default People;
