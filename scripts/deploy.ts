import { RandomNumber } from '../typechain'
import {ethers, run} from 'hardhat'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import {delay} from '../utils'
let user0: SignerWithAddress
let user1: SignerWithAddress


async function deploy() {
	const RandomNumber = await ethers.getContractFactory('RandomNumber');
    const accounts = await ethers.getSigners();
	console.log('starting deploying random...')
	const random = await RandomNumber.deploy(421) as RandomNumber
	console.log('random deployed with address: ' + random.address)
	console.log('wait of deploying...')
	await random.deployed()
	console.log('wait of delay...')
	await delay(25000)
	console.log('starting verify token...')
	try {
		await run('verify:verify', {
			address: random!.address,
			contract: 'contracts/RandomNumber.sol:RandomNumber',
			constructorArguments: [421],
		});
		console.log('verify success')
	} catch (e: any) {
		console.log(e.message)
	}
}

deploy()
.then(() => process.exit(0))
.catch(error => {
	console.error(error)
	process.exit(1)
})
