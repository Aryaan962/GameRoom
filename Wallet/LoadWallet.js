async function load() {
    await loadWeb3();
    window.contract = await loadContract();
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
    const statusEl = document.getElementById('walletStatus');
    statusEl.innerHTML = status;
    console.log(status);
}