import { useEffect, useState } from 'react';
import Link from "next/link";
import axios from 'axios';

function Index({ people }: { people: JSON }) {
  const [loading, setLoading] = useState(false);
  const [peopleID, setPeopleID] = useState(1);
  const [peopleInfo, setPeopleInfo] = useState(people);
  const [apiType, setApiType] = useState('people');

  const handleClick = (e: { preventDefault: () => void; target: { value: any; }; }) => {
    setPeopleID(1);
    setLoading(true);
    setApiType(`${e.target.value}`);
  }

  const nextGuy = (e: { preventDefault: () => void; target: { value: any; }; }) => {
    setLoading(true);
    (e.target.value === 'next') ? setPeopleID(peopleID + 1) : setPeopleID(peopleID - 1);

  }

  const getNextGuy = async () => {
    console.log("nextGuy", peopleID);

    try {
      const res = await axios.get('https://swapi.dev/api/' + apiType + '/' + peopleID);
      setPeopleInfo(res.data);
      setLoading(false);
    }
    catch (error) {
      setPeopleID(1);
      setLoading(false);
    }

  }

  useEffect(() => {
    getNextGuy();
  }, [peopleID, apiType]);

  return (
    <div>
      <hr></hr>
      <p>{apiType} List</p>
      <hr></hr>
      {Object.keys(peopleInfo).map((val, k) => {
        if (val === "homeworld" && peopleInfo[`${val}`])
          return (<h4 key={k}> {val}:
            <Link href={`/planets/[planetId]`} as={`/planets/${peopleInfo[`${val}`].charAt(peopleInfo[`${val}`].length - 2)}`}>
              <a>
                {peopleInfo[`${val}`]}
              </a>
            </Link>
          </h4>)
        else if (val === "species" && peopleInfo[`${val}`].length > 0)
          return (<h4 key={k}> {val}:
            <Link href={`/species/[speciesId]`} as={`/species/${peopleInfo[`${val}`][0].charAt(peopleInfo[`${val}`][0].length - 2)}`}>
              <a>
                {peopleInfo[`${val}`]}
              </a>
            </Link>
          </h4>)
        else
          return (<h4 key={k}>{val}: {peopleInfo[`${val}`]}</h4>)
      })
      }


      <hr></hr>
      { loading === false &&
        <div>
          {peopleID > 1 && <button onClick={nextGuy} id="next" value="prev">Previous {apiType}</button>}
          <button id="next" onClick={nextGuy} value="next" data-testid="next">Next {apiType}</button><br></br>
          {apiType !== "people" && <button id="people" onClick={handleClick} value="people">People</button>}
          {apiType !== "planets" && <button id="planet" onClick={handleClick} data-testid="planets" value="planets">Planet</button>}
          {apiType !== "species" && <button id="species" onClick={handleClick} data-testid="species" value="species">Species</button>}
        </div>
      }

      {loading === true && <div>Loading {apiType} ....</div>}
      <p>React Hooks Single page pagination demonstration</p>
      <small>*Click Links inside to view NextJS dynamic routing from People List </small>
      <hr></hr>
    </div>
  )
}

export async function getStaticProps(ctx: Object) {
  const res = await axios.get('https://swapi.dev/api/people/1').catch(error => error);
  return {
    props: {
      people: (!res.isAxiosError) ? res.data : res.message,
    },
  }
}

export default Index
