import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const source = readFileSync(
	new URL("../src/components/catalog/DeviceDetail.tsx", import.meta.url),
	"utf8",
);

for (const name of ["handleBookmark", "handleOwned"]) {
	const handler = source.match(
		new RegExp(`async function ${name}\\(\\) \\{[\\s\\S]*?\\n\\t\\}`),
	)?.[0];
	assert.ok(handler, `${name} must exist`);
	for (const initial of [false, true]) {
		for (const success of [false, true]) {
			let optimistic;
			let pending;
			let authoritative = initial;
			let settle;
			const response = new Promise((resolve) => {
				settle = resolve;
			});
			const toggle = async () => {
				authoritative = await response;
				return authoritative;
			};
			const action = new Function(
				"user",
				"displayedBookmarked",
				"displayedOwned",
				"setOptimisticBookmarked",
				"setOptimisticOwned",
				"setBookmarkPending",
				"setOwnedPending",
				"toggleBookmark",
				"toggleOwned",
				"category",
				"device",
				`return (${handler});`,
			)(
				{},
				initial,
				initial,
				(value) => {
					optimistic = value;
				},
				(value) => {
					optimistic = value;
				},
				(value) => {
					pending = value;
				},
				(value) => {
					pending = value;
				},
				toggle,
				toggle,
				"iphone",
				{ id: "test-device" },
			);
			const running = action();
			assert.equal(optimistic, !initial, `${name} updates immediately`);
			assert.equal(pending, true);
			settle(success ? !initial : initial);
			await running;
			assert.equal(optimistic, undefined, `${name} releases optimistic state`);
			assert.equal(pending, false);
			assert.equal(optimistic ?? authoritative, success ? !initial : initial);
		}
	}
}

console.log("optimistic rollback check passed");
