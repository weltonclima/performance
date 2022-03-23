import { useMemo } from "react";
import { ProductItem } from "./ProductItem";
import { List, ListRowRenderer } from 'react-virtualized';

interface SearchResultsProps {
  totalPrice?: number;
  results?: Array<{
    id: number;
    price: number;
    priceFormatted: string;
    title: string;
  }>
  onAddToWishlist: (id?: number) => void;
}

export function SearchResults({ results, totalPrice, onAddToWishlist }: SearchResultsProps) {

  const rowRenderer: ListRowRenderer = ({ index, key, style }) => {
    return (
      <div key={key} style={style}>
        <ProductItem
          product={results?.[index]}
          onAddToWishlist={onAddToWishlist}
        />
      </div>
    )
  }
  return (
    <div>
      <h2>{totalPrice}</h2>

      <List
        height={300}
        rowHeight={30}
        width={900}
        overscanRowCount={5}
        rowCount={results?.length ?? 0}
        rowRenderer={rowRenderer}
      />
      {/**{results?.map(product => (
        <ProductItem
          key={product.id}
          product={product}
          onAddToWishlist={onAddToWishlist}
        />
      ))} */}
    </div>
  )
}

/**
 * useMemo
 * 
 * 1. Calculos pesados
 * 2. Igualdade referencial (quando a gente repassa aquela informação a um componente filho)
 */