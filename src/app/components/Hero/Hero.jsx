import styles from './Hero.module.css';
import { FaPlay, FaInfoCircle } from 'react-icons/fa';

export default function Hero() {
  return (
    <div className={styles.hero}>
      <div className={styles.heroBackground}>
        <img
          src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&q=80"
          alt="Hero background"
          className={styles.backgroundImage}
        />
        <div className={styles.gradientOverlay}></div>
      </div>

      <div className={styles.heroContent}>
        <div className={styles.badge}>
          <img
            src="/images/netflix-symbol.png"
            alt="Netflix N logo"
            className={styles.nLogo}
          />
          <span className={styles.badgeText}>SÉRIE</span>
        </div>

        <h1 className={styles.title}>Stranger Things</h1>

        <p className={styles.description}>
          Quand un jeune garçon disparaît, une petite ville découvre une affaire
          mystérieuse, des expériences secrètes, des forces surnaturelles terrifiantes
          et une fillette extraordinaire.
        </p>

        <div className={styles.buttonContainer}>
          <button className={styles.playButton}>
            <FaPlay className={styles.icon} />
            <span>Lecture</span>
          </button>
          <button className={styles.infoButton}>
            <FaInfoCircle className={styles.icon} />
            <span>Plus d'infos</span>
          </button>
        </div>

        <div className={styles.ageRating}>16+</div>
      </div>
    </div>
  );
}
