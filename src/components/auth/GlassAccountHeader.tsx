"use client";

import { Drawer } from "@base-ui/react/drawer";
import { buttonVariants } from "fumadocs-ui/components/ui/button";
import { useGlassLayout } from "fumadocs-ui/layouts/glass";
import Link from "fumadocs-core/link";
import { usePathname } from "fumadocs-core/framework";
import {
	ChevronsUpDown,
	LanguagesIcon,
	LibraryBig,
	SidebarIcon,
	UserRound,
} from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";
import { CategoryOrderEffect } from "@/components/you/CategoryOrderEffect";
import {
	SidebarDeviceSearch,
	YouSidebarLinks,
} from "@/components/you/SidebarPortals";

export function GlassAccountHeader({
	className,
	...props
}: ComponentProps<"div">) {
	const { slots } = useGlassLayout();
	const sidebar = slots.sidebar.use();
	const pathname = usePathname();
	const showingYou = pathname.startsWith("/you");
	const devicesHref = showingYou ? "/docs/ipad" : pathname;

	return (
		<div
			className={cn(
				"sticky flex flex-row justify-end gap-2 [grid-area:left-margin/left-margin/right/right] z-20 px-4 md:top-0 md:pt-2 md:px-2 md:h-12 md:bg-linear-to-b md:from-fd-background max-md:bottom-0 max-md:mt-auto max-md:h-16 max-md:pb-4 max-md:bg-linear-to-t max-md:from-fd-background",
				className,
			)}
			{...props}
		>
			<CategoryOrderEffect />
			<SidebarDeviceSearch />
			<YouSidebarLinks />
			{sidebar.collapsible && sidebar.collapsed ? (
				<button
					aria-label="Show Sidebar"
					className={cn(
						buttonVariants({ size: "icon-sm", variant: "secondary" }),
						"glass-header-surface rounded-full",
						"size-10 shrink-0 max-md:hidden",
					)}
					onClick={() => sidebar.setCollapsed(false)}
					type="button"
				>
					<SidebarIcon aria-hidden="true" />
				</button>
			) : null}

			<nav
				aria-label="Primary navigation"
				className="glass-account-switch glass-header-surface relative hidden shrink-0 grid-cols-2 items-center rounded-full p-1 md:grid me-auto"
				data-active={showingYou ? "you" : "devices"}
			>
				<span aria-hidden="true" className="glass-account-switch-pill" />
				<Link
					href={devicesHref}
					aria-current={showingYou ? undefined : "page"}
					className="relative z-1 inline-flex items-center justify-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium"
				>
					<LibraryBig aria-hidden="true" className="size-4" />
					<span>Devices</span>
				</Link>
				<Link
					href="/you/devices"
					aria-current={showingYou ? "page" : undefined}
					className="relative z-1 inline-flex items-center justify-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium"
				>
					<UserRound aria-hidden="true" className="size-4" />
					<span>You</span>
				</Link>
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
						"glass-theme-switch glass-header-surface",
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
