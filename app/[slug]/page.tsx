"use client"

import { useParams } from 'next/navigation';

export default function ArticlePage() {
  const { slug } = useParams();

  // Fetch article based on slug
  return <main>{/* Render article content here */}</main>;
}
