let angle = 0;
let x = innerWidth / 2;
let y = innerHeight / 2;
let animation_id;
let backImg;
let signer, walletAddress, BoContract, ToContract, transactionData_1, transactionData_2, org_balance;
let Wallet_Address;
let transaction_done, transaction_hash;
let approved_or_not = false;
const BoAbi = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "tokenAddress",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "Deposit",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "amt",
        "type": "uint256"
      }
    ],
    "name": "WithDraw",
    "type": "event"
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
    "inputs": [
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      }
    ],
    "name": "getBalanceOfAddress",
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
    "name": "high_speed_price",
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
    "name": "low_speed_price",
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
    "name": "med_speed_price",
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
    "name": "request_high_speed",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "request_low_speed",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "request_med_speed",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "token",
    "outputs": [
      {
        "internalType": "contract IERC20",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "stateMutability": "payable",
    "type": "receive"
  }
];
const TokenAbi = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      }
    ],
    "name": "allowance",
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
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "balanceOf",
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
    "name": "decimals",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "subtractedValue",
        "type": "uint256"
      }
    ],
    "name": "decreaseAllowance",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "addedValue",
        "type": "uint256"
      }
    ],
    "name": "increaseAllowance",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address payable",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
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
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];


function preload() {
  backImg = loadImage('back.jpg');
}

function setup() {
  createCanvas(innerWidth, innerHeight);
  angleMode(DEGREES);
  let connect_Wallet = createButton('Connect Wallet');
  let switchItOn_low = createButton('Spin at low speed');
  let switchItOn_medium = createButton('Spin at medium speed');
  let switchItOn_high = createButton('Spin at high speed');
  let switchItOff = createButton('Switch it Off');
  let approve_low = createButton("Approve");
  let approve_med = createButton("Approve");
  let approve_high = createButton("Approve");
  let div_low = createDiv('Price: 5 HRX');
  let div_med = createDiv('Price: 10 HRX');
  let div_high = createDiv('Price: 20 HRX');
  transaction_done = createDiv("");
  Wallet_Address = createDiv('Wallet Connected: ');

  Wallet_Address.position(innerWidth / 2 - 200, 10);
  Wallet_Address.style('font-size', '35px');

  transaction_done.position(innerWidth / 2 - 300, 120);
  transaction_done.style('font-size', '20px');


  connect_Wallet.position(innerWidth - 180, 10);
  connect_Wallet.style('font-size', '20px');


  div_low.style('font-size', '35px');
  div_low.position(innerWidth / 2 - 650, innerHeight / 2 + 270);

  div_med.style('font-size', '35px');
  div_med.position(innerWidth / 2 - 330, innerHeight / 2 + 270);

  div_high.style('font-size', '35px');
  div_high.position(innerWidth / 2 + 80, innerHeight / 2 + 270);

  switchItOn_low.position(innerWidth / 2 - 630, innerHeight / 2 + 240);
  switchItOn_low.style('font-size', '20px');
  approve_low.position(innerWidth / 2 - 600, innerHeight / 2 + 200);
  approve_low.style('font-size', '20px');

  switchItOn_medium.position(innerWidth / 2 - 330, innerHeight / 2 + 240);
  switchItOn_medium.style('font-size', '20px');
  approve_med.position(innerWidth / 2 - 290, innerHeight / 2 + 200);
  approve_med.style('font-size', '20px');

  switchItOn_high.position(innerWidth / 2 + 100, innerHeight / 2 + 240);
  switchItOn_high.style('font-size', '20px');
  approve_high.position(innerWidth / 2 + 130, innerHeight / 2 + 200);
  approve_high.style('font-size', '20px');

  switchItOff.position(innerWidth / 2 + 450, innerHeight / 2 + 240);
  switchItOff.style('font-size', '20px');

  switchItOn_low.mousePressed(switchOn_low);
  switchItOn_medium.mousePressed(switchOn_medium);
  switchItOn_high.mousePressed(switchOn_high);
  switchItOff.mousePressed(switchOff);
  connect_Wallet.mousePressed(connectWallet);

  approve_low.mousePressed(approve_low_Speed);
  approve_med.mousePressed(approve_med_Speed);
  approve_high.mousePressed(approve_high_Speed);

}
function draw() {
  clear();
  fill(0);
  imageMode(CORNER);
  image(backImg, 0, 0, innerWidth, innerHeight);
  circle(innerWidth / 2, innerHeight / 2, 10);
  getCurrentWalletConnected();
  addWalletListener();
}

function animate_low() {

  animation_id = requestAnimationFrame(animate_low);
  console.log("Go");

  translate(x, y);
  rotate(angle);
  fill(0);
  rectMode(CENTER);
  rect(0, 0, 4, 300);
  angle += 7;
}
function animate_medium() {

  animation_id = requestAnimationFrame(animate_medium);
  console.log("Go");

  translate(x, y);
  rotate(angle);
  fill(0);
  rectMode(CENTER);
  rect(0, 0, 4, 300);
  angle += 12;
}
function animate_high() {

  animation_id = requestAnimationFrame(animate_high);
  console.log("Go");

  translate(x, y);
  rotate(angle);
  fill(0);
  rectMode(CENTER);
  rect(0, 0, 4, 300);
  angle += 40;
}


async function switchOn_low() {
  let done;
  let transactionData = "";
  try {
    const StaffContractWithSigner = BoContract.connect(signer);
    done = await StaffContractWithSigner.request_low_speed();
    transactionData = done.hash;
    console.log(done);
  }
  catch (err) {
    console.log(err);
  }

  if (transactionData) {
    transaction_done.html("Transaction Hash:" + done.hash);
    if (animation_id) {
      cancelAnimationFrame(animation_id);
    }
    animation_id = requestAnimationFrame(animate_low);
  }

}
async function switchOn_medium() {
  let done;
  let transactionData = "";
  try {
    const StaffContractWithSigner = BoContract.connect(signer);
    done = await StaffContractWithSigner.request_med_speed();
    transactionData = done.hash;
    console.log(done);
  }
  catch (err) {
    console.log(err);
  }

  if (transactionData) {
    transaction_done.html("Transaction Hash:" + done.hash);
    if (animation_id) {
      cancelAnimationFrame(animation_id);
    }
    animation_id = requestAnimationFrame(animate_medium);
  }
}
async function switchOn_high() {
  let done;
  let transactionData = "";
  try {
    const StaffContractWithSigner = BoContract.connect(signer);
    done = await StaffContractWithSigner.request_high_speed();
    transactionData = done.hash;
    console.log(done);
  }
  catch (err) {
    console.log(err);
  }

  if (transactionData) {
    transaction_done.html("Transaction Hash:" + done.hash);
    if (animation_id) {
      cancelAnimationFrame(animation_id);
    }
    animation_id = requestAnimationFrame(animate_high);
  }
}
function switchOff() {
  cancelAnimationFrame(animation_id);
}

async function connectWallet() {
  if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
    try {
      /* MetaMask is installed */
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      signer = provider.getSigner();

      BoContract = BoStaffContract(provider);

      walletAddress = accounts[0];
      Wallet_Address.html("Wallet Connected: " + walletAddress);
      //console.log(accounts[0]);
    } catch (err) {
      console.error(err.message);
    }
  } else {
    /* MetaMask is not installed */
    console.log("Please install MetaMask");
  }
};
async function getCurrentWalletConnected() {
  if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
    try {

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.send("eth_accounts", []);

      signer = provider.getSigner();
      BoContract = BoStaffContract(provider);

      if (accounts.length > 0) {
        walletAddress = accounts[0];
        Wallet_Address.html("Wallet Connected: " + walletAddress);
        //console.log(accounts[0]);
      } else {
        console.log("Connect to MetaMask using the Connect button");
      }
    } catch (err) {
      console.error(err.message);
    }
  } else {
    /* MetaMask is not installed */
    console.log("Please install MetaMask");
  }
};
async function addWalletListener() {
  if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
    window.ethereum.on("accountsChanged", (accounts) => {
      walletAddress = accounts[0];
      console.log(accounts[0]);
    });
  } else {
    /* MetaMask is not installed */
    walletAddress = "";
    console.log("Please install MetaMask");
  }
};

async function approve_low_Speed() {
  try {
    let tokenContract = new ethers.Contract("0x26c901f498eAC867971B067e9ab593cc1C137A83", TokenAbi, signer);
    approved_or_not = await tokenContract.approve("0x866a82353FB59Fe7058B88d6bF0b7F030cF58b96", 5, { gasLimit: 3000000 });

  } catch (error) {
    console.log(error);
  }

  return approved_or_not;
}
async function approve_med_Speed() {
  try {
    let tokenContract = new ethers.Contract("0x26c901f498eAC867971B067e9ab593cc1C137A83", TokenAbi, signer);
    approved_or_not = await tokenContract.approve("0x866a82353FB59Fe7058B88d6bF0b7F030cF58b96", 10, { gasLimit: 3000000 });

  } catch (error) {
    console.log(error);
  }

  return approved_or_not;
}
async function approve_high_Speed() {
  try {
    let tokenContract = new ethers.Contract("0x26c901f498eAC867971B067e9ab593cc1C137A83", TokenAbi, signer);
    approved_or_not = await tokenContract.approve("0x866a82353FB59Fe7058B88d6bF0b7F030cF58b96", 20, { gasLimit: 3000000 });

  } catch (error) {
    console.log(error);
  }

  return approved_or_not;
}

const BoStaffContract = (provider) => {
  return new ethers.Contract(
    "0x866a82353FB59Fe7058B88d6bF0b7F030cF58b96",
    BoAbi,
    provider
  );
};







