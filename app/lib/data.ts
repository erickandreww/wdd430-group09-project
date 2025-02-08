import { sql } from "@vercel/postgres";

import { ProductsCard } from "./definitions";

const ITEMS_PER_PAGE = 12;
export async function fetchProducts(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE; 

  try {
    const products = await sql<ProductsCard>`
    SELECT 
      products.product_id, 
      products.product_name, 
      products.product_image, 
      products.product_price, 
      products.product_description, 
      products.product_quantity, 
      products.purchase_number, 
      users.name
    FROM products 
    JOIN users ON products.user_id = users.id
    WHERE 
      products.product_name ILIKE ${`%${query}%`} OR
      users.name ILIKE ${`%${query}%`} OR
      products.product_price::text ILIKE ${`%${query}%`}
      ORDER BY products.purchase_number DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
      `
      return products.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchProductsPages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM products
    JOIN users ON products.user_id = users.id
    WHERE 
      products.product_name ILIKE ${`%${query}%`} OR
      users.name ILIKE ${`%${query}%`} OR
      products.product_price::text ILIKE ${`%${query}%`}
      `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}