import { CarCard, CustomFilter, Hero, SearchBar, ShowMore } from '@/components';
import Image from 'next/image';
import { fuels, yearsOfProduction } from '@/constants';
import { fetchCars } from '@/utils';
import { HomeProps } from '@/types';

export default async function Home({ searchParams }: HomeProps) {
  const allCars = await fetchCars({
    manufacturer: searchParams.manufacturer || '',
    year: searchParams.year || 2022,
    fuel: searchParams.fuel || '',
    limit: searchParams.limit || 10,
    model: searchParams.model || '',
  });

  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;
  return (
    <main className='overflow-hidden'>
      <Hero />
      <div className='mt-12 padding-x paddying-y max-width' id='discover'>
        <div className='home__text-container'>
          <h1 className='text-4x1 font-extrabold '>Car Catalogue</h1>
          <p>Explore the cars you might like</p>
        </div>

        <div className='home__filters'>
          <SearchBar />

          <div className='home__filter-container'>
            <CustomFilter title='fuel' options={fuels} />
            <CustomFilter title='year' options={yearsOfProduction} />
          </div>
        </div>

        {/* The home page is an async function that pulls from the cars api (utils) allCars is the function to fetch the cars which is called due to the !isDataEmpty array 
        This array checks if there is an array of cars returned, if there is an actual car with the length being more than 1 or anything returned at all. And if it's not empty the first protocol is to render the wrapper which contains each
        car as a card with a make,image etc. The <carCard> tag is passed in a car from the fetch by mapping over each with !allcars?.map((car)) = > which then returns a CarCard for each car*/}
        {!isDataEmpty ? (
          <section>
            <div className='home__cars-wrapper'>
              {allCars?.map((car) => (
                <CarCard car={car} />
              ))}
            </div>

            <ShowMore
              pageNumber={(searchParams.limit || 10) / 10}
              isNext={(searchParams.limit || 10) > allCars.length}
            />
          </section>
        ) : (
          <div className='home__error-containter'>
            <h2 className='text-black text-xl font-bold'>Oops, no results</h2>
            <p>{allCars?.message}</p>
          </div>
        )}
      </div>
    </main>
  );
}
