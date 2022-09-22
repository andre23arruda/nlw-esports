import * as Dialog from '@radix-ui/react-dialog'
import { Plus } from 'phosphor-react'


export function ButtonClose() {
    return (
        <Dialog.Close asChild>
            <button className="absolute top-4 right-4">
                <Plus size={ 25 } color="gray" className="rotate-45" />
            </button>
        </Dialog.Close>
    )
}