import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from '@styles/Dashboard.module.css';
import { playerIcon, dashboardIcon, courtIcon, setupIcon, membersIcon, openSidebar, closeSidebar} from '../../public/icons';

const navItems = [
	{ href: '/', icon: dashboardIcon, text: 'Lineup' },
	{ href: '/play', icon: playerIcon, text: 'Play' },
	{ href: '/join', icon: courtIcon, text: 'Join' },
	{ href: '/week-setup', icon: setupIcon, text: 'Game Setup' },
	{ href: '/members', icon: membersIcon, text: 'Members' },
];

export default function Navbar() {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const { pathname } = useRouter();

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	};

	useEffect(()=>{
		setIsMobileMenuOpen(false);
	},[pathname])

	return (
		<nav className={styles.navbar}>
			<button className={styles.dropdownButton} onClick={toggleMobileMenu}>
				<span>{openSidebar}</span>
			</button>
			<div
				onClick={toggleMobileMenu}
				role='button'
				className={`${styles.bodyOverlay} ${isMobileMenuOpen ? styles.openBodyOverlay : ''}`}
			></div>

			<div className={`${styles.menuSidebar} ${isMobileMenuOpen ? styles.openSidebar : ''}`}>
				<button className={styles.dropdownButton + ' ' + styles.closeSidebar} onClick={toggleMobileMenu}>
					<span>{closeSidebar}</span>
				</button>
				<ul className={styles.menu}>
					{navItems.map((item, index) => (
						<li style={{ opacity: pathname === item.href ? 1 : 0.5 }} key={index}>
							<Link href={item.href}>
								<span className={styles.icon}>{item.icon}</span>
								{item.text}
							</Link>
						</li>
					))}
				</ul>
			</div>
		</nav>
	);
}
