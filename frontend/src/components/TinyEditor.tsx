"use client";

import { Editor } from "@tinymce/tinymce-react";
import { useRef, useEffect } from "react";

interface Props {
  value: string;                        // external content
  onChange: (content: string) => void;  // callback to parent
}

export default function TinyEditor({ value, onChange }: Props) {
  const editorRef = useRef<any>(null);

  // 🔄 Sync external value → editor (only when it changes externally)
  useEffect(() => {
    if (editorRef.current) {
      const current = editorRef.current.getContent();
      if (value !== current) {
        editorRef.current.setContent(value || "");
      }
    }
  }, [value]);

  return (
    <Editor
      apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
      onInit={(_, editor) => (editorRef.current = editor)}
      // ❌ Do NOT pass `initialValue={value}` here anymore
      init={{
        height: 400,
        menubar: false,
        plugins: [
          "advlist autolink lists link image charmap print preview anchor",
          "searchreplace visualblocks code fullscreen",
          "insertdatetime media table paste code help wordcount"
        ],
        toolbar:
          "undo redo | formatselect | bold italic backcolor | \
          alignleft aligncenter alignright alignjustify | \
          bullist numlist outdent indent | removeformat | help",
        placeholder: "Start writing your content..."
      }}
      onEditorChange={(content) => onChange(content)}
    />
  );
}
