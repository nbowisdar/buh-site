import { addPriceFullFunc, deletePriceFunc, updatePriceFullFunc } from "@/lib/funcs/price"
import { useLoaderData, useRouter } from "@tanstack/react-router"
import { useState } from "react"
import type { Price, Services } from "@/db/schema"

type TableFormData = {
	id?: number
	title: string
	services: Services[]
}

export function PricingManager() {
	const { pricingTables } = useLoaderData({ from: "/admin" }) as { pricingTables: Price[] }
	const router = useRouter()

	const [showTableForm, setShowTableForm] = useState(false)
	const [editingTable, setEditingTable] = useState<Price | null>(null)
	const [deleteMessage, setDeleteMessage] = useState("")
	const [tableFormData, setTableFormData] = useState<TableFormData>({
		title: "",
		id: undefined,
		services: [{ name: "", price: "" }],
	})

	const handleAddService = () => {
		setTableFormData({
			...tableFormData,
			services: [...tableFormData.services, { name: "", price: "" }],
		})
	}

	const handleRemoveService = (index: number) => {
		const newServices = tableFormData.services.filter((_, i) => i !== index)
		setTableFormData({ ...tableFormData, services: newServices })
	}

	const handleServiceChange = (index: number, field: "name" | "price", value: string) => {
		const newServices = tableFormData.services.map((service, i) => (i === index ? { ...service, [field]: value } : service))
		setTableFormData({ ...tableFormData, services: newServices })
	}

	const handleSaveTable = async () => {
		if (!tableFormData.title || tableFormData.services.some((s) => !s.name || !s.price)) {
			alert("Будь ласка, заповніть всі поля")
			return
		}

		if (editingTable && tableFormData.id) {
			await updatePriceFullFunc({
				data: {
					id: tableFormData.id,
					title: tableFormData.title,
					services: tableFormData.services,
				},
			})
			setDeleteMessage("Таблицю оновлено успішно!")
		} else {
			await addPriceFullFunc({
				data: {
					title: tableFormData.title,
					services: tableFormData.services,
				},
			})
			setDeleteMessage("Таблицю додано успішно!")
		}
		router.invalidate()
		setShowTableForm(false)
		setEditingTable(null)
		setTableFormData({ title: "", services: [{ name: "", price: "" }] })
		setTimeout(() => setDeleteMessage(""), 3000)
	}

	const handleEditTable = (table: Price) => {
		setEditingTable(table)
		setTableFormData({
			id: table.id,
			title: table.title,
			services: table.services || [],
		})
		setShowTableForm(true)
	}

	const handleDeleteTable = async (id: number) => {
		if (confirm("Ви впевнені, що хочете видалити цю таблицю?")) {
			await deletePriceFunc({ data: { id } })
			router.invalidate()
		}
	}

	const handleCancelTableForm = () => {
		setShowTableForm(false)
		setEditingTable(null)
		setTableFormData({ title: "", services: [{ name: "", price: "" }] })
	}

	return (
		<div>
			{deleteMessage && (
				<div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-md mb-6">{deleteMessage}</div>
			)}

			<div className="bg-card border border-border rounded-lg overflow-hidden mb-6">
				<div className="p-6 bg-primary/5 border-b border-border flex justify-between items-center">
					<h2 className="text-xl font-semibold text-foreground">Керування таблицями цін</h2>
					<button
						onClick={() => setShowTableForm(true)}
						className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2 px-4 rounded-md transition"
					>
						+ Додати таблицю
					</button>
				</div>
			</div>

			{showTableForm && (
				<div className="bg-card border border-border rounded-lg p-6 mb-6">
					<h3 className="text-lg font-semibold text-foreground mb-4">{editingTable ? "Редагувати таблицю" : "Нова таблиця"}</h3>

					<div className="space-y-4">
						<div>
							<label className="block text-sm font-medium text-foreground mb-2">Назва таблиці</label>
							<input
								type="text"
								value={tableFormData.title}
								onChange={(e) =>
									setTableFormData({
										...tableFormData,
										title: e.target.value,
									})
								}
								className="w-full px-4 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
								placeholder="Наприклад: Бухгалтерські послуги"
							/>
						</div>

						<div>
							<div className="flex justify-between items-center mb-2">
								<label className="block text-sm font-medium text-foreground">Послуги</label>
								<button
									type="button"
									onClick={handleAddService}
									className="text-primary hover:text-primary/80 text-sm font-semibold"
								>
									+ Додати послугу
								</button>
							</div>

							<div className="space-y-3">
								{tableFormData.services.map((service, index) => (
									<div key={index} className="flex gap-2">
										<input
											type="text"
											value={service.name}
											onChange={(e) => handleServiceChange(index, "name", e.target.value)}
											className="flex-1 px-4 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
											placeholder="Назва послуги"
										/>
										<input
											type="text"
											value={service.price}
											onChange={(e) => handleServiceChange(index, "price", e.target.value)}
											className="w-40 px-4 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
											placeholder="Ціна"
										/>
										{tableFormData.services.length > 1 && (
											<button
												type="button"
												onClick={() => handleRemoveService(index)}
												className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition"
											>
												×
											</button>
										)}
									</div>
								))}
							</div>
						</div>

						<div className="flex gap-2 pt-4">
							<button
								onClick={handleSaveTable}
								className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2 px-6 rounded-md transition"
							>
								{editingTable ? "Оновити" : "Зберегти"}
							</button>
							<button
								onClick={handleCancelTableForm}
								className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded-md transition"
							>
								Скасувати
							</button>
						</div>
					</div>
				</div>
			)}

			<div className="space-y-4">
				{pricingTables.length > 0 ? (
					pricingTables.map((table) => (
						<div key={table.id} className="bg-card border border-border rounded-lg overflow-hidden">
							<div className="p-4 bg-primary/5 border-b border-border flex justify-between items-center">
								<h3 className="text-lg font-semibold text-foreground">{table.title}</h3>
								<div className="flex gap-2">
									<button
										onClick={() => handleEditTable(table)}
										className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-3 rounded transition text-sm"
									>
										Редагувати
									</button>
									<button
										onClick={() => handleDeleteTable(table.id)}
										className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded transition text-sm"
									>
										Видалити
									</button>
								</div>
							</div>
							<div className="p-4">
								<table className="w-full">
									<thead>
										<tr className="border-b border-border">
											<th className="text-left py-2 text-sm font-semibold text-foreground/70">Послуга</th>
											<th className="text-right py-2 text-sm font-semibold text-foreground/70">Ціна</th>
										</tr>
									</thead>
									<tbody>
										{table.services?.map((service, idx) => (
											<tr key={idx} className="border-b border-border/50">
												<td className="py-2 text-sm text-foreground">{service.name}</td>
												<td className="py-2 text-sm text-right font-semibold text-primary">{service.price}</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
					))
				) : (
					<div className="bg-card border border-border rounded-lg p-8 text-center text-foreground/60">
						Немає таблиць для відображення. Створіть нову таблицю натиснувши кнопку вище.
					</div>
				)}
			</div>
		</div>
	)
}
