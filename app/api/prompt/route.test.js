// const { GET } = require("./route"); // Replace with actual path
// import Prompt from "@models/prompt";

// jest.mock("../../../utils/database"); // Mock connectToDB
// // jest.mock("../../../models/prompt"); // Mock Prompt model
// jest.mock('../../../models/prompt', () => ({
//     __esModule: true,
//     default: {
//       find: jest.fn(),
//       findOne: jest.fn(),
//       create: jest.fn(),
//       // Add any other methods you want to mock here
//     }
//   }));
// test("GET /prompts fetches all prompts (success)", async () => {
//   const mockPrompts = [
//     {
//       _id: "prompt1_id",
//       prompt: "Sample prompt 1",
//       tag: "some-tag",
//       creator: { username: "test_user1" }, // Example creator data
//     },
//     {
//       _id: "prompt2_id",
//       prompt: "Sample prompt 2",
//       tag: "another-tag",
//       creator: { username: "test_user2" },
//     },
//   ];

//   // Mock Prompt.find behavior
//   Prompt.find.mockResolvedValueOnce(mockPrompts);

//   const req = { url: "/api/prompt" }; // Simulate an HTTP request (optional)
//   const res = new Response();

//   await GET(req, res);
//   expect(res.status).toBe(200);
//   expect(await res.text()).toEqual(mockPrompts); // Match the entire list
// });

// // test("GET /prompts handles database error (500)", async () => {
// //   Prompt.find.mockRejectedValueOnce(null);

// //   const req = { url: "/api/prompt" }; // Simulate an HTTP request (optional)
// //   const res = new Response();

// //   await GET(req, res);

// //   expect(res.status).toBe(500);
// //   expect(await res.text()).toContain("Failed to Fetch the prompts"); // Check for error message
// // });

// Import the functions to be tested
import { GET } from "./route";

// Mocking dependencies
jest.mock("../../../utils/database", () => ({
  connectToDB: jest.fn()
}));
jest.mock("../../../models/prompt", () => ({
  find: jest.fn(),
}));

// Test cases
describe("GET function", () => {
  let mockRequest;

  beforeEach(() => {
    // Reset mocks and request object before each test
    jest.clearAllMocks();
    mockRequest = {};
  });

  it("should fetch prompts successfully", async () => {
    const mockPrompts = [
      { _id: "1", prompt: "Prompt 1", creator: { _id: "creatorId", name: "Creator" } },
      { _id: "2", prompt: "Prompt 2", creator: { _id: "creatorId", name: "Creator" } }
    ];
    const expectedResponse = new Response(JSON.stringify(mockPrompts), { status: 200 });

    // Mock the behavior of connectToDB and Prompt.find
    require("../../../utils/database").connectToDB.mockResolvedValue();
    require("../../../models/prompt").find.mockResolvedValue(mockPrompts);

    // Call the GET function
    const response = await GET(mockRequest);

    // Check if connectToDB was called
    expect(require("../../../utils/database").connectToDB).toHaveBeenCalled();

    // Check if Prompt.find was called with an empty object as parameter
    expect(require("../../../models/prompt").find).toHaveBeenCalledWith({});

    // Check if the response is as expected
    console.log(response);
    expect(response).toEqual(expectedResponse);
  });

  it("should handle errors when fetching prompts", async () => {
    const errorMessage = "Database connection failed";
    const expectedResponse = new Response(`Failed to Fetch the prompts ${errorMessage}`, { status: 500 });

    // Mock the behavior of connectToDB to simulate an error
    require("../../../utils/database").connectToDB.mockRejectedValue(new Error(errorMessage));

    // Call the GET function
    const response = await GET(mockRequest);

    // Check if connectToDB was called
    expect(require("../../../utils/database").connectToDB).toHaveBeenCalled();

    // Check if the response is as expected
    expect(response).toEqual(expectedResponse);
  });
});
