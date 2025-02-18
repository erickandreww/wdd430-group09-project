
export type ProductsInfo = {
  product_id: string;
  product_name: string;
  product_image: string;
  product_price: number;
  product_description: string;
  product_quantity: number; 
  name: string;
}

export type FeaturedProducts = {
  product_id: string;
  product_name: string;
  product_image: string;
  product_price: number;
  product_description: string;
}

export type UsersDefinitions = {
  id: string;
  name: string;
  email: string;
  image: string;
  status: string;
}

export type ProductToCart = {
  quantity: number;
  user_id: number; 
  product_id: string;
}

export type ReviewsList = {
  review_id: string;
  rating: number;
  review_text: string;
  review_date: string;
  product_id: string;
  product_name: string; 
  name: string; 
  image: string;
}

export type SessionInfo = {
  name: string; 
  email: string;
  image: string;
}

export type Cart = {
  cart_id: string; 
  quantity: number; 
  user_id: string; 
  product_id: string; 
}

export type ProductInformation = {
  product_id: string;
  product_name: string;
  product_image: string;
  product_price: number;
  product_description: string;
  product_quantity: number;
}