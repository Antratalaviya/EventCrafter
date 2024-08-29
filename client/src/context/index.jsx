import { LocationProvider } from "./useCurrLocation"
import { MaxProvider } from "./useMax"

export const Providers = ({ children }) => {
    return (

        <MaxProvider>
            <LocationProvider>
                {children}
            </LocationProvider>
        </MaxProvider>
    )
}