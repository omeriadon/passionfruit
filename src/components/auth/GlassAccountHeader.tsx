"use client";

import { Drawer } from "@base-ui/react/drawer";
import { buttonVariants } from "fumadocs-ui/components/ui/button";
import { useTreePath } from "fumadocs-ui/contexts/tree";
import { useGlassLayout } from "fumadocs-ui/layouts/glass";
import { isLayoutTabActive } from "fumadocs-ui/layouts/shared";
import Link from "fumadocs-core/link";
import { usePathname } from "fumadocs-core/framework";
import { ChevronsUpDown, LanguagesIcon, SidebarIcon } from "lucide-react";
import type { ComponentProps } from "react";
import { AccountButton } from "./AccountButton";
import { cn } from "@/lib/cn";

export function GlassAccountHeader({
	className,
	...props
}: ComponentProps<"div">) {
	const { props: layoutProps, slots } = useGlassLayout();
	const sidebar = slots.sidebar.use();
	const treePath = useTreePath();
	const pathname = usePathname();

	return (
		<div
			className={cn(
				"sticky flex flex-row justify-end gap-2 [grid-area:left-margin/left-margin/right/right] z-20 px-4 md:top-0 md:pt-2 md:px-2 md:h-12 md:bg-linear-to-b md:from-fd-background max-md:bottom-0 max-md:mt-auto max-md:h-16 max-md:pb-4 max-md:bg-linear-to-t max-md:from-fd-background",
				className,
			)}
			{...props}
		>
			{sidebar.collapsible && sidebar.collapsed ? (
				<button
					aria-label="Show Sidebar"
					className={cn(
						buttonVariants({ size: "icon-sm", variant: "secondary" }),
						"glass-header-surface rounded-full",
						"size-10 me-auto shrink-0 max-md:hidden",
					)}
					onClick={() => sidebar.setCollapsed(false)}
					type="button"
				>
					<SidebarIcon aria-hidden="true" />
				</button>
			) : null}

			<nav
				aria-label="Catalog categories"
				className="glass-header-surface hidden min-w-0 flex-1 items-center gap-1 overflow-x-auto rounded-full p-1 md:flex"
			>
				{layoutProps.tabs.map((tab) => {
					const isActive = isLayoutTabActive(tab, treePath, pathname);

					return (
						<Link
							key={tab.url}
							{...tab.props}
							href={tab.url}
							aria-current={isActive ? "page" : undefined}
							className={cn(
								"inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
								isActive
									? "bg-fd-primary text-fd-primary-foreground shadow-sm"
									: "text-fd-muted-foreground hover:bg-fd-accent hover:text-fd-accent-foreground",
							)}
						>
							{tab.icon ? (
								<span aria-hidden="true" className="size-4 [&_svg]:size-4">
									{tab.icon}
								</span>
							) : null}
							<span>{tab.title}</span>
						</Link>
					);
				})}
			</nav>

			{slots.searchTrigger ? (
				<slots.searchTrigger.sm
					color="secondary"
					size="icon"
					className={cn(
						"glass-header-surface rounded-full",
						"size-12 shrink-0 md:hidden",
					)}
				/>
			) : null}

			{slots.searchTrigger ? (
				<div className="@container hidden justify-end md:flex md:w-52 xl:w-64">
					<slots.searchTrigger.full
						className={cn(
							"glass-header-surface rounded-full",
							"text-fd-muted-foreground ps-3 w-full @sm:max-w-50",
						)}
					/>
				</div>
			) : null}

			<AccountButton
				glass
				className={cn(
					"glass-header-surface rounded-full",
					"shrink-0 px-3 max-md:hidden",
				)}
			/>

			{slots.languageSelect ? (
				<slots.languageSelect.root
					className={cn(
						"glass-header-surface rounded-full",
						"px-3 max-md:hidden",
					)}
				>
					<LanguagesIcon
						aria-hidden="true"
						className="size-4 text-fd-muted-foreground shrink-0"
					/>
					<slots.languageSelect.text />
					<ChevronsUpDown
						aria-hidden="true"
						className="size-3.5 text-fd-muted-foreground shrink-0"
					/>
				</slots.languageSelect.root>
			) : null}

			{slots.themeSwitch ? (
				<slots.themeSwitch
					className={cn(
						"glass-header-surface",
						"shrink-0 px-1.5 max-md:hidden",
					)}
				/>
			) : null}

			<Drawer.Trigger
				handle={slots.sidebar.drawerHandle}
				render={(triggerProps, { open }) => (
					<button
						{...triggerProps}
						aria-label={open ? "Close Sidebar" : "Open Sidebar"}
						className={cn(
							buttonVariants({ variant: "secondary", size: "icon" }),
							"glass-header-surface rounded-full",
							"shrink-0 size-12 md:hidden",
						)}
						type="button"
					>
						<SidebarIcon aria-hidden="true" />
					</button>
				)}
			/>
		</div>
	);
}
