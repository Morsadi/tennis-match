import styles from '@styles/Dashboard.module.css';
import Navbar from './navbar';

export default function Dashboard({ children }) {

	return (
		<div className={styles.dashboard}>
			<div className={styles.inner}>
				<Navbar/>
				<main>{children}</main>
			</div>
		</div>
	);
}
