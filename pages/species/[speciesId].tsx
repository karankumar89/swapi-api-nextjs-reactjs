import Link from "next/link";
import axios from 'axios';

function Species({ species }: { species: JSON }) {
    return (
        <div>
            <Link href="/">
                <a>Back to home</a>
            </Link>
            {Object.keys(species).map((val, k) => {
                if (val === "people") {
                    const peopleList = [];
                    for (const [index, value] of species[val].entries()) {
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
                    return (<h4 key={k}>{val}: {species[`${val}`]}</h4>)
            })
            }
        </div>
    )
}

Species.getInitialProps = async (ctx: Object) => {
    const { speciesId } : { speciesId: string }= ctx.query;
    const res = await axios.get('https://swapi.dev/api/species/' + speciesId).catch(error => error);
    const species = (!res.isAxiosError) ? await res.data : await res.message;
    return { species };
}

export default Species;