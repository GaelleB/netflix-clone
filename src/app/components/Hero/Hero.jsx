'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './Hero.module.css';
import { searchShow, fetchMovieLogo, IMAGE_BASE_URL } from '@/utils/tmdbApi';

export default function Hero() {
  const [showData, setShowData] = useState(null);
  const [logo, setLogo] = useState(null);

  useEffect(() => {
    async function loadBreakingBad() {
      const show = await searchShow('Breaking Bad');
      if (show) {
        setShowData(show);
        const logoUrl = await fetchMovieLogo(show.id, 'tv');
        setLogo(logoUrl);
      }
    }
    loadBreakingBad();
  }, []);
  return (
    <div className={styles.hero}>
      <div className={styles.heroBackground}>
        <img
          src={showData?.backdrop_path ? `${IMAGE_BASE_URL.replace('w500', 'original')}${showData.backdrop_path}` : "https://images.unsplash.com/photo-1594736797933-d0851ba7b724?w=1920&q=80"}
          alt="Hero background"
          className={styles.backgroundImage}
        />
        <div className={styles.gradientOverlay}></div>
      </div>

      <div className={styles.heroContent}>
        <div className={styles.badge}>
          <Image
            src="/images/netflix-symbol.png"
            alt="Netflix N logo"
            className={styles.nLogo}
            width={55}
            height={55}
            priority
          />
          <span className={styles.badgeText}>SÉRIE</span>
        </div>

        {logo ? (
          <img
            src={logo}
            alt="Breaking Bad"
            className={styles.titleLogo}
          />
        ) : (
          <h1 className={styles.title}>{showData?.name || 'Breaking Bad'}</h1>
        )}

        <p className={styles.description}>
          {showData?.overview || 'Un professeur de chimie au lycée se transforme en fabricant de méthamphétamine après avoir appris qu\'il a un cancer des poumons en phase terminale, afin de payer ses frais médicaux et d\'assurer l\'avenir financier de sa famille.'}
        </p>

        <div className={styles.buttonContainer}>
          <button className={styles.playButton}>
            <svg className={styles.icon} viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 2.69127C5 1.93067 5.81547 1.44851 6.48192 1.81506L23.4069 11.1238C24.0977 11.5037 24.0977 12.4963 23.4069 12.8762L6.48192 22.1849C5.81546 22.5515 5 22.0693 5 21.3087V2.69127Z" fill="currentColor"></path>
            </svg>
            <span className={styles.buttonText}>Lecture</span>
          </button>
          <button className={styles.infoButton}>
            <svg className={styles.icon} viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12ZM13 10V18H11V10H13ZM12 8.5C12.8284 8.5 13.5 7.82843 13.5 7C13.5 6.17157 12.8284 5.5 12 5.5C11.1716 5.5 10.5 6.17157 10.5 7C10.5 7.82843 11.1716 8.5 12 8.5Z" fill="currentColor"></path>
            </svg>
            <span className={styles.buttonText}>Plus d'infos</span>
          </button>
        </div>
      </div>

      <div className={styles.ageRating}>
        <span className={styles.maturityNumber}>16+</span>
      </div>
    </div>
  );
}
