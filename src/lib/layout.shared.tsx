import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { AccountButton } from "@/components/auth/AccountButton";
import { appName, gitConfig } from "./shared";

export function baseOptions(): BaseLayoutProps {
	return {
		nav: {
			title: appName,
			url: "/",
			children: (
				<>
					<span className="flex-1" />
					<AccountButton />
				</>
			),
		},
		githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
	};
}
