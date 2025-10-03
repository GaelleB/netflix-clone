import styles from './MovieCard.module.css';
import { IMAGE_BASE_URL } from '@/utils/tmdbApi';

export default function MovieCard({ movie }) {
  const imagePath = movie.backdrop_path || movie.poster_path;

  if (!imagePath) return null;

  return (
    <div className={styles.card}>
      <img
        src={`${IMAGE_BASE_URL}${imagePath}`}
        alt={movie.title || movie.name || 'Film'}
        className={styles.image}
      />
    </div>
  );
}
