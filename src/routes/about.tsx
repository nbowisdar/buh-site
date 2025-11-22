import { createFileRoute } from "@tanstack/react-router"

import Specialists from "@/components/specialists"
export const Route = createFileRoute("/about")({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<section>
			<div className="min-h-screen bg-background">
				<div className="min-h-screen bg-background">
					<div className="max-w-6xl mx-auto px-4 py-20">
						<h1 className="text-5xl font-bold  mb-8 text-balance">Про нас</h1>

						<div className="mb-12 rounded-lg overflow-hidden shadow-xl">
							<img
								src="/modern-accounting-office-interior-with-team-collab.jpg"
								alt="Our office"
								className="w-full h-[400px] object-cover"
							/>
						</div>

						<div className="grid md:grid-cols-2 gap-12 mb-16">
							<div>
								<h2 className="text-2xl font-semibold  mb-4">Наша історія</h2>
								<p className="text-lg text-foreground/80 leading-relaxed mb-4">
									З 2010 року ми надаємо комплексні облікові та бухгалтерські послуги компаніям різних розмірів. Наша команда
									складається з висококваліфікованих фахівців, які мають глибокі знання у галузі бухгалтерії та оподаткування.
								</p>
								<p className="text-lg text-foreground/80 leading-relaxed">
									Ми гордимося своєю репутацією надійного партнера для сотень компаній по всій Україні. Наша мета — допомогти
									вашому бізнесу зростати й розвиватися, забезпечивши якісну фінансову аналітику та консультації.
								</p>
							</div>
							<div className="bg-muted rounded-lg p-8">
								<h2 className="text-2xl font-semibold  mb-6">Наші цінності</h2>
								<ul className="space-y-4 text-lg">
									<li className="flex items-start gap-3">
										<span className=" font-bold mt-1">✓</span>
										<span>Професіоналізм та експертиза</span>
									</li>
									<li className="flex items-start gap-3">
										<span className=" font-bold mt-1">✓</span>
										<span>Надійність і чесність</span>
									</li>
									<li className="flex items-start gap-3">
										<span className=" font-bold mt-1">✓</span>
										<span>Інноваційні рішення</span>
									</li>
									<li className="flex items-start gap-3">
										<span className=" font-bold mt-1">✓</span>
										<span>Індивідуальний підхід</span>
									</li>
								</ul>
							</div>
						</div>

						<div className="bg-[rgb(0,162,224)]/10 rounded-lg p-8 border border-[rgb(0,162,224)]/20">
							<h2 className="text-2xl font-semibold  mb-6">Статистика</h2>
							<div className="grid md:grid-cols-3 gap-8">
								<div className="text-center">
									<div className="text-4xl font-bold  mb-2">500+</div>
									<p className="text-foreground/70">Задоволених клієнтів</p>
								</div>
								<div className="text-center">
									<div className="text-4xl font-bold  mb-2">15+</div>
									<p className="text-foreground/70">Років досвіду</p>
								</div>
								<div className="text-center">
									<div className="text-4xl font-bold  mb-2">100%</div>
									<p className="text-foreground/70">Якість обслуговування</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Specialists />
		</section>
	)
}
