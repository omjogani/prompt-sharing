import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

// GET (read a prompt)
export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const prompts = await Prompt.findById(params.id).populate("creator");
    if(!prompts) {
        return new Response("Prompt Not Found!", { status: 400 });
    }
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to Fetch the prompts", { status: 500 });
  }
};


// PATCH (update a prompt)
export const PATCH = async (request, { params }) => {
    const { prompt, tag } = await request.json();

    try {
        await connectToDB();
        const existingPrompt = await Prompt.findById(params.id);
        if(!existingPrompt){
            return new Response("Prompt not Found!", { status: 400 });
        }
        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save();
        return new Response(JSON.stringify(existingPrompt), { status: 200 });
    } catch (error) {
        return new Response("Failed to Update Prompts", { status:500 });
    }
}

// DELETE (Delete a prompt)
export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();
        await Prompt.findByIdAndRemove(params.id);
        return new Response("Prompt Deleted Successfully!", { status: 200 });
    } catch (error) {
        return new Response("Failed to Delete Prompt", { status: 500 });
    }
}