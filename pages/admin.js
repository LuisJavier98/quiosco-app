import Orden from '@/components/Orden'
import AdminLayout from '@/layout/AdminLayout'
import axios from 'axios'
import React from 'react'
import useSWR from 'swr'


const Admin = () => {
  const fetcher = () => { return axios('/api/ordenes').then(datos => datos.data) }
  const { data, error, isLoading } = useSWR('/api/ordenes', fetcher, { refreshInterval: 100 })

  return (
    <AdminLayout pagina={'Admin'}>
      <h1 className='text-4xl font-black'>
        Panel de administración
      </h1>
      <p className='text-2xl my-10'>Administra las ordenes</p>
      {data ? data.ordenes.map(orden => (
        <Orden key={orden.id} orden={orden} />
      )) : <p>No hay ordenes pendientes</p>}
    </AdminLayout>
  )
}

export default Admin
