'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './MovieRow.module.css';
import MovieCard from '../MovieCard/MovieCard';
import { fetchFromTMDB } from '@/utils/tmdbApi';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function MovieRow({ title, fetchUrl }) {
  const [movies, setMovies] = useState([]);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const moviesRef = useRef(null);

  useEffect(() => {
    async function loadMovies() {
      const data = await fetchFromTMDB(fetchUrl);
      setMovies(data);
    }
    loadMovies();
  }, [fetchUrl]);

  useEffect(() => {
    checkArrows();
  }, [movies]);

  const checkArrows = () => {
    if (!moviesRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = moviesRef.current;

    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
  };

  const scroll = (direction) => {
    if (!moviesRef.current) return;

    const firstCard = moviesRef.current.querySelector('div');
    if (!firstCard) return;

    const cardWidth = firstCard.offsetWidth;
    const gap = 8;
    const scrollAmount = (cardWidth + gap) * 6;

    moviesRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });

    setTimeout(checkArrows, 300);
  };

  if (!movies.length) return null;

  return (
    <div className={styles.row}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.rowContainer}>
        {showLeftArrow && (
          <button
            className={`${styles.arrow} ${styles.arrowLeft}`}
            onClick={() => scroll('left')}
            aria-label="Scroll left"
          >
            <FaChevronLeft />
          </button>
        )}

        <div
          className={styles.movies}
          ref={moviesRef}
          onScroll={checkArrows}
        >
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        {showRightArrow && (
          <button
            className={`${styles.arrow} ${styles.arrowRight}`}
            onClick={() => scroll('right')}
            aria-label="Scroll right"
          >
            <FaChevronRight />
          </button>
        )}
      </div>
    </div>
  );
}
