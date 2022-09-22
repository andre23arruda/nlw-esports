import { MagnifyingGlassPlus } from 'phosphor-react'
import * as Dialog from '@radix-ui/react-dialog'

interface CreateAdBannerProps {
	resetSelectedGame: () => void
}


export function CreateAdBanner({ resetSelectedGame }: CreateAdBannerProps) {
	return (
		<div
			className="
				pt-1
				bg-nlw-gradient
				self-stretch
				rounded-lg
				mt-8
				mx-8
				md:mx-2
				overflow-hidden
			"
		>
			<div
				className="
					bg-[#2A2634]
					p-6
					flex
					flex-col
					sm:flex-row
					justify-between
					items-center
				"
			>
				<div>
					<strong
						className="
							text-xl
							lg:text-2xl
							text-white
							font-black
							block
						"
					>
						Não encontrou seu duo?
					</strong>

					<span className="text-zinc-400 block">
						Publique um anúncio para encontrar novos players!
					</span>
				</div>

				<Dialog.Trigger
					className="
						py-3
						px-4
						mt-5
						md:mt-0
						bg-violet-500
						hover:bg-violet-600
						text-white
						rounded
						flex
						items-center
						gap-3
					"
					onClick={ resetSelectedGame }
				>
					<MagnifyingGlassPlus
						size={ 24 }
						className="hidden md:block"
					/>
					Publicar anúncio
				</Dialog.Trigger>
			</div>
		</div>
	)
}
