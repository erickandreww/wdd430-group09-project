
export type ProductsCard = {
  product_id: number;
  product_name: string;
  product_image: string;
  product_price: number;
  product_description: string;
  product_quantity: number; 
  user_id: string;
  purchase_number: string;
}

export type FeaturedProducts = {
  product_id: number;
  product_name: string;
  product_image: string;
  product_price: number;
  product_description: string;
}

export type ProductsInfo = {
  product_id: number;
  product_name: string;
  product_image: string;
  product_price: number;
  product_description: string;
  product_quantity: number; 
}

export type UsersDefinitions = {
  id: number;
  name: string;
  email: string;
  image: string;
}