// // Import the necessary modules and functions
// const { GET } = require('./route');
// import Prompt from "@models/prompt";

// // Mock the Prompt.findById method
// jest.mock('../../../../models/prompt');

// describe('GET /prompts/:id fetches a prompt by ID (success)', () => {
//   // Create a mock prompt object
//   const mockPrompt = {
//     _id: '123',
//     prompt: 'Sample prompt',
//     tag: 'some-tag',
//     creator: 'idofcreator',
//   };

//   // Set up the test case
//   beforeEach(() => {
//     // Reset the mock implementation of Prompt.findById
//     Prompt.findById.mockReset();
//   });

//   // Test the GET request to fetch a prompt by ID
//   it('should return the correct prompt', async () => {
//     // Mock the behavior of Prompt.findById method
//     Prompt.findById.mockResolvedValueOnce(mockPrompt);
//     Prompt.populate.mockResolvedValueOnce(mockPrompt);

//     // Create a request object with the ID of the mock prompt
//     const req = { params: { id: mockPrompt._id } };

//     // Create a response object
//     const res = new Response();

//     // Send a GET request to fetch the prompt by ID
//     await GET(req, res);

//     // Check if the response status is 200
//     expect(res.status).toBe(200);

//     // Check if the response body is equal to the mock prompt
//     expect(await res.text()).toEqual(mockPrompt);
//   });

//   // Test the case when the prompt is not found
//   it('should return a 404 error if the prompt is not found', async () => {
//     // Mock the behavior of Prompt.findById method to return null
//     Prompt.findById.mockResolvedValueOnce(null);

//     // Create a request object with the ID of the mock prompt
//     const req = { params: { id: mockPrompt._id } };

//     // Create a response object
//     const res = new Response();

//     // Send a GET request to fetch the prompt by ID
//     await GET(req, res);

//     // Check if the response status is 404
//     expect(res.status).toBe(404);

//     // Check if the response body is empty
//     expect(await res.text()).toBe('');
//   });
// });

// -------------------------------------------
// const { GET } = require('../route'); // Replace with actual path
// import Prompt from "../../../../models/prompt";

// jest.mock('../../../../utils/database'); // Mock connectToDB
// jest.mock('../../../../models/prompt'); // Mock Prompt model

// test('GET /prompts/:id fetches a prompt by ID (success)', async () => {
//   const mockPrompt = {
//     _id: 'valid-id',
//     prompt: 'Sample prompt',
//     tag: 'some-tag',
//     creator: { username: 'test_user' }, // Example creator data
//   };

//   // Verify mock is called before using Prompt
//   console.log(jest.mockedFunctions); // Check if Prompt.findById is mocked

//   // Mock Prompt.findById behavior
//   Prompt.find.mockResolvedValueOnce(mockPrompt);

//   const req = { params: { id: mockPrompt._id } };
//   const res = new Response();

//   // Ensure you await the GET function
//   const response = await GET(req);
//   console.log('response', response);
//   expect(response.status).toBe(200);
//   expect(await res.text()).toEqual(mockPrompt);
// });
