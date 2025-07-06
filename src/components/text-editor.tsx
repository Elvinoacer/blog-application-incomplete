"use client";

import { useState, useRef } from "react";
import dynamic from "next/dynamic";
import type ReactQuillType from "react-quill";
import type QuillType from "quill";

// Define types for Quill modules
interface QuillToolbarSettings {
  container: (string | { [key: string]: any })[][];
  handlers: {
    image: () => void;
    video: () => void;
    link: () => void;
  };
}

interface QuillModules {
  toolbar: QuillToolbarSettings;
  imageResize: {
    parchment: any;
    modules: string[];
  };
}

type QuillFormats = string[];

const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");
    const { default: Quill } = await import("quill");
    const { ImageResize } = await import("quill-image-resize-module-ts");

    Quill.register("modules/imageResize", ImageResize);

    return function ForwardedReactQuill(
      props: React.ComponentProps<typeof RQ> & {
        ref?: React.ForwardedRef<ReactQuillType>;
      }
    ) {
      return <RQ {...props} />;
    };
  },
  {
    ssr: false,
    loading: () => <p className="editor-loading">Loading editor...</p>,
  }
) as React.ComponentType<
  React.ComponentProps<typeof ReactQuillType> & {
    ref?: React.Ref<ReactQuillType>;
  }
>;

const TextEditor = () => {
  const [content, setContent] = useState<string>("");
  const [documentName, setDocumentName] = useState<string>("Untitled Document");
  const quillRef = useRef<ReactQuillType>(null);

  // Custom image handler
  const imageHandler = (): void => {
    if (typeof document === "undefined") return;

    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async (): Promise<void> => {
      if (!input.files || input.files.length === 0) return;

      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>): void => {
        const imageUrl = e.target?.result as string;
        const quill = quillRef.current?.getEditor();

        if (quill) {
          const range = quill.getSelection();
          if (range) {
            quill.insertEmbed(range.index, "image", imageUrl, "user");
          }
        }
      };
      reader.readAsDataURL(file);
    };
  };

  // Custom video handler
  const videoHandler = (): void => {
    if (typeof document === "undefined") return;

    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "video/*");
    input.click();

    input.onchange = async (): Promise<void> => {
      if (!input.files || input.files.length === 0) return;

      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>): void => {
        const videoUrl = e.target?.result as string;
        const quill = quillRef.current?.getEditor();

        if (quill) {
          const range = quill.getSelection();
          if (range) {
            quill.insertEmbed(range.index, "video", videoUrl, "user");
          }
        }
      };
      reader.readAsDataURL(file);
    };
  };

  // Custom link handler
  const linkHandler = (): void => {
    if (typeof window === "undefined") return;

    const quill = quillRef.current?.getEditor();
    if (!quill) return;

    const range = quill.getSelection();
    if (!range) return;

    const url = window.prompt("Enter the URL:");
    if (!url) return;

    const text = window.prompt("Enter link text:", url);
    quill.insertText(range.index, text || url, "link", url);
  };

  const modules: QuillModules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ size: ["small", false, "large", "huge"] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ script: "sub" }, { script: "super" }],
        ["blockquote", "code-block"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
        ["link", "image", "video"],
        ["clean"],
      ],
      handlers: {
        image: imageHandler,
        video: videoHandler,
        link: linkHandler,
      },
    },
    imageResize: {
      parchment:
        typeof QuillType !== "undefined" ? QuillType.import("parchment") : null,
      modules: ["Resize", "DisplaySize"],
    },
  };

  const formats: QuillFormats = [
    "header",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "script",
    "blockquote",
    "code-block",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    "align",
  ];

  return (
    <div className="text-editor-container">
      <div className="document-header">
        <input
          type="text"
          value={documentName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setDocumentName(e.target.value)
          }
          className="document-name-input"
        />
      </div>

      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={content}
        onChange={setContent}
        modules={modules}
        formats={formats}
        placeholder="Start typing here..."
        className="quill-editor"
      />

      <style jsx>{`
        .text-editor-container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          background: white;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          min-height: 100vh;
        }

        .document-header {
          margin-bottom: 20px;
          padding-bottom: 10px;
          border-bottom: 1px solid #eee;
        }

        .document-name-input {
          width: 100%;
          padding: 10px;
          font-size: 18px;
          border: none;
          outline: none;
          font-weight: bold;
        }

        .quill-editor {
          height: calc(100vh - 150px);
          min-height: 500px;
        }

        .ql-editor {
          min-height: 500px;
        }

        .ql-video {
          width: 100%;
          height: 400px;
        }

        .editor-loading {
          padding: 20px;
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export default TextEditor;
