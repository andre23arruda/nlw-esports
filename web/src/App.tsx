import { useEffect, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'

import { CreateAdBanner } from './components/CreateAdBanner'
import { Form } from './components/Form'
import { GameBanner } from './components/GameBanner'

import { getApi } from './services/api'
import { Game } from './types/game'

import './styles/main.css'
import Loading from './components/Loading'


function App() {
	const [games, setGames] = useState<Game[]>([])
	const [openDialog, setOpenDialog] = useState(false)

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
				Seu <span className="text-transparent bg-nlw-gradient bg-clip-text">duo</span> está aqui
			</h1>

			{ !games.length ? (
				<Loading />
			) : (
				<>
					<div
						className="
							grid
							sm:grid-cols-1
							md:grid-cols-2
							lg:grid-cols-6
							gap-6
							mt-8
							md:mt-16
						"
					>
						{ games.map(game => {
							return (
								<GameBanner
									key={game.id}
									title={game.title}
									banner_url={game.banner_url}
									count={game.count}
								/>
							)
						})}
					</div>

					<Dialog.Root
						open={openDialog}
						onOpenChange={setOpenDialog}
					>
						<CreateAdBanner />

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
								<Form
									games={ games }
									loadGames={ loadGames }
								/>
							</Dialog.Content>
				</Dialog.Portal>
			</Dialog.Root>
				</>
			)}
		</div>
	)
}

export default App
