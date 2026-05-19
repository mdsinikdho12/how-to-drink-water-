import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'সব তথ্য পূরণ করুন' }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষর হতে হবে' }, { status: 400 });
    }

    await dbConnect();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: 'এই ইমেইল দিয়ে আগেই একাউন্ট আছে' }, { status: 400 });
    }

    const user = await User.create({ name, email, password });

    return NextResponse.json({
      message: 'একাউন্ট সফলভাবে তৈরি হয়েছে',
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
      },
    }, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'একাউন্ট তৈরিতে সমস্যা হয়েছে' }, { status: 500 });
  }
}
