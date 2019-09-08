import { __RouterContext } from "react-router"
import { useContext } from "react"

// The react-router guys say that this will be what the official API probably looks like
// https://github.com/ReactTraining/react-router/pull/6453#issuecomment-474600561

export const useLocation = () => {
  const context = useContext(__RouterContext)
  return context.location
}

export function useMatch() {
  const context = useContext(__RouterContext)
  return context.match
}

export function useParams() {
  const context = useContext(__RouterContext)
  return context.match.params
}
