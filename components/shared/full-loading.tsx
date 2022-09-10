import { Loading } from "./loading"
import { Logo } from "./logo"

export const FullLoading = () => {
    return (
        <>
            <div className="flex pb-3" style={{ backgroundSize: 'cover', backgroundPosition: 'center', flexFlow: 'column', minHeight: '60px', borderWidth: '0', borderTop: '0', borderLeft: '0', borderRight: '0' }}>
                <div className="flex justify-between">
                    <div style={{ "marginTop": "0.6rem", "marginLeft": "0.7rem" }}>
                        <Logo></Logo>
                    </div>
                    <h1></h1>
                </div>
            </div>
            <div className="mx-auto table mt-12"><Loading></Loading></div>
        </>)
}