// app/api/register/route.ts
import { connectDB } from "@/lib/mongodb"
import User from "@/models/User"
import bcrypt from "bcryptjs"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { name, email, password } = await req.json()
  await connectDB()

  const userExists = await User.findOne({ email })
  if (userExists) return NextResponse.json({ message: "User already exists" }, { status: 400 })

  const hashedPassword = await bcrypt.hash(password, 12)
  const newUser = await User.create({ name, email, password: hashedPassword })

  return NextResponse.json({ message: "User registered", user: newUser })
}
