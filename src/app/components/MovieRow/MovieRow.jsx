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
  const [hoveredCard, setHoveredCard] = useState(null);
  const [canHover, setCanHover] = useState(true);
  const [visibleCards, setVisibleCards] = useState({ first: -1, last: -1 });
  const moviesRef = useRef(null);
  const hoverTimeoutRef = useRef(null);

  useEffect(() => {
    async function loadMovies() {
      const data = await fetchFromTMDB(fetchUrl);
      setMovies(data);
    }
    loadMovies();
  }, [fetchUrl]);

  useEffect(() => {
    checkArrows();
    updateVisibleCards();
  }, [movies]);

  const checkArrows = () => {
    if (!moviesRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = moviesRef.current;

    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
  };

  const updateVisibleCards = () => {
    if (!moviesRef.current) return;

    const container = moviesRef.current;
    const cards = Array.from(container.children);
    const containerRect = container.getBoundingClientRect();
    
    let firstVisible = -1;
    let lastVisible = -1;

    cards.forEach((card, index) => {
      const cardRect = card.getBoundingClientRect();
      
      // Une carte est visible si au moins 75% de sa largeur est visible
      const cardLeft = cardRect.left - containerRect.left;
      const cardRight = cardRect.right - containerRect.left;
      const cardWidth = cardRect.width;
      const visibleWidth = Math.min(cardRight, containerRect.width) - Math.max(cardLeft, 0);
      const visibilityRatio = visibleWidth / cardWidth;
      
      if (visibilityRatio >= 0.75) {
        if (firstVisible === -1) firstVisible = index;
        lastVisible = index;
      }
    });
    
    setVisibleCards({ first: firstVisible, last: lastVisible });
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

    setTimeout(() => {
      checkArrows();
      updateVisibleCards();
    }, 300);
  };

  const handleCardHover = (movieId) => {
    if (!canHover) return;

    if (hoveredCard !== null && hoveredCard !== movieId) {
      setCanHover(false);
      setHoveredCard(null);

      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }

      hoverTimeoutRef.current = setTimeout(() => {
        setHoveredCard(movieId);
        setCanHover(true);
      }, 300);
    } else {
      setHoveredCard(movieId);
    }
  };

  const handleCardLeave = () => {
    setHoveredCard(null);
    setCanHover(true);
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
  };

  if (!movies.length) return null;

  return (
    <div className={styles.row}>
      <div className={styles.titleWrapper}>
        <h2 className={styles.title}>
          {title}
          <span className={styles.exploreText}>Tout explorer</span>
          <span className={styles.chevron}>›</span>
        </h2>
      </div>
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
          onScroll={() => {
            checkArrows();
            updateVisibleCards();
          }}
        >
          {movies.map((movie, index) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              isHovered={hoveredCard === movie.id}
              onHover={() => handleCardHover(movie.id)}
              onLeave={handleCardLeave}
              isFirst={index === visibleCards.first}
              isLast={index === visibleCards.last}
            />
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
