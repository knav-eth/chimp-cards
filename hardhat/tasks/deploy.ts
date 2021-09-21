import "@nomiclabs/hardhat-ethers"
import { task } from "hardhat/config"
import { CARDS_CONTRACT_ADDRESS, CHIMP_CONTRACT_ADDRESS } from "../../shared/config/base"
import { CHIMPCards__factory } from "../../shared/contract_types"
import { persistMainContractAddress } from "../utils/contract"
import { promptForGasPrice } from "../utils/gas"

task("deploy", "Deploy main contract", async (taskArgs, hre) => {
  await hre.run("compile")

  const contractFactory = (await hre.ethers.getContractFactory("CHIMPCards")) as CHIMPCards__factory

  const gasPrice = await promptForGasPrice(hre, contractFactory.signer)
  const deploymentCost = await contractFactory.signer.estimateGas(contractFactory.getDeployTransaction(CHIMP_CONTRACT_ADDRESS, CARDS_CONTRACT_ADDRESS, { gasPrice }))
  console.log("Estimated cost to deploy contract:", hre.ethers.utils.formatUnits(deploymentCost.mul(gasPrice), "ether"), "ETH")

  const contract = await contractFactory.deploy(CHIMP_CONTRACT_ADDRESS, CARDS_CONTRACT_ADDRESS, { gasPrice })
  const deployed = await contract.deployed()

  persistMainContractAddress(hre, deployed.address)
  console.log(`Contract has been deployed to: ${deployed.address}`)
})
