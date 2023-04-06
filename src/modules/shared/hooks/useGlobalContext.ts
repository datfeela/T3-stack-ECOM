import { useContext } from 'react'
import { _GlobalContext } from '~/modules/app'

export const useGlobalContext = () => useContext(_GlobalContext)
