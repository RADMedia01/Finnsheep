// src/app/api/categories/route.js

import { Category } from '@/app/lib/models';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const categories = await Category.find({});
    return NextResponse.json(categories);
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    return NextResponse.error();
  }
}
