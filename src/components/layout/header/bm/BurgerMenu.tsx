import { useState } from "react";
import styles from "./bm.module.css";

interface Tool {
	href: string;
	toolName: string;
	color: string;
}

interface Props {
	tools: Tool[];
	currentPath: string;
}

const MENU_ID: string = "burger-menu-panel";

export default function BurgerMenu({ tools, currentPath }: Props) {
	const [isOpen, setIsOpen] = useState(false);

	const close = () => setIsOpen(false);

	const activeTool = tools.find((tool) => tool.href === currentPath);
	const dotColor = activeTool?.color ?? null;

	return (
		<>
			<button
				className={styles.burger}
				aria-label="Toggle menu"
				aria-expanded={isOpen}
				aria-controls={MENU_ID}
				onClick={() => setIsOpen((prev) => !prev)}
				onKeyDown={(e) => e.key === "Escape" && close()}
			>
				{dotColor && (
					<span
						className={styles.dot}
						style={{ backgroundColor: dotColor }}
					/>
				)}
				Tools
			</button>

			{isOpen && (
				<div
					className={styles.backdrop}
					onClick={close}
				/>
			)}

			<div
				id={MENU_ID}
				className={styles.mobileMenu}
				data-open={isOpen || undefined}
				onKeyDown={(e) => e.key === "Escape" && close()}
			>
				<div className={styles.mobileInner}>
					<ul className={styles.mobileLinks}>
						{tools.map(({ href, toolName }) => {
							const isActive = currentPath === href;
							return (
								<li key={href}>
									<a
										href={href}
										className={`${styles.mobileLink}${isActive ? ` ${styles.active}` : ""}`}
										onClick={close}
									>
										{toolName}
										{isActive && <span className={styles.mobileDot} />}
									</a>
								</li>
							);
						})}
					</ul>
				</div>
			</div>
		</>
	);
}
