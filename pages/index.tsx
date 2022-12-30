import styles from '../styles/Home.module.scss'

export default function Home() {

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">NeoKingdomDAO!</a>
        </h1>

        <p className={styles.description}>
          This application allows contributors to interact with Neokingdom DAO.
        </p>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h3>Desktop</h3>
            <p>Login now and start using Neokingdom DAO.</p>
          </div>

          <div className={styles.card}>
            <h3>Mobile</h3>
            <p>This website can also be installed as an app in your Android phone or iPhone. Open this website from your smartphone and follow the instructions.</p>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}