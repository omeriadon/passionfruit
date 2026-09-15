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
	typeof window === "undefined"
		? (process.env.NEXT_PUBLIC_BOOKMARKS_API_URL ??
			"https://passionfruit-api.adonis.pt")
		: "";

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

export type OwnedDevice = {
	category: string;
	deviceId: string;
	createdAt: string | null;
};

type OwnedResponse = { owned: OwnedDevice };
type OwnedListResponse = { owned: OwnedDevice[] };

export function listOwned(token: string) {
	return request<OwnedListResponse>("/owned", {}, token).then(
		(response) => response.owned,
	);
}

export function addOwned(token: string, category: string, deviceId: string) {
	return request<OwnedResponse>(
		`/owned/${encodeURIComponent(category)}/${encodeURIComponent(deviceId)}`,
		{
			method: "PUT",
		},
		token,
	).then((response) => response.owned);
}

export function removeOwned(token: string, category: string, deviceId: string) {
	return request<void>(
		`/owned/${encodeURIComponent(category)}/${encodeURIComponent(deviceId)}`,
		{ method: "DELETE" },
		token,
	);
}

type CategoryOrderResponse = { order: string[] };

export function getCategoryOrder(token: string) {
	return request<CategoryOrderResponse>("/preferences/order", {}, token).then(
		(response) => response.order,
	);
}

export function setCategoryOrder(token: string, order: string[]) {
	return request<CategoryOrderResponse>(
		"/preferences/order",
		{
			method: "PUT",
			body: JSON.stringify({ order }),
		},
		token,
	).then((response) => response.order);
}

export function updateUsername(token: string, username: string) {
	return request<AuthUserResponse>(
		"/auth/username",
		{
			method: "PATCH",
			body: JSON.stringify({ username }),
		},
		token,
	).then((response) => response.user);
}

export function changePassword(
	token: string,
	currentPassword: string,
	newPassword: string,
) {
	return request<AuthUserResponse>(
		"/auth/password",
		{
			method: "PATCH",
			body: JSON.stringify({ currentPassword, newPassword }),
		},
		token,
	).then((response) => response.user);
}

export function deleteAccount(token: string) {
	return request<void>("/auth/account", { method: "DELETE" }, token);
}
