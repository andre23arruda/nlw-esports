import * as Dialog from '@radix-ui/react-dialog'
import { CheckCircle } from 'phosphor-react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { ButtonClose } from '../ButtonClose'

interface LetsPlayProps {
	discord: string
}

export function LetsPlay({discord}: LetsPlayProps) {
    return (
        <>
            <Dialog.Title className="text-3xl font-black text-center px-10 pt-10 pb-1">
                <CheckCircle color="#8B5CF6" size={60} className="block mx-auto mb-5" />
                Lets's play!

            </Dialog.Title>

            <p className="text-xl text-center text-zinc-400">
                Agora é só começar a jogar!
            </p>

            <p className="text-xl font-semibold text-center pt-5 pb-2">
                Adicione no Discord
            </p>

            <CopyToClipboard
                text={ discord }
                onCopy={() => alert(`${ discord } copiado para área de transferência`)}
            >
                <Dialog.Close
                    type="button"
                    className="
                        bg-zinc-900
                        px-12
                        mb-10
                        h-14
                        rounded-md
                        font-semibold
                        items-center
                        hover:bg-zinc-600
                        transition-all
                        mx-auto
                        block
                    "
                >

                        { discord }
                </Dialog.Close>
            </CopyToClipboard>

            <ButtonClose />
        </>

    )
}
