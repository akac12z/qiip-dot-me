import { useRef } from "react";
import styles from "./qr.module.css";

interface LogoUplProps {
	logo: string | null;
	onLogoChange: (url: string | null) => void;
	size: number;
	setSize: (value: React.SetStateAction<number>) => void;
	border: boolean;
	setBorder: (value: React.SetStateAction<boolean>) => void;
}

export default function LogoUpload({
	logo,
	onLogoChange,
	size,
	setSize,
	border,
	setBorder,
}: LogoUplProps) {
	const logoInputRef = useRef<HTMLInputElement>(null);

	function handleLogo(e: React.ChangeEvent<HTMLInputElement>) {
		const file = e.target.files?.[0];
		if (!file) return;
		const allowed = ["image/png", "image/jpeg", "image/webp", "image/gif"];
		if (!allowed.includes(file.type)) return;
		if (file.size > 2 * 1024 * 1024) return;
		const reader = new FileReader();
		reader.onload = (ev) => onLogoChange(ev.target?.result as string);
		reader.readAsDataURL(file);
	}

	return (
		<>
			<div className={styles.field}>
				<span className={styles.label}>Logo image</span>
				<div className={styles.logoRow}>
					<label
						className={styles.logoUpload}
						htmlFor="qr-logo"
					>
						{logo ? "Change logo image" : "Upload logo image"}
					</label>
					<input
						ref={logoInputRef}
						id="qr-logo"
						type="file"
						accept="image/png,image/jpeg,image/webp,image/gif"
						className={styles.fileInput}
						onChange={handleLogo}
					/>
					{logo && (
						<button
							className={styles.removeBtn}
							onClick={() => {
								onLogoChange(null);
								if (logoInputRef.current) logoInputRef.current.value = "";
							}}
							type="button"
						>
							✕
						</button>
					)}
				</div>
				<span className={styles.hint}>
					It needs to be between 200x200px and 400x400px otherwise it will be
					distorted
				</span>
			</div>
			{logo && (
				<>
					<div className={styles.field}>
						<div className={styles.sliderHeader}>
							<span className={styles.label}>Logo size</span>
							<span className={styles.sliderVal}>{size}%</span>
						</div>
						<input
							className={styles.slider}
							type="range"
							min={10}
							max={25}
							step={1}
							value={size}
							onChange={(e) => setSize(Number(e.target.value))}
						/>
						<div className={styles.sliderRange}>
							<span>10%</span>
							<span>25%</span>
						</div>
					</div>

					<div className={styles.field}>
						<label className={styles.toggle}>
							<input
								type="checkbox"
								checked={border}
								onChange={(e) => setBorder(e.target.checked)}
							/>
							<span className={styles.toggleTrack}>
								<span className={styles.toggleThumb} />
							</span>
							<span className={styles.toggleLabel}>Border around logo</span>
						</label>
					</div>
				</>
			)}
		</>
	);
}
