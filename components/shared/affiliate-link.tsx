import { NextPage } from "next"
import Image from "next/image"

type AffiliateProps = {
}

export const AffiliateLink: NextPage<AffiliateProps> = () => {
    return (
        <a href="https://amzn.to/3L7fbDz" target="_blank">
            <div className="flex">
                <div className="mt-2 display-none display-block-md">
                    <Image src="/images/cocktail-set.jpg" width="310" height="250" style={{
                        borderRadius: "2px"
                    }}></Image>
                </div>
                <div className="pl-0 md:pl-3">
                    <div className="block display-none-md">
                        <Image src="/images/cocktail-set.jpg" width="330" height="280" className="mx-auto" style={{
                            borderRadius: "2px"
                        }}></Image>
                    </div>
                    <h2 className="text-white text-lg pt-1 font-bold">Want to make your own cocktails?</h2>
                    <p className="text-white text-sm lg:text-xs font-bold mt-2">If you use this link to buy a great cocktail recipe kit on Amazon, then you can get started making this recipe today, and you'll be supporting us too as we'll make a small amount of commission from the sale! 😊</p>
                </div>
            </div>

        </a>
    )
}