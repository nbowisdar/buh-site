import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"

export default function ThemeSwitcher() {
	const [isDark, setIsDark] = useState(false)

	useEffect(() => {
		const theme = localStorage.getItem("theme")
		const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

		if (theme === "dark" || (!theme && prefersDark)) {
			setIsDark(true)
			document.documentElement.classList.add("dark")
		}
	}, [])

	const toggleTheme = () => {
		if (isDark) {
			document.documentElement.classList.remove("dark")
			localStorage.setItem("theme", "light")
			setIsDark(false)
		} else {
			document.documentElement.classList.add("dark")
			localStorage.setItem("theme", "dark")
			setIsDark(true)
		}
	}

	return (
		<button onClick={toggleTheme} className="p-2 rounded-md hover:bg-muted/10 transition-colors" aria-label="Toggle theme">
			{isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
		</button>
	)
}
