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

// Fonction pour récupérer les détails d'un film ou série
export async function fetchMovieDetails(id, mediaType = 'movie') {
  try {
    const endpoint = `/${mediaType}/${id}?api_key=${API_KEY}&language=fr-FR`;
    const response = await fetch(`${BASE_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error('Erreur lors du fetch des détails');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erreur détails TMDB:', error);
    return null;
  }
}

// Fonction pour récupérer le logo d'un film ou série
export async function fetchMovieLogo(id, mediaType = 'movie') {
  try {
    const endpoint = `/${mediaType}/${id}/images?api_key=${API_KEY}`;
    const response = await fetch(`${BASE_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error('Erreur lors du fetch du logo');
    }
    const data = await response.json();

    // Priorité : français puis anglais puis n'importe quelle langue
    const frLogo = data.logos?.find(logo => logo.iso_639_1 === 'fr');
    const enLogo = data.logos?.find(logo => logo.iso_639_1 === 'en');
    const anyLogo = data.logos?.[0];

    const logo = frLogo || enLogo || anyLogo;

    return logo ? `https://image.tmdb.org/t/p/w500${logo.file_path}` : null;
  } catch (error) {
    console.error('Erreur logo TMDB:', error);
    return null;
  }
}
