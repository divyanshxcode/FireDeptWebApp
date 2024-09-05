import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export const sendForSignature = async (filePath, signerEmail) => {
  const apiToken = process.env.SIGNREQUEST_API_TOKEN;
  const url = "https://api.signrequest.com/v1/signrequests/quick-create/";

  const headers = {
    'Authorization': `Token ${apiToken}`,
    'Content-Type': 'application/json',
  };

  const data = {
    signers: [{ email: signerEmail }],
    from_email: "your-email@example.com",  // Replace with your actual email
    subject: "Please sign this document",
    message: "Please sign the attached document.",
    file_from_url: filePath,
  };

  try {
    const response = await axios.post(url, data, { headers });
    console.log(`Document sent for signing. SignRequest ID: ${response.data.uuid}`);
    return response.data.uuid;
  } catch (error) {
    console.error(`Exception when calling SignRequest API: ${error}`);
    return null;
  }
};
