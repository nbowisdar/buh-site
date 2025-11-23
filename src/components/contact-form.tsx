import { handleFormSubmit } from "@/lib/funcs/tg"
import { useEffect, useState } from "react"

export default function ContactForm() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		company: "",
		subject: "",
		message: "",
	})

	const [submitted, setSubmitted] = useState(false)
	const [hasSubmitted, setHasSubmitted] = useState(false)

	useEffect(() => {
		const isSubmitted = localStorage.getItem("contactSubmission")
		if (isSubmitted) {
			setHasSubmitted(true)
		}
	}, [])

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		const { name, value } = e.target
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}))
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		localStorage.setItem("contactSubmission", "true")

		setSubmitted(true)
		setHasSubmitted(true)
		setFormData({
			name: "",
			email: "",
			phone: "",
			company: "",
			subject: "",
			message: "",
		})
		await handleFormSubmit({ data: formData })
	}

	if (hasSubmitted) {
		return (
			<div className="bg-card border border-border rounded-lg p-12 text-center">
				<h2 className="text-3xl font-bold text-primary mb-4">Заявку вже надіслано</h2>
				<p className="text-foreground text-lg">
					Ви вже надсилали форму. Ми отримали ваші дані і зв'яжемося з вами найближчим часом.
				</p>
			</div>
		)
	}

	return (
		<div className="bg-card border border-border rounded-lg p-12">
			<h2 className="text-3xl font-bold text-primary mb-8">Форма зв'язку</h2>

			{submitted && (
				<div className="mb-8 p-4 bg-green-100 border border-green-300 rounded-lg text-green-800">
					✓ Дякуємо! Ваше повідомлення успішно надіслано. Ми зв'яжемося з вами найближчим часом.
				</div>
			)}

			<form onSubmit={handleSubmit} className="space-y-6">
				<div className="grid md:grid-cols-2 gap-6">
					<div>
						<p className="block text-foreground font-semibold mb-2">Ваше ім'я *</p>
						<input
							type="text"
							name="name"
							value={formData.name}
							onChange={handleChange}
							required
							className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
							placeholder="Іван Петренко"
						/>
					</div>
					<div>
						<p className="block text-foreground font-semibold mb-2">Електронна пошта *</p>
						<input
							type="email"
							name="email"
							value={formData.email}
							onChange={handleChange}
							required
							className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
							placeholder="ivan@company.ua"
						/>
					</div>
				</div>

				<div className="grid md:grid-cols-2 gap-6">
					<div>
						<p className="block text-foreground font-semibold mb-2">Телефон</p>
						<input
							type="tel"
							name="phone"
							value={formData.phone}
							onChange={handleChange}
							className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
							placeholder="+38 (099) 123-45-67"
						/>
					</div>
					<div>
						<p className="block text-foreground font-semibold mb-2">Назва компанії</p>
						<input
							type="text"
							name="company"
							value={formData.company}
							onChange={handleChange}
							className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
							placeholder="ТОВ 'Приклад'"
						/>
					</div>
				</div>

				<div>
					<p className="block text-foreground font-semibold mb-2">Тема запиту *</p>
					<select
						name="subject"
						value={formData.subject}
						onChange={handleChange}
						required
						className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
					>
						<option value="">Виберіть тему</option>
						<option value="бухгалтерія">Ведення бухгалтерії</option>
						<option value="податки">Податкове консультування</option>
						<option value="аналіз">Фінансовий аналіз</option>
						<option value="реєстрація">Реєстрація компанії</option>
						<option value="інше">Інше</option>
					</select>
				</div>

				<div>
					<p className="block text-foreground font-semibold mb-2">Ваше повідомлення *</p>
					<textarea
						name="message"
						value={formData.message}
						onChange={handleChange}
						required
						rows={6}
						className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent resize-none"
						placeholder="Розкажіть нам про ваші потреби..."
					/>
				</div>

				<button
					type="submit"
					className="w-full bg-accent text-accent-foreground px-8 py-4 rounded-lg font-semibold hover:bg-accent/90 transition text-lg"
				>
					Надіслати запит
				</button>
			</form>
		</div>
	)
}
