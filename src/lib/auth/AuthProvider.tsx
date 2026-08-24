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
	ApiError,
	getCurrentUser,
	listBookmarks,
	login,
	removeBookmark,
	register,
	type AuthUser,
	type Bookmark,
	type AuthResponse,
} from "./api";
import { AuthDialog } from "@/components/auth/AuthDialog";

const tokenStorageKey = "apple-catalog.bookmarks-token";

type AuthContextValue = {
	user: AuthUser | null;
	bookmarks: ReadonlySet<string>;
	isLoading: boolean;
	actionError: string | null;
	authDialogOpen: boolean;
	openAuthDialog: () => void;
	closeAuthDialog: () => void;
	login: (username: string, password: string) => Promise<void>;
	register: (username: string, password: string) => Promise<void>;
	logout: () => void;
	toggleBookmark: (category: string, deviceId: string) => Promise<boolean>;
	isBookmarked: (category: string, deviceId: string) => boolean;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function bookmarkKey(category: string, deviceId: string) {
	return `${category}:${deviceId}`;
}

export function AuthProvider({ children }: { children: ReactNode }) {
	const [token, setToken] = useState<string | null>(null);
	const [user, setUser] = useState<AuthUser | null>(null);
	const [bookmarkItems, setBookmarkItems] = useState<Bookmark[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [actionError, setActionError] = useState<string | null>(null);
	const [authDialogOpen, setAuthDialogOpen] = useState(false);

	const clearSession = useCallback(() => {
		localStorage.removeItem(tokenStorageKey);
		setToken(null);
		setUser(null);
		setBookmarkItems([]);
	}, []);

	const loadSession = useCallback(async (sessionToken: string) => {
		const [currentUser, bookmarks] = await Promise.all([
			getCurrentUser(sessionToken),
			listBookmarks(sessionToken),
		]);
		setToken(sessionToken);
		setUser(currentUser);
		setBookmarkItems(bookmarks);
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
			localStorage.setItem(tokenStorageKey, response.token);
			await loadSession(response.token);
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

			const key = bookmarkKey(category, deviceId);
			setActionError(null);
			try {
				const existing = bookmarkItems.find(
					(item) => bookmarkKey(item.category, item.deviceId) === key,
				);
				if (existing) {
					await removeBookmark(token, existing.id);
					setBookmarkItems((current) =>
						current.filter((item) => bookmarkKey(item.category, item.deviceId) !== key),
					);
					return false;
				}

				const bookmark = await addBookmark(token, category, deviceId);
				setBookmarkItems((current) => [...current, bookmark]);
				return true;
			} catch (error) {
				if (error instanceof ApiError && error.status === 401) clearSession();
				setActionError(error instanceof Error ? error.message : "Bookmark update failed.");
				return bookmarkItems.some((item) => bookmarkKey(item.category, item.deviceId) === key);
			}
		},
		[bookmarkItems, clearSession, token],
	);

	const value = useMemo<AuthContextValue>(
		() => ({
			user,
			bookmarks: new Set(bookmarkItems.map((item) => bookmarkKey(item.category, item.deviceId))),
			isLoading,
			actionError,
			authDialogOpen,
			openAuthDialog: () => setAuthDialogOpen(true),
			closeAuthDialog: () => setAuthDialogOpen(false),
			login: (username, password) => authenticate("login", username, password),
			register: (username, password) => authenticate("register", username, password),
			logout: clearSession,
			toggleBookmark,
			isBookmarked: (category, deviceId) =>
				bookmarkItems.some((item) => bookmarkKey(item.category, item.deviceId) === bookmarkKey(category, deviceId)),
		}),
		[actionError, authDialogOpen, authenticate, bookmarkItems, clearSession, isLoading, toggleBookmark, user],
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
