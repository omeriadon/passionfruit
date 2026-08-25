import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { AccountButton } from "@/components/auth/AccountButton";
import { appName, gitConfig } from "./shared";

export function baseOptions(): BaseLayoutProps {
	return {
<<<<<<< HEAD
		// Shared repository shortcut. It becomes a generated navigation item.
=======
		nav: {
			title: appName,
			url: "/",
		},
>>>>>>> refs/remotes/origin/data/first-ui
		githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,

		// Add main, icon, button, menu, or custom items here. Set `secondary`
		// and `on` to control placement across supported layouts.
		links: [],

		nav: {
			title: appName,
			url: "/",
			enabled: true,
			transparentMode: "none",
			children: (
				<>
					<span className="flex-1" />
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
