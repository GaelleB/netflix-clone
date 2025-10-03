'use client';

import { useState, useEffect } from 'react';
import styles from './MovieRow.module.css';
import MovieCard from '../MovieCard/MovieCard';
import { fetchFromTMDB } from '@/utils/tmdbApi';

export default function MovieRow({ title, fetchUrl }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function loadMovies() {
      const data = await fetchFromTMDB(fetchUrl);
      setMovies(data);
    }
    loadMovies();
  }, [fetchUrl]);

  if (!movies.length) return null;

  return (
    <div className={styles.row}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.movies}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
