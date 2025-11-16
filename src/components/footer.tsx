export default function Footer() {
  return (
		<footer className="bg-primary text-primary-foreground py-5">
			<div className="max-w-6xl mx-auto px-4">
				<div className="grid md:grid-cols-4 gap-8 mb-8">
					<div>
						<h3 className="font-bold text-lg mb-4">Virox Audit</h3>
						<p className="text-primary-foreground/80">Надійний партнер для вашого бізнесу з 2010 року.</p>
					</div>
					<div>
						<h4 className="font-semibold mb-4">Навігація</h4>
						<ul className="space-y-2 text-primary-foreground/80">
							<li>
								<a href="/" className="hover:text-accent transition">
									Головна
								</a>
							</li>
							<li>
								<a href="/about" className="hover:text-accent transition">
									Про нас
								</a>
							</li>
							<li>
								<a href="/feedback" className="hover:text-accent transition">
									Відгуки
								</a>
							</li>
							<li>
								<a href="/contact" className="hover:text-accent transition">
									Контакти
								</a>
							</li>
						</ul>
					</div>
					<div>
						<h4 className="font-semibold mb-4">Послуги</h4>
						<ul className="space-y-2 text-primary-foreground/80">
							<li>
								<a href="#" className="hover:text-accent transition">
									Бухгалтерія
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-accent transition">
									Податки
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-accent transition">
									Аудит
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-accent transition">
									Консалтинг
								</a>
							</li>
						</ul>
					</div>
					<div>
						<h4 className="font-semibold mb-4">Контакти</h4>
						<p className="text-primary-foreground/80 mb-2">+38 (044) 123-45-67</p>
						<p className="text-primary-foreground/80 mb-2">info@accounting.ua</p>
						<p className="text-primary-foreground/80">Київ, Україна</p>
					</div>
				</div>

				<div className="border-t border-primary-foreground/20 pt-8 text-center text-primary-foreground/70">
					<p>&copy; 2025 Virox Audit. Усі права захищені.</p>
				</div>
			</div>
		</footer>
	)
}
