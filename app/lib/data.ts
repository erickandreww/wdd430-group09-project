import { sql } from "@vercel/postgres";

import { FeaturedProducts, ProductsCard, ProductToCart, ProductsInfo, UsersDefinitions } from "./definitions";

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
  }
}

export async function getProductById(id: string) {
  try {
    const data = await sql<ProductsInfo>`
    SELECT 
      products.product_id, 
      products.product_name, 
      products.product_image, 
      products.product_price, 
      products.product_description, 
      products.product_quantity, 
      users.name
    FROM products JOIN users ON products.user_id = users.id
    WHERE products.product_id = ${id};
    `;

    const product = data.rows.map((product) => ({
      ...product
    }))

    return product[0];
  } catch (error) {
    console.error('Database Error:', error);
  }
}

export async function getProductName(id: string) {
  try {
    const data = await sql`
    SELECT 
      products.product_name 
    FROM products
    WHERE products.product_id = ${id};
    `;
    
    const productName = data.rows[0].product_name

    return productName;
  } catch (error) {
    console.error('Database Error:', error);
  }
}

export async function fetchFeaturedProducts() {
  try {
    const data = await sql<FeaturedProducts>`
    SELECT product_id, product_name, product_image, product_price, product_description
    FROM products
    ORDER BY products.purchase_number DESC
    LIMIT 6
    `

    const featuredProducts = data.rows.map((product => ({
      ...product
    })))

    return featuredProducts; 
  } catch (error) {
    console.error('Database Error:', error);
  }
}

export async function checkUserExist(email: string | null| undefined){
  try {
    const data = await sql`
    SELECT
     *
    FROM users
    WHERE email = ${email};
    `

    return data.rowCount;
    
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.'); 
  }
}

export async function createNewUser(id:number, name: string| null| undefined, email: string| null| undefined, image: string| null| undefined) {
  try {
    await sql<UsersDefinitions>
    `INSERT INTO users(id, name, email, image)
     VALUES (${id}, ${name}, ${email}, ${image})`
  } catch (error) {
    console.error(error)
  }
}

export async function getUserById(id:number){
  try {
    const data = await sql<UsersDefinitions>`
    SELECT
     * 
    FROM users
    WHERE id= ${id};
    `
    return data.rows
  } catch (error) {
    console.error(error)
  }
}

export async function changeUserStatus(id:number){
  try {
    const status = "seller" 
    const data = await sql`
    UPDATE users SET status = ${status} WHERE id = ${id} RETURNING *;
    `
    return data.rows
  } catch (error) {
    console.error(error)
  }
}

export async function GetUserIdByEmail(email: string | null| undefined){
  try {
    const data = await sql<UsersDefinitions>`
    SELECT
     *
    FROM users
    WHERE email = ${email};
    `

    const user_id = data.rows[0].id
    return user_id;
    
  } catch (error) {
    console.error('Database Error:', error);
  }
}

export async function addProductToCart(
  user_id: string, 
  quantity: string, 
  product_id: string,
) {


  try {
    await sql<ProductToCart>
    `INSERT INTO cart(quantity, user_id, product_id)
    VALUES (${quantity}, ${user_id}, ${product_id})
    `
  } catch (error) {
    console.error('Database Error:', error);
  }
}

export async function createNewProduct(
  product_name: string,
  product_image: string,
  product_price: number,
  product_description:string,
  product_quantity:number,
  user_id:string
){
  try {
    await sql<ProductsInfo>
    `
      INSERT INTO products(product_name, product_image, product_price, product_description, product_quantity, user_id)
      VALUES(${product_name}, ${product_image}, ${product_price}, ${product_description}, ${product_quantity}, ${user_id})
    `
  } catch (error) {
    console.error('Database Error:', error);
  }
}

export async function getUserProducts(user_id: number){
  try {
    const data = await sql<ProductsInfo>
    `
      SELECT
      *
      FROM products
      WHERE user_id = ${user_id};
    `
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
  }
}

export async function productById(product_id: string){
  try {
    const data = await sql<ProductsInfo>
    `
      SELECT
      *
      FROM products
      WHERE product_id = ${product_id} 
    `
    return data.rows[0]
  } catch (error) {
    console.error('Database Error:', error);
  }
}

export async function alterProductById(
  product_name: string,
  product_image: string,
  product_price: number,
  product_description:string,
  product_quantity:number,
  product_id: string){
    try {
      await sql<ProductsInfo>
      `
      UPDATE products 
      SET 
      product_name=${product_name}, 
      product_image=${product_image},
      product_price=${product_price},
      product_description=${product_description},
      product_quantity=${product_quantity} 
      WHERE product_id = ${product_id} RETURNING *
      `
    } catch (error) {
      console.error('Database Error:', error);
    }

}