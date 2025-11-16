import Hero from "@/components/hero"
import Services from "@/components/services"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/")({ component: App })

function App() {
	return (
		<main>
			<Hero />
			<Services />
		</main>
	)
}
