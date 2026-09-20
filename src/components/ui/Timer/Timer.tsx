import { useState, useEffect } from "react";

export default function useTimer() {
	const [seconds, setSeconds] = useState(0);

	useEffect(() => {
		// Set up a 1-second interval
		const intervalId = setInterval(() => {
			setSeconds((prev) => prev + 1);
		}, 1000);

		return () => clearInterval(intervalId);
	}, []);

	return seconds;
}
