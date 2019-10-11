App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    if (typeof web3 !== 'undefined') {
      // If a web3 instance is already provided by Meta Mask.
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // Specify default instance if no web3 instance provided
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(App.web3Provider);
    }
    return App.initContract();
  },

  initContract: function() {
    $.getJSON("LeaveTool.json", function(leavetool) {
      // Instantiate a new truffle contract from the artifact
      App.contracts.LeaveTool = TruffleContract(leavetool);
      // Connect provider to interact with contract
      App.contracts.LeaveTool.setProvider(App.web3Provider);

      return App.render();
    });
  },

  render: function() {
    var leaveToolInstance;
    var loader = $("#loader");
    var content = $("#content");

    loader.show();
    content.hide();

    // Load account data
    web3.eth.getCoinbase(function(err, account) {
      console.log(web3.eth.accounts);
      console.log(account);
      if (err === null) {
        App.account = account;
        $("#accountAddress").html("Your Account: " + account);
      }
    });

    // Load contract data
    App.contracts.LeaveTool.deployed().then(function(instance) {
      leaveToolInstance = instance;
      return leaveToolInstance.employeeCount();
    }).then(function(employeeCount) {
      var employeeResults = $("#employeeResults");
      employeeResults.empty();

      for (var i = 1; i <= employeeCount; i++) {
        leaveToolInstance.employees(i).then(function(employee) {
          var id = employee[0];
          var username = employee[1];
          var name = employee[2];
          var location = employee[3];

          // Render employee Result
          var employeeTemplate = "<tr><th>" + id + "</th><td>" + username + "</td><td>" + name + "</td><td>" + location +"</td></tr>"
          employeeResults.append(employeeTemplate);
        });
      }

      loader.hide();
      content.show();
    }).catch(function(error) {
      console.warn(error);
    });
  }
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});