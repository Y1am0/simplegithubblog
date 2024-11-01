"use server"
import { Article } from '@/types';

type GitHubFileResponse = {
  name: string;
};

export async function fetchArticles(): Promise<Article[]> {
  const res = await fetch(`${process.env.GITHUB_REPO_URL}/posts`, {
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
  });

  if (!res.ok) {
    if (res.status === 404) {
      // Directory doesn't exist or there are no articles, return an empty array
      return [];
    }
    throw new Error('Failed to fetch articles');
  }

  const files: GitHubFileResponse[] = await res.json();

  // Map the response to match the Article type
  return files.map((file) => ({
    slug: file.name.replace(/\.md$/, ''),
    title: file.name.replace(/-/g, ' ').replace(/\.md$/, ''),
  }));
}


export async function saveArticle(title: string, content: string) {
  const formattedTitle = title.replace(/\s+/g, '-').toLowerCase();
  const url = `${process.env.GITHUB_REPO_URL}/posts/${formattedTitle}.md`;

  try {
    const res = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: `Add article ${title}`,
        content: Buffer.from(content).toString('base64'),
      }),
    });

    if (!res.ok) {
      // If the directory is missing or there’s another issue, log an error
      throw new Error(`Failed to save article: ${res.statusText}`);
    }
  } catch (error) {
    console.error('Error saving article:', error);
    throw new Error('Could not save the article. Please try again.');
  }
}
