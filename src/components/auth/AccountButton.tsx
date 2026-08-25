"use client";

import { UserRound } from "lucide-react";
import { buttonVariants } from "fumadocs-ui/components/ui/button";
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
	const { user, openAuthDialog } = useAuth();

	return (
		<button
			type="button"
			className={cn(
				buttonVariants({
					color: glass ? "secondary" : "ghost",
					size: "sm",
					className: "gap-1.5",
				}),
				glass &&
					"rounded-full bg-fd-popover/80 text-fd-popover-foreground backdrop-blur-sm",
				className,
			)}
			onClick={openAuthDialog}
			aria-label={user ? `Account: ${user.username}` : "Open account"}
		>
			<UserRound aria-hidden="true" />
			<span className="max-sm:hidden">{user?.username ?? "Account"}</span>
		</button>
	);
}
