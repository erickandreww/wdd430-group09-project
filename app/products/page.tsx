// app/products/page.tsx
import Pagination from "../ui/products/pagination";
import Search from "../ui/search";
import ProductCards from "../ui/products/product-card";
import { fetchProductsPages } from "../lib/data";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Products',
};

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = (await fetchProductsPages(query)) || 1;

  return (
    <div className="container mx-auto p-4">
      <div>
        <h1 className="text-3xl font-bold mb-6">Products</h1>
      </div>
      <div className="pb-5">
        <Search placeholder="Search products..."/>
      </div>
      <div className="p-5">
        <ProductCards query={query} currentPage={currentPage} />
      </div>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}