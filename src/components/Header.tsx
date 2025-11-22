import { Link } from "@tanstack/react-router"
import { Image } from "@unpic/react"
import { useState } from "react"
import ThemeSwitcher from "./mode-toggle"

export default function Header() {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<nav className="bg-primary text-primary-foreground sticky top-0 z-50 shadow-sm">
			<div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
				<Link to="/" className="text-2xl font-bold flex items-center">
					<div className="w-auto overflow-visible">
						<Image src="/logo.png" alt="Virox Audit" width={150} height={200} />
					</div>
				</Link>

				<button type="button" className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
					☰
				</button>

				<ul
					className={`${
						isOpen ? "flex" : "hidden"
					} items-center md:flex flex-col md:flex-row gap-6 absolute md:static top-16 left-0 right-0 bg-primary md:bg-transparent p-4 md:p-0`}
				>
					<li>
						<Link to="/" className="hover:text-accent transition">
							Головна
						</Link>
					</li>
					<li>
						<Link to="/about" className="hover:text-accent transition">
							Про нас
						</Link>
					</li>
					<li>
						<Link to="/pricing" className="hover:text-accent transition">
							Тарифи
						</Link>
					</li>
					<li>
						<Link to="/feedback" className="hover:text-accent transition">
							Відгуки
						</Link>
					</li>
					<li>
						<Link to="/contact" className="bg-secondary hover:bg-secondary/90 px-4 py-2 rounded-md transition">
							Контакти
						</Link>
					</li>
					<li className="flex items-center">
						<ThemeSwitcher />
					</li>
				</ul>
			</div>
		</nav>
	)
}
