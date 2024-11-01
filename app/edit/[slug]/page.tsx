import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function EditArticlePage() {
  const { slug } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    // Fetch the existing article by slug
  }, [slug]);

  const handleUpdate = async () => {
    const res = await fetch('/api/update-article', {
      method: 'PUT',
      body: JSON.stringify({ slug, title, content }),
    });
    // Handle response
  };

  return (
    <main>
      <h1>Edit Article</h1>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
      <ReactQuill value={content} onChange={setContent} />
      <button onClick={handleUpdate}>Update Article</button>
    </main>
  );
}
