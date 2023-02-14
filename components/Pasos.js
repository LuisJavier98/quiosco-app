import useQuiosco from "@/hooks/useQuiosco"
import { useRouter } from "next/router"


const pasos = [
  { paso: 1, nombre: 'Menu', url: '/' },
  { paso: 2, nombre: 'Resumen', url: '/resumen' },
  { paso: 3, nombre: 'Datos y Total', url: '/total' }
]

function Pasos() {
  const route = useRouter()
  const calcularProgreso = () => {
    if (route.pathname == '/') {
      return 2
    }
    if (route.pathname == '/resumen')
      return 50
    else {
      return 100
    }
  }
  console.log(calcularProgreso())
  return (
    <>
      <div className="flex justify-between mb-5">
        {pasos.map(paso => (
          <button
            className="text-2xl font-bold"
            onClick={() => {
              route.push(paso.url)
            }}
            key={paso.paso}>
            {paso.nombre}
          </button>
        ))}
      </div>
      <div className="bg-gray-100 mb-10 ">
        <div className={`rounded-full bg-amber-500 text-xs leading-none h-2 text-center text-white`} style={{ width: `${calcularProgreso()}%` }}>

        </div>
      </div>
    </>
  )
}

export default Pasos