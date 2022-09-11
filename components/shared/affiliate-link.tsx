import { NextPage } from "next"
import Image from "next/image"

type AffiliateProps = {
}

export const AffiliateLink: NextPage<AffiliateProps> = () => {
    return (
        <a href="https://amzn.to/3L7fbDz" target="_blank">
            <div className="grid grid-cols-5">
                <div className="mt-2 col-span-0 sm:col-span-1 display-none display-block-sm">
                    <Image src="/images/cocktail-set.jpg" width="310" height="250" style={{
                        borderRadius: "2px"
                    }}></Image>
                </div>
                <div className="pl-0 sm:pl-3 col-span-5 sm:col-span-4">
                    <h2 className="text-white text-lg pt-1 font-bold">Want to make your own cocktails?</h2>
                    <div className="block display-none-sm mt-3">
                        <Image src="/images/cocktail-set.jpg" width="330" height="250" className="mx-auto" style={{
                            borderRadius: "2px"
                        }}></Image>
                    </div>
                    <p className="text-white text-sm lg:text-xs font-bold mt-2">If you use this link to buy a great cocktail recipe kit on Amazon then you can get started making this recipe today, and you'll be supporting us too as we'll make a small amount of commission from the sale! 😊</p>
                </div>
            </div>

        </a>
    )
}