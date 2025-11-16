import { Image } from "@unpic/react"
import { Award } from "lucide-react"

const specialists = [
	{
		id: 1,
		name: "Олена Коваленко",
		position: "Головний бухгалтер",
		experience: "15 років досвіду в бухгалтерському обліку. Експерт з міжнародних стандартів фінансової звітності (МСФЗ).",
		photo: "/professional-accountant-woman-portrait.jpg",
		diploma: "/accounting-diploma-certificate.jpg",
	},
	{
		id: 2,
		name: "Андрій Петренко",
		position: "Податковий консультант",
		experience: "12 років досвіду в податковому консалтингу. Спеціаліст з податкової оптимізації та аудиту.",
		photo: "/professional-accountant-man-portrait.jpg",
		diploma: "/tax-consultant-diploma-certificate.jpg",
	},
	{
		id: 3,
		name: "Марія Шевченко",
		position: "Фінансовий аналітик",
		experience: "10 років досвіду в фінансовому аналізі. Експерт з фінансового планування та бюджетування.",
		photo: "/professional-financial-analyst-woman-portrait.jpg",
		diploma: "/financial-analyst-diploma-certificate.jpg",
	},
]

export default function Specialists() {
	return (
		<section className="py-20 bg-muted/30">
			<div className="max-w-6xl mx-auto px-4">
				<div className="text-center mb-16">
					<h2 className="text-4xl font-bold text-primary mb-4 text-balance">Наші спеціалісти</h2>
					<p className="text-lg text-foreground/70 max-w-2xl mx-auto text-pretty">
						Команда кваліфікованих професіоналів з багаторічним досвідом
					</p>
				</div>

				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
					{specialists.map((specialist) => (
						<div
							key={specialist.id}
							className="bg-background rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
						>
							<div className="relative h-64 bg-muted">
								<Image
									src={specialist.photo || "/placeholder.svg"}
									alt={specialist.name}
									width={400}
									height={300}
									className="object-cover"
								/>
							</div>

							<div className="p-6">
								<h3 className="text-xl font-bold text-primary mb-1">{specialist.name}</h3>
								<p className="text-accent font-semibold mb-3">{specialist.position}</p>
								<p className="text-foreground/70 text-sm leading-relaxed mb-4">{specialist.experience}</p>

								<button
									className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors font-medium text-sm"
									onClick={() => {
										const modal = document.getElementById(`diploma-${specialist.id}`)
										if (modal) modal.classList.remove("hidden")
									}}
								>
									<Award className="w-4 h-4" />
									Переглянути диплом
								</button>
							</div>

							{/* Diploma Modal */}
							<div
								id={`diploma-${specialist.id}`}
								className="hidden fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
								onClick={(e) => {
									if (e.target === e.currentTarget) {
										e.currentTarget.classList.add("hidden")
									}
								}}
							>
								<div className="relative max-w-4xl w-full bg-background rounded-lg overflow-hidden">
									<button
										className="absolute top-4 right-4 text-white bg-black/50 hover:bg-black/70 rounded-full w-10 h-10 flex items-center justify-center z-10"
										onClick={() => {
											const modal = document.getElementById(`diploma-${specialist.id}`)
											if (modal) modal.classList.add("hidden")
										}}
									>
										✕
									</button>
									<div className="relative h-[600px]">
										<Image
											width={400}
											height={300}
											src={specialist.diploma || "/placeholder.svg"}
											alt={`Диплом ${specialist.name}`}
											className="object-contain"
										/>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
