import dynamic from "next/dynamic"
import { PackCardProps } from "./props"

const DynamicComponentWithNoSSR = dynamic(() => import("./PackCard"), {
  ssr: false,
})

const LazyPackCard = (props: PackCardProps) => <DynamicComponentWithNoSSR {...props} />

export default LazyPackCard
