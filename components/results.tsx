import React, { useState, useEffect } from 'react';
import { AiFillEye } from 'react-icons/ai';
import { unixTSToDTString } from '@/lib/utils';

interface File {
  name: string;
}

interface Following {
  string_list_data: [{ value: string, timestamp: string }];
}

interface Followers {
  string_list_data: [{ value: string, timestamp: string }];
}

interface ResultsProps {
  files: File[];
}

const Results: React.FC<ResultsProps> = ({ files }) => {
  const [unfollowers, setUnfollowers] = useState<Following[]>([]);
  const [isDisplayed, setIsDisplayed] = useState(false);

  useEffect(() => {
    if (!files.length) return;
    processFiles(files);
  }, [files]);

  useEffect(() => {
    if (unfollowers.length) {
      console.log(unfollowers);
      setIsDisplayed(true);
    }
  }, [unfollowers]);

  const processFiles = async (files: File[]) => {
    try {
      const followingFile = files.find(file => file.name === 'following.json');
      const followersFile = files.find(file => file.name === 'followers_1.json');

      if (!followingFile || !followersFile) return;

      const followingContent = await readFileContent(followingFile);
      const followersContent = await readFileContent(followersFile);

      const followingData = JSON.parse(followingContent);
      const followersList = JSON.parse(followersContent);

      const followingList: Following[] = followingData.relationships_following;

      const followersSet = new Set(followersList.map((item: Followers) => item.string_list_data[0].value));

      const unfollowers = followingList.filter((followingItem: Following) => !followersSet.has(followingItem.string_list_data[0].value));

      setUnfollowers(unfollowers);
    } catch (error) {
      console.error('Error parsing JSON files:', error);
    }
  };

  const readFileContent = async (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        if (event.target && event.target.result) {
          resolve(event.target.result.toString());
        } else {
          reject(new Error('Error reading file content'));
        }
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsText(file as Blob);
    });
  };

  return (
    <div className={`flex flex-col max-w-[35rem] w-full ${isDisplayed ? "opacity-100" : "opacity-0"} transition-all duration-500 ease-in-out`}>
      <h1 className="text-4xl font-bold text-gray-800 mb-6">They don&apos;t follow you back</h1>
      <div className='flex flex-col items-center w-full'>
      {unfollowers.map((unfollower, index) => (
        <a
        key={index} 
        href={`https://instagram.com/${unfollower.string_list_data[0].value}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center w-full unfollower group"
      >
          <div className='flex-auto text-gray-700'><p>{unfollower.string_list_data[0].value}</p><p className='text-xs col-span-2 text-gray-400'>You followed this user on {unixTSToDTString(parseInt(unfollower.string_list_data[0].timestamp))}</p></div>
          <span className="row-span-2 flex text-indigo-500 text-right cursor-pointer ml-2 opacity-50 sm:opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out">
              <span className="flex-auto text-sm">Visit profile</span>
              <span className="mt-[0.175rem] ml-2">
                <AiFillEye />
              </span>
          </span>
        </a>
      ))}
      </div>
    </div>
  );
}

export default Results;
