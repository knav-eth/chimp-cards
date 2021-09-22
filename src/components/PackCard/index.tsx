import dynamic from "next/dynamic"
import { TokenCardProps } from "./props"

const DynamicComponentWithNoSSR = dynamic(() => import("./TokenCard"), {
  ssr: false,
})

const LazyTokenCard = (props: TokenCardProps) => <DynamicComponentWithNoSSR {...props} />

export default LazyTokenCard
