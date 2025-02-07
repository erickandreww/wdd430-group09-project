// app/products/page.tsx
import Pagination from "../ui/products/pagination";
import Search from "../ui/search";
import { Metadata } from "next";
import ProductCards from "../ui/products/product-card";

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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      <div className="">
        <Search placeholder="Search products..."/>
      </div>
      <ProductCards query={query} currentPage={currentPage} />
      <div className="">
        <Pagination totalPages={10} />
      </div>
    </div>
  );
}