export type AuthUser = {
	id: string;
	username: string;
};

export type AuthSession = {
	token: string;
	expiresAt: string;
};

export type Bookmark = {
	category: string;
	deviceId: string;
	createdAt: string | null;
};

export type AuthResponse = {
	user: AuthUser;
	session: AuthSession;
};

type AuthUserResponse = { user: AuthUser };
type BookmarksResponse = { bookmarks: Bookmark[] };
type BookmarkResponse = { bookmark: Bookmark };

type ErrorPayload = {
	error?: {
		message?: string;
		fields?: Record<string, string>;
	};
};

export const bookmarksApiUrl =
	process.env.NEXT_PUBLIC_BOOKMARKS_API_URL ?? "http://localhost:8080";

export class ApiError extends Error {
	readonly status: number;
	readonly fields: Record<string, string>;

	constructor(
		status: number,
		message: string,
		fields: Record<string, string> = {},
	) {
		super(message);
		this.name = "ApiError";
		this.status = status;
		this.fields = fields;
	}
}

async function request<T>(
	path: string,
	options: RequestInit = {},
	token?: string,
): Promise<T> {
	const response = await fetch(`${bookmarksApiUrl}/api/v1${path}`, {
		...options,
		headers: {
			Accept: "application/json",
			...(options.body ? { "Content-Type": "application/json" } : {}),
			...(token ? { Authorization: `Bearer ${token}` } : {}),
			...options.headers,
		},
	});

	if (response.status === 204) return undefined as T;

	const payload = (await response.json().catch(() => ({}))) as T & ErrorPayload;
	if (!response.ok) {
		throw new ApiError(
			response.status,
			payload.error?.message ?? "The request could not be completed.",
			payload.error?.fields ?? {},
		);
	}

	return payload;
}

export function register(username: string, password: string) {
	return request<AuthResponse>("/auth/register", {
		method: "POST",
		body: JSON.stringify({ username, password }),
	});
}

export function login(username: string, password: string) {
	return request<AuthResponse>("/auth/login", {
		method: "POST",
		body: JSON.stringify({ username, password }),
	});
}

export function getCurrentUser(token: string) {
	return request<AuthUserResponse>("/auth/me", {}, token).then(
		(response) => response.user,
	);
}

export function listBookmarks(token: string) {
	return request<BookmarksResponse>("/bookmarks", {}, token).then(
		(response) => response.bookmarks,
	);
}

export function addBookmark(token: string, category: string, deviceId: string) {
	return request<BookmarkResponse>(
		`/bookmarks/${encodeURIComponent(category)}/${encodeURIComponent(deviceId)}`,
		{
			method: "PUT",
		},
		token,
	).then((response) => response.bookmark);
}

export function removeBookmark(
	token: string,
	category: string,
	deviceId: string,
) {
	return request<void>(
		`/bookmarks/${encodeURIComponent(category)}/${encodeURIComponent(deviceId)}`,
		{ method: "DELETE" },
		token,
	);
}
