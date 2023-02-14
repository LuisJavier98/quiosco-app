import axios from "axios"
import { useRouter } from "next/router"
import { createContext, useEffect, useState } from "react"
import { toast } from "react-toastify"
export const QuioscoContext = createContext()

function QuiscoProvider({ children }) {
  const [categorias, setcategorias] = useState([])
  const [categoriaActual, setcategoriaActual] = useState({})
  const [producto, setproducto] = useState({})
  const [modal, setmodal] = useState(false)
  const [pedido, setpedido] = useState([])
  const router = useRouter()

  const obtenerCategorias = async () => {
    const { data } = await axios('/api/categorias')
    setcategorias(data)
  }

  const handleChangeModal = () => {
    setmodal(!modal)
  }

  useEffect(() => {
    obtenerCategorias()
  }, [])

  const handleClickCategoria = id => {
    const categoria = categorias.filter(cat => cat.id == id)
    setcategoriaActual(categoria[0])
  }

  useEffect(() => {
    setcategoriaActual(categorias[0])
  }, [categorias])

  const handleSetProducto = producto => {
    setproducto(producto)
  }
  const handleAgregarPedido = ({ categoriaId, ...producto }, cantidad) => {

    if (pedido.some(ped => ped.id == producto.id)) {
      setpedido(pedido.map(ped => {
        if (ped.id == producto.id) {
          return { ...ped, cantidad }
        }
        return { ...ped }
      }

      ))
      toast.success('Guardado correctamente', {
        autoClose: 1200
      })
    }
    else {
      setpedido([...pedido, { ...producto, cantidad }])
      toast.success('Agregando el pedido', {
        autoClose: 1200
      })
    }
  }


  const handleEliminarProducto = (id) => {
    setpedido(pedido.filter(ped => ped.id !== id))
    toast.error('Producto Eliminado', {
      autoClose: 1000
    })
  }

  const resetearApp = e => {
    e.target[0].value = ''
    setcategoriaActual(categorias[0])
    setpedido([])
    toast.success('Pedido realizado correctamente', { autoClose: 1000 })
    setTimeout(() => {
      router.push('/')
    }, 2000);
  }




  return (
    <QuioscoContext.Provider value={{
      categorias,
      categoriaActual,
      handleClickCategoria,
      producto,
      handleSetProducto,
      handleChangeModal,
      modal,
      handleAgregarPedido,
      pedido,
      handleEliminarProducto
      , resetearApp
    }}>
      {children}
    </QuioscoContext.Provider>
  )
}

export default QuiscoProvider
