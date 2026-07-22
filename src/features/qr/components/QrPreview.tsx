import styles from "./qr.module.css";
import { CANVAS_SIZE } from "../rules/canvas.ts";

interface QRPrevProps {
	canvasRef: React.RefObject<HTMLCanvasElement | null>;
	hasQR: boolean;
}

export default function PreviewQR({ canvasRef, hasQR }: QRPrevProps) {
	return (
		<div className={styles.preview}>
			<canvas
				ref={canvasRef}
				width={CANVAS_SIZE}
				height={CANVAS_SIZE}
				className={styles.canvas}
			/>
			{!hasQR && <p className={styles.placeholder}>Your QR will appear here</p>}
		</div>
	);
}
