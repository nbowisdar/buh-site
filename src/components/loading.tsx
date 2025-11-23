import { Loader2 } from "lucide-react"

export default function Loading() {
	return (
		<div className="min-h-[50vh] flex flex-col items-center justify-center p-8 space-y-4">
			<div className="relative">
				<div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse" />
				<Loader2 className="w-12 h-12 text-primary animate-spin relative z-10" />
			</div>
			<p className="text-muted-foreground animate-pulse font-medium">Завантаження...</p>
		</div>
	)
}
