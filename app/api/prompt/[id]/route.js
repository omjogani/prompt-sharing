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

// DELETE (Delete a prompt)
export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();
        await Prompt.findByIdAndDelete(params.id);
        return new Response("Prompt Deleted Successfully!", { status: 200 });
    } catch (error) {
        return new Response(`Failed to Delete Prompt ${error}`, { status: 500 });
    }
}