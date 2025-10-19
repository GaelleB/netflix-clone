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
  const [scrollProgress, setScrollProgress] = useState(0);
  const moviesRef = useRef(null);
  const hoverTimeoutRef = useRef(null);

  useEffect(() => {
    async function loadMovies() {
      const data = await fetchFromTMDB(fetchUrl);
      // Limiter à 30 films (5 segments x 6 cards) et les dupliquer pour créer un effet de boucle infinie
      const limitedData = data.slice(0, 30);
      setMovies([...limitedData, ...limitedData]);
    }
    loadMovies();
  }, [fetchUrl]);

  useEffect(() => {
    if (movies.length > 0) {
      setTimeout(() => {
        checkArrows();
        updateVisibleCards();
      }, 100);
    }
  }, [movies]);

  useEffect(() => {
    const handleResize = () => {
      checkArrows();
      updateVisibleCards();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [movies]);

  const checkArrows = () => {
    if (!moviesRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = moviesRef.current;

    // Pour un carrousel infini, toujours afficher les deux flèches
    setShowLeftArrow(true);
    setShowRightArrow(true);

    // Calculer la progression du scroll pour un carrousel infini
    // On normalise par rapport à la moitié du contenu (car les films sont dupliqués)
    const maxScroll = scrollWidth - clientWidth;
    const halfWidth = maxScroll / 2;

    // Normaliser scrollLeft pour qu'il boucle entre 0 et halfWidth
    const normalizedScrollLeft = scrollLeft % halfWidth;
    const progress = halfWidth > 0 ? normalizedScrollLeft / halfWidth : 0;
    setScrollProgress(progress);
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
    const { scrollLeft, scrollWidth, clientWidth } = moviesRef.current;

    // La moitié du contenu (car on a dupliqué les films)
    const halfWidth = (scrollWidth - clientWidth) / 2;

    // Scroll normal
    moviesRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });

    setTimeout(() => {
      const newScrollLeft = moviesRef.current.scrollLeft;

      // Si on dépasse la moitié (fin de la première série), revenir au début sans animation
      if (newScrollLeft >= halfWidth + scrollAmount) {
        moviesRef.current.scrollTo({
          left: newScrollLeft - halfWidth,
          behavior: 'instant'
        });
      }
      // Si on est avant le début, aller à la fin sans animation
      else if (newScrollLeft <= 10 && direction === 'left') {
        moviesRef.current.scrollTo({
          left: newScrollLeft + halfWidth,
          behavior: 'instant'
        });
      }

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

  const handleArrowHover = () => {
    setHoveredCard(null);
    setCanHover(true);
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
  };

  if (!movies.length) return null;

  // Calculer le nombre de segments (chaque segment = 6 cards)
  // On divise par 2 car les films sont dupliqués pour le carrousel infini
  const totalSegments = Math.ceil(movies.length / 2 / 6);

  return (
    <div className={styles.row}>
      <div className={styles.titleWrapper}>
        <h2 className={styles.title}>
          {title}
          <span className={styles.exploreText}>Tout explorer</span>
          <span className={styles.chevron}>›</span>
        </h2>

        {/* Barre de progression */}
        <div className={styles.progressBarContainer}>
          {Array.from({ length: totalSegments }).map((_, index) => {
            const segmentProgress = scrollProgress * totalSegments;
            const isActive = segmentProgress >= index;
            return (
              <div
                key={index}
                className={`${styles.progressSegment} ${isActive ? styles.progressSegmentActive : ''}`}
              />
            );
          })}
        </div>
      </div>

      <div className={styles.rowContainer}>
        {showLeftArrow && (
          <button
            className={`${styles.arrow} ${styles.arrowLeft}`}
            onClick={() => scroll('left')}
            onMouseEnter={handleArrowHover}
            aria-label="Scroll left"
          >
            <FaChevronLeft />
          </button>
        )}

        <div
          className={`${styles.movies} ${hoveredCard !== null ? styles.moviesLocked : ''}`}
          ref={moviesRef}
          onScroll={() => {
            checkArrows();
            updateVisibleCards();
          }}
        >
          {movies.map((movie, index) => (
            <MovieCard
              key={`${movie.id}-${index}`}
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
            onMouseEnter={handleArrowHover}
            aria-label="Scroll right"
          >
            <FaChevronRight />
          </button>
        )}
      </div>
    </div>
  );
}
