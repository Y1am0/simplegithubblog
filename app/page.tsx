"use client";

import { useState, useEffect, useTransition } from 'react';
import Link from 'next/link';
import { fetchArticles } from '@/actions'; // Import the Server Action

type Article = {
  slug: string;
  title: string;
};

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    // Use startTransition to fetch articles on the server without blocking the UI
    startTransition(async () => {
      const articles = await fetchArticles();
      setArticles(articles);
    });
  }, []);

  return (
    <main>
      <h1>Articles</h1>
      <ul>
        {isPending ? (
          <p>Loading...</p>
        ) : (
          articles.map((article) => (
            <li key={article.slug}>
              <Link href={`/articles/${article.slug}`}>{article.title}</Link>
            </li>
          ))
        )}
      </ul>
    </main>
  );
}
