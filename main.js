function main(){

   
    window.addEventListener("load", function(err, res) {
        if (typeof web3 !== "undefined") {
            // Use MetaMask
            try{
                ethereum.enable();
            }
            catch(error){
                console.log("User denied access");
            }
            window.web3 = new Web3(web3.currentProvider);
            
            console.log("Using MetaMask");
        } 
        else {
            console.log("Not Using MetaMask");
            window.web3 = new Web3(
                new Web3.providers.HttpProvider("https://localhost:8545")
        );
      }        
    });
   
    document.addEventListener("DOMContentLoaded", function () {
        
        const contractEns = web3.eth.contract(abi).at('0x9e94af3a37926c5c29e56e356f30824ab2413370');
        console.log("ENS");
         
        $('#btn-submit').bind('click', function () {
            console.log("cliked");
       
            var setting = {from: web3.eth.accounts[0], value: web3.toWei(0.1, "ether")};
            // filter input string
            var splited = $('#name').val().split('.');
            
            if( splited.length != 3 || splited[1] != "ubuntu" || splited[2] != "eth"){
                alert("FORMAT: (name).ubuntu.eth ");
                return;
            }
            console.log("Register");
            contractEns.register($('#name').val(), $('#address').val(), setting, 
                function(err, res){
                    if(err){
                        alert("Error occured");
                    }else{
                        alert("Success:"+ $('#name').val()+ " registed to "+ $('#address').val());
                    }
                }
            );
        });
        
        $('#btn-query').bind('click', function () {
            
            console.log("cliked");
            var nameLen = $('#name').val().length;
            var addrLen = $('#address').val().length;
            
            // Nothing 
            if(nameLen == 0 && addrLen == 0){
                alert("Please type address or domain name");
                return;
            }
            // Name query
            else if(nameLen != 0 && addrLen == 0){
                // filter input string
                var splited = $('#name').val().split('.');    
                var setting = {from: web3.eth.accounts[0], value: web3.toWei(0.01, "ether")};
                console.log("name query start");
                if( splited.length != 3 || splited[1] != "ubuntu" || splited[2] != "eth"){
                    alert("FORMAT: (name).ubuntu.eth ");
                    return;
                }
                contractEns.queryWithName.call($('#name').val(), setting, 
                    function (err, res){
                        console.log(res);
                        document.getElementById("queryName").innerHTML = '<p>https://ropstem.etherscan.io+'+res+'</p>';
                    }).then(console.log);
            }
            // address query
            else if(nameLen == 0 && addrLen != 0){
                return;
            }
            else{
                alert("Wrong Usage: please type only one section");
                return;
            }
                
        });
        
    }
    );
} 

abi = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "target",
				"type": "address"
			},
			{
				"name": "newName",
				"type": "string"
			}
		],
		"name": "changeDomain",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "target",
				"type": "address"
			},
			{
				"name": "nextOwner",
				"type": "address"
			}
		],
		"name": "changeOwner",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "kill",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "target",
				"type": "address"
			}
		],
		"name": "queryWithAddr",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "name",
				"type": "string"
			}
		],
		"name": "queryWithName",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "name",
				"type": "string"
			},
			{
				"name": "target",
				"type": "address"
			}
		],
		"name": "register",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "withdraw",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "",
				"type": "address"
			}
		],
		"name": "RegisterLog",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "",
				"type": "uint256"
			}
		],
		"name": "WithdrawLog",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "",
				"type": "address"
			}
		],
		"name": "KillLog",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "",
				"type": "address"
			}
		],
		"name": "ChangeDomainLog",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "",
				"type": "address"
			}
		],
		"name": "ChangeOwnershipLog",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "",
				"type": "address"
			}
		],
		"name": "OwnerLogger",
		"type": "event"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];
