const Web3 = require("web3");

const customProvider = {
    sendAsync: (payload, cb) => {
        console.log("you called");
        console.log(payload);
        cb(undefined, 100);
    }
}

const web3 = new Web3(customProvider);

web3.eth.getBlockNumber().then(() => console.log("done!"));

async function loadWallet() {
    await loadWeb3();
    const account = await getCurrentAccount();
    updateStatus(account);
}

async function getCurrentAccount() {
    const accounts = await window.web3.eth.getAccounts();
    return accounts[0];
}

async function loadWeb3() {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        window.ethereum.enable();
    }
}

function updateStatus(status) {
    let walletNode = document.getElementById("walletInfo");
    while (walletNode.firstChild) {
        walletNode.removeChild(walletNode.lastChild);
    }

    let walletEl = document.createElement("div");
    walletEl.id = "info";
    walletEl.style.position = "absolute";
    walletEl.style.height = "36px";
    walletEl.style.width = "152px";
    walletEl.style.background = "#ffffff";
    walletEl.style.right = "26px";
    walletEl.style.top = "29px";
    walletEl.style.borderRadius = "30px";
    walletEl.style.border = "1px solid #1752f0";
    walletNode.append(walletEl);

    let statusEl = document.createElement("p");
    statusEl.innerHTML = status.charAt(0) + status.charAt(1) + status.charAt(2) + status.charAt(3) + 
        status.charAt(4) + status.charAt(5) + "..." + status.charAt(38) + status.charAt(39) + status.charAt(40) + status.charAt(41);
    statusEl.style.position = "absolute";
    statusEl.style.bottom = "-10px";
    statusEl.style.right = "20px";
    document.getElementById("info").append(statusEl);

    let connectCircle = document.createElement("div");
    connectCircle.style.position = "absolute";
    connectCircle.style.height = "10px";
    connectCircle.style.width = "10px";
    connectCircle.style.background = "#23d198";
    connectCircle.style.left = "10px";
    connectCircle.style.top = "13px";
    connectCircle.style.borderRadius = "50%";
    document.getElementById("info").append(connectCircle);

    console.log(status);
}