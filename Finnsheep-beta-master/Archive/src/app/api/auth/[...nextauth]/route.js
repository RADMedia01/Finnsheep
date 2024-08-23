// src/app/api/auth/[...nextauth]/route.js
// import NextAuth from 'next-auth';
// import CredentialsProvider from 'next-auth/providers/credentials';
// import { connectToDB } from '@/lib/mongoose';
// import User from '@/models/User';
// import bcrypt from 'bcryptjs';

// export const authOptions = {
//   providers: [
//     CredentialsProvider({
//       name: 'Credentials',
//       credentials: {
//         username: { label: 'Username', type: 'text', placeholder: 'Username' },
//         password: { label: 'Password', type: 'password' },
//       },
//       authorize: async (credentials) => {
//         await connectToDB();
//         const user = await User.findOne({ username: credentials.username });
//         if (user && bcrypt.compareSync(credentials.password, user.password)) {
//           return { id: user._id, name: user.username, email: user.email };
//         } else {
//           return null;
//         }
//       },
//     }),
//   ],
//   secret: process.env.NEXTAUTH_SECRET,
//   session: {
//     strategy: 'jwt',
//   },
//   pages: {
//     signIn: '/auth/signin',
//   },
// };

// export default NextAuth(authOptions);



// import { User } from '@/app/lib/models';
// import NextAuth from 'next-auth'
// import GithubProvider from "next-auth/providers/github"
// import CredentialsProvider from 'next-auth/providers/credentials';
// import { connectToDB } from '@/app/lib/utils';
// import bcrypt from 'bcrypt';


// const handler = NextAuth({
//   providers: [
//     // OAuth authentication providers...
//     GithubProvider({
//         clientId: process.env.GITHUB_ID,
//         clientSecret: process.env.GITHUB_SECRET,
//       }),
//       CredentialsProvider({
//         // The name to display on the sign in form (e.g. "Sign in with...")
//         name: "Credentials",
//         // `credentials` is used to generate a form on the sign in page.
//         // You can specify which fields should be submitted, by adding keys to the `credentials` object.
//         // e.g. domain, username, password, 2FA token, etc.
//         // You can pass any HTML attribute to the <input> tag through the object.
//         credentials: {
//           username: { label: "Username", type: "text", placeholder: "jsmith" },
//           password: { label: "Password", type: "password" }
//         },
//         // async authorize(credentials, req) {
//         //     await connectToDB();
//         //             const user = await User.findOne({ username: credentials.username });
//         //             if (user && bcrypt.compareSync(credentials.password, user.password)) {
//         //               return { id: user._id, name: user.username, email: user.email };
//         //             } else {
//         //               return null;
//         //             }
          
//         // },
//         authorize: async (credentials) => {
//           try {
//             await connectToDB();
//             const user = await User.findOne({ username: credentials.username });
  
//             if (user && await bcrypt.compare(credentials.password, user.password)) {
//               return { 
//                 id: user._id,
//                 username: user.username,
//                 firstName: user.firstName,
//                 lastName: user.lastName,
//                 email: user.contactInfo.email,
//                 image: user.img  
//               };
//             } else {
//               return null;
//             }
//           } catch (error) {
//             console.error('Error during authentication', error);
//             return null;
//           }
//         },

//       })
//   ],
//   secret: process.env.NEXTAUTH_SECRET,
//   session: {
//     strategy: 'jwt',
//   },
//   pages: {
//     signIn: '/auth/login', // Path to your custom sign-in page
//   },
//   callbacks: {
//     async session({ session, token }) {
//       if (session?.user) {
//         session.user.id = token.id;
//         session.user.username = token.username;
//         session.user.firstName = token.firstName;
//         session.user.lastName = token.lastName;
//         session.user.email = token.email;
//         session.user.img = token.picture;
//       }
//       return session;
//     },
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//         token.username = user.username;
//         token.firstName = user.firstName;
//         token.lastName = user.lastName;
//         token.email = user.email;
//         token.name = user.name;
//       }
//       return token;
//     }
//   },
// })

// export {handler as GET, handler as POST}



// src/app/api/auth/[...nextauth]/route.js
import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectToDB } from '@/app/lib/utils';
import { User } from '@/app/lib/models';
import bcrypt from 'bcrypt';

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        await connectToDB();
        const user = await User.findOne({ username: credentials.username });
        if (user && bcrypt.compareSync(credentials.password, user.password)) {
          return {
            id: user._id,
            username: user.username,
            name: user.name,
            // firstName: user.firstName,
            // lastName: user.lastName,
            email: user.email,
            image: user.img,
          };
        }
        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/login',
  },
  callbacks: {
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id;
        session.user.username = token.username;
        session.user.name = token.name;
        // session.user.firstName = token.firstName;
        // session.user.lastName = token.lastName;
        session.user.email = token.email;
        session.user.image = token.image;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.email = user.email;
        token.image = user.image;
      }
      return token;
    }
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
