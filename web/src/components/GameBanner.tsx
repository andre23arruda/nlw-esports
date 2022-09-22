import * as Dialog from '@radix-ui/react-dialog'
import { Game } from '../types/game'


interface GameBannerProps {
	banner_url: string
	title: string
	count: number
	game: Game | null
	setSelectedGame: React.Dispatch<React.SetStateAction<Game | null>>
}

export function GameBanner({banner_url, title, count, game, setSelectedGame}: GameBannerProps) {
	function handleClick() {
		if (count) {
			setSelectedGame(game)
		} else {
			setSelectedGame(null)
		}
	}

	return (
		<Dialog.Trigger>
			<div
				className="
					relative
					rounded-lg
					overflow-hidden
					cursor-pointer
					hover:-translate-y-1
					hover:brightness-75
					transition-all
					keen-slider__slide
				"
				onClick={ handleClick }
			>
				<img
					className="mx-auto w-[65%] md:w-[95%] rounded-lg"
					src={banner_url}
					alt={ game?.title}
				/>

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
						{ title }
					</strong>

					<span
						className="
							text-zinc-300
							text-sm
							block
						"
					>
						{ count } anúncio(s)
					</span>
				</div>
			</div>
		</Dialog.Trigger>
	)
}
