function depositGUI() {
    let main = document.getElementById("main");

    let depositGUI = document.createElement("div");
    depositGUI.classList.add("GUI");
    main.append(depositGUI);

    let close = document.createElement("input");
    close.classList.add("close");
    close.onclick = function() {
        while (main.firstChild) {
            main.removeChild(main.lastChild);
        }
    }
    depositGUI.append(close);

    let balanceLabels = document.createElement("div");
    balanceLabels.classList.add("balanceLabels");
    balanceLabels.innerHTML = "Current Balance &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp Deposit";
    depositGUI.append(balanceLabels);

    let currentBalance = document.createElement("div");
    currentBalance.classList.add("currentBalance");
    currentBalance.innerHTML = web3.utils.fromWei(userBalance, "ether") + " Ether &nbsp &nbsp &nbsp &nbsp &nbsp +";
    depositGUI.append(currentBalance);

    let depositAmount = document.createElement("input");
    depositAmount.id = "depositAmount";
    depositAmount.classList.add("depositAmount");
    depositAmount.type = "number";
    depositGUI.append(depositAmount);

    let depositButton = document.createElement("div");
    depositButton.classList.add("confirmButtonDeposit");
    depositButton.innerHTML = "Confirm Deposit";
    depositButton.style.cursor = "pointer";
    let depositNumber = document.getElementById("depositAmount")
    depositButton.onclick = function() {
        if (Number(depositNumber.value) > 0) {
            setDepositAmount(depositNumber.value);
            depositBalance();
            while (main.firstChild) {
                main.removeChild(main.lastChild);
            }
        } else {
            let error = document.createElement("div");
            error.id = "error";
            error.classList.add("error");
            error.innerHTML = "That amount does not exist."
            depositGUI.append(error);
        }
    };
    depositGUI.append(depositButton);
}
