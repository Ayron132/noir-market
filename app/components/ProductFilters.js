export default function ProductFilters({ filters, setFilters }) {
  const handleChange = (e) => {
    const { name, value } = e.target
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }))
  }

  return (
    <div className="sticky top-4">
      <h2 className="text-lg font-medium mb-4">Filtros</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="category" className="block text-sm text-gray-600 mb-2">
            Categoria
          </label>
          <select
            id="category"
            name="category"
            value={filters.category}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg text-sm"
          >
            <option value="">Todas</option>
            <option value="fashion">Moda</option>
            <option value="tech">Tecnologia</option>
            <option value="decor">Decoração</option>
          </select>
        </div>
        <div>
          <label htmlFor="minPrice" className="block text-sm text-gray-600 mb-2">
            Preço Mínimo
          </label>
          <input
            type="number"
            id="minPrice"
            name="minPrice"
            value={filters.minPrice}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg text-sm"
            placeholder="R$ 0,00"
          />
        </div>
        <div>
          <label htmlFor="maxPrice" className="block text-sm text-gray-600 mb-2">
            Preço Máximo
          </label>
          <input
            type="number"
            id="maxPrice"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg text-sm"
            placeholder="R$ 999,99"
          />
        </div>
        <div>
          <label htmlFor="sortBy" className="block text-sm text-gray-600 mb-2">
            Ordenar por
          </label>
          <select
            id="sortBy"
            name="sortBy"
            value={filters.sortBy}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg text-sm"
          >
            <option value="name">Nome</option>
            <option value="priceLow">Preço: Menor para Maior</option>
            <option value="priceHigh">Preço: Maior para Menor</option>
          </select>
        </div>
      </div>
    </div>
  )
}

