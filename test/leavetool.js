class TestConstants {
	constructor(){
		this.id = 1;
		this.username = "joycbeva";
		this.fullname = "Bevan Joyce";
		this.location = "CPT";
		this.leaveTotal = 5;
		this.increaseLeaveBy = 1.5;
		this.decreaseLeaveBy = 1;
		this.defaultAddress = 0x0000000000000000000000000000000000000001;
	}
}
var LeaveTool = artifacts.require("./LeaveTool.sol");

//Testing constants

contract("LeaveTool", (accounts) => {
	var leaveToolInstance = LeaveTool.deployed();

	var testConstants = new TestConstants();

	it("initializes with two employees", () => {
		leaveToolInstance.then((instance) => {
				instance.employeeCount().then((count) => {
				assert.equal(count, 1);
			});
		});
	});

	it("initializes the employees with the correct values", () => {
		leaveToolInstance.then((instance) => {
			return instance.employees(1);
		}).then((employee) => {
			assert.equal(employee[0], testConstants.id, "contains the correct id");
			assert.equal(employee[1], testConstants.username, "contains the correct username");
			assert.equal(employee[2], testConstants.full, "contains the correct full name");
			assert.equal(employee[3], testConstants.location, "contains the correct location");
		});
	});
	//Todo Fix these tests
	// it("gets the employee address", () => {
	// 	leaveToolInstance.then((instance) => {
	// 		return instance.getEmployeeAddress(55);
	// 	}).then((address) => {
	// 		assert.notEqual(address, web3.utils.toChecksumAddress(testConstants.defaultAddress), "contains the correct address");
	// 	});
	// });

	// it("sets the employee address with the correct values", () => {
	// 	leaveToolInstance.then((instance) => {
	// 		instance.setEmployeeAddress(testConstants.id, defaultAddress);
	// 		return instance.
	// 	}
	// })
});


