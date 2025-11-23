import { getAllPriceFullFunc } from "@/lib/funcs/price"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/pricing")({
	component: RouteComponent,
	loader: async () => {
		const pricingTables = await getAllPriceFullFunc()
		return { pricingTables }
	},
})

function RouteComponent() {
	const { pricingTables } = Route.useLoaderData()
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
										{table.services?.map((service, serviceIndex) => (
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
