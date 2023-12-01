// 預設網路節點
var chainId = '5';
// 合約地址
var contractAddress = '0x844AdFd3F136f7c0D3f415B430ea746150a5fde6';
// 錢包地址
var walletAddr = '';
// 錢包餘額
var balanceMoney = 0.00;
// 姓名
var name = '';
// 金額
var money = 0.00;
// 祈福內容
var content = '';
// 連線合約
var rpcHost = 'https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161';
var {
	ethers
} = window;
var provider = new ethers.providers.JsonRpcProvider(rpcHost);

var abi = [{
		"anonymous": false,
		"inputs": [{
				"indexed": true,
				"internalType": "address",
				"name": "donor",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "content",
				"type": "string"
			}
		],
		"name": "DonationMade",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [{
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
		"inputs": [{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "donateRecordByDate",
		"outputs": [{
				"internalType": "uint256",
				"name": "donateID",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "donor",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "content",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "donateCnt",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [{
				"internalType": "string",
				"name": "inDate",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "inAmount",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "inName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "inContent",
				"type": "string"
			}
		],
		"name": "donateVirtue",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [{
			"internalType": "uint256",
			"name": "",
			"type": "uint256"
		}],
		"name": "donationsDic",
		"outputs": [{
				"internalType": "uint256",
				"name": "donateID",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "donor",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "content",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "donateCnt",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "donationsHistory",
		"outputs": [{
				"internalType": "uint256",
				"name": "donateID",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "donor",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "content",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "donateCnt",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [{
			"internalType": "string",
			"name": "name",
			"type": "string"
		}],
		"name": "getDonationHistory",
		"outputs": [{
			"components": [{
					"internalType": "uint256",
					"name": "donateID",
					"type": "uint256"
				},
				{
					"internalType": "address",
					"name": "donor",
					"type": "address"
				},
				{
					"internalType": "string",
					"name": "name",
					"type": "string"
				},
				{
					"internalType": "string",
					"name": "content",
					"type": "string"
				},
				{
					"internalType": "uint256",
					"name": "amount",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "donateCnt",
					"type": "uint256"
				}
			],
			"internalType": "struct VirtueContract.Donation[]",
			"name": "",
			"type": "tuple[]"
		}],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [{
			"internalType": "string",
			"name": "name",
			"type": "string"
		}],
		"name": "getDonationInfo",
		"outputs": [{
			"components": [{
					"internalType": "uint256",
					"name": "donateID",
					"type": "uint256"
				},
				{
					"internalType": "address",
					"name": "donor",
					"type": "address"
				},
				{
					"internalType": "string",
					"name": "name",
					"type": "string"
				},
				{
					"internalType": "string",
					"name": "content",
					"type": "string"
				},
				{
					"internalType": "uint256",
					"name": "amount",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "donateCnt",
					"type": "uint256"
				}
			],
			"internalType": "struct VirtueContract.Donation",
			"name": "",
			"type": "tuple"
		}],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [{
				"internalType": "uint256",
				"name": "startIdx",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "pageSize",
				"type": "uint256"
			}
		],
		"name": "getDonorsList",
		"outputs": [{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"components": [{
						"internalType": "uint256",
						"name": "donateID",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "donor",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "content",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "donateCnt",
						"type": "uint256"
					}
				],
				"internalType": "struct VirtueContract.Donation[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [{
				"internalType": "string",
				"name": "inDate",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "startIdx",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "pageSize",
				"type": "uint256"
			}
		],
		"name": "getDonorsListByDate",
		"outputs": [{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"components": [{
						"internalType": "uint256",
						"name": "donateID",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "donor",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "content",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "donateCnt",
						"type": "uint256"
					}
				],
				"internalType": "struct VirtueContract.Donation[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getMyBalance",
		"outputs": [{
			"internalType": "uint256",
			"name": "",
			"type": "uint256"
		}],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [{
			"internalType": "address",
			"name": "",
			"type": "address"
		}],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [{
			"internalType": "uint256",
			"name": "",
			"type": "uint256"
		}],
		"name": "totalDonations",
		"outputs": [{
			"internalType": "uint256",
			"name": "",
			"type": "uint256"
		}],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [{
			"internalType": "address",
			"name": "newOwner",
			"type": "address"
		}],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

// 合約
var contract = new ethers.Contract(contractAddress, abi, provider);

// 初始載入
$(function() {
	getCurrentBlockTimestamp('load');
});

// 切換導航
$("nav a").click(function() {
	var chk_href = $(this).attr("data-href");
	$('.content').hide();
	$('#' + chk_href).show();
	if(chk_href == 'bs') {
		$('.start').show();
		$('.run').hide();
	}
	if(chk_href == 'gdb') {
		getCurrentBlockTimestamp('query');
	}
});

// 投幣捐助
$('.btn-go').click(function() {
	connectToMetaMask();
});

// 佈施祈福
$('#btn-bs').click(function() {
	walletAddr = $('#wallet').val();
	name = $('#name').val();
	money = $('#money').val();
	content = $('#content').val();

	if(walletAddr.length == 0 || name.length == 0 || money.length == 0 || content.length == 0) {
		alert('請填寫完整的祈福資訊，否則無法佈施祈福上鍊！');
		return;
	}
	if(money == 0) {
		alert('施主佈施0金額，我佛慈悲一定日日為您祈福！');
		return;
	}
	if(balanceMoney < 0.1) {
		alert('您的錢包餘額不足');
		return;
	}

	getCurrentBlockTimestamp('push');
});

// 監聽合約事件
contract.on("DonationMade", (address, name, amount, content, event) => {
	// console.log(address);
	// console.log(name);
	// console.log(amount);
	// console.log(content);
	// console.log(event.blockNumber);
	gdEnd();
});

// 佈施上鍊
function pushBlock(oneDate) {
	// console.log('name=>', name, 'money=>', money, 'content=>', content, 'oneDate=>', oneDate);
	try {
		const {
			ethereum
		} = window;
		if(ethereum) {
			const walletProvider = new ethers.providers.Web3Provider(ethereum, 'any');
			const signer = walletProvider.getSigner();
			const walletContract = new ethers.Contract(contractAddress, abi, signer);
			window.console.log('連線合約=>', walletContract);
			walletContract.donateVirtue(oneDate, ethers.utils.parseEther(money), name, content, {
				value: ethers.utils.parseEther(money)
			});
			gdAdd();
		} else {
			alert("MetaMask not detected!");
		}
	} catch(err) {
		alert(err.message);
		$('.gd').hide();
	}
}

// 功德增加上鍊效果
function gdAdd() {
	$('.gd').show();
	$('.btn').addClass('un');

}

// 取消功德增加上鍊效果
function gdEnd() {
	$('.an').addClass('fading-text');
	$('.font').addClass('fading-glow');
	// 在3秒後執行這段程式碼
	window.setTimeout(function() {
		$('.btn').removeClass('un');
		$('.an').removeClass('fading-text');
		$('.font').removeClass('fading-glow');
		$('.gd').hide();
	}, 3000);
}

// 展示佈施功德榜
function displayData(oneDate, type) {
	if(type == 'load') {
		console.log('load displayData=>oneDate=>', oneDate);
		var $bubbleContainer = $(".bubble-container");
		contract.getDonorsListByDate(oneDate, 0, 20).then(function(rep) {
			// console.log(rep);
			var data = rep[1];
			// console.log('rep=>data=>', data);
			data.map(function(item, index) {
				const $bubble = $("<div class='bubble'><div class='fu' title='" + item.name + "：" + item.content + "'></div></div>");
				$bubble.css("width", `${Math.random() * 30 + 10}px`);
				$bubble.css("height", $bubble.css("width"));
				$bubble.css("left", `${Math.random() * 100}%`);
				$bubble.css("top", `${Math.random() * 100}%`);
				$bubble.css("animation-delay", `-${Math.random() * 2}s`); // 設定動畫延遲時間
				$bubbleContainer.append($bubble);
			});
		});
	} else {
		var container = $('#table');
		container.empty();
		contract.getDonorsListByDate(oneDate, 0, 20).then(function(rep) {
			// console.log(rep);
			var data = rep[1];
			// console.log('rep=>data=>', data);
			data.map(function(item, index) {
				var rows = '<tr><td>' + item.name + '</td><td>' + ethers.utils.formatEther(item.amount) + 'ETH</td></tr>';
				container.append(rows);
			});
		});
	}
}

// 獲取區塊鏈當前日期
function getCurrentBlockTimestamp(type) {
	try {
		// 獲取最新的區塊
		provider.getBlockNumber().then(function(blockNumber) {
			provider.getBlock(blockNumber).then(function(block) {
				// 提取區塊的時間
				var oneDate = formatTimestamp(block.timestamp);
				// console.log('Current Block Timestamp:', oneDate);

				if(type == 'push') {
					pushBlock(oneDate);
				} else if(type == 'load') {
					displayData(oneDate, 'load');
				} else {
					displayData(oneDate, '');
				}
			});
		});

	} catch(error) {
		console.error('Error:', error.message);
	}
}

// 格式化時間戳
function formatTimestamp(timestamp) {
	var _date = new Date(timestamp * 1000);
	var year = _date.getFullYear();
	var month = String(_date.getMonth() + 1).padStart(2, '0');
	var day = String(_date.getDate()).padStart(2, '0');
	var hours = String(_date.getHours()).padStart(2, '0');
	var minutes = String(_date.getMinutes()).padStart(2, '0');
	var seconds = String(_date.getSeconds()).padStart(2, '0');
	return year + '-' + month + '-' + day;
}

// 控制介面顯示
function displayShow() {
	// alert("Wallet Balance: " + balanceMoney + " ETH");
	$('.start').hide();
	$('.gd').hide();
	$('.run').show();
	$('#name').val('');
	$('#content').val('');
	$('.btn').val('佈施祈福');
}

function connectToMetaMask() {
	// 檢查是否有 MetaMask
	if(typeof window.ethereum === "undefined") {
		alert("MetaMask not detected!");
		return;
	}

	// 請求使用者授權連線到 MetaMask
	window.ethereum
		.request({
			method: 'eth_requestAccounts',
		})
		.then(() => {
			// 建立一個以太坊 Provider，使用 MetaMask 提供的 Web3Provider
			let metamaskProvider = new ethers.providers.Web3Provider(window.ethereum);
			// 獲取使用者的錢包地址
			metamaskProvider.listAccounts().then(accounts => {
				walletAddr = accounts[0];
				// alert("Connected to MetaMask!");
				// alert("Wallet Address: " + walletAddr);
				$('#wallet').val(walletAddr.toLocaleLowerCase());
				// 可以使用 provider 來進行以太坊相關操作，比如獲取餘額等
				metamaskProvider.getBalance(walletAddr).then(balance => {
					balanceMoney = ethers.utils.formatEther(balance).toString();
					$('#money').val(balanceMoney);
					displayShow();
				});
			});
		})
		.catch(error => {
			alert("Error connecting to MetaMask: " + error.message);
		});
}

window.ethereum.on('accountsChanged', (accounts) => {
	// 處理賬戶變化
	location.href = location.href;
});

window.ethereum.on('chainChanged', (chainId) => {
	// 處理鏈 ID 變化
	alert('請在goerli測試鏈上體驗！');
});

window.ethereum.on('disconnect', (error) => {
	// 處理斷開連線
	location.href = location.href;
});

window.ethereum.on('error', (error) => {
	// 處理 MetaMask 錯誤
	location.href = location.href;
});