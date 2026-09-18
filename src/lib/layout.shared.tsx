import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { AccountButton } from "@/components/auth/AccountButton";
import { appName, gitConfig } from "./shared";

export function baseOptions(): BaseLayoutProps {
	return {
		// Shared repository shortcut. It becomes a generated navigation item.
		// githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,

		// Add main, icon, button, menu, or custom items here. Set `secondary`
		// and `on` to control placement across supported layouts.
		links: [],

		nav: {
			title: (
				<>
					<img
						src="/favicon-transparent.svg"
						alt=""
						className="size-7 -ml-2"
						aria-hidden="true"
					/>
					<h1 className="text-lg font-bold font-panchang">{appName}</h1>
				</>
			),
			url: "/",
			enabled: true,
			transparentMode: "none",
			children: (
				<>
					<span className="flex-2" />
					<AccountButton />
				</>
			),
		},

		// Shared slot overrides. Layout-specific slots are configured beside the
		// layout that owns them.
		slots: {},

		// Shared controls. The Glass header consumes these through its slots.
		themeSwitch: {
			enabled: true,
			mode: "light-dark",
		},
		searchToggle: {
			enabled: true,
		},

		// Set this to an i18n configuration when translations are enabled.
		i18n: false,
	};
}
