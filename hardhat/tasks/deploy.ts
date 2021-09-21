import "@nomiclabs/hardhat-ethers"
import { task } from "hardhat/config"
import { CHIMPCards__factory } from "../../shared/contract_types"
import { getEnvironmentConfiguration, persistMainContractAddress } from "../utils/contract"
import { promptForGasPrice } from "../utils/gas"

task("deploy", "Deploy main contract", async (taskArgs, hre) => {
  await hre.run("compile")

  const contractFactory = (await hre.ethers.getContractFactory("CHIMPCards")) as CHIMPCards__factory

  const { mainContractAddress, chimpContractAddress } = getEnvironmentConfiguration(hre)

  const gasPrice = await promptForGasPrice(hre, contractFactory.signer)
  const deploymentCost = await contractFactory.signer.estimateGas(contractFactory.getDeployTransaction(chimpContractAddress, mainContractAddress, { gasPrice }))
  console.log("Estimated cost to deploy contract:", hre.ethers.utils.formatUnits(deploymentCost.mul(gasPrice), "ether"), "ETH")

  const contract = await contractFactory.deploy(chimpContractAddress, mainContractAddress, { gasPrice })
  const deployed = await contract.deployed()

  persistMainContractAddress(hre, deployed.address)
  console.log(`Contract has been deployed to: ${deployed.address}`)
})
