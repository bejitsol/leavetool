class TestConstants {
	constructor(){
		this.id = 1;
		this.username = "joycbeva";
		this.fullname = "Bevan Joyce";
		this.location = "CPT";
		this.leaveTotal = 5;
		this.increaseLeaveBy = 1.5;
		this.decreaseLeaveBy = 1;
		this.defaultAddress = "0x0000000000000000000000000000000000000001";
		this.updatedAddress = "0x0000000000000000000000000000000000000002";

	}
}
var LeaveTool = artifacts.require("./LeaveTool.sol");

//Testing constants

contract("LeaveTool", (accounts) => {
	var testConstants = null;
	let leaveTool = null;

	before(async() => {
		leaveTool = await LeaveTool.deployed();
		testConstants = new TestConstants();
	});


	it("Should desploy a smart contract properly", async () => {
		assert(leaveTool.address != "");
	});

	it("Initializes with one employee", async () => {
		const count = await leaveTool.getEmployeeCount();
		assert(count.toNumber() === 1);
	});

	it("Initializes the employee with the correct values", async () => {
		const employee = await leaveTool.employees(testConstants.id);
		assert(employee[0].toNumber() === testConstants.id, "Id is incorrect");
		assert(employee[1] === testConstants.username, "Username is incorrect");
		assert(employee[2] === testConstants.fullname, "Full name is incorrect");
		assert(employee[3] === testConstants.location, "Location is incorrect");
		assert(employee[4].toNumber() === 0, "Leave total is not 0");
	});	

	it("Sets the employee leave with the correct values", async () => {
		await leaveTool.setEmployeeLeave(testConstants.id, testConstants.leaveTotal);
		const employee = await leaveTool.employees(testConstants.id);
		assert(employee[4].toNumber() === testConstants.leaveTotal);
	});

	it("Gets the employee address", async () => {
		const address = await leaveTool.getEmployeeAddress(testConstants.id);
		assert(address === testConstants.defaultAddress);
	});

	it("Sets the employee address with the correct values", async () => {
		await leaveTool.setEmployeeAddress(testConstants.id, testConstants.updatedAddress);
		const address = await leaveTool.getEmployeeAddress(testConstants.id);
		assert(address === testConstants.updatedAddress, "Employee address is incorrect.");
	});
});


