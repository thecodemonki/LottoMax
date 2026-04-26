import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Camera, Briefcase } from 'lucide-react';

export function Footer() {
	return (
		<footer className="md:rounded-t-6xl relative w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between rounded-t-4xl border-t border-white/10 bg-[radial-gradient(35%_128px_at_50%_0%,theme(backgroundColor.white/5%),transparent)] px-6 py-8 mt-12">
			<div className="bg-foreground/20 absolute top-0 right-1/2 left-1/2 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full blur" />

			<AnimatedContainer>
				<p className="text-white/60 text-sm font-medium">
					© {new Date().getFullYear()} Maxwell Peng. All rights reserved.
				</p>
			</AnimatedContainer>

			<AnimatedContainer delay={0.2} className="mt-6 md:mt-0">
				<ul className="text-white/60 flex gap-6 text-sm font-medium">
					<li>
						<a href="#" className="hover:text-white inline-flex items-center transition-colors duration-300">
							<Camera className="me-2 size-4" /> Instagram
						</a>
					</li>
					<li>
						<a href="#" className="hover:text-white inline-flex items-center transition-colors duration-300">
							<Briefcase className="me-2 size-4" /> LinkedIn
						</a>
					</li>
				</ul>
			</AnimatedContainer>
		</footer>
	);
}

function AnimatedContainer({ className, delay = 0.1, children }) {
	const shouldReduceMotion = useReducedMotion();

	if (shouldReduceMotion) {
		return <div className={className}>{children}</div>;
	}

	return (
		<motion.div
			initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
			whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
			viewport={{ once: true }}
			transition={{ delay, duration: 0.8 }}
			className={className}
		>
			{children}
		</motion.div>
	);
}
