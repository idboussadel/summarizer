import React, { useState } from "react";
import { usePostPptxMutation } from "../services/pptx";
import { copy, loader, tick } from "../assets";
import { FileForm } from "./";
import { TypeSwitcher } from "./";

const SummarizePPTX = () => {
  const [presentation, setPresentation] = useState({
    summary: "",
  });
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(null); // Manually manage error state

  const [type, setType] = useState("text");

  const [postPresentation] = usePostPptxMutation();

  const handelSubmit = async (e) => {
    setLoading(true);
    setError(null); // Reset error state before making a new request

    const formData = new FormData();
    const fileInput = e.target.file;
    formData.append("pptxFile", fileInput.files[0]);
    formData.append("type", type);

    try {
      const res = await postPresentation(formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res?.data.summary) {
        const newPresentation = { summary: res.data.summary };
        setPresentation(newPresentation);
      }
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (summary) => {
    setCopied(true);
    navigator.clipboard.writeText(summary);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const slides = presentation.summary.split("\n");

  return (
    <div>
      <div className="flex flex-col items-center justify-center bg-white p-10 rounded-md shadow-md gap-5">
        <div className="flex flex-col items-center gap-5">
          <TypeSwitcher type={type} setType={setType} />
          <div className="border-b w-full"></div>
          <FileForm onSubmit={handelSubmit} fileType="pptx" />
        </div>
      </div>

      <div className="my-10 max-w-full flex justify-center items-center">
        {loading ? (
          <img src={loader} alt="loader" className="w-20 h-20 object-contain" />
        ) : error ? (
          <p className="font-inter font-bold text-black text-center">
            Well, that wasn't supposed to happen...
          </p>
        ) : (
          presentation.summary && (
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h2 className="font-satoshi font-bold text-gray-600 text-xl">
                  Presentation <span className="blue_gradient">Summary</span>
                </h2>
                <div
                  className="copy_btn_sec"
                  onClick={() => handleCopy(presentation.summary)}
                >
                  <img
                    src={copied === true ? tick : copy}
                    alt={copied === true ? "tick_icon" : "copy_icon"}
                    className="w-[60%] h-[60%] object-contain"
                  />
                  {copied === true ? "Copied!" : "Copy"}
                </div>
              </div>
              <div className="summary_box">
                {slides.map((slide, index) => (
                  <p
                    key={index}
                    className="font-inter font-medium text-sm text-gray-700 mb-3"
                  >
                    {slide}
                  </p>
                ))}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default SummarizePPTX;
