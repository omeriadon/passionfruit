"use client";

import { LogOut, UserRound } from "lucide-react";
import { buttonVariants } from "fumadocs-ui/components/ui/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "fumadocs-ui/components/ui/popover";
import { useAuth } from "@/lib/auth/AuthProvider";
import { cn } from "@/lib/cn";

type AccountButtonProps = {
	glass?: boolean;
	className?: string;
};

export function AccountButton({
	glass = false,
	className,
}: AccountButtonProps) {
	const { user, logout, openAuthDialog } = useAuth();
	const buttonClassName = cn(
		buttonVariants({
			color: glass ? "secondary" : "ghost",
			size: "sm",
			className: "gap-1.5",
		}),
		className,
	);

	const buttonContent = (
		<>
			<UserRound aria-hidden="true" />
			<span className="max-sm:hidden">{user?.username ?? "Account"}</span>
		</>
	);

	if (!user) {
		return (
			<button
				type="button"
				className={buttonClassName}
				onClick={openAuthDialog}
				aria-label="Open account"
			>
				{buttonContent}
			</button>
		);
	}

	return (
		<Popover>
			<PopoverTrigger
				type="button"
				className={(state) => cn(buttonClassName, state.open && "bg-fd-accent")}
				aria-label={`Account: ${user.username}`}
			>
				{buttonContent}
			</PopoverTrigger>
			<PopoverContent
				align="end"
				className="glass-header-surface flex w-64 flex-col gap-1 rounded-xl p-1"
			>
				<div className="px-2 py-1.5">
					<p className="text-xs font-medium text-fd-muted-foreground">
						Signed in as
					</p>
					<p className="truncate font-medium">{user.username}</p>
				</div>
				<button
					type="button"
					className="inline-flex items-center gap-2 rounded-lg px-2 py-1.5 text-start text-sm text-fd-muted-foreground transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground"
					onClick={logout}
				>
					<LogOut aria-hidden="true" className="size-4" />
					Sign out
				</button>
			</PopoverContent>
		</Popover>
	);
}
