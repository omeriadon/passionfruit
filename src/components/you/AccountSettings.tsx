"use client";

import { useState, type FormEvent } from "react";
import { useAuth } from "@/lib/auth/AuthProvider";
import { ApiError } from "@/lib/auth/api";

export function AccountSettings() {
	const {
		user,
		isLoading,
		openAuthDialog,
		updateUsername,
		changePassword,
		deleteAccount,
	} = useAuth();
	const [username, setUsername] = useState("");
	const [currentPassword, setCurrentPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmDelete, setConfirmDelete] = useState(false);
	const [notice, setNotice] = useState<string | null>(null);
	const [pending, setPending] = useState<string | null>(null);

	if (isLoading) {
		return <p className="text-fd-muted-foreground">Loading account…</p>;
	}

	if (!user) {
		return (
			<div className="flex flex-col items-start gap-3">
				<p className="text-fd-muted-foreground">
					Sign in to manage your account.
				</p>
				<button
					type="button"
					onClick={openAuthDialog}
					className="rounded-full bg-fd-primary px-4 py-1.5 text-sm font-medium text-fd-primary-foreground"
				>
					Sign in
				</button>
			</div>
		);
	}

	async function run(action: string, work: () => Promise<void>, ok: string) {
		setPending(action);
		setNotice(null);
		try {
			await work();
			setNotice(ok);
		} catch (error) {
			if (!(error instanceof ApiError)) {
				setNotice(
					error instanceof Error ? error.message : "Something went wrong.",
				);
			}
		} finally {
			setPending(null);
		}
	}

	function onUsername(event: FormEvent) {
		event.preventDefault();
		if (!username.trim()) return;
		void run(
			"username",
			() => updateUsername(username.trim()),
			"Username updated.",
		);
	}

	function onPassword(event: FormEvent) {
		event.preventDefault();
		if (!currentPassword || !newPassword) return;
		void run(
			"password",
			() => changePassword(currentPassword, newPassword),
			"Password updated.",
		).then(() => {
			setCurrentPassword("");
			setNewPassword("");
		});
	}

	function onDelete() {
		if (!confirmDelete) {
			setConfirmDelete(true);
			return;
		}
		void run("delete", () => deleteAccount(), "Account deleted.");
	}

	const inputClass =
		"w-full max-w-sm rounded-lg border border-fd-border bg-fd-background px-3 py-1.5 text-sm";
	const buttonClass =
		"rounded-full bg-fd-primary px-4 py-1.5 text-sm font-medium text-fd-primary-foreground disabled:opacity-50";

	return (
		<div className="flex flex-col gap-8">
			{notice ? (
				<p role={notice.includes("wrong") ? "alert" : "status"}>{notice}</p>
			) : null}

			<section aria-label="Username">
				<h2 className="text-base font-semibold">
					Username{" "}
					<span className="font-normal text-fd-muted-foreground">
						· currently {user.username}
					</span>
				</h2>
				<form
					onSubmit={onUsername}
					className="mt-2 flex flex-col items-start gap-2"
				>
					<input
						value={username}
						onChange={(event) => setUsername(event.target.value)}
						placeholder="New username"
						maxLength={64}
						className={inputClass}
					/>
					<button
						type="submit"
						disabled={pending !== null}
						className={buttonClass}
					>
						{pending === "username" ? "Saving…" : "Change username"}
					</button>
				</form>
			</section>

			<section aria-label="Password">
				<h2 className="text-base font-semibold">Password</h2>
				<form
					onSubmit={onPassword}
					className="mt-2 flex flex-col items-start gap-2"
				>
					<input
						type="password"
						value={currentPassword}
						onChange={(event) => setCurrentPassword(event.target.value)}
						placeholder="Current password"
						autoComplete="current-password"
						className={inputClass}
					/>
					<input
						type="password"
						value={newPassword}
						onChange={(event) => setNewPassword(event.target.value)}
						placeholder="New password (8+ characters)"
						autoComplete="new-password"
						className={inputClass}
					/>
					<button
						type="submit"
						disabled={pending !== null}
						className={buttonClass}
					>
						{pending === "password" ? "Saving…" : "Change password"}
					</button>
				</form>
			</section>

			<section aria-label="Delete account">
				<h2 className="text-base font-semibold">Delete account</h2>
				<p className="mt-1 text-sm text-fd-muted-foreground">
					Removes your account, bookmarks, owned devices, and saved order. This
					cannot be undone.
				</p>
				<button
					type="button"
					onClick={onDelete}
					disabled={pending !== null}
					className="mt-2 rounded-full bg-red-700 px-4 py-1.5 text-sm font-medium text-white disabled:opacity-50"
				>
					{pending === "delete"
						? "Deleting…"
						: confirmDelete
							? "Click again to confirm deletion"
							: "Delete account"}
				</button>
			</section>
		</div>
	);
}
