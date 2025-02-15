import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import { checkUserExist, createNewUser } from "./app/lib/data"


export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub, Google],
  callbacks: {
    async signIn({user, profile}){
      const existingUser = await checkUserExist(user?.email);
      if (!existingUser) {
        await createNewUser(Number(profile?.id),user?.name,user?.email,user?.image)
      }
      return true;
    },
    async jwt({token, account, profile}){
      if (account && profile) {
      token.id = profile?.id 
      }
      return token;
    },
    async session({session, token}){
      Object.assign(session, {id: token.id})
      return session;
    }
  }
})