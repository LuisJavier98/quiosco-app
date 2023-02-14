import { formatearDinero } from '@/helpers'
import useQuiosco from '@/hooks/useQuiosco'
import Layout from '@/layout/Layout'
import axios from 'axios'
import React from 'react'
import { toast } from 'react-toastify'

function Total() {

  const { pedido, resetearApp } = useQuiosco()

  const colocarOrden = async (e) => {
    e.preventDefault()
    if (e.target[0].value == '') {
      toast.info('Debes introducir tu nombre', {
        autoClose: 1000
      }); return
    }
    else if (pedido.length <= 0) {
      toast.info('Debes seleccionar tu pedido', {
        autoClose: 1000
      }); return
    }
    else {
      const nombre = e.target[0].value
      const total = Number(formatearDinero(pedido?.reduce((a, b) => a + b.cantidad * b.precio, 0)))

      try {
        await axios.post('/api/ordenes', {
          pedido, nombre, total, fecha: Date.now().toString()
        })
        resetearApp(e)
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <Layout
      pagina='Datos y Total'
    >
      <h1 className='text-4xl font-black'>
        Total y Confirmar Pedido
      </h1>
      <p className='text-2xl my-10'>Confirmar tu Pedido a Continuacion </p>
      <form onSubmit={colocarOrden}>
        <div>
          <label htmlFor='nombre' className='block uppercase text-slate-800 font-bold text-xl'>Nombre</label>
          <input
            id='nombre'
            type="text"
            className='bg-gray-200 w-full lg-w-1/3 mt-3 p-2 rounded-md'
          />
        </div>
        <div className='mt-10 '>
          <p className='text-2xl' >Total a pagar {''} <span className='font-bold'>${formatearDinero(pedido?.reduce((a, b) => a + b.cantidad * b.precio, 0))} </span> </p>
        </div>

        <div className='mt-5 '>
          <input
            type={'submit'}
            className='bg-indigo-600 w-full lg:w-auto px-5 py-2 rounded uppercase text-center font-bold text-white cursor-pointer '
            value='Confirmar pedido' />
        </div>

      </form>
    </Layout>
  )
}

export default Total