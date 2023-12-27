import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Define a route for handling incoming webhook requests from Dialogflow
app.post("/webhook", (req, res) => {
  const body = req.body;

  // Log the incoming request for debugging purposes
  //   console.log("Incoming request:", JSON.stringify(body));

  // Extract information from the incoming request
  const intent = body.queryResult.intent.displayName;
  const parameters = body.queryResult.parameters;

  // Handle fulfillment logic based on the intent
  console.log("Intent:", intent);
  console.log("Parameters:", parameters);
  let responseText = "";

  switch (intent) {
    case "Default Welcome Intent":
      responseText = "Welcome to the registration form. What is your name?";
      break;
    case "Name":
      responseText = `Nice to meet you, ${parameters.name}. What is your father's name?`;
      break;
    case "FatherName":
      responseText = `Thank you. What is your date of birth, ${parameters.fatherName}?`;
      break;
    case "Dob":
      responseText = `Great! Your date of birth is ${parameters.dob}.`;
      break;
    default:
      responseText = "Sorry, I did not understand that.";
      break;
  }

  // Prepare the response for Dialogflow
  const responseObject = {
    fulfillmentText: responseText,
  };

  // Send the response back to Dialogflow
  res.json(responseObject);
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
