import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/pricing")({
	component: RouteComponent,
})

function RouteComponent() {
	const pricingTables = [
		{
			title: "Бухгалтерські послуги",
			services: [
				{ name: "Ведення бухгалтерського обліку", price: "₴5,000/міс" },
				{ name: "Підготовка фінансової звітності", price: "₴3,000" },
				{ name: "Консультації з бухобліку", price: "₴800/год" },
				{ name: "Облік заробітної плати", price: "₴2,500/міс" },
				{ name: "Складання податкових декларацій", price: "₴1,500" },
			],
		},
		{
			title: "Аудиторські послуги",
			services: [
				{ name: "Аудит фінансової звітності", price: "від ₴15,000" },
				{ name: "Податковий аудит", price: "від ₴10,000" },
				{ name: "Аудит внутрішніх процесів", price: "від ₴12,000" },
				{ name: "Експрес-аудит", price: "₴8,000" },
			],
		},
		{
			title: "Консультаційні послуги",
			services: [
				{ name: "Податкове планування", price: "₴5,000" },
				{ name: "Оптимізація бізнес-процесів", price: "₴7,000" },
				{ name: "Юридичний супровід", price: "₴1,200/год" },
				{ name: "Консультації з МСФЗ", price: "₴1,500/год" },
				{ name: "Розробка фінансової стратегії", price: "від ₴20,000" },
			],
		},
	]

	return (
		<section className="py-16 bg-linear-to-b from-background to-secondary/5">
			<div className="max-w-6xl mx-auto px-4">
				<div className="text-center mb-12">
					<h1 className="text-4xl font-bold text-primary mb-4">Наші Послуги та Ціни</h1>
					<p className="text-lg text-foreground/70">Прозорі ціни на всі наші бухгалтерські та аудиторські послуги</p>
				</div>

				<div className="space-y-8">
					{pricingTables.map((table, index) => (
						<div key={index} className="bg-muted rounded-lg shadow-lg overflow-hidden">
							<div className="bg-primary/5 px-8 py-6 border-b border-primary/10">
								<h2 className="text-2xl font-bold text-primary">{table.title}</h2>
							</div>

							<div className="overflow-x-auto">
								<table className="w-full">
									<thead>
										<tr className="border-b border-foreground/10">
											<th className="px-8 py-4 text-left text-sm font-semibold text-foreground/70">Послуга</th>
											<th className="px-8 py-4 text-right text-sm font-semibold text-foreground/70">Вартість</th>
										</tr>
									</thead>
									<tbody>
										{table.services.map((service, serviceIndex) => (
											<tr key={serviceIndex} className="border-b border-foreground/5 hover:bg-primary/5 transition-colors">
												<td className="px-8 py-4 text-foreground">{service.name}</td>
												<td className="px-8 py-4 text-right font-semibold text-primary">{service.price}</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
					))}
				</div>

				<div className="mt-16 bg-muted rounded-lg shadow-md p-8">
					<h2 className="text-2xl font-bold text-primary mb-6">Що включено в усі плани?</h2>
					<div className="grid md:grid-cols-2 gap-6">
						<div className="flex gap-4">
							<span className="text-accent text-2xl shrink-0">✓</span>
							<div>
								<h3 className="font-semibold text-foreground mb-1">Професійна команда</h3>
								<p className="text-sm text-foreground/70">Досвідчені бухгалтери та аудитори</p>
							</div>
						</div>
						<div className="flex gap-4">
							<span className="text-accent text-2xl shrink-0">✓</span>
							<div>
								<h3 className="font-semibold text-foreground mb-1">Надійність</h3>
								<p className="text-sm text-foreground/70">Дотримання всіх законодавчих вимог</p>
							</div>
						</div>
						<div className="flex gap-4">
							<span className="text-accent text-2xl shrink-0">✓</span>
							<div>
								<h3 className="font-semibold text-foreground mb-1">Гнучкість</h3>
								<p className="text-sm text-foreground/70">Адаптація до потреб вашого бізнесу</p>
							</div>
						</div>
						<div className="flex gap-4">
							<span className="text-accent text-2xl shrink-0">✓</span>
							<div>
								<h3 className="font-semibold text-foreground mb-1">Безпека</h3>
								<p className="text-sm text-foreground/70">Конфіденційність усіх даних</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
