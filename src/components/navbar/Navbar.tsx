import Link from 'next/link'
import styles from './Navbar.module.css'

function Navbar() {
  return (
    <ul className={styles.navbar}>
      <li>
        <Link href="/">
          <a>Home</a>
        </Link>
      </li>
      <li>
        <Link href="/demo/dm0001">
          <a>DEMO 0001</a>
        </Link>
      </li>
      <li>
        <Link href="/demo/dm0002">
          <a>DEMO 0002</a>
        </Link>
      </li>
      <li>
        <Link href="/demo/dm0003">
          <a>DEMO 0003</a>
        </Link>
      </li>
    </ul>
  )
}

export default Navbar
