import { z } from 'zod';
import { sql } from '@vercel/postgres';

const FormSchema = z.object({
  user_id: z.string(),
  product_id: z.string({
    invalid_type_error: 'This product is not valid.',
  }),
  quantity: z.number()
    .gt(0, { message: 'Please enter an amount greater than 0.' }),
});

const AddProductToCart = FormSchema;

export type State = {
  errors?: {
    userId?: string[];
    product_id?: string[];
    quantity?: number[];
  };
  message?: string | null;
};

export async function addProductToCart(prevState: State, formData: FormData) {

  const validatedFields = AddProductToCart.safeParse({
    user_id: formData.get('user_id'),
    product_id: formData.get('product_id'),
    quantity: formData.get('quantity'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }

  const { user_id, product_id, quantity } = validatedFields.data;

  try {
    await sql`
    INSERT INTO cart(quantity, user_id, product_id)
    VALUES (${quantity}, ${user_id}, ${product_id})
    `;
  } catch (error) {
    console.error(error);
  }
}