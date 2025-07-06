// import { useState } from "react";
// import ReactQuill from "react-quill-new";
// import "react-quill-new/dist/quill.snow.css";

// const modules = {
//   toolbar: {
//     container: [
//       [{ header: [1, 2, 3, 4, 5, 6, false] }],
//       ["bold", "italic", "underline", "strike"],
//       [{ color: [] }, { background: [] }], // Text color and background
//       [{ list: "ordered" }, { list: "bullet" }],
//       ["link", "image", "video"], // Add image and video buttons
//       ["clean"],
//     ],
//     handlers: {
//       image: imageHandler,
//       video: videoHandler,
//     },
//   },
// };

// const formats = [
//   "header",
//   "bold",
//   "italic",
//   "underline",
//   "strike",
//   "color",
//   "background",
//   "list",
//   "bullet",
//   "link",
//   "image",
//   "video",
// ];

// function imageHandler() {
//   const input = document.createElement("input");
//   input.setAttribute("type", "file");
//   input.setAttribute("accept", "image/*");
//   input.click();

//   input.onchange = async () => {
//     const file = input.files?.[0];
//     if (!file) return;

//     // Here you would typically upload the file to your server
//     // and get back a URL, then insert it into the editor
//     const url = await uploadImage(file); // Implement this function

//     const quill = this.quill;
//     const range = quill.getSelection();
//     quill.insertEmbed(range.index, "image", url);
//   };
// }

// function videoHandler() {
//   const input = document.createElement("input");
//   input.setAttribute("type", "file");
//   input.setAttribute("accept", "video/*");
//   input.click();

//   input.onchange = async () => {
//     const file = input.files?.[0];
//     if (!file) return;

//     const url = await uploadVideo(file); // Implement this function

//     const quill = this.quill;
//     const range = quill.getSelection();
//     quill.insertEmbed(range.index, "video", url);
//   };
// }

// // Example upload function (you need to implement this properly)
// async function uploadImage(file: File) {
//   // Replace with your actual image upload logic
//   return URL.createObjectURL(file); // This is just for local testing
// }

// async function uploadVideo(file: File) {
//   // Replace with your actual video upload logic
//   return URL.createObjectURL(file); // This is just for local testing
// }

// export default function MyEditor() {
//   const [content, setContent] = useState("");

//   return (
//     <ReactQuill
//       theme="snow"
//       value={content}
//       onChange={setContent}
//       modules={modules}
//       formats={formats}
//     />
//   );
// }

import React, { useMemo } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const TextEditor = () => {
  const [content, setContent] = React.useState("");

  // Custom image handler
  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = () => {
      const file = input.files?.[0];
      if (!file) return;

      // Temporary URL for preview (replace with actual upload)
      const url = URL.createObjectURL(file);

      // Get the Quill editor instance
      const editor = document.querySelector(".quill");
      const quill = (editor?.querySelector(".ql-editor") as any)?.__quill;

      if (quill) {
        const range = quill.getSelection();
        quill.insertEmbed(range.index, "image", url);
      }
    };
  };

  // Custom video handler (similar to image)
  const videoHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "video/*");
    input.click();

    input.onchange = () => {
      const file = input.files?.[0];
      if (!file) return;

      const url = URL.createObjectURL(file);

      const editor = document.querySelector(".quill");
      const quill = (editor?.querySelector(".ql-editor") as any)?.__quill;

      if (quill) {
        const range = quill.getSelection();
        quill.insertEmbed(range.index, "video", url);
      }
    };
  };

  // Modules configuration
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          ["bold", "italic", "underline", "strike"],
          ["blockquote", "code-block"],
          [{ header: 1 }, { header: 2 }],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ script: "sub" }, { script: "super" }],
          [{ indent: "-1" }, { indent: "+1" }],
          [{ direction: "rtl" }],
          [{ size: ["small", false, "large", "huge"] }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ color: [] }, { background: [] }],
          [{ font: [] }],
          [{ align: [] }],
          ["clean"],
          ["link", "image", "video"], // Make sure these are included
        ],
        handlers: {
          image: imageHandler,
          video: videoHandler,
        },
      },
    }),
    []
  );

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    "color",
    "background",
  ];

  return (
    <div style={{ height: "500px" }}>
      <ReactQuill
        theme="snow"
        value={content}
        onChange={setContent}
        modules={modules}
        formats={formats}
        style={{ height: "400px" }}
      />
    </div>
  );
};

export default TextEditor;
