import { writeFileSync } from "fs"
import { task } from "hardhat/config"
import path from "path"

task("copyArtifacts", "Copies generated contract artifacts to the frontend", async (taskArgs, hre) => {
  if (!(await hre.artifacts.artifactExists("CHIMPCards"))) {
    await hre.run("compile")
  }

  const contractArtifact = await hre.artifacts.readArtifact("CHIMPCards")
  const abi = contractArtifact.abi

  writeFileSync(path.join(__dirname, "../../artifacts/CHIMPCards.json"), JSON.stringify(abi, null, 2))
})
