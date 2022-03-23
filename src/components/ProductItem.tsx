import { memo, useState } from "react";
import dynamic from "next/dynamic";
import { AddProductWishlistProps } from "./AddProductWishlist";
import lodash from "lodash";

const AddProductWishlist = dynamic<AddProductWishlistProps>(() => {
  return import('./AddProductWishlist').then(mod => mod.AddProductWishlist)
}, {
  // eslint-disable-next-line react/display-name
  loading: () => <span>Carregando...</span>
})

interface ProductItemProps {
  product?: {
    id: number;
    price: number;
    priceFormatted: string;
    title: string;
  }
  onAddToWishlist: (id?: number) => void;
}
function ProductItemComponent({ product, onAddToWishlist }: ProductItemProps) {
  const [isAddToWishlist, setIsAddToWishlist] = useState(false);

  return (
    <div>
      {product?.title} - <strong>{product?.priceFormatted}</strong>
      <button onClick={() => setIsAddToWishlist(true)} >
        Adicionar aos favoritos
      </button>

      {isAddToWishlist &&
        <AddProductWishlist
          onAddToWishlist={() => onAddToWishlist(product?.id)}
          onRequestClose={() => setIsAddToWishlist(false)}
        />
      }
    </div>
  )
}
export const ProductItem = memo(ProductItemComponent, (prevProps, nextProps) => {
  return lodash.isEqual(prevProps.product, nextProps.product)
})

/**
 * 1. Criar uma nova versão do componente
 * 2. Compara com a versão anterior
 * 3. Se houverem alterações, vai atualizar o que alterou
 */

/**
 * 1. Componentes funcionais puros
 * 2. Renderiza com muita frequência
 * 3. Re-renderiza com os mesmos props
 * 4. Tamanho médio a grande
 */