import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import { checkUserExist, createNewUser } from "./app/lib/data"


export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub, Google],
  callbacks: {
    async signIn({user: {name, email, image}}){
      const existingUser = await checkUserExist(email);
      if (!existingUser) {
        await createNewUser(name,email,image)
      }
      return true;
    }
  }
})