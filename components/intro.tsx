"use client";

import { useRouter } from "next/navigation";
import { HiOutlineExternalLink } from "react-icons/hi";
import { AiFillGithub } from "react-icons/ai";
import AlertError from "@/components/alert-error";

const Intro = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col max-w-[35rem]">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">
        Welcome to InsUnfollowers
      </h1>
      <p className="text-sm text-gray-500 mb-4">
        This is a simple tool to help you find out who doesn't follow you back,
        from this you can infer who unfollowed you.
      </p>
      <h3 className="text-xl font-bold text-gray-800 mb-6">
        How to download your data from Instagram
      </h3>
      <p className="text-sm text-gray-500 mb-4">
        <a
          href="https://github.com/mpagnoulle/ins-unfollowers/blob/main/How%20to%20download%20a%20copy%20of%20my%20information%20on%20Instagram.md"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm link"
        >
          <span className="flex">
            How do I download a copy of my information on Instagram?{" "}
            <span className="mt-0.5 ml-1">
              <HiOutlineExternalLink />
            </span>
          </span>
        </a>
      </p>
      <h3 className="text-xl font-bold text-gray-800 mb-6">
        How to use this tool
      </h3>
      <p className="text-sm text-gray-500 mb-4">
        Download your data from Instagram and select the following files:
      </p>
      <ul className="text-sm text-gray-500 mb-4 ml-1 list-disc list-inside">
        <li>following.json</li>
        <li>followers_1.json</li>
      </ul>

      <p className="text-sm text-gray-500 mb-4">
        Once you have the files, click on the button below to upload them.
      </p>

      <AlertError
        title="A few things to note:"
        message='<ul class="mt-1.5 ml-0 list-disc list-inside">
              <li>No requests are made to Instagram.</li>
              <li>No data is stored, all data is processed locally in your browser.</li>
              <li>This tool is provided as is, without any warranty. Use at your own risk.</li>
          </ul>'
      />

      <button
        type="submit"
        className="btn-indigo group flex flex-row items-center justify-center"
        onClick={() => router.push("/unfollowers")}
      >
        Select my files
        <svg
          className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-all duration-300 ease-in-out"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </button>
      <div className="flex flex-row items-center justify-center mt-10">
        <a
          href="https://github.com/mpagnoulle/ins-unfollowers/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm link leading-6"
        >
          <span className="flex">
            <span className="mt-1.5 ml-1">
              <AiFillGithub />
            </span>

            <span className="mt-1 ml-1">View source code</span>

            <span className="mt-1.5 ml-1">
              <HiOutlineExternalLink />
            </span>
          </span>
        </a>
        </div>
    </div>
  );
};

export default Intro;
