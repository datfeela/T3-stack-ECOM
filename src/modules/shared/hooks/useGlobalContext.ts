import { useContext } from 'react'
import { _GlobalContext } from '~/modules/app/context'

export const useGlobalContext = () => useContext(_GlobalContext)
