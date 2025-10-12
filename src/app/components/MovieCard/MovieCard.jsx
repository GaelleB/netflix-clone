'use client';

import { useState, useEffect } from 'react';
import styles from './MovieCard.module.css';
import { IMAGE_BASE_URL, fetchMovieDetails, fetchMovieLogo } from '@/utils/tmdbApi';

// Mapping des genres TMDB
const genreMap = {
  28: 'Action', 12: 'Aventure', 16: 'Animation', 35: 'Comédie', 80: 'Crime',
  99: 'Documentaire', 18: 'Drame', 10751: 'Familial', 14: 'Fantastique',
  36: 'Histoire', 27: 'Horreur', 10402: 'Musique', 9648: 'Mystère',
  10749: 'Romance', 878: 'Science-Fiction', 10770: 'Téléfilm', 53: 'Thriller',
  10752: 'Guerre', 37: 'Western'
};

// Fonction pour formater la durée
function formatRuntime(minutes) {
  if (!minutes) return '';
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours > 0) {
    return `${hours}h ${mins}min`;
  }
  return `${mins}min`;
}

export default function MovieCard({ movie, isHovered = false, onHover, onLeave, isFirst = false, isLast = false }) {
  const [runtime, setRuntime] = useState(null);
  const [logo, setLogo] = useState(null);
  const imagePath = movie.backdrop_path || movie.poster_path;
  const title = movie.title || movie.name || 'Sans titre';
  const year = movie.release_date || movie.first_air_date;
  const yearDisplay = year ? new Date(year).getFullYear() : '';
  const mediaType = movie.title ? 'movie' : 'tv';

  // Récupérer les 2 premiers genres
  const genres = movie.genre_ids
    ? movie.genre_ids.slice(0, 2).map(id => genreMap[id]).filter(Boolean).join(' • ')
    : '';

  // Charger les détails pour obtenir la durée et le logo
  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      const [details, logoUrl] = await Promise.all([
        fetchMovieDetails(movie.id, mediaType),
        fetchMovieLogo(movie.id, mediaType)
      ]);
      if (isMounted) {
        if (details) {
          setRuntime(details.runtime || details.episode_run_time?.[0]);
        }
        if (logoUrl) {
          setLogo(logoUrl);
        }
      }
    }
    loadData();
    return () => { isMounted = false; };
  }, [movie.id, mediaType]);

  if (!imagePath) return null;

  return (
    <div
      className={styles.cardWrapper}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div
        className={`${styles.card} ${isHovered ? styles.cardHovered : ''} ${isFirst ? styles.cardFirst : ''} ${isLast ? styles.cardLast : ''}`}
      >
        <div className={styles.imageSection}>
        <img
          src={`${IMAGE_BASE_URL}${imagePath}`}
          alt={title}
          className={styles.image}
        />
        {logo ? (
          <img
            src={logo}
            alt={title}
            className={styles.titleLogo}
          />
        ) : (
          <h3 className={styles.title}>{title}</h3>
        )}
      </div>

      <div className={styles.infoSection}>
        <div className={styles.buttons}>
          <button className={styles.playButton} aria-label="Lecture">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 2.69127C5 1.93067 5.81547 1.44851 6.48192 1.81506L23.4069 11.1238C24.0977 11.5037 24.0977 12.4963 23.4069 12.8762L6.48192 22.1849C5.81546 22.5515 5 22.0693 5 21.3087V2.69127Z" fill="currentColor"></path>
            </svg>
          </button>
          <button className={styles.iconButton} aria-label="Ajouter à ma liste">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M11 11V2H13V11H22V13H13V22H11V13H2V11H11Z" fill="currentColor"></path>
            </svg>
          </button>
          <button className={styles.iconButton} aria-label="J'aime">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.696 8.7732C10.8947 8.45534 11 8.08804 11 7.7132V4H11.8377C12.7152 4 13.4285 4.55292 13.6073 5.31126C13.8233 6.22758 14 7.22716 14 8C14 8.58478 13.8976 9.1919 13.7536 9.75039L13.4315 11H14.7219H17.5C18.3284 11 19 11.6716 19 12.5C19 12.5929 18.9917 12.6831 18.976 12.7699L18.8955 13.2149L19.1764 13.5692C19.3794 13.8252 19.5 14.1471 19.5 14.5C19.5 14.8529 19.3794 15.1748 19.1764 15.4308L18.8955 15.7851L18.976 16.2301C18.9917 16.317 19 16.4071 19 16.5C19 16.9901 18.766 17.4253 18.3994 17.7006L18 18.0006L18 18.5001C17.9999 19.3285 17.3284 20 16.5 20H14H13H12.6228C11.6554 20 10.6944 19.844 9.77673 19.5382L8.28366 19.0405C7.22457 18.6874 6.11617 18.5051 5 18.5001V13.7543L7.03558 13.1727C7.74927 12.9688 8.36203 12.5076 8.75542 11.8781L10.696 8.7732ZM10.5 2C9.67157 2 9 2.67157 9 3.5V7.7132L7.05942 10.8181C6.92829 11.0279 6.72404 11.1817 6.48614 11.2497L4.45056 11.8313C3.59195 12.0766 3 12.8613 3 13.7543V18.5468C3 19.6255 3.87447 20.5 4.95319 20.5C5.87021 20.5 6.78124 20.6478 7.65121 20.9378L9.14427 21.4355C10.2659 21.8094 11.4405 22 12.6228 22H13H14H16.5C18.2692 22 19.7319 20.6873 19.967 18.9827C20.6039 18.3496 21 17.4709 21 16.5C21 16.4369 20.9983 16.3742 20.995 16.3118C21.3153 15.783 21.5 15.1622 21.5 14.5C21.5 13.8378 21.3153 13.217 20.995 12.6883C20.9983 12.6258 21 12.5631 21 12.5C21 10.567 19.433 9 17.5 9H15.9338C15.9752 8.6755 16 8.33974 16 8C16 6.98865 15.7788 5.80611 15.5539 4.85235C15.1401 3.09702 13.5428 2 11.8377 2H10.5Z" fill="currentColor"></path>
            </svg>
          </button>
          <button className={styles.iconButton} aria-label="Plus d'infos">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 15.5859L19.2928 8.29297L20.7071 9.70718L12.7071 17.7072C12.5195 17.8947 12.2652 18.0001 12 18.0001C11.7347 18.0001 11.4804 17.8947 11.2928 17.7072L3.29285 9.70718L4.70706 8.29297L12 15.5859Z" fill="currentColor"></path>
            </svg>
          </button>
        </div>

        <div className={styles.metadata}>
          <div className={styles.info}>
            {yearDisplay && <span className={styles.year}>{yearDisplay}</span>}
            {yearDisplay && runtime && <span className={styles.separator}>|</span>}
            {runtime && <span className={styles.duration}>{formatRuntime(runtime)}</span>}
            {(yearDisplay || runtime) && <span className={styles.separator}>|</span>}
            <span className={styles.quality}>HD</span>
          </div>
          {genres && <p className={styles.genres}>{genres}</p>}
        </div>
      </div>
      </div>
    </div>
  );
}
