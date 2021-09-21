import dynamic from "next/dynamic"
import { CHIMPCardProps } from "./props"

const DynamicComponentWithNoSSR = dynamic(() => import("./CHIMPCard"), {
  ssr: false,
})

const LazyCHIMPCard = (props: CHIMPCardProps) => <DynamicComponentWithNoSSR {...props} />

export default LazyCHIMPCard
