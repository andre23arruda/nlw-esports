import { KeenSliderInstance, KeenSliderHooks } from "keen-slider/react"

interface DotsProps {
	loaded: boolean
    instanceRef: React.MutableRefObject<KeenSliderInstance<{}, {}, KeenSliderHooks> | null>
    currentSlide: number
}

export function Dots({ loaded, instanceRef, currentSlide }: DotsProps) {
    return (
        <>
            { loaded && instanceRef.current && (
                <div className="flex pt-4 md:pt-8 justify-center">
                    {
                        [...Array(instanceRef.current.track.details.slides.length).keys()].map((index) => (
                            <button
                                key={index}
                                onClick={() => instanceRef.current?.moveToIdx(index)}
                                className={'dot' + (currentSlide === index ? ' active' : '')}
                            >
                            </button>
                        ))
                    }
                </div>
            )}
        </>
    )
}