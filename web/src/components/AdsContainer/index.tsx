import { useEffect, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { useKeenSlider } from 'keen-slider/react'

import { AdCard } from './AdCard'
import { ButtonClose } from '../ButtonClose'
import { Dots } from '../Dots'
import { LetsPlay } from './LetsPlay'
import Loading from '../Loading'

import { getApi } from '../../services/api'
import { Ad } from '../../types/ad'
import { Game } from '../../types/game'


interface AdsContainerProps {
	selectedGame: Game
}

export function AdsContainer({ selectedGame }: AdsContainerProps) {
    const [ads, setAds] = useState<Ad[] | null>(null)
    const [discord, setDiscord] = useState('')

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
		},
		slides: { perView: 1, spacing: 10 },
		slideChanged(slider) { setCurrentSlide(slider.track.details.rel) },
		created() { setLoaded(true) },
	})

    function getDiscord(id: number) {
        getApi(`ads/${ id }/discord/`)
        .then(response => setDiscord(response.data.discord))
    }

    useEffect(() => {
        function loadGameAds() {
            getApi(`games/${ selectedGame.id }/ads/`)
            .then(response => setTimeout(
                () => setAds(response.data),
                1000
            ))
        }
        loadGameAds()
    }, [])

    if (discord) {
        return (
            <LetsPlay discord={ discord } />
        )
    }

    if (ads) {
        return (
            <>
                <Dialog.Title className="text-3xl font-black mb-3">
                    { selectedGame.title }
                </Dialog.Title>

                <p className="text-zinc-400 mb-4">
                    Conecte-se e comece a jogar
                </p>

                <div className="keen-slider" ref={ sliderRef }>
                    { ads.map(ad => (
                        <AdCard
                            key={ ad.id}
                            ad={ ad }
                            getDiscord={ getDiscord }
                        />
                    )) }
                </div>

                <Dots
                    currentSlide={ currentSlide }
                    instanceRef={ instanceRef }
                    loaded={ loaded }
                />

                <ButtonClose />
            </>
        )
    }
    return (
        <>
            <Dialog.Title className="text-2xl text-center mt-10 -mb-20">
                Carregando...
            </Dialog.Title>

            <Loading />

            <ButtonClose />
        </>
    )

}
