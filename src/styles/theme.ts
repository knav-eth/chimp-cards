import { extendTheme, ThemeConfig } from "@chakra-ui/react"

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
}

const theme = extendTheme({
  config,
  fonts: {
    body: `"Georgia", serif`,
    heading: `"Georgia", serif`
  },
  styles: {
    global: {
      body: {
        bg: "#000000",
        color: "white",
      },
    },
  },
})
export default theme
