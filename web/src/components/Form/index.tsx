import { useState } from 'react'
import * as Checkbox from '@radix-ui/react-checkbox'
import * as Dialog from '@radix-ui/react-dialog'
import { GameController, CheckCircle, Check } from 'phosphor-react'
import { Input } from './Input'

import { postApi } from '../../services/api'
import { Game } from '../../types/game'
import { convertHoursToMinutes, formatWeekDaysToString } from '../../utils/format'

const week_days_list = [
    {title: 'Domingo', label: 'D', value: 0},
    {title: 'Segunda', label: 'S', value: 1},
    {title: 'Terça',   label: 'T', value: 2},
    {title: 'Quarta',  label: 'Q', value: 3},
    {title: 'Quinta',  label: 'Q', value: 4},
    {title: 'Sexta',   label: 'S', value: 5},
    {title: 'Sábado',  label: 'S', value: 6},
]

interface FormProps {
	games: Game[]
    loadGames: () => void
}

export function Form({games, loadGames}: FormProps) {
    const [success, setSuccess] = useState(false)
    const [game, setGame] = useState('')
    const [name, setName] = useState('')
    const [years_playing, setYears_playing] = useState<string | null>(null)
    const [discord, setDiscord] = useState('')
    const [week_days, setWeek_days] = useState([
        false, false, false, false, false, false, false
    ])
    const [hour_start, setHour_start] = useState('16:00')
    const [hour_end, setHour_end] = useState('20:00')
    const [use_voice_channel, setUse_voice_channel] = useState(true)

    function handleWeek_days(index: number) {
        const week_days_copy = [...week_days]
        week_days_copy[index] = !week_days_copy[index]
        setWeek_days(week_days_copy)
    }

    function validateForm() {
        return (
            game && name && discord && (
                week_days.reduce((a, b) => a + (b ? 1 : 0), 0)
            )
        )
    }

    function submitForm(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        try {
            const formData = {
                game,
                name,
                years_playing: years_playing || 0,
                discord,
                week_days: formatWeekDaysToString(week_days),
                hour_start: convertHoursToMinutes(hour_start),
                hour_end: convertHoursToMinutes(hour_end),
                use_voice_channel,
            }
            postApi('ads/', formData)
            .then(() => {
                    loadGames()
                    setSuccess(true)
                })
            // console.log(formData)
        } catch {
            alert('Erro ao registrar anúncio')
        }
    }

    if (success) {
        return (
            <>
                <Dialog.Title className="text-3xl font-black text-center px-10 py-10">
                    <CheckCircle color="#8B5CF6" size={60} className="block mx-auto mb-5" />
                    Anúncio registrado com sucesso
                </Dialog.Title>

                <Dialog.Close
                    type="button"
                    className="
                        bg-violet-500
                        px-5
                        h-12
                        rounded-md
                        font-semibold
                        items-center
                        hover:bg-violet-600
                        mx-auto
                        block
                    "
                >
                    OK
                </Dialog.Close>
            </>
        )
    }

	return (
        <>
            <Dialog.Title className="text-3xl font-black">
                Publique um anúncio
            </Dialog.Title>

            <form className="mt-8 flex flex-col gap-4" onSubmit={e => submitForm(e)}>
                <div className="flex flex-col gap-2">
                    <label htmlFor="game" className="font-semibold">
                        Qual o game?
                    </label>

                    <select
                        className="
                            bg-zinc-900
                            py-3
                            px-4
                            rounded
                            text-sm
                            placeholder:text-zinc-500
                        "
                        value={ game }
                        onChange={ e => setGame(e.target.value)}
                    >
                        <option value="" disabled>
                            Selecione o game que deseja jogar
                        </option>

                        { games.map(game => (
                            <option key={ game.id } value={ game.id }>
                                { game.title }
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="name">
                        Seu nome (ou nickname)
                    </label>

                    <Input
                        id="name"
                        placeholder="Como te chamam dentro do game?"
                        onChange={ e => setName(e.target.value)}
                        value={ name }
                    />
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="years_playing">
                            Joga a quantos anos?
                        </label>

                        <Input
                            id="years_playing"
                            type="number"
                            onChange={ e => setYears_playing(e.target.value) }
                            placeholder="Tudo bem ser ZERO"
                            value={ years_playing || '' }
                            min="0"
                            max="50"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="discord">
                            Qual o seu Discord?
                        </label>

                        <Input
                            id="discord"
                            type="text"
                            onChange={ e => setDiscord(e.target.value) }
                            placeholder="Usuario#0000"
                            value={ discord }
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="week_days">
                            Quando costuma jogar?
                        </label>

                        <div className="grid grid-cols-4 gap-2">
                            { week_days_list.map(day => (
                                <button
                                    key={ day.value }
                                    type="button"
                                    title={ day.title }
                                    className={`w-8 h-8 rounded ${ week_days[day.value] ? "bg-violet-500" : "bg-zinc-900" }`}
                                    onClick={() => handleWeek_days(day.value) }
                                >
                                    { day.label }
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 flex-1">
                        <label>
                            Qual horário do dia?
                        </label>

                        <div className="flex flex-row">
                            <span className="self-center flex-1 text-xs">De:</span>
                            <Input
                                id="hour_start"
                                type="time"
                                onChange={ e => setHour_start(e.target.value) }
                                value={ hour_start }
                            />
                        </div>

                        <div className="flex flex-row">
                            <span className="self-center flex-1 text-xs">Até:</span>
                            <Input
                                id="hour_end"
                                type="time"
                                onChange={ e => setHour_end(e.target.value) }
                                value={ hour_end }
                                title="De"
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-2 flex gap-2 text-sm">
                    <Checkbox.Root
                        className="w-6 h-6 rounded bg-zinc-900 -translate-y-1"
                        onClick={ () => setUse_voice_channel(!use_voice_channel) }
                        checked={ use_voice_channel}
                    >
                        <Checkbox.Indicator>
                            <Check className="w-4 h-4 text-emerald-400 text-center mx-auto" />
                        </Checkbox.Indicator>
                    </Checkbox.Root>

                    Costumo me conectar ao chat de voz
                </div>

                <footer className="mt-4 flex justify-end gap-4">
                    <Dialog.Close
                        type="button"
                        className="
                            bg-zinc-500
                            px-5
                            h-12
                            rounded-md
                            font-semibold
                            hover:bg-zinc-600
                        "
                    >
                        Cancelar
                    </Dialog.Close>

                    <button
                        type="submit"
                        disabled={ !validateForm() }
                        className="
                            bg-violet-500
                            disabled:bg-violet-900
                            hover:brightness-90
                            hover:disabled:brightness-100
                            px-5
                            h-12
                            rounded-md
                            font-semibold
                            flex
                            items-center
                            gap-3
                        "
                    >
                        <GameController className="w-6 h-6 hidden md:block" />
                        Encontrar duo
                    </button>
                </footer>
            </form>
        </>
	)
}
