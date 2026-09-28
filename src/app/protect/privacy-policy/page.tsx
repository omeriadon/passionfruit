import React from "react";

const PrivacyNotice = () => {
	return (
		<div className="min-h-screen text-[#888888] font-general-sans selection:bg-neutral-800 selection:text-white relative overflow-hidden">
			<div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

			<div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-neutral-700/10 blur-[140px] rounded-full pointer-events-none animate-[pulse_8s_ease-in-out_infinite_alternate]" />

			<div className="max-w-4xl mx-auto px-6 py-24 md:py-32 relative z-10">
				<header className="mb-24 md:mb-32">
					<h1 className="text-4xl md:text-5xl font-medium text-neutral-100 tracking-tight mb-8">
						Privacy Notice
					</h1>
					<div className="flex items-center gap-3 text-xs uppercase tracking-widest text-neutral-500 font-medium">
						<span className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-[ping_3s_ease-in-out_infinite]" />
						Last Updated on September 28, 2026
					</div>
				</header>

				<div className="space-y-20 md:space-y-28">
					<section className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6 md:gap-16 items-baseline">
						<h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-300 md:sticky md:top-12">
							Introduction
						</h2>
						<div className="space-y-6 text-base leading-relaxed">
							<p>
								The Passionfruit Project acknowledges and values all users'
								rights to privacy. We offer our site and our serivces to users
								free of charge forever; our project does not seek financial
								gain. Where we refer to our "Users" in this Privacy Notice, we
								refer to users that have entered into an agreement with us.
							</p>
							<p>
								By using or accessing our sites and services in any manner, you
								accept the practices and policies outlined in this Privacy
								Notice and you acknowledge that we may at some point in your
								experience gather your data.
							</p>
						</div>
					</section>

					<hr className="border-neutral-900" />

					<section className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6 md:gap-16 items-baseline">
						<h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-300 md:sticky md:top-12">
							About our Service
						</h2>
						<div className="space-y-6 text-base leading-relaxed">
							<p>
								Passionfruit is an external documentation service built off the
								Fumadocs framework that moniters statistics about products from
								Apple Incorporated.
							</p>
							<p>
								We heavily acknowledge and would like to make clear that we are{" "}
								<b>not affiliated</b> to Apple Incorporated in any manner. We
								are an independent and unrelated third party purely building a
								service to view specifications in a more convenient manner.
							</p>
						</div>
					</section>

					<hr className="border-neutral-900" />

					<section className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6 md:gap-16 items-baseline">
						<h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-300 md:sticky md:top-12">
							Data Collection
						</h2>
						<div className="space-y-10 text-base leading-relaxed">
							<div className="group">
								<h3 className="text-neutral-200 font-medium mb-3 flex items-center gap-3">
									Information You Provide
									<span className="w-0 h-[1px] bg-neutral-600 transition-all duration-500 group-hover:w-8" />
								</h3>
								<p>
									We collect information you provide directly to us when you
									create an account, or use our chatbot feature.
								</p>
							</div>
						</div>
					</section>
				</div>
			</div>
		</div>
	);
};

export default PrivacyNotice;
