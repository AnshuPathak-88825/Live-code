import axios from "axios";

const judge0ApiKey = process.env.REACT_APP_JUDGE0_API_KEY;
export const coderunner = async (data, input, language_id) => {
  console.log(judge0ApiKey);
  const options = {
    method: "POST",
    url: "https://judge0-ce.p.rapidapi.com/submissions",
    params: {
      base64_encoded: "true",
      wait: "true",
      fields: "*",
    },
    headers: {
      "x-rapidapi-key": judge0ApiKey,
      "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
      "Content-Type": "application/json",
    },
    data: {
      language_id: language_id,
      source_code: btoa(data),
      stdin: btoa(input),
    },
  };

  try {
    const submissionRes = await axios.request(options);
    const token = submissionRes.data.token;


    const result = await axios.get(
      `https://judge0-ce.p.rapidapi.com/submissions/${token}?base64_encoded=true&fields=*`,
      {
        headers: {
          "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
          "x-rapidapi-key": judge0ApiKey,
        },
      }
    );

    const decodedOutput = result.data.stdout ? atob(result.data.stdout) : "";
    const decodedStderr = result.data.stderr ? atob(result.data.stderr) : "";
    const decodedCompileOutput = result.data.compile_output
      ? atob(result.data.compile_output)
      : "";

    console.log("Output:", decodedOutput);
    console.log("Stderr:", decodedStderr);
    console.log("Compile Errors:", decodedCompileOutput);

    return { decodedOutput, decodedStderr, decodedCompileOutput };
  } catch (err) {
    console.error("Error submitting code:", err);
    return { error: err.message || err };
  }
};