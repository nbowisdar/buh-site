import { createServerFn } from "@tanstack/react-start";
import axios from "axios";

const botToken = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_CHAT_ID;

type FormData = {
	name: string;
	email: string;
	phone: string;
	serviceType: string;
	contactMethod: string;
	preferredDate: string;
	message: string;
};

async function sendMessageTelegram(text: string) {
	const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
	console.log(`Sending message: ${text}`);
	const response = await axios.post(url, {
		chat_id: chatId,
		text: text,
	});
	console.log(response.status);
	console.log(response.data);
	return response.data;
}

// New function to format FormData into a single message
function formatFormDataMessage(data: FormData): string {
	return `
Ура, новий запит! 🥳🥳

Ім'я: ${data.name}
Email: ${data.email}
Телефон: ${data.phone}
Тип послуги: ${data.serviceType}
Спосіб зв'язку: ${data.contactMethod}
Бажана дата: ${data.preferredDate}
Повідомлення: ${data.message}
`.trim();
}

export const handleFormSubmit = createServerFn({ method: "POST" })
	.inputValidator((data: FormData) => data)
	.handler(async ({ data }) => {
		const textMessage = formatFormDataMessage(data);
		await sendMessageTelegram(textMessage);
	});
