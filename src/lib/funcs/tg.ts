import { createServerFn } from "@tanstack/react-start"
import axios from "axios"

const botToken = process.env.TELEGRAM_BOT_TOKEN
const chatId = process.env.TELEGRAM_CHAT_ID

export type FormDataType = {
	name: string
	email: string
	phone: string
	company: string
	subject: string
	message: string
}

export async function sendMessageTelegram(text: string) {
	const url = `https://api.telegram.org/bot${botToken}/sendMessage`
	console.log(`Sending message: ${text}`)
	const response = await axios.post(url, {
		chat_id: chatId,
		text: text,
	})
	return response.data
}

// New function to format FormData into a single message
function formatFormDataMessage(data: FormDataType): string {
	return `
Ура, новий запит! 🥳🥳

Ім'я: ${data.name}
Email: ${data.email}
Телефон: ${data.phone}
Компанія: ${data.company}
Тема запиту: ${data.subject}
Повідомлення: ${data.message}
`.trim()
}

export const handleFormSubmit = createServerFn({ method: "POST" })
	.inputValidator((data: FormDataType) => data)
	.handler(async ({ data }) => {
		const textMessage = formatFormDataMessage(data)
		await sendMessageTelegram(textMessage)
	})
