import { Kick, Primevideo } from '@/components/icons/logos';
import Marquee from "react-fast-marquee";
const TrustedByTeams = () => {
    return (
        <div className='py-10'>
            <Marquee autoFill gradient gradientWidth={20}>
                <div className="mx-6">
                    <Kick className='h-7' />
                </div>
                <div className="mx-6">
                    <Primevideo className='h-7' />
                </div>
            </Marquee>
        </div>
    )
}

export default TrustedByTeams