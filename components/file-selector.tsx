import React, { useState, useRef, useEffect, ChangeEvent, DragEvent } from "react";
import SubmitBtn from "@/components/submit-btn";
import AlertError from "@/components/alert-error";
import { BsFillTrashFill } from "react-icons/bs";

interface FileSelectorProps {
  handleFiles: (files: File[]) => void;
}

const FileSelector: React.FC<FileSelectorProps> = ({ handleFiles }) => {
  const [dragActive, setDragActive] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorType, setErrorType] = useState<string>("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [files, setFiles] = useState<File[]>([]);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setErrorType("");

    if(!e.target.files || e.target.files.length === 0) {
      return;
    }

    const tFiles = e.target.files;
    for (let i = 0; i < tFiles.length; i++) {
      if (!validateFile(tFiles[i])) return;
    
      setFiles((prevState) => [...prevState, tFiles[i]]);
    }
  }

  useEffect(() => {
    if (files.length === 2) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [files]);

  function handleSubmitFile(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    if (files.length === 2) {
      setIsLoading(true);
      setTimeout(() => {
        handleFiles(files);
        setIsLoading(false);
      }, 500);
    }
  }

  function validateFile(file: File) {
    if (file.name === "following.json" || file.name === "followers_1.json") {
      if (files.find((lfile) => lfile.name === file.name)) {
        setErrorType("duplicateFile");
        return false;
      }
      return true;
    } else {
      setErrorType("wrongFile");
      return false;
    }
  }

  function handleDrop(e: DragEvent<HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    setErrorType("");
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      for (let i = 0; i < e.dataTransfer.files.length; i++) {
        if (!validateFile(e.dataTransfer.files[i])) return;

        setFiles((prevState) => [...prevState, e.dataTransfer.files[i]]);
      }
    }
  }

  function handleDragLeave(e: DragEvent<HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  }

  function handleDragOver(e: DragEvent<HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }

  function handleDragEnter(e: DragEvent<HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }

  function removeFile(fileName: string, idx: number) {
    const newArr = [...files];
    newArr.splice(idx, 1);
    setFiles([]);
    setFiles(newArr);
  }

  function openFileExplorer() {
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.click();
    }
  }

  return (
    <div className="flex flex-col max-w-[35rem] w-full">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Choose your files</h1>
      <p className="text-sm text-gray-500 mb-4 text-center">
        Select following.json and followers_1.json
      </p>
      {isDisabled ? (
        <form
          className={`${
            dragActive ? "bg-indigo-300/30" : "bg-transparent"
          }  p-4 w-full rounded-lg border-dashed border-2 border-indigo-500 min-h-[10rem] text-center flex flex-col items-center justify-center transition-all duration-300 ease-in-out hover:bg-indigo-300/30 cursor-pointer`}
          onDragEnter={handleDragEnter}
          onSubmit={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onClick={openFileExplorer}
        >
          <input
            placeholder="fileInput"
            className="hidden"
            ref={inputRef}
            type="file"
            multiple={true}
            onChange={handleChange}
            accept=".json"
          />

          <svg
            width="48px"
            height="48px"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className="text-indigo-500 fill-current m-3"
          >
            <g>
              <path fill="none" d="M0 0h24v24H0z" />
              <path
                fillRule="nonzero"
                d="M14 6h2v2h5a1 1 0 0 1 1 1v7.5L16 13l.036 8.062 2.223-2.15L20.041 22H9a1 1 0 0 1-1-1v-5H6v-2h2V9a1 1 0 0 1 1-1h5V6zm8 11.338V21a1 1 0 0 1-.048.307l-1.96-3.394L22 17.338zM4 14v2H2v-2h2zm0-4v2H2v-2h2zm0-4v2H2V6h2zm0-4v2H2V2h2zm4 0v2H6V2h2zm4 0v2h-2V2h2zm4 0v2h-2V2h2z"
              />
            </g>
          </svg>

          <p className="text-gray-500 text-xs">
            Drag & Drop files or click here to select files
          </p>
        </form>
      ) : (
        <div
          className={`p-4 w-full rounded-lg border-dashed border-2 border-green-500 min-h-[10rem] text-center flex flex-col items-center justify-center transition-all duration-300 ease-in-out bg-green-200/30`}
        >
          <svg
            width="48px"
            height="48px"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className="text-green-500 fill-current m-3"
          >
            <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
          </svg>
          <span className="text-gray-500 text-sm">
            Ready to scan your files!
          </span>
        </div>
      )}
      <div className="flex flex-col w-full pt-5">
        {files.map((file, idx) => (
          <div
            key={idx}
            className="flex flex-row group file-name"
            onClick={() => removeFile(file.name, idx)}
          >
            <span className="flex-auto">{file.name}</span>
            <span className="flex text-red-500 cursor-pointer ml-2 opacity-50 sm:opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out">
              <span className="flex-auto text-sm">Remove?</span>
              <span className="mt-[0.175rem] ml-2">
                <BsFillTrashFill />
              </span>
            </span>
          </div>
        ))}
      </div>
      {errorType === "duplicateFile" && (
        <div className="flex flex-row items-center justify-center w-full mt-4">
          <AlertError title="Error" message="You can only upload one of each file" />
        </div>
      )}
      {errorType === "wrongFile" && (
        <div className="flex flex-row items-center justify-center w-full mt-4">
          <AlertError title="Error" message="You can only upload following.json and followers_1.json" />
        </div>
      )}
      <SubmitBtn isDisabled={isDisabled} isLoading={isLoading} handleClick={handleSubmitFile} />
    </div>
  );
};

export default FileSelector;
