import ContactForm from "@/components/contact-form"
import Footer from "@/components/footer"

import { createFileRoute } from "@tanstack/react-router"
export const Route = createFileRoute("/contact")({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		
			
			<div className="min-h-screen bg-background">
				<div className="max-w-6xl mx-auto px-4 py-20">
					<h1 className="text-5xl font-bold text-primary mb-4 text-balance">Зв'яжіться з нами</h1>
					<p className="text-xl text-foreground/70 mb-12">Готові допомогти вашому бізнесу. Заповніть форму нижче!</p>

					<div className="grid md:grid-cols-3 gap-8 mb-16">
						<div className="bg-card border border-border rounded-lg p-8 text-center">
							<div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
								<span className="text-primary-foreground text-xl">📍</span>
							</div>
							<h3 className="text-lg font-semibold text-primary mb-2">Адреса</h3>
							<p className="text-foreground/70">
								вул. Грушевського, 9<br />
								Київ, 01001
								<br />
								Україна
							</p>
						</div>

						<div className="bg-card border border-border rounded-lg p-8 text-center">
							<div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
								<span className="text-primary-foreground text-xl">📞</span>
							</div>
							<h3 className="text-lg font-semibold text-primary mb-2">Телефон</h3>
							<p className="text-foreground/70">
								+38 (044) 123-45-67
								<br />
								+38 (067) 999-88-77
								<br />
								Пн-Пт: 9:00-18:00
							</p>
						</div>

						<div className="bg-card border border-border rounded-lg p-8 text-center">
							<div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
								<span className="text-primary-foreground text-xl">✉️</span>
							</div>
							<h3 className="text-lg font-semibold text-primary mb-2">Електронна пошта</h3>
							<p className="text-foreground/70">
								info@accounting.ua
								<br />
								support@accounting.ua
								<br />
								консультація@accounting.ua
							</p>
						</div>
					</div>

					<ContactForm />
				</div>
			</div>
			
		
	)
}
