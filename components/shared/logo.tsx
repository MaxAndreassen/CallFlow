import { NextPage } from "next"
import Image from "next/image"

type LogoProps = {
}

export const Logo: NextPage<LogoProps> = (top) => {
    return (
        <div>
            <Image src="/images/full-white.png" width="156" height="36" style={{
            }}></Image>
        </div>
    )
}