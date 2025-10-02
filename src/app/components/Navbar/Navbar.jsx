'use client';

import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
            <div className={styles.navbarContent}>
                {/* Logo */}
                <div className={styles.navbarLeft}>
                    <img 
                        src="/images/netflix-logo.png" 
                        alt="Netflix" 
                        className={styles.logo}
                    />
                    <ul className={styles.navLinks}>
                        <li><a href="#" className={styles.active}>Accueil</a></li>
                        <li><a href="#">Séries</a></li>
                        <li><a href="#">Films</a></li>
                        <li><a href="#">Jeux</a></li>
                        <li><a href="#">Nouveautés les plus regardées</a></li>
                        <li><a href="#">Ma liste</a></li>
                        <li><a href="#">Explorer par langue</a></li>
                    </ul>
                </div>

                {/* Right side */}
                <div className={styles.navbarRight}>
                    <button className={styles.searchTab} tabIndex="0" aria-label="Rechercher">
                        <svg className={styles.searchIcon} viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10ZM15.6177 17.0319C14.078 18.2635 12.125 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10C19 12.125 18.2635 14.078 17.0319 15.6177L22.7071 21.2929L21.2929 22.7071L15.6177 17.0319Z" fill="currentColor"/>
                        </svg>
                    </button>
                    <span className={styles.jeunesseText}>Jeunesse</span>
                    <div
                        className={styles.notificationContainer}
                        onMouseEnter={() => setShowNotifications(true)}
                        onMouseLeave={() => setShowNotifications(false)}
                    >
                        <svg className={styles.icon} viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M13.0002 4.07092C16.3924 4.55624 19 7.4736 19 11V15.2538C20.0489 15.3307 21.0851 15.4245 22.1072 15.5347L21.8928 17.5232C18.7222 17.1813 15.4092 17 12 17C8.59081 17 5.27788 17.1813 2.10723 17.5232L1.89282 15.5347C2.91498 15.4245 3.95119 15.3307 5.00003 15.2538V11C5.00003 7.47345 7.60784 4.55599 11.0002 4.07086V2H13.0002V4.07092ZM17 15.1287V11C17 8.23858 14.7614 6 12 6C9.2386 6 7.00003 8.23858 7.00003 11V15.1287C8.64066 15.0437 10.3091 15 12 15C13.691 15 15.3594 15.0437 17 15.1287ZM8.62593 19.3712C8.66235 20.5173 10.1512 22 11.9996 22C13.848 22 15.3368 20.5173 15.3732 19.3712C15.3803 19.1489 15.1758 19 14.9533 19H9.0458C8.82333 19 8.61886 19.1489 8.62593 19.3712Z" fill="white"/>
                        </svg>

                        {showNotifications && (
                            <div className={styles.notificationMenu}>
                                <div className={styles.notificationItem}>
                                    <a href="#" className={styles.notificationIcon}>
                                        <div className={styles.multiLandingStackSpaceHolder}>
                                            <div className={`${styles.multiLandingStack} ${styles.multiLandingStack1}`}></div>
                                            <div className={`${styles.multiLandingStack} ${styles.multiLandingStack2}`}></div>
                                            <img className={`${styles.titleCard} ${styles.multiLandingStack} ${styles.multiLandingStackImg}`} src="https://assets.nflxext.com/us/email/cls/hourglass_tcard@112.png" srcSet="https://assets.nflxext.com/us/email/cls/hourglass_tcard@112.png 112w, https://assets.nflxext.com/us/email/cls/hourglass_tcard@265.png 265w" sizes="112px" alt="Ces titres vont bientôt nous quitter" />
                                        </div>
                                    </a>
                                    <a href="#" className={styles.notificationContent}>
                                        <div className={styles.notificationTitle}>Ces titres vont bientôt nous quitter</div>
                                        <div className={styles.notificationSubtitle}>Le temps presse</div>
                                        <div className={styles.notificationTime}><span>il y a 1&nbsp;semaine</span></div>
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>
                    <div
                        className={styles.profileContainer}
                        onMouseEnter={() => setShowProfileMenu(true)}
                        onMouseLeave={() => setShowProfileMenu(false)}
                    >
                        <div className={styles.profile}>
                            <img
                                src="/images/profile-avatar.png"
                                alt="Profile"
                                className={styles.profileImg}
                            />
                            <svg className={`${styles.profileArrow} ${showProfileMenu ? styles.profileArrowRotated : ''}`} width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 4L6 9L11 4Z" fill="white"/>
                            </svg>
                        </div>

                        {showProfileMenu && (
                            <div className={styles.profileMenu}>
                                <div className={styles.menuItem}>
                                    <img src="/images/profile-kid.png" alt="Jeunesse" className={styles.menuProfileImg} />
                                    <span>Jeunesse</span>
                                </div>
                                <div className={styles.menuItem}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 4C14.2091 4 16 5.79086 16 8C16 10.2091 14.2091 12 12 12C9.79086 12 8 10.2091 8 8C8 5.79086 9.79086 4 12 4ZM12 14C16.4183 14 20 15.7909 20 18V20H4V18C4 15.7909 7.58172 14 12 14Z" stroke="white" strokeWidth="2"/>
                                    </svg>
                                    <span>Gérer les profils</span>
                                </div>
                                <div className={styles.menuItem}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M16 3H21V8M4 20L20.586 3.414M21 16V21H16M4 4L20.586 20.586" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    <span>Transférer un profil</span>
                                </div>
                                <div className={styles.menuItem}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="2"/>
                                        <path d="M12 8C13.1046 8 14 8.89543 14 10C14 11.1046 13.1046 12 12 12C10.8954 12 10 11.1046 10 10C10 8.89543 10.8954 8 12 8Z" stroke="white" strokeWidth="2"/>
                                        <path d="M7 18C7 16 9 14 12 14C15 14 17 16 17 18" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                                    </svg>
                                    <span>Compte</span>
                                </div>
                                <div className={styles.menuItem}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="2"/>
                                        <path d="M12 8V12M12 16H12.01" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                                    </svg>
                                    <span>Centre d&apos;aide</span>
                                </div>
                                <div className={styles.menuDivider}></div>
                                <div className={`${styles.menuItem} ${styles.menuItemCenter}`}>
                                    <span>Se déconnecter</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}