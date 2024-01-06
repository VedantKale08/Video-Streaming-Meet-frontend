import { Copy, X } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

const CopySection = () => {
  const roomId = useParams().id;
  const [close, setClose] = useState(false);
  useEffect(() => {}, []);
  return (
    !close && (
      <div className="absolute bottom-10 left-10 w-[400px]">
        <div className="bg-white p-4 rounded-md flex flex-col gap-6">
          <div className="flex gap-7 items-center">
            <p className="flex-1">Your Meeting is Ready</p>
            <X
              size={16}
              onClick={() => setClose(true)}
              style={{ cursor: "pointer" }}
            />
          </div>
          <CopyToClipboard text={roomId}>
            <div className="bg-gray-200 text-sm p-2 py-3 flex gap-4 items-center rounded-md cursor-pointer">
              <div className="flex-1">
                <span>{roomId}</span>
              </div>
              <Copy size={20} />
            </div>
          </CopyToClipboard>
          <p className="text-sm text-gray-500">
            Share this meeting link with others that you want in the meeting
          </p>
        </div>
      </div>
    )
  );
};

export default CopySection;
