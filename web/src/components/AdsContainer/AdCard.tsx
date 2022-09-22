import { GameController } from 'phosphor-react'

import { Ad } from '../../types/ad'
import { getHourFromMinutes } from '../../utils/format'


interface AdCardProps {
	ad: Ad
    getDiscord: (id: number) => void
}

export function AdCard({ ad, getDiscord }: AdCardProps) {
    return (
        <div
            key={ ad.id }
            className="bg-zinc-700 rounded p-5 keen-slider__slide"
        >
            <div className="mb-4">
                Nome
                <br/>
                <strong>{ ad.name }</strong>
            </div>

            <div className="mb-4">
                Tempo de jogo
                <br/>
                <strong>
                    { ad.years_playing } { ad.years_playing > 1 ? 'anos' : 'ano' }
                </strong>
            </div>

            <div className="mb-4">
                Disponibilidade
                <br/>
                <strong>
                    { ad.week_days_array.length } { ad.week_days_array.length > 1 ? 'dias' : 'dia' }
                    {'  •  '}
                    { getHourFromMinutes(ad.hour_start)} - { getHourFromMinutes(ad.hour_end)}
                </strong>
            </div>

            <div className="mb-4">
                Chamada de áudio?
                <br/>
                <strong>{ ad.use_voice_channel ? 'Sim' : 'Não' }</strong>
            </div>

            <button
                type="button"
                className="
                    bg-violet-500
                    hover:brightness-90
                    mx-auto
                    px-5
                    h-12
                    rounded-md
                    font-semibold
                    flex
                    items-center
                    gap-3
                "
                onClick={() => getDiscord(ad.id)}
            >
                <GameController className="w-6 h-6" />
                Conectar
            </button>
        </div>
    )
}
