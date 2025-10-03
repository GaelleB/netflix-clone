const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

// Endpoints TMDB
export const requests = {
  fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=fr-FR`,
  fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213&language=fr-FR`,
  fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=fr-FR`,
  fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28&language=fr-FR`,
  fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35&language=fr-FR`,
  fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27&language=fr-FR`,
  fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749&language=fr-FR`,
  fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99&language=fr-FR`,
  fetchPopularMovies: `/movie/popular?api_key=${API_KEY}&language=fr-FR`,
  fetchPopularSeries: `/tv/popular?api_key=${API_KEY}&language=fr-FR`,
};

// Fonction pour fetch les données
export async function fetchFromTMDB(endpoint) {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error('Erreur lors du fetch TMDB');
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Erreur TMDB:', error);
    return [];
  }
}
