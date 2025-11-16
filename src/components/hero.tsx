import { Link } from "@tanstack/react-router"
import { Image } from "@unpic/react"

export default function Hero() {
	return (
		<section className="bg-linear-to-b from-primary/10 to-background py-24">
			<div className="max-w-6xl mx-auto px-4">
				<div className="grid md:grid-cols-2 gap-12 items-center">
					<div>
						<h1 className="text-5xl md:text-6xl font-bold text-primary mb-6 text-balance">
							Професійні облікові послуги для вашого бізнесу
						</h1>
						<p className="text-xl text-foreground/70 mb-8 leading-relaxed">
							Комплексне бухгалтерське обслуговування, податкове консультування та фінансовий аналіз. Допомагаємо компаніям
							розвиватися з 2010 року.
						</p>
						<div className="flex gap-4 flex-wrap">
							<Link to="/contact">
								<button className="bg-accent text-accent-foreground px-8 py-3 rounded-lg font-semibold hover:bg-accent/90 transition">
									Отримати консультацію
								</button>
							</Link>
							<Link to="/about">
								<button className="border-2 border-primary text-primary px-8 py-3 rounded-lg font-semibold hover:bg-primary/5 transition">
									Дізнатися більше
								</button>
							</Link>
						</div>
					</div>

					<div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
						<Image
							src="/accounting-team-office.png"
							alt="Професійна команда бухгалтерів"
							width={400}
							height={300}
							className="object-cover"
						/>
					</div>
				</div>
			</div>
		</section>
	)
}
