// app/create-post/page.tsx
"use client";

import { useState } from "react";
// import RichTextEditor from "@/components/rich-text-editor";
import { Button } from "@/components/ui/button";
import { savePostToDatabase } from "@/lib/actions";
import dynamic from "next/dynamic";

// Dynamically import the editor with SSR disabled
const RichTextEditor = dynamic(() => import("@/components/rich-text-editor"), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});

export default function CreatePostPage() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleContentChange = (html: string) => {
    setContent(html);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await savePostToDatabase({ title, content });
      // Redirect or show success message
    } catch (error) {
      console.error("Error saving post:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Create New Post</h1>

      <div className="mb-6">
        <label htmlFor="title" className="block text-sm font-medium mb-2">
          Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter post title"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Content</label>
        <RichTextEditor onContentChange={handleContentChange} />
      </div>

      <div className="flex justify-end gap-4">
        <Button variant="outline">Save Draft</Button>
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting || !content || !title}
        >
          {isSubmitting ? "Publishing..." : "Publish Post"}
        </Button>
      </div>
    </div>
  );
}
