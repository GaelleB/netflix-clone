import Navbar from '@/app/components/Navbar/Navbar';
import Hero from '@/app/components/Hero/Hero';
import MovieRow from '@/app/components/MovieRow/MovieRow';
import { requests } from '@/utils/tmdbApi';

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <main style={{ backgroundColor: '#141414', paddingTop: '20px' }}>
        <MovieRow title="Tendances actuelles" fetchUrl={requests.fetchTrending} />
        <MovieRow title="Films populaires" fetchUrl={requests.fetchPopularMovies} />
        <MovieRow title="Séries populaires" fetchUrl={requests.fetchPopularSeries} />
        <MovieRow title="Les mieux notés" fetchUrl={requests.fetchTopRated} />
        <MovieRow title="Films d'action" fetchUrl={requests.fetchActionMovies} />
        <MovieRow title="Comédies" fetchUrl={requests.fetchComedyMovies} />
        <MovieRow title="Films d'horreur" fetchUrl={requests.fetchHorrorMovies} />
        <MovieRow title="Romantiques" fetchUrl={requests.fetchRomanceMovies} />
      </main>
    </>
  );
}