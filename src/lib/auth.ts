import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('ইমেইল এবং পাসওয়ার্ড দিন');
        }

        await dbConnect();

        const user = await User.findOne({ email: credentials.email }).select('+password');
        if (!user) {
          throw new Error('ইমেইল বা পাসওয়ার্ড সঠিক নয়');
        }

        const isPasswordValid = await user.comparePassword(credentials.password);
        if (!isPasswordValid) {
          throw new Error('ইমেইল বা পাসওয়ার্ড সঠিক নয়');
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
};
