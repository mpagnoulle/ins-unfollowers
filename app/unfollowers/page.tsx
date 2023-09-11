"use client"

import React, { useState } from "react";
import FileSelector from "@/components/file-selector";
import Results from "@/components/results";

export default function Page() {
  const [files, setFiles] = useState<File[]>([]);

  const handleFiles = (files: File[]) => {
    setFiles(files);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      {files.length > 0 ? ( 
          <Results files={files} />
        ) : (
          <FileSelector handleFiles={handleFiles} />
        )}
    </main>
  );
}
