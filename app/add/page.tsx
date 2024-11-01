"use client";

import dynamic from 'next/dynamic';
import { useState, useTransition } from 'react';
import 'react-quill/dist/quill.snow.css';
import 'highlight.js/styles/github.css';
import hljs from 'highlight.js';
import { Button } from '@/components/ui/button';
import { saveArticle } from '@/actions'; // Import the server action

// Configure highlight.js
hljs.configure({ languages: ['javascript', 'python', 'ruby', 'java', 'html', 'css'] });

// Toolbar options
const toolbarOptions = [
  [{ 'header': '1'}, { 'header': '2'}, { 'font': [] }],
  [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
  ['bold', 'italic', 'underline', 'strike', 'blockquote'],
  [{ 'color': [] }, { 'background': [] }],
  [{ 'align': [] }],
  ['link', 'image', 'video', 'code-block'],
  ['clean']
];

// Modules for ReactQuill
const modules = {
  toolbar: toolbarOptions,
  clipboard: { matchVisual: false },
  syntax: {
    highlight: (text) => hljs.highlightAuto(text).value,
  },
};

// Define formats
const formats = [
  'header', 'font', 'list', 'bullet', 'check',
  'bold', 'italic', 'underline', 'strike',
  'blockquote', 'color', 'background', 'align',
  'link', 'image', 'video', 'code-block'
];

export default function AddArticlePage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleSave = () => {
    startTransition(() => {
      saveArticle(title, content)
        .then(() => {
          alert('Article saved successfully!');
        })
        .catch((error) => {
          console.error(error);
          alert('Failed to save the article.');
        });
    });
  };

  return (
    <main>
      <h1>Add Article</h1>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        style={{ marginBottom: '1em', padding: '0.5em', fontSize: '1em' }}
      />
      <ReactQuill
        value={content}
        onChange={setContent}
        modules={modules}
        formats={formats}
        style={{ height: '300px', marginBottom: '1em' }}
      />
      <Button
        variant={'default'}
        onClick={handleSave}
        disabled={isPending}
        className='mt-12'
      >
        {isPending ? 'Saving...' : 'Save Article'}
      </Button>
    </main>
  );
}
