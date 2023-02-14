import { QuioscoContext } from '@/context/QuiscoProvider'
import { useContext } from 'react'

function useQuiosco() {
  return useContext(QuioscoContext)
}

export default useQuiosco