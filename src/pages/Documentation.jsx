import React, { useState, useEffect } from "react";
import { Octokit } from "@octokit/core";

export default function Documentation() {
  const octokit = new Octokit({
    auth: "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",
  });

  const [MD, setMD] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetch(
        "https://raw.githubusercontent.com/PankratzLab/Genvisis-Docs/main/README.md"
      );
      const data = await response.text();
      const githubMD = await octokit.request("POST /markdown", {
        text: data,
      });
      setMD(githubMD.data);
    })();
  }, []);

  return (
    <main className="documentation">
      <div dangerouslySetInnerHTML={{ __html: MD }}></div>
    </main>
  );
}
