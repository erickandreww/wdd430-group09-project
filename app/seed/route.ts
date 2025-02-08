import { sql } from "@vercel/postgres";

async function seed() {
  const createUserTable = await sql`
    CREATE TABLE IF NOT EXISTS users (
      user_id SERIAL PRIMARY KEY, 
      name VARCHAR(255) NOT NULL, 
      email VARCHAR(255) UNIQUE NOT NULL, 
      image VARCHAR(255),
      "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;
  console.log(`Created "user" table`)

  const createProductsTable = await sql`
    CREATE TABLE IF NOT EXISTS products(
        product_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        product_name VARCHAR(255) NOT NULL,
        product_image VARCHAR(255) NOT NULL,
        product_price NUMERIC(9, 0) NOT NULL,
        product_description text NOT NULL,
        product_quantity INTEGER NOT NULL
    );
  `

  const productsUserRelation = await Promise.all([
    sql`
      ALTER TABLE IF EXISTS product 
        ADD CONSTRAINT fk_user FOREIGN KEY (user_id)
        REFERENCES users (user_id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE NO ACTION;
    `
  ]);

  const createCartTable = await sql`
  CREATE TABLE IF NOT EXISTS cart(
      cart UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      product_name VARCHAR(255) NOT NULL,
      product_image VARCHAR(255) NOT NULL,
      product_price NUMERIC(9, 0) NOT NULL,
      product_quantity INTEGER NOT NULL,
  );
`
const cartUserRelation = await Promise.all([
    sql`
      ALTER TABLE IF EXISTS cart 
        ADD CONSTRAINT fk_user FOREIGN KEY (user_id)
        REFERENCES users (user_id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE NO ACTION;
    `,
    sql`
    ALTER TABLE IF EXISTS cart 
      ADD CONSTRAINT fk_product FOREIGN KEY (product_id)
      REFERENCES products (product_id) MATCH SIMPLE
      ON UPDATE CASCADE
      ON DELETE NO ACTION;
     `
  ]);

const createReviewTable = await sql `
  CREATE TABLE IF NOT EXISTS reviews(
	cart UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    rating integer NOT NULL
	review_text text NOT NULL,
	review_date timestamp WITH time zone NOT NULL,
  );
`

const reviewsProductsRelation = await Promise.all([
    sql`
    ALTER TABLE IF EXISTS reviews
	ADD CONSTRAINT fk_product FOREIGN KEY (product_id)
	REFERENCES products (product_id) MATCH SIMPLE
	ON UPDATE CASCADE
	ON DELETE NO ACTION;
    `,
    sql`
    ALTER TABLE IF EXISTS reviews
	ADD CONSTRAINT fk_user FOREIGN KEY (user_id)
	REFERENCES users (user_id) MATCH SIMPLE
	ON UPDATE CASCADE
	ON DELETE NO ACTION;
    `,
    sql`
    ALTER TABLE reviews 
    ALTER COLUMN review_date 
    SET DEFAULT now();
    `
  ]);

  /*const users = await Promise.all([
    sql`
      INSERT INO users (name, email, image)
      VALUES ('name', 'email@email.com', )
      ON CONFLICT (email) DO NOTHING;
    `, 
    sql`
      INSERT INO users (name, email, image)
      VALUES ('name', 'email@email.com', )
      ON CONFLICT (email) DO NOTHING;
    `, 
    sql`
      INSERT INO users (name, email, image)
      VALUES ('name', 'email@email.com', )
      ON CONFLICT (email) DO NOTHING;
    `, 
  ]);*/
  console.log(`Seeded all the database`); 
  
  return {
    createUserTable, 
    //users,
    productsUserRelation,
    createProductsTable,
    createCartTable,
    cartUserRelation,
    createReviewTable,
    reviewsProductsRelation
  }
}

export async function load() {
  const startTime = Date.now();

  try {
    const {rows: users} = await sql`SELECT * FROM users`
    const duration = Date.now() - startTime;
    return {
      users: users, 
      duration: duration,
    };
  } catch (error) {
    if (error === `relation "users" does not exists`) {
      console.log()

      await seed();
      const { rows: users} = await sql`SELECT * FROM users`;
      const duration = Date.now() - startTime;
      return {
        users: users, 
        duration: duration
      }; 
    } else {
      throw error;
    }
  }
}