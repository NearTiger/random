import { task } from 'hardhat/config'
import BigNumber from "bignumber.js"
import {delay} from '../utils'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'


task('random', '')
	.setAction(async ({}, { ethers }) => {
		const accounts = await ethers.getSigners();
		console.log(accounts[2].address);	
		const contract = await ethers.getContractAt("RandomNumber", "0x3da3dCF9b4a8B3Fbe346434E4fF1710AEdF62D06");	
		await contract.connect(accounts[0]).requestRandomWords();
})

task('read', '')
	.setAction(async ({ }, { ethers }) => {
		const contract = await ethers.getContractAt("RandomNumber", "0x3da3dCF9b4a8B3Fbe346434E4fF1710AEdF62D06");	
		const rand = await contract.s_randomWord();
		console.log(rand.toString());
})
