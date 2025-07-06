// // app/components/rich-text-editor.tsx
// "use client";

// import { useState, useEffect } from "react";
// import {
//   EditorState,
//   ContentState,
//   convertToRaw,
//   convertFromRaw,
//   Modifier,
// } from "draft-js";
// import { Editor } from "react-draft-wysiwyg";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import { convertToHTML } from "draft-convert";
// import DOMPurify from "dompurify";

// const editorConfig = {
//   suppressContentEditableWarning: true,
//   stripPastedStyles: true,
//   // Add this to handle the prop warnings
//   handleBeforeInput: () => false,
//   handlePastedText: () => false,
// };

// const getYouTubeId = (url: string) => {
//   // Simple pattern that works for most common YouTube URL formats
//   const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
//   const match = url.match(regExp);
//   return match && match[2].length === 11 ? match[2] : null;
// };

// const RichTextEditor = ({
//   initialContent = "",
//   onContentChange,
//   readOnly = false,
// }: {
//   initialContent?: string;
//   onContentChange?: (html: string, raw: string) => void;
//   readOnly?: boolean;
// }) => {
//   const [editorState, setEditorState] = useState(EditorState.createEmpty());
//   const [mediaUrls, setMediaUrls] = useState<{ url: string; type: string }[]>(
//     []
//   );
//   const [isMounted, setIsMounted] = useState(false);

//   // Initialize editor with content
//   useEffect(() => {
//     if (initialContent) {
//       try {
//         const contentState = ContentState.createFromText(initialContent);
//         setEditorState(EditorState.createWithContent(contentState));
//       } catch (error) {
//         console.error("Error initializing editor:", error);
//         setEditorState(EditorState.createEmpty());
//       }
//     }
//   }, [initialContent]);

//   // Handle editor changes
//   const handleEditorChange = (state: EditorState) => {
//     setEditorState(state);

//     if (onContentChange) {
//       const contentState = state.getCurrentContent();
//       const rawContent = JSON.stringify(convertToRaw(contentState));
//       const htmlContent = convertToHTML(contentState);

//       onContentChange(htmlContent, rawContent);
//     }
//   };

//   // Custom media detection and rendering
//   const mediaBlockRenderer = (block: any) => {
//     if (block.getType() === "atomic") {
//       const contentState = editorState.getCurrentContent();
//       const entity = block.getEntityAt(0);

//       if (!entity) return null;

//       const entityType = contentState.getEntity(entity).getType();
//       const data = contentState.getEntity(entity).getData();

//       if (entityType === "IMAGE") {
//         return {
//           component: MediaComponent,
//           editable: false,
//           props: {
//             src: data.src,
//             alt: data.alt || "",
//             caption: data.caption || "",
//             type: "image",
//           },
//         };
//       }

//       if (entityType === "VIDEO") {
//         return {
//           component: MediaComponent,
//           editable: false,
//           props: {
//             src: data.src,
//             caption: data.caption || "",
//             type: "video",
//           },
//         };
//       }

//       if (entityType === "LINK") {
//         return {
//           component: LinkComponent,
//           editable: false,
//           props: {
//             url: data.url,
//             text: data.text || data.url,
//           },
//         };
//       }
//     }
//     return null;
//   };

//   // Add media to editor
//   const addMedia = (url: string, type: "image" | "video", caption = "") => {
//     const contentState = editorState.getCurrentContent();
//     const contentStateWithEntity = contentState.createEntity(
//       type.toUpperCase(),
//       "IMMUTABLE",
//       { src: url, caption }
//     );
//     const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
//     const newContentState = Modifier.insertText(
//       contentState,
//       contentState.getSelectionAfter(),
//       " ",
//       undefined,
//       entityKey
//     );

//     const newEditorState = EditorState.push(
//       editorState,
//       newContentState,
//       "insert-characters"
//     );

//     setEditorState(
//       EditorState.forceSelection(
//         newEditorState,
//         newContentState.getSelectionAfter()
//       )
//     );
//   };

//   // Add link to editor
//   const addLink = (url: string, text = "") => {
//     const contentState = editorState.getCurrentContent();
//     const contentStateWithEntity = contentState.createEntity(
//       "LINK",
//       "MUTABLE",
//       { url, text: text || url }
//     );
//     const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
//     const newContentState = Modifier.applyEntity(
//       contentState,
//       contentState.getSelectionAfter(),
//       entityKey
//     );

//     const newEditorState = EditorState.push(
//       editorState,
//       newContentState,
//       "apply-entity"
//     );

//     setEditorState(newEditorState);
//   };

//   // Handle pasted text
//   const handlePastedText = (
//     text: string,
//     html: string | undefined,
//     editorState: EditorState
//   ) => {
//     // Detect URLs in pasted text
//     const urlRegex = /(https?:\/\/[^\s]+)/g;
//     const urls = text.match(urlRegex) || [];

//     if (urls.length > 0) {
//       urls.forEach((url) => {
//         if (isImageUrl(url)) {
//           addMedia(url, "image");
//           return;
//         }

//         if (isVideoUrl(url)) {
//           addMedia(url, "video");
//           return;
//         }

//         // Default to link if not media
//         addLink(url);
//       });

//       return "handled";
//     }

//     return "not-handled";
//   };

//   // URL type detection helpers
//   const isImageUrl = (url: string) => {
//     return /\.(jpg|jpeg|png|webp|gif|svg)(\?.*)?$/i.test(url);
//   };

//   const isVideoUrl = (url: string) => {
//     // YouTube
//     if (/youtube\.com|youtu\.be/i.test(url)) return true;
//     // Vimeo
//     if (/vimeo\.com/i.test(url)) return true;
//     // Other video extensions
//     return /\.(mp4|webm|ogg)(\?.*)?$/i.test(url);
//   };
//   useEffect(() => {
//     setIsMounted(true);
//     return () => setIsMounted(false);
//   }, []);

//   // Only render editor after mount
//   if (!isMounted) {
//     return <div className="h-64 bg-gray-100 rounded-lg animate-pulse" />;
//   }

//   // Custom components
//   const MediaComponent = ({
//     src,
//     caption,
//     type,
//   }: {
//     src: string;
//     caption: string;
//     type: string;
//   }) => {
//     if (type === "image") {
//       return (
//         <div className="my-4">
//           <div className="relative w-full h-auto max-h-96 overflow-hidden rounded-lg">
//             <img
//               src={src}
//               alt={caption || "Embedded image"}
//               className="w-full h-auto object-contain"
//             />
//           </div>
//           {caption && (
//             <p className="text-sm text-gray-500 text-center mt-2">{caption}</p>
//           )}
//         </div>
//       );
//     }

//     if (type === "video") {
//       // YouTube embed
//       if (src.includes("youtube.com") || src.includes("youtu.be")) {
//         // Fixed regex pattern - properly escaped
//         // const youtubeRegex = /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|youtu\.be\/)([^"&?/\s]{11})/i;
//         // const videoId = src.match(youtubeRegex)?.[1];
//         const videoId = getYouTubeId(src);

//         if (videoId) {
//           return (
//             <div className="my-4">
//               <div className="aspect-w-16 aspect-h-9 w-full">
//                 <iframe
//                   src={`https://www.youtube.com/embed/${videoId}`}
//                   frameBorder="0"
//                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                   allowFullScreen
//                   className="w-full h-96 rounded-lg"
//                 />
//               </div>
//               {caption && (
//                 <p className="text-sm text-gray-500 text-center mt-2">
//                   {caption}
//                 </p>
//               )}
//             </div>
//           );
//         }
//       }

//       //   Vimeo embed
//       if (src.includes("vimeo.com")) {
//         const videoId = src.match(/(?:vimeo\.com\/|video\/)(\d+)/i)?.[1];
//         if (videoId) {
//           return (
//             <div className="my-4">
//               <div className="aspect-w-16 aspect-h-9 w-full">
//                 <iframe
//                   src={`https://player.vimeo.com/video/${videoId}`}
//                   frameBorder="0"
//                   allow="autoplay; fullscreen; picture-in-picture"
//                   allowFullScreen
//                   className="w-full h-96 rounded-lg"
//                 ></iframe>
//               </div>
//               {caption && (
//                 <p className="text-sm text-gray-500 text-center mt-2">
//                   {caption}
//                 </p>
//               )}
//             </div>
//           );
//         }
//       }

//       // Generic video
//       return (
//         <div className="my-4">
//           <video controls className="w-full rounded-lg">
//             <source src={src} type="video/mp4" />
//             Your browser does not support the video tag.
//           </video>
//           {caption && (
//             <p className="text-sm text-gray-500 text-center mt-2">{caption}</p>
//           )}
//         </div>
//       );
//     }

//     return null;
//   };

//   const LinkComponent = ({ url, text }: { url: string; text: string }) => {
//     const isExternal =
//       !url.startsWith("/") && !url.startsWith(window.location.origin);

//     return (
//       <a
//         href={url}
//         target={isExternal ? "_blank" : "_self"}
//         rel={isExternal ? "noopener noreferrer" : ""}
//         className="text-blue-600 hover:underline"
//       >
//         {text}{" "}
//         {isExternal && (
//           <span className="text-xs text-gray-500">(opens in new tab)</span>
//         )}
//       </a>
//     );
//   };

//   // Toolbar customization
//   const toolbarOptions = {
//     options: [
//       "inline",
//       "blockType",
//       "list",
//       "textAlign",
//       "link",
//       "embedded",
//       "image",
//       "history",
//     ],
//     inline: {
//       options: ["bold", "italic", "underline", "strikethrough", "monospace"],
//     },
//     blockType: {
//       options: ["Normal", "H1", "H2", "H3", "H4", "Blockquote", "Code"],
//     },
//     list: {
//       options: ["unordered", "ordered"],
//     },
//     textAlign: {
//       options: ["left", "center", "right", "justify"],
//     },
//     link: {
//       options: ["link"],
//     },
//     embedded: {
//       defaultSize: {
//         height: "auto",
//         width: "100%",
//       },
//     },
//     image: {
//       uploadEnabled: false,
//       urlEnabled: true,
//       previewImage: true,
//       inputAccept: "image/*",
//       alt: { present: true, mandatory: false },
//       defaultSize: {
//         height: "auto",
//         width: "100%",
//       },
//     },
//   };

//   return (
//     <div
//       className={`border rounded-lg ${readOnly ? "bg-gray-50" : "bg-white"}`}
//     >
//       <Editor
//         {...editorConfig}
//         editorState={editorState}
//         onEditorStateChange={handleEditorChange}
//         toolbar={readOnly ? null : toolbarOptions}
//         readOnly={readOnly}
//         blockRendererFn={mediaBlockRenderer}
//         handlePastedText={handlePastedText}
//         stripPastedStyles={false}
//         toolbarCustomButtons={[
//           <button
//             key="add-image"
//             onClick={() => {
//               const url = prompt("Enter image URL:");
//               if (url) {
//                 const caption = prompt("Enter caption (optional):");
//                 addMedia(url, "image", caption || "");
//               }
//             }}
//             className="rdw-option-wrapper"
//             title="Add Image"
//           >
//             <span>+ Image</span>
//           </button>,
//           <button
//             key="add-video"
//             onClick={() => {
//               const url = prompt("Enter video URL:");
//               if (url) {
//                 const caption = prompt("Enter caption (optional):");
//                 addMedia(url, "video", caption || "");
//               }
//             }}
//             className="rdw-option-wrapper"
//             title="Add Video"
//           >
//             <span>+ Video</span>
//           </button>,
//         ]}
//         editorClassName="p-4 min-h-[300px]"
//         toolbarClassName="border-b border-gray-200 bg-gray-50"
//         wrapperClassName="rounded-lg"
//       />
//     </div>
//   );
// };

// export default RichTextEditor;

"use client";

import { useState, useEffect } from "react";
import {
  EditorState,
  ContentState,
  convertToRaw,
  convertFromRaw,
  Modifier,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertToHTML } from "draft-convert";
import DOMPurify from "dompurify";

// Accessible color scheme
const accessibleColors = {
  text: "#1a1a1a", // High contrast dark gray
  background: "#ffffff", // Pure white
  toolbarBg: "#f8f9fa", // Light gray
  toolbarBorder: "#dee2e6", // Medium gray
  buttonHover: "#e9ecef", // Light hover
  buttonActive: "#dee2e6", // Medium active
  link: "#0066cc", // Accessible blue
  caption: "#495057", // Dark gray for captions
};

const editorConfig = {
  suppressContentEditableWarning: true,
  stripPastedStyles: true,
  handleBeforeInput: () => false,
  handlePastedText: () => false,
};

const getYouTubeId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

const RichTextEditor = ({
  initialContent = "",
  onContentChange,
  readOnly = false,
}: {
  initialContent?: string;
  onContentChange?: (html: string, raw: string) => void;
  readOnly?: boolean;
}) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [isMounted, setIsMounted] = useState(false);

  // Initialize editor with content
  useEffect(() => {
    if (initialContent) {
      try {
        const contentState = ContentState.createFromText(initialContent);
        setEditorState(EditorState.createWithContent(contentState));
      } catch (error) {
        console.error("Error initializing editor:", error);
        setEditorState(EditorState.createEmpty());
      }
    }
  }, [initialContent]);

  const handleEditorChange = (state: EditorState) => {
    setEditorState(state);
    if (onContentChange) {
      const contentState = state.getCurrentContent();
      const rawContent = JSON.stringify(convertToRaw(contentState));
      const htmlContent = convertToHTML(contentState);
      onContentChange(htmlContent, rawContent);
    }
  };

  // Custom media components with improved accessibility
  const MediaComponent = ({
    src,
    caption,
    type,
    alt = "",
  }: {
    src: string;
    caption: string;
    type: string;
    alt?: string;
  }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
      <figure className="my-4" aria-labelledby={`caption-${src}`}>
        {type === "image" && (
          <>
            <div className="relative w-full h-auto max-h-96 overflow-hidden rounded-lg">
              <img
                src={src}
                alt={alt || caption || "Embedded content"}
                className={`w-full h-auto object-contain ${
                  isLoaded ? "opacity-100" : "opacity-0"
                }`}
                onLoad={() => setIsLoaded(true)}
                aria-describedby={caption ? `caption-${src}` : undefined}
              />
              {!isLoaded && (
                <div
                  className="absolute inset-0 bg-gray-200 animate-pulse"
                  aria-hidden="true"
                />
              )}
            </div>
            {caption && (
              <figcaption
                id={`caption-${src}`}
                className="text-sm text-gray-700 text-center mt-2"
              >
                {caption}
              </figcaption>
            )}
          </>
        )}

        {type === "video" && (
          <>
            <div className="aspect-w-16 aspect-h-9 w-full">
              {src.includes("youtube.com") || src.includes("youtu.be") ? (
                <>
                  <div className="sr-only">
                    YouTube video: {caption || "Embedded YouTube content"}
                  </div>
                  <iframe
                    src={`https://www.youtube.com/embed/${getYouTubeId(src)}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-96 rounded-lg"
                    title={caption || "Embedded YouTube video"}
                    aria-label={caption || "Embedded YouTube video"}
                  />
                </>
              ) : src.includes("vimeo.com") ? (
                <>
                  <div className="sr-only">
                    Vimeo video: {caption || "Embedded Vimeo content"}
                  </div>
                  <iframe
                    src={`https://player.vimeo.com/video/${
                      src.match(/(?:vimeo\.com\/|video\/)(\d+)/i)?.[1]
                    }`}
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    className="w-full h-96 rounded-lg"
                    title={caption || "Embedded Vimeo video"}
                    aria-label={caption || "Embedded Vimeo video"}
                  />
                </>
              ) : (
                <video
                  controls
                  className="w-full rounded-lg"
                  aria-label={caption || "Embedded video"}
                >
                  <source src={src} type="video/mp4" />
                  <track
                    kind="captions"
                    srcLang="en"
                    label="English captions"
                    default
                  />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
            {caption && (
              <figcaption
                id={`caption-${src}`}
                className="text-sm text-gray-700 text-center mt-2"
              >
                {caption}
              </figcaption>
            )}
          </>
        )}
      </figure>
    );
  };

  const LinkComponent = ({ url, text }: { url: string; text: string }) => {
    const isExternal =
      !url.startsWith("/") && !url.startsWith(window.location.origin);

    return (
      <a
        href={url}
        target={isExternal ? "_blank" : "_self"}
        rel={isExternal ? "noopener noreferrer" : ""}
        className="text-blue-700 hover:underline focus:ring-2 focus:ring-blue-500 focus:outline-none"
        style={{ color: accessibleColors.link }}
        aria-label={`${text}${isExternal ? " (opens in new tab)" : ""}`}
      >
        {text}
        {isExternal && <span className="sr-only"> (opens in new tab)</span>}
      </a>
    );
  };

  // Accessible toolbar configuration
  const toolbarOptions = {
    options: [
      "inline",
      "blockType",
      "list",
      "textAlign",
      "link",
      "embedded",
      "image",
      "history",
    ],
    inline: {
      options: ["bold", "italic", "underline", "strikethrough", "monospace"],
      bold: { className: "accessible-toolbar-button" },
      italic: { className: "accessible-toolbar-button" },
      underline: { className: "accessible-toolbar-button" },
      strikethrough: { className: "accessible-toolbar-button" },
      monospace: { className: "accessible-toolbar-button" },
    },
    blockType: {
      options: ["Normal", "H1", "H2", "H3", "H4", "Blockquote", "Code"],
      className: "accessible-toolbar-dropdown",
    },
    list: {
      options: ["unordered", "ordered"],
      unordered: { className: "accessible-toolbar-button" },
      ordered: { className: "accessible-toolbar-button" },
    },
    textAlign: {
      options: ["left", "center", "right", "justify"],
      className: "accessible-toolbar-dropdown",
    },
    link: {
      options: ["link"],
      link: { className: "accessible-toolbar-button" },
    },
    image: {
      uploadEnabled: false,
      urlEnabled: true,
      previewImage: true,
      inputAccept: "image/*",
      alt: { present: true, mandatory: true },
      defaultSize: { height: "auto", width: "100%" },
      className: "accessible-toolbar-button",
    },
  };

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  if (!isMounted) {
    return (
      <div
        className="h-64 bg-gray-200 rounded-lg animate-pulse"
        aria-busy="true"
        aria-label="Editor loading"
      />
    );
  }

  return (
    <div
      className={`border rounded-lg ${readOnly ? "bg-gray-100" : "bg-white"}`}
      style={{
        backgroundColor: accessibleColors.background,
        color: accessibleColors.text,
      }}
      role="application"
      aria-label="Rich text editor"
    >
      <style jsx global>{`
        /* Accessible editor styles */
        .rdw-editor-main {
          color: ${accessibleColors.text};
          background-color: ${accessibleColors.background};
          min-height: 300px;
          padding: 1rem;
        }
        .rdw-editor-toolbar {
          background-color: ${accessibleColors.toolbarBg} !important;
          border-color: ${accessibleColors.toolbarBorder} !important;
          border-radius: 0.5rem 0.5rem 0 0 !important;
          padding: 0.5rem !important;
        }
        .rdw-option-wrapper,
        .rdw-dropdown-wrapper {
          background: ${accessibleColors.toolbarBg} !important;
          border-color: ${accessibleColors.toolbarBorder} !important;
        }
        .rdw-option-wrapper:hover,
        .rdw-dropdown-wrapper:hover,
        .rdw-option-wrapper:focus,
        .rdw-dropdown-wrapper:focus {
          background: ${accessibleColors.buttonHover} !important;
          box-shadow: 0 0 0 2px ${accessibleColors.link} !important;
        }
        .rdw-option-active {
          background: ${accessibleColors.buttonActive} !important;
        }
        .rdw-dropdown-optionwrapper {
          background: ${accessibleColors.background} !important;
          border-color: ${accessibleColors.toolbarBorder} !important;
        }
        .rdw-dropdownoption-highlighted {
          background: ${accessibleColors.buttonHover} !important;
        }
        .rdw-dropdownoption-active {
          background: ${accessibleColors.buttonActive} !important;
        }
        .public-DraftStyleDefault-block {
          margin: 0.5em 0;
        }
        .accessible-toolbar-button {
          min-width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .accessible-toolbar-dropdown {
          min-width: 100px;
        }
      `}</style>

      <Editor
        {...editorConfig}
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
        toolbar={readOnly ? null : toolbarOptions}
        readOnly={readOnly}
        ariaLabel="Rich text editor"
        toolbarHidden={readOnly}
        editorClassName="p-4 min-h-[300px] focus:outline-none focus:ring-2 focus:ring-blue-500"
        toolbarClassName="border-b border-gray-300 bg-gray-100 rounded-t-lg"
        wrapperClassName="rounded-lg"
        handleReturn={() => {
          // Ensure proper handling of return key for accessibility
          return "handled";
        }}
        blockRendererFn={(block) => {
          if (block.getType() === "atomic") {
            const contentState = editorState.getCurrentContent();
            const entity = block.getEntityAt(0);
            if (!entity) return null;

            const entityType = contentState.getEntity(entity).getType();
            const data = contentState.getEntity(entity).getData();

            if (entityType === "IMAGE") {
              return {
                component: MediaComponent,
                editable: false,
                props: {
                  src: data.src,
                  alt: data.alt || "",
                  caption: data.caption || "",
                  type: "image",
                },
              };
            }

            if (entityType === "VIDEO") {
              return {
                component: MediaComponent,
                editable: false,
                props: {
                  src: data.src,
                  caption: data.caption || "",
                  type: "video",
                },
              };
            }

            if (entityType === "LINK") {
              return {
                component: LinkComponent,
                editable: false,
                props: {
                  url: data.url,
                  text: data.text || data.url,
                },
              };
            }
          }
          return null;
        }}
        handlePastedText={(text, html, state) => {
          const urlRegex = /(https?:\/\/[^\s]+)/g;
          const urls = text.match(urlRegex) || [];

          if (urls.length > 0) {
            urls.forEach((url) => {
              if (/\.(jpg|jpeg|png|webp|gif|svg)(\?.*)?$/i.test(url)) {
                const caption = prompt("Enter image caption (optional):", "");
                this.addMedia(url, "image", caption || "");
              } else if (
                /youtube\.com|youtu\.be|vimeo\.com|\.(mp4|webm|ogg)(\?.*)?$/i.test(
                  url
                )
              ) {
                const caption = prompt("Enter video caption (optional):", "");
                this.addMedia(url, "video", caption || "");
              } else {
                const text = prompt("Enter link text (optional):", url);
                this.addLink(url, text || url);
              }
            });
            return "handled";
          }
          return "not-handled";
        }}
        toolbarCustomButtons={[
          <button
            key="add-image"
            onClick={() => {
              const url = prompt("Enter image URL:");
              if (url) {
                const alt = prompt(
                  "Enter alt text (required for accessibility):",
                  "Image description"
                );
                const caption = prompt("Enter caption (optional):", "");
                if (alt) {
                  this.addMedia(url, "image", caption || "", alt);
                } else {
                  alert("Alt text is required for accessibility");
                }
              }
            }}
            className="rdw-option-wrapper accessible-toolbar-button"
            title="Add Image"
            aria-label="Add image with URL"
          >
            <span aria-hidden="true">+ Image</span>
          </button>,
          <button
            key="add-video"
            onClick={() => {
              const url = prompt("Enter video URL:");
              if (url) {
                const caption = prompt("Enter caption (optional):", "");
                this.addMedia(url, "video", caption || "");
              }
            }}
            className="rdw-option-wrapper accessible-toolbar-button"
            title="Add Video"
            aria-label="Add video with URL"
          >
            <span aria-hidden="true">+ Video</span>
          </button>,
        ]}
      />
    </div>
  );
};

export default RichTextEditor;
