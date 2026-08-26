"use client";

import { Drawer } from "@base-ui/react/drawer";
import { buttonVariants } from "fumadocs-ui/components/ui/button";
import {
	ScrollArea,
	ScrollBar,
	ScrollViewport,
} from "fumadocs-ui/components/ui/scroll-area";
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

export function GlassAccountHeader({
	className,
	...props
}: ComponentProps<"div">) {
	const { slots } = useGlassLayout();
	const sidebar = slots.sidebar.use();
	const pathname = usePathname();
	const showingAccount = pathname.startsWith("/docs/account");
	const devicesHref = showingAccount ? "/docs/ipad" : pathname;

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

			<ScrollArea className="glass-header-surface relative hidden min-w-0 flex-1 rounded-full p-1 md:block">
				<ScrollViewport className="fd-scroll-container overflow-x-auto">
					<nav aria-label="Primary navigation" className="flex w-max gap-1">
						<Link
							href={devicesHref}
							aria-current={showingAccount ? undefined : "page"}
							className={cn(
								"inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
								showingAccount
									? "text-fd-muted-foreground hover:bg-fd-accent hover:text-fd-accent-foreground"
									: "bg-fd-primary text-fd-primary-foreground shadow-sm",
							)}
						>
							<LibraryBig aria-hidden="true" className="size-4" />
							<span>Devices</span>
						</Link>
						<Link
							href="/docs/account/bookmarks"
							aria-current={showingAccount ? "page" : undefined}
							className={cn(
								"inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
								showingAccount
									? "bg-fd-primary text-fd-primary-foreground shadow-sm"
									: "text-fd-muted-foreground hover:bg-fd-accent hover:text-fd-accent-foreground",
							)}
						>
							<UserRound aria-hidden="true" className="size-4" />
							<span>Account</span>
						</Link>
					</nav>
				</ScrollViewport>
				<ScrollBar
					orientation="horizontal"
					className="absolute inset-x-3 bottom-0 h-1 flex-col"
				/>
			</ScrollArea>

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
