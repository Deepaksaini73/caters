"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Award, CheckCircle, Users } from "lucide-react"
import { motion } from "framer-motion"

const values = [
	{
		icon: CheckCircle,
		title: "Excellence",
		description:
			"We strive for excellence in everything we do, from the smallest detail to the overall event experience.",
	},
	{
		icon: Users,
		title: "Collaboration",
		description:
			"We work closely with our clients, understanding their vision and bringing it to life through collaborative planning.",
	},
	{
		icon: Award,
		title: "Innovation",
		description:
			"We constantly explore new ideas, trends, and technologies to create unique and memorable events.",
	},
]

export default function OurValues() {
	return (
		<section className="relative py-16 md:py-24 bg-muted overflow-hidden">
			{/* Animated Gradient Background */}
			<motion.div
				className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 blur-2xl z-0"
				animate={{ opacity: [0.7, 1, 0.7] }}
				transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
			/>

			<div className="relative z-10 container mx-auto px-4">
				{/* Heading Animation */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7, ease: "easeOut" }}
					viewport={{ once: true }}
					className="text-center max-w-3xl mx-auto mb-16"
				>
					<h2 className="text-3xl font-bold mb-6">Our Values</h2>
					<p className="text-lg text-muted-foreground">
						At Mahakal Events, our work is guided by a set of core values that
						define who we are and how we approach every event.
					</p>
				</motion.div>

				{/* Value Cards Animation */}
				<motion.div
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
					variants={{
						visible: { transition: { staggerChildren: 0.13 } },
						hidden: {},
					}}
				>
					{values.map((value, idx) => (
						<motion.div
							key={value.title}
							variants={{
								hidden: { opacity: 0, y: 40, scale: 0.96 },
								visible: { opacity: 1, y: 0, scale: 1 },
							}}
							transition={{ duration: 0.7, ease: "easeOut" }}
							className="h-full"
						>
							<Card className="h-full w-full flex flex-col justify-between bg-white/70 dark:bg-black/40 backdrop-blur-md border border-primary/10 shadow-lg transition-all duration-200 hover:shadow-2xl hover:bg-primary/10 rounded-2xl">
								<CardContent className="pt-6">
									<div className="flex flex-col items-center text-center">
										<motion.div
											whileHover={{
												y: [-2, 6, -2],
												scale: 1.15,
												transition: {
													duration: 0.6,
													repeat: Infinity,
													repeatType: "loop",
													ease: "easeInOut",
												},
											}}
											className="bg-primary/10 p-3 rounded-full mb-4"
										>
											<value.icon className="h-8 w-8 text-primary" />
										</motion.div>
										<h3 className="text-xl font-semibold mb-2">
											{value.title}
										</h3>
										<p className="text-muted-foreground">
											{value.description}
										</p>
									</div>
								</CardContent>
							</Card>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	)
}