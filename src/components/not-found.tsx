import { Link } from "@tanstack/react-router"
import { FileQuestion } from "lucide-react"

export default function NotFound() {
	return (
		<div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center">
			<div className="bg-muted rounded-full p-6 mb-6 animate-in zoom-in duration-500">
				<FileQuestion className="w-16 h-16 text-muted-foreground" />
			</div>
			<h1 className="text-4xl font-bold text-primary mb-4">Сторінку не знайдено</h1>
			<p className="text-lg text-muted-foreground max-w-md mb-8">
				Вибачте, але сторінка, яку ви шукаєте, не існує або була переміщена.
			</p>
			<Link
				to="/"
				className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-all hover:scale-105 active:scale-95"
			>
				Повернутися на головну
			</Link>
		</div>
	)
}
