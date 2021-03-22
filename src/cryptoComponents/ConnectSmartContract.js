let gameRoomContractABI;
let gameRoomContractAddress;
let gameRoomContract;
let userAddress;
let userBalance;
let userExistance;

let userData;

async function loadContract() {
	gameRoomContractABI = [
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "address",
					"name": "previousOwner",
					"type": "address"
				},
				{
					"indexed": true,
					"internalType": "address",
					"name": "newOwner",
					"type": "address"
				}
			],
			"name": "OwnershipTransferred",
			"type": "event"
		},
		{
			"inputs": [],
			"name": "createUser",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "_amount",
					"type": "uint256"
				}
			],
			"name": "depositBalance",
			"outputs": [],
			"stateMutability": "payable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "getAccount",
			"outputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "getBalance",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "getExistance",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "getUser",
			"outputs": [
				{
					"components": [
						{
							"internalType": "address",
							"name": "account",
							"type": "address"
						},
						{
							"internalType": "uint256",
							"name": "balance",
							"type": "uint256"
						},
						{
							"internalType": "bool",
							"name": "exists",
							"type": "bool"
						}
					],
					"internalType": "struct GameRoom.User",
					"name": "",
					"type": "tuple"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "random",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "sender",
			"outputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "_amount",
					"type": "uint256"
				}
			],
			"name": "withdrawBalance",
			"outputs": [],
			"stateMutability": "payable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "withdrawContract",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		}
	];
	gameRoomContractAddress = "0x32271026CD32779b2E0D7952e1c36e55f8E67e0e";
	return await new window.web3.eth.Contract(gameRoomContractABI, gameRoomContractAddress);
}

async function createNewUser() {
	await window.contract.methods.createUser().send({ from: account });
}

async function getUserAddress() {
	userAddress = await window.contract.methods.getAccount().call({ from: account });
	console.log(userAddress);
}

async function getUserData() {
	userData = await window.contract.methods.getUser().call({ from: account });
	console.log(userData);
}

async function getUserBalance() {
	userBalance = await window.contract.methods.getBalance().call({ from: account });
	console.log(userBalance);
}

async function getUserExistance() {
	userExistance = await window.contract.methods.getExistance().call({ from: account });
	console.log(userExistance);
}

async function depositUserBalance() {
	await window.contract.methods.depositBalance().send({ from: account });
}

async function withdrawUserBalance() {
	await window.contract.methods.withdrawBalance().send({ from: account });
}

async function withdrawContractBalance() {
	await window.contract.methods.withdrawContract().send({ from: account });
}

async function load() {
	window.contract = await loadContract();
}

load();