import { useState } from "react"

interface LoginFormProps {
	onLogin: () => void
}

export function LoginForm({ onLogin }: LoginFormProps) {
	const [password, setPassword] = useState("")
	const ADMIN_PASSWORD = "admin123"

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		if (password === ADMIN_PASSWORD) {
			localStorage.setItem("adminAuth", "true")
			onLogin()
			setPassword("")
		} else {
			alert("Неправильний пароль!")
			setPassword("")
		}
	}

	return (
		<div className="max-w-md mx-auto">
			<div className="bg-card border border-border rounded-lg p-8">
				<h1 className="text-3xl font-bold text-primary mb-8">Адміністратор панель</h1>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label className="block text-sm font-medium text-foreground mb-2">Пароль</label>
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="w-full px-4 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
							placeholder="Введіть пароль"
						/>
					</div>
					<button
						type="submit"
						className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2 rounded-md transition"
					>
						Вхід
					</button>
				</form>
				<p className="text-xs text-foreground/60 mt-4 text-center">Пароль: admin123</p>
			</div>
		</div>
	)
}
