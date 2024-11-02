import {
  ActionFunctionArgs,
  Form,
  useNavigate,
  redirect,
  useFetcher,
} from "react-router-dom"
import { Product } from "../types"
import { formatCurrency } from "../utils"
import { deleteProduct } from "../services/ProductService"

type ProductDetailsProps = {
  product: Product
}

export async function action({ params }: ActionFunctionArgs) {
  if (params.id !== undefined) {
    await deleteProduct(+params.id)
    return redirect("/")
  }
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const fetcher = useFetcher()
  const navigate = useNavigate()
  const isAvailable = product.availability
  return (
    <tr className="border-b ">
      <td className="p-3 text-lg text-gray-800">{product.name}</td>
      <td className="p-3 text-lg text-gray-800">
        {formatCurrency(product.price)}
      </td>
      <td className="p-3 text-lg text-gray-800">
        <fetcher.Form method="POST">
          <button
            className={`${isAvailable ? "text-blac hover:bg-slate-100" : "text-red-500 hover:bg-red-100"} rounded-lg p-2 text-xs uppercase font-bold w-full border border-black hover:cursor-pointer`}
            type="submit"
            name="id"
            value={product.id}
          >
            {isAvailable ? "Disponible" : "No Disponible"}
          </button>
        </fetcher.Form>
      </td>
      <td className="p-3 text-lg text-gray-800 ">
        <div className="flex gap-2 items-center">
          <button
            onClick={() => navigate(`/productos/${product.id}/editar`)}
            className="bg-indigo-500 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center"
          >
            Editar
          </button>
          <Form
            className="w-full"
            method="POST"
            action={`productos/${product.id}/eliminar`}
            onSubmit={(e) => {
              if (!confirm("¿Eliminar Producto?")) {
                e.preventDefault()
              }
            }}
          >
            <input
              className="bg-red-500 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center"
              type="submit"
              value="Eliminar"
            />
          </Form>
        </div>
      </td>
    </tr>
  )
}
