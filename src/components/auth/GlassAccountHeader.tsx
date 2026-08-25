"use client";

import { Drawer } from "@base-ui/react/drawer";
import { buttonVariants } from "fumadocs-ui/components/ui/button";
import { useGlassLayout } from "fumadocs-ui/layouts/glass";
import { ChevronsUpDown, LanguagesIcon, SidebarIcon } from "lucide-react";
import type { ComponentProps } from "react";
import { AccountButton } from "./AccountButton";
import { cn } from "@/lib/cn";

export function GlassAccountHeader({
	className,
	...props
}: ComponentProps<"div">) {
	const { slots } = useGlassLayout();
	const sidebar = slots.sidebar.use();

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
				<div className="@container flex justify-end flex-1 max-md:hidden">
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
