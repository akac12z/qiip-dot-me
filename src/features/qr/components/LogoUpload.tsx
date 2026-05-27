import styles from "./qr.module.css";

interface LogoUplProps {
	logo: string | null;
	setLogo: React.Dispatch<React.SetStateAction<string | null>>;
	logoInputRef: React.RefObject<HTMLInputElement | null>;
	handleLogo: (e: React.ChangeEvent<HTMLInputElement, Element>) => void;
	size: number;
	setSize: (value: React.SetStateAction<number>) => void;
	border: boolean;
	setBorder: (value: React.SetStateAction<boolean>) => void;
}

export default function LogoUpload({
	logo,
	setLogo,
	logoInputRef,
	handleLogo,
	size,
	setSize,
	border,
	setBorder,
}: LogoUplProps) {
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
								setLogo(null);
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
