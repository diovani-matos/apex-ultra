import styles from './Footer.module.css';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.copy}>
          © {year} Apex Ultra. Todos os direitos reservados.
        </p>

        <span className={styles.logo}>APEX ULTRA</span>

        <nav className={styles.links}>
          <a href="#" className={styles.link}>
            Privacidade
          </a>
          <span className={styles.dot}>·</span>
          <a href="#" className={styles.link}>
            Termos
          </a>
        </nav>
      </div>
    </footer>
  );
}
