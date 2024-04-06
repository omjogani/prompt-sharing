"use client";

import { useState, useEffect, Children } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/Form";
import GeminiSearchForm from "@components/GeminiSearch";
import runChat from "@config/gemini";
import { split } from "postcss/lib/list";
import ShowResult from "@components/ShowResult";

const GeminiSearch = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");
  const [response, setResponse] = useState(null);

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();
      setPost({
        prompt: data.prompt,
        tag: "",
      });
    };

    if (promptId) getPromptDetails();
  }, [promptId]);

  const searchGemini = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const responseFromAPI = await runChat(post.prompt, post.tag);
    let newResponse = responseFromAPI.split("*").join(" ");
    setResponse(newResponse);
    setSubmitting(false);
  };

  return (
    <>
    <GeminiSearchForm
      type="Gemini Search"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={searchGemini}
    />
    {response ?? <ShowResult response={response}/>}
    </>
  );
};

export default GeminiSearch;