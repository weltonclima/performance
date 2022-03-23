import { FormEvent, useCallback, useState } from "react";
import { number } from "yup";
import { SearchResults } from "../components/SearchResults";

export type Product = {
  id: number;
  price: number;
  priceFormatted: string;
  title: string;
}

type Results = {
  totalPrice?: number;
  data?: Product[];
}

export default function Home() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState({} as Results);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!search.trim()) {
      return
    }

    const response = await fetch(`http://localhost:3333/products?q=${search}`)
    const data: Product[] = await response.json();

    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });

    const products = data.map(product => ({
      ...product,
      priceFormatted: formatter.format(product.price)
    }))

    const totalPrice = data.reduce((total, product) => {
      return total + product.price
    }, 0);


    setResults({ totalPrice, data: products });
  }

  const addToWishlist = useCallback(async (id?: number) => {
    console.log(id)
  }, [])

  return (
    <div>
      <h1>Search</h1>

      <form onSubmit={handleSubmit} >
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button type="submit" >Buscar</button>
      </form>
      <SearchResults
        onAddToWishlist={addToWishlist}
        results={results.data}
        totalPrice={results.totalPrice}
      />
    </div>
  )
}