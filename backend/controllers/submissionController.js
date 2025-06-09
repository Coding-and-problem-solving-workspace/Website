const axios = require("axios");
const Submission = require("../models/Submission");
const User = require("../models/User");
const { assignLanguage } = require("../utils/assignLanguage");
exports.createSubmission = async (req, res) => {
  console.log('submission created');
  const io = req.app.get("socketio");
  try {
    if(!req.body){
        return res.status(400).json({message: "Invalid Submission"});
    }

    const { problemId, code, language, testCases } = req.body;
    console.log(problemId, "\n", code, "\n", language)
    if(!problemId || !code || !language || !testCases) {
        return res.status(400).json({message: "Invalid Submission"});
    }

    const result = await User.findOne({ firebaseUid: req.user.uid });
    
    if(!result){
        return res.status(404).json({message: "User not found"});
    }

    const userId = result._id;

    const langObj = assignLanguage(language);

    const lang = langObj.name;
    const langId = langObj.id;

    const finalSubmission = {
        userId,
        problemId,
        code,
        language: lang,
    };

    const submission = new Submission(finalSubmission);
    await submission.save();



    console.log(finalSubmission);

    const submissionList = [];

    testCases.map((tc)=>{
      const sub = {
        language_id: langId, source_code: code, stdin: tc.input, expected_output: tc.expectedOutput
      }
      submissionList.push(sub);
    });

    const judge0Response = await axios.post(
      "http://13.232.135.172:2358/submissions/batch?base64_encoded=false",
      { submissions: submissionList },
      { headers: { "Content-Type": "application/json" } }
    );

    const tokens = judge0Response.data.map((sub) => sub.token);

    const checkResults = async () => {
      let count = 0;
      console.log(tokens);
      try {
        const response = await axios.get(
          `http://13.232.135.172:2358/submissions/batch?tokens=${tokens.join(",")}&base64_encoded=false&fields=token,stdout,stderr,status_id,language_id`
        );
        const results = response.data.submissions;
    
        const allFinished = results.every((result) => result.status_id > 2); 
        if (allFinished) {
          console.log("allFinished: ", allFinished, "results: ", results);
          io.emit("submissionResult", results);
        } else {
          count ++;
          console.log("count=", count);
          setTimeout(checkResults, 1000);
        }
      } catch (error) {
        console.error("Error polling Judge0:", error.message);
      }
    };

    res.status(202).json({ message: "The submission is created", finalSubmission, tokens });

    checkResults(); 

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error while creating submission" });
  }
};


