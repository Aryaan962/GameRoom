const response = window.fetch("https://api.etherscan.io/api?module=account&action=balance&address=0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae&tag=latest&apikey=CAIEDIZKAXIBY38KR9WQJ9XD5T3G5S7V5G");

response.then(
    async (res) => {
        const data = await res.json();
        console.log(data.result);
    }
)