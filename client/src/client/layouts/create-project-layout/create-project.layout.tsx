import React, { useEffect } from "react";
import Image from "next/image";
import { useMutation } from "urql";
import {
  CreateProjectDocument,
  CreateProjectMutation,
  CreateProjectMutationVariables,
} from "./createProject.generated";
import { randomColor } from "src/utils/string-to-hex-color";
import { useRouter } from "next/dist/client/router";

type Props = {
  onClose: () => void;
  handleStartWithency: () => void;
};

export const CreateProject: React.FC<Props> = ({ onClose, handleStartWithency }) => {
  const [{ fetching, data }, createProject] = useMutation<CreateProjectMutation>(
    CreateProjectDocument
  );
  const router = useRouter();

  useEffect(() => {
    if (data) {
      onClose();
    }
  }, [data, onClose]);

  const handleSubmit = async (): Promise<void> => {
    try {
      const data: CreateProjectMutationVariables = {
        title: "Untitled Project",
        color: randomColor(),
      };
      const project = await createProject(data);
      router.push(`project/${project.data?.createProject?.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="max-w-xl">
        <div className="grid grid-cols-2 gap-x-6 gap-y-6 mb-6">
          {/* Start from Scratch Card */}
          <button
            className={`p-4 pb-6 shadow-md hover:shadow-lg cursor-pointer transition-shadow duration-150 ${
              fetching && "animate-pulse"
            }`}
            onClick={() => handleSubmit()}
          >
            <Image
              src="/images/create-project/start-from-scratch.svg"
              alt="scratch illustration"
              height="222"
              width="244"
            />
            <h4 className="font-raleway font-semibold mt-4 mb-2">Start from Scratch</h4>
            <p className="font-light text-sm">
              Start with a clean workspace and work your way towards finishing your project.
            </p>
          </button>
          {/* Start with Ency Card */}
          <button
            className="p-4 pb-6 shadow-md hover:shadow-lg transition-shadow duration-150 cursor-pointer"
            onClick={handleStartWithency}
          >
            <Image
              src="/images/create-project/start-wtih-ency.svg"
              alt="start with ency illustration"
              width="244"
              height="222"
            />
            <div className="flex items-center mt-4 mb-2">
              <h4 className="pr-1.5 font-raleway font-semibold">Start with</h4>
              <Image
                src="/images/logo.svg"
                alt="start with ency illustration"
                width="65"
                height="20"
                className="px-1 block"
              />
            </div>
            <p className="font-light text-sm">
              Feeling lazy? Ency will help you give a headstart by using her powerful Summariser
              Tool.
            </p>
          </button>
        </div>
        <div className="w-full flex">
          <button className="font-raleway mx-auto border-gray-400 border rounded-base w-full py-2 hover:border-gray-700 transition-colors duration-150 text-center ">
            Or, start by duplicating another project from the{" "}
            <span className="font-semibold">Community</span>
          </button>
        </div>
      </div>
    </>
  );
};