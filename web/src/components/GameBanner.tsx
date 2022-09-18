interface GameBannerProps {
	banner_url: string
	title: string
	count: number
}

export function GameBanner(props: GameBannerProps) {
	return (
		<div
			className="
				relative
				rounded-lg
				overflow-hidden
				cursor-pointer
				hover:-translate-y-1
				hover:brightness-75
				transition-all
			"
		>
			<img src={props.banner_url} alt="" />

			<div
				className="
					w-full
					pt-16
					pb-4
					px-4
					bg-game-gradient
					absolute
					bottom-0
					left-0
					right-0
				"
			>
				<strong
					className="
						font-bold
						text-white
						block
					"
				>
					{ props.title }
				</strong>

				<span
					className="
						text-zinc-300
						text-sm
						block
					"
				>
					{ props.count } anúncio(s)
				</span>
			</div>
		</div>
	)
}
