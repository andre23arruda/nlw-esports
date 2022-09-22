import { useEffect, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { useKeenSlider } from 'keen-slider/react'

import { AdsContainer } from './components/AdsContainer'
import { CreateAdBanner } from './components/CreateAdBanner'
import { Dots } from './components/Dots'
import { Form } from './components/Form'
import { GameBanner } from './components/GameBanner'
import Loading from './components/Loading'

import { getApi } from './services/api'
import { Game } from './types/game'

import 'keen-slider/keen-slider.min.css'
import './styles/main.css'


function App() {
	const [games, setGames] = useState<Game[]>([])
	const [selectedGame, setSelectedGame] = useState<Game | null>(null)
	const [openDialog, setOpenDialog] = useState(false)

	const [currentSlide, setCurrentSlide] = useState(0)
	const [loaded, setLoaded] = useState(false)
	const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
		initial: 0,
		loop: true,
		mode: 'free-snap',
		breakpoints: {
			'(min-width: 640px)': {
				slides: { perView: 2, spacing: 10 },
			},
			'(min-width: 768px)': {
				slides: { perView: 4, spacing: 10 },
			},
		},
		slides: { perView: 1 },
		slideChanged(slider) { setCurrentSlide(slider.track.details.rel) },
		created() { setLoaded(true) },
	})

	function loadGames() {
		getApi('games/')
		.then(response => setGames(response.data))
	}

	useEffect(() => {
		loadGames()
	}, [])

	return (
		<div
			className="
				max-w-[1344px]
				mx-auto
				flex
				flex-col
				items-center
				my-8
				md:my-16
			"
		>
			<img src="/logo.svg" className="h-24 md:h-max" alt="Logo" />

			<h1
				className="
					text-3xl
					lg:text-6xl
					text-white
					font-black
					mt-8
					md:mt-20
					text-center
				"
			>
				Seu{' '}
				<span className="text-transparent bg-nlw-gradient bg-clip-text">
					duo
				</span>
				{' '}está aqui
			</h1>

			{ !games.length ? (
				<Loading />
			) : (
				<>
					<Dialog.Root
						open={openDialog}
						onOpenChange={setOpenDialog}
					>
						<div
							className="
								keen-slider
								mt-8
								md:mt-16
							"
							ref={ sliderRef }
						>
							{ games.map(game => {
								return (
									<GameBanner
										key={game.id}
										game={ game }
										title={game.title}
										banner_url={game.banner_url}
										count={game.count}
										setSelectedGame={ setSelectedGame }
									/>
								)
							})}
						</div>

						<Dots
							currentSlide={ currentSlide }
							instanceRef={ instanceRef }
							loaded={ loaded }
						/>

						<CreateAdBanner
							resetSelectedGame={ () => setSelectedGame(null) }
						/>

						<Dialog.Portal>
							<Dialog.Overlay className="bg-black/60 inset-0 fixed" />

							<Dialog.Content
								className="
									fixed
									bg-[#2A2634]
									py-8
									px-10
									text-white
									top-1/2
									left-1/2
									-translate-x-1/2
									-translate-y-1/2
									rounded-lg
									w-[98%]
									md:w-[480px]
									shadow-lg
									shadow-black/25
								"
							>
								{ selectedGame ? (
									<AdsContainer selectedGame={ selectedGame }/>
								) : (
									<Form
										games={ games }
										loadGames={ loadGames }
									/>
								)}

							</Dialog.Content>
						</Dialog.Portal>
					</Dialog.Root>
				</>
			)}
		</div>
	)
}

export default App
