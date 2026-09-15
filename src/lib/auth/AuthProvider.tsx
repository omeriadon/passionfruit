"use client";

import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
	type ReactNode,
} from "react";
import {
	addBookmark,
	addOwned,
	ApiError,
	changePassword as changePasswordRequest,
	deleteAccount as deleteAccountRequest,
	getCategoryOrder,
	getCurrentUser,
	listBookmarks,
	listOwned,
	login,
	removeBookmark,
	removeOwned,
	register,
	setCategoryOrder as setCategoryOrderRequest,
	updateUsername as updateUsernameRequest,
	type AuthUser,
	type Bookmark,
	type AuthResponse,
	type OwnedDevice,
} from "./api";
import { AuthDialog } from "@/components/auth/AuthDialog";

const tokenStorageKey = "apple-catalog.bookmarks-token";

type AuthContextValue = {
	user: AuthUser | null;
	sessionToken: string | null;
	bookmarks: ReadonlySet<string>;
	bookmarkItems: Bookmark[];
	owned: ReadonlySet<string>;
	ownedItems: OwnedDevice[];
	categoryOrder: string[] | null;
	isLoading: boolean;
	actionError: string | null;
	authDialogOpen: boolean;
	openAuthDialog: () => void;
	closeAuthDialog: () => void;
	login: (username: string, password: string) => Promise<void>;
	register: (username: string, password: string) => Promise<void>;
	logout: () => void;
	updateUsername: (username: string) => Promise<void>;
	changePassword: (
		currentPassword: string,
		newPassword: string,
	) => Promise<void>;
	deleteAccount: () => Promise<void>;
	toggleBookmark: (category: string, deviceId: string) => Promise<boolean>;
	isBookmarked: (category: string, deviceId: string) => boolean;
	toggleOwned: (category: string, deviceId: string) => Promise<boolean>;
	isOwned: (category: string, deviceId: string) => boolean;
	setCategoryOrder: (order: string[]) => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function itemKey(category: string, deviceId: string) {
	return `${category}:${deviceId}`;
}

export function AuthProvider({ children }: { children: ReactNode }) {
	const [token, setToken] = useState<string | null>(null);
	const [user, setUser] = useState<AuthUser | null>(null);
	const [bookmarkItems, setBookmarkItems] = useState<Bookmark[]>([]);
	const [ownedItems, setOwnedItems] = useState<OwnedDevice[]>([]);
	const [categoryOrder, setCategoryOrderState] = useState<string[] | null>(
		null,
	);
	const [isLoading, setIsLoading] = useState(true);
	const [actionError, setActionError] = useState<string | null>(null);
	const [authDialogOpen, setAuthDialogOpen] = useState(false);

	const clearSession = useCallback(() => {
		localStorage.removeItem(tokenStorageKey);
		setToken(null);
		setUser(null);
		setBookmarkItems([]);
		setOwnedItems([]);
		setCategoryOrderState(null);
	}, []);

	const loadSession = useCallback(async (sessionToken: string) => {
		// The identity check is the only thing allowed to end a session, and
		// only on 401. Bookmarks/owned/order are best-effort: a failing
		// endpoint must degrade to an empty list, never sign the user out.
		let currentUser: AuthUser | null = null;
		try {
			currentUser = await getCurrentUser(sessionToken);
		} catch (error) {
			if (error instanceof ApiError && error.status === 401) {
				clearSession();
				return;
			}
			setToken(sessionToken);
			return;
		}
		setToken(sessionToken);
		setUser(currentUser);
		const [bookmarks, owned, order] = await Promise.all([
			listBookmarks(sessionToken).catch(() => null),
			listOwned(sessionToken).catch(() => null),
			getCategoryOrder(sessionToken).catch(() => null),
		]);
		if (bookmarks !== null) setBookmarkItems(bookmarks);
		if (owned !== null) setOwnedItems(owned);
		if (order !== null) setCategoryOrderState(order);
	}, []);

	useEffect(() => {
		const storedToken = localStorage.getItem(tokenStorageKey);
		if (!storedToken) {
			setIsLoading(false);
			return;
		}

		loadSession(storedToken)
			.catch(() => clearSession())
			.finally(() => setIsLoading(false));
	}, [clearSession, loadSession]);

	const finishAuthentication = useCallback(
		async (authenticate: () => Promise<AuthResponse>) => {
			const response = await authenticate();
			localStorage.setItem(tokenStorageKey, response.session.token);
			await loadSession(response.session.token);
			setAuthDialogOpen(false);
			setActionError(null);
		},
		[loadSession],
	);

	const authenticate = useCallback(
		(operation: "login" | "register", username: string, password: string) =>
			finishAuthentication(() =>
				operation === "login"
					? login(username, password)
					: register(username, password),
			),
		[finishAuthentication],
	);

	const toggleBookmark = useCallback(
		async (category: string, deviceId: string) => {
			if (!token) {
				setAuthDialogOpen(true);
				return false;
			}

			const key = itemKey(category, deviceId);
			setActionError(null);
			try {
				const existing = bookmarkItems.find(
					(item) => itemKey(item.category, item.deviceId) === key,
				);
				if (existing) {
					await removeBookmark(token, existing.category, existing.deviceId);
					setBookmarkItems((current) =>
						current.filter(
							(item) => itemKey(item.category, item.deviceId) !== key,
						),
					);
					return false;
				}

				const bookmark = await addBookmark(token, category, deviceId);
				setBookmarkItems((current) => [...current, bookmark]);
				return true;
			} catch (error) {
				if (error instanceof ApiError && error.status === 401) clearSession();
				setActionError(
					error instanceof Error ? error.message : "Bookmark update failed.",
				);
				return bookmarkItems.some(
					(item) => itemKey(item.category, item.deviceId) === key,
				);
			}
		},
		[bookmarkItems, clearSession, token],
	);

	const toggleOwned = useCallback(
		async (category: string, deviceId: string) => {
			if (!token) {
				setAuthDialogOpen(true);
				return false;
			}

			const key = itemKey(category, deviceId);
			setActionError(null);
			try {
				const existing = ownedItems.find(
					(item) => itemKey(item.category, item.deviceId) === key,
				);
				if (existing) {
					await removeOwned(token, existing.category, existing.deviceId);
					setOwnedItems((current) =>
						current.filter(
							(item) => itemKey(item.category, item.deviceId) !== key,
						),
					);
					return false;
				}

				const owned = await addOwned(token, category, deviceId);
				setOwnedItems((current) => [...current, owned]);
				return true;
			} catch (error) {
				if (error instanceof ApiError && error.status === 401) clearSession();
				setActionError(
					error instanceof Error ? error.message : "Update failed.",
				);
				return ownedItems.some(
					(item) => itemKey(item.category, item.deviceId) === key,
				);
			}
		},
		[ownedItems, clearSession, token],
	);

	const persistCategoryOrder = useCallback(
		async (order: string[]) => {
			if (!token) return;
			setActionError(null);
			try {
				const saved = await setCategoryOrderRequest(token, order);
				setCategoryOrderState(saved);
			} catch (error) {
				if (error instanceof ApiError && error.status === 401) clearSession();
				setActionError(
					error instanceof Error ? error.message : "Could not save order.",
				);
			}
		},
		[clearSession, token],
	);

	const renameUser = useCallback(
		async (username: string) => {
			if (!token) return;
			setActionError(null);
			try {
				const updated = await updateUsernameRequest(token, username);
				setUser(updated);
			} catch (error) {
				if (error instanceof ApiError && error.status === 401) clearSession();
				setActionError(
					error instanceof Error ? error.message : "Could not update username.",
				);
				throw error;
			}
		},
		[clearSession, token],
	);

	const changeUserPassword = useCallback(
		async (currentPassword: string, newPassword: string) => {
			if (!token) return;
			setActionError(null);
			try {
				const updated = await changePasswordRequest(
					token,
					currentPassword,
					newPassword,
				);
				setUser(updated);
			} catch (error) {
				if (error instanceof ApiError && error.status === 401) clearSession();
				setActionError(
					error instanceof Error ? error.message : "Could not update password.",
				);
				throw error;
			}
		},
		[clearSession, token],
	);

	const removeAccount = useCallback(async () => {
		if (!token) return;
		setActionError(null);
		try {
			await deleteAccountRequest(token);
		} catch (error) {
			setActionError(
				error instanceof Error ? error.message : "Could not delete account.",
			);
			throw error;
		}
		clearSession();
	}, [clearSession, token]);

	const value = useMemo<AuthContextValue>(
		() => ({
			user,
			sessionToken: token,
			bookmarks: new Set(
				bookmarkItems.map((item) => itemKey(item.category, item.deviceId)),
			),
			bookmarkItems,
			owned: new Set(
				ownedItems.map((item) => itemKey(item.category, item.deviceId)),
			),
			ownedItems,
			categoryOrder,
			isLoading,
			actionError,
			authDialogOpen,
			openAuthDialog: () => setAuthDialogOpen(true),
			closeAuthDialog: () => setAuthDialogOpen(false),
			login: (username, password) => authenticate("login", username, password),
			register: (username, password) =>
				authenticate("register", username, password),
			logout: clearSession,
			updateUsername: renameUser,
			changePassword: changeUserPassword,
			deleteAccount: removeAccount,
			toggleBookmark,
			isBookmarked: (category, deviceId) =>
				bookmarkItems.some(
					(item) =>
						itemKey(item.category, item.deviceId) ===
						itemKey(category, deviceId),
				),
			toggleOwned,
			isOwned: (category, deviceId) =>
				ownedItems.some(
					(item) =>
						itemKey(item.category, item.deviceId) ===
						itemKey(category, deviceId),
				),
			setCategoryOrder: persistCategoryOrder,
		}),
		[
			actionError,
			authDialogOpen,
			authenticate,
			bookmarkItems,
			categoryOrder,
			changeUserPassword,
			clearSession,
			isLoading,
			ownedItems,
			persistCategoryOrder,
			removeAccount,
			renameUser,
			token,
			toggleBookmark,
			toggleOwned,
			user,
		],
	);

	return (
		<AuthContext.Provider value={value}>
			{children}
			<AuthDialog />
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (!context) throw new Error("useAuth must be used inside AuthProvider");
	return context;
}
