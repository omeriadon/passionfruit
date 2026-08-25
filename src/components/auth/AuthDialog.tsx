"use client";

import { LogIn, UserPlus, X } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { useAuth } from "@/lib/auth/AuthProvider";
import styles from "./auth.module.css";

export function AuthDialog() {
	const { authDialogOpen, closeAuthDialog, login, register } = useAuth();
	const [mode, setMode] = useState<"login" | "register">("login");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const usernameRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (!authDialogOpen) return;
		usernameRef.current?.focus();
		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") closeAuthDialog();
		};
		document.addEventListener("keydown", onKeyDown);
		return () => document.removeEventListener("keydown", onKeyDown);
	}, [authDialogOpen, closeAuthDialog]);

	if (!authDialogOpen) return null;

	async function submit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setError(null);
		setIsSubmitting(true);
		try {
			if (mode === "login") await login(username, password);
			else await register(username, password);
			setPassword("");
		} catch (submissionError) {
			setError(
				submissionError instanceof Error
					? submissionError.message
					: "Authentication failed.",
			);
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<div
			className={styles.backdrop}
			role="presentation"
			onMouseDown={closeAuthDialog}
		>
			<section
				className={styles.dialog}
				role="dialog"
				aria-modal="true"
				aria-labelledby="auth-dialog-title"
				onMouseDown={(event) => event.stopPropagation()}
			>
				<button
					type="button"
					className={styles.closeButton}
					aria-label="Close sign in"
					onClick={closeAuthDialog}
				>
					<X aria-hidden="true" size={18} />
				</button>
				<p className={styles.eyebrow}>Apple Catalog</p>
				<h2 id="auth-dialog-title">
					{mode === "login" ? "Sign in" : "Create account"}
				</h2>
				<p className={styles.description}>
					{mode === "login"
						? "Sign in to keep your bookmarked devices across sessions."
						: "Create a username and password to save bookmarks."}
				</p>
				<form onSubmit={submit}>
					<label>
						Username
						<input
							ref={usernameRef}
							value={username}
							onChange={(event) => setUsername(event.target.value)}
							autoComplete={
								mode === "login" ? "username" : "username new-password"
							}
							required
						/>
					</label>
					<label>
						Password
						<input
							type="password"
							value={password}
							onChange={(event) => setPassword(event.target.value)}
							autoComplete={
								mode === "login" ? "current-password" : "new-password"
							}
							required
						/>
					</label>
					{error ? (
						<p className={styles.error} role="alert">
							{error}
						</p>
					) : null}
					<button
						type="submit"
						className={styles.submitButton}
						disabled={isSubmitting}
					>
						{mode === "login" ? (
							<LogIn aria-hidden="true" size={16} />
						) : (
							<UserPlus aria-hidden="true" size={16} />
						)}
						{isSubmitting
							? "Working…"
							: mode === "login"
								? "Sign in"
								: "Create account"}
					</button>
				</form>
				<button
					type="button"
					className={styles.switchButton}
					onClick={() => {
						setMode(mode === "login" ? "register" : "login");
						setError(null);
					}}
				>
					{mode === "login"
						? "Need an account? Create one"
						: "Already have an account? Sign in"}
				</button>
			</section>
		</div>
	);
}
