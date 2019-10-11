var LeaveTool = artifacts.require("./LeaveTool.sol");

contract("LeaveTool", (accounts) => {
	var leaveToolInstance;

	it("initializes with two employees", () => {
		return LeaveTool.deployed().then((instance) => {
			return instance.employeeCount();
		}).then((count) => {
			assert.equal(count, 1);
		});
	});

	it("initializes the employees with the correct values", () => {
		return LeaveTool.deployed().then((instance) => {
			leaveToolInstance = instance;
			return leaveToolInstance.employees(1);
		}).then((employee) => {
			assert.equal(employee[0], 1, "contains the correct id");
			assert.equal(employee[1], "joycbeva", "contains the correct username");
			assert.equal(employee[2], "Bevan Joyce", "contains the correct full name");
			assert.equal(employee[3], "CPT", "contains the correct location");
		});
	});
});