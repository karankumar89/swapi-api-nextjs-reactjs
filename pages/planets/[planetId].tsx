import Link from "next/link";
import axios from 'axios';

function Planet({ planet }: { planet: JSON }) {
  return (
    <div>
      <Link href="/">
        <a>Back to home</a>
      </Link>
      {Object.keys(planet).map((val, k) => {
        if (val === "residents") {
          const peopleList = [];
          for (const [index, value] of planet[val].entries()) {
            peopleList.push(
              <li key={index}>
                <Link href={`/people/[planetId]`} as={`/people/${value.charAt(value.length - 2)}`}>
                  {value}
                </Link>
              </li>
            )
          }
          return (<h4 key={k}>{val}:<ul>{peopleList}</ul></h4>)
        } else
          return (<h4 key={k}>{val}: {planet[`${val}`]}</h4>)
      })
      }
    </div>
  )
}

Planet.getInitialProps = async (ctx: Object) => {
  const { planetId }: { planetId: string } = ctx.query;
  const res = await axios.get('https://swapi.dev/api/planets/' + planetId).catch(error => error);
  const planet = (!res.isAxiosError) ? await res.data : await res.message;
  return { planet };
}

export default Planet;
