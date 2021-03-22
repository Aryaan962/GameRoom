window.web3 = new Web3(window.ethereum);
let account = "";
let balance = 0;

updateInterval();

async function updateInterval() {
    var update = setInterval(async () => {
        if (account == undefined) {
            clearInterval(update);
            console.log("Wallet is disconnected");
            return null;
        }
        await updateVariables();
    }, 1000);
}

async function loadWallet() {
    await loadWeb3();
    account = await getCurrentAccount();
    balance = await getBalance();
    console.log("Account: " + account + "   Balance: " + balance);
    updateInterval();
}

async function disconnectWallet() {
    await ethereum.disable();
}

async function updateVariables() {
    account = await getCurrentAccount();
    balance = await getBalance();
    updateInterface();
    console.log("Account: " + account + "   Balance: " + balance);
}

async function loadWeb3() {
    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {
            // Request account access if needed
            await ethereum.enable();
        } catch (error) {
            // User denied account access...
            console.log("Couldn't connect to wallet.");
        }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
    }
    // Non-dapp browsers...
    else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
}

async function getCurrentAccount() {
    let accounts = await window.web3.eth.getAccounts();
    accounts = accounts[0];
    if (accounts == undefined) {
        return accounts;
    }
    return accounts;
}

async function getBalance() {
    if (account == undefined) {
        return undefined;
    }
    let balance = await window.web3.eth.getBalance(account);
    balance = balance / 10**18;
    return balance;
}

function updateInterface() {
    if (account == undefined) {
        let walletInfoNode = document.getElementById("walletInfo");
        while (walletInfoNode.firstChild) {
            walletInfoNode.removeChild(walletInfoNode.lastChild);
        }

        let walletButton = document.createElement("button");
        walletButton.classList.add("connectWallet");
        walletButton.onclick = function() {loadWallet()};
        walletInfoNode.append(walletButton);

        let walletStatus = document.createElement("div");
        walletStatus.innerHTML = "Connect Wallet";
        walletStatus.style.position = "absolute";
        walletStatus.style.top = "8px";
        walletStatus.style.right = "20px";
        walletButton.append(walletStatus);

    } else {
        let walletInfoNode = document.getElementById("walletInfo");
        while (walletInfoNode.firstChild) {
            walletInfoNode.removeChild(walletInfoNode.lastChild);
        }

        let walletElement = document.createElement("div");
        walletElement.classList.add("connectedWallet");
        walletElement.onclick = function() {addBalance()};
        walletInfoNode.append(walletElement);

        // let balance = document.createElement("div");
        // balance.innerHTML = balance;
        // balance.style.position = "absolute";
        // balance.style.top = "50%";
        // balance.style.left = "50%";
        // balance.style.transform = "translate(-40%, -50%)";
        // walletElement.append(balance);

        let statusElement = document.createElement("div");
        statusElement.innerHTML = account.charAt(0) + account.charAt(1) + account.charAt(2) + account.charAt(3) + 
            account.charAt(4) + "..." + account.charAt(38) + account.charAt(39) + account.charAt(40) + account.charAt(41);
        statusElement.style.position = "absolute";
        statusElement.style.top = "50%";
        statusElement.style.left = "50%";
        statusElement.style.transform = "translate(-40%, -50%)";
        walletElement.append(statusElement);

        let connectCircle = document.createElement("div");
        connectCircle.style.position = "absolute";
        connectCircle.style.height = "10px";
        connectCircle.style.width = "10px";
        connectCircle.style.background = "#23d198";
        connectCircle.style.top = "50%";
        connectCircle.style.left = "50%";
        connectCircle.style.transform = "translate(-600%, -50%)";
        connectCircle.style.borderRadius = "50%";
        walletElement.append(connectCircle);
    }
}