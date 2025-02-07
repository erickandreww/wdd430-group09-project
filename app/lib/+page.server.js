import { sql } from "@vercel/postgres";

async function seed() {
  const createTable = await sql`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY, 
      name VARCHAR(255) NOT NULL, 
      email VARCHAR(255) UNIQUE NOT NULL, 
      image VARCHAR(255),
      "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;
  console.log(`Created "user" table`)

  const users = await Promise.all([
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
  ]);
  console.log(`Seeded ${users.length} users`); 
  
  return {
    createTable, 
    users
  }
}

export async function load() {
  const startTime = Date.now();

  try {
    const {rows: users} = await sql`SELECT * FROM users`
    const duration = Data.now() - startTime;
    return {
      users: users, 
      duration: duration,
    };
  } catch (error) {
    if (error?.message === `relation "users" does not exists`) {
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