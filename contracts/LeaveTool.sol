pragma solidity 0.5.8;

contract LeaveTool {
	// Employee model

	struct Employee {
		uint id;
		string username;
		string fullname;
		string location;
	}

	// Read/Write Employees
	mapping(uint => Employee) public employees;

	//Employee count
	uint public employeeCount;

	constructor () public {
		addEmployee("joycbeva", "Bevan Joyce", "CPT");
	}

	function addEmployee (string memory _username, string memory _fullname, string memory _location) private {
		employeeCount++;
		employees[employeeCount] = Employee(employeeCount, _username, _fullname, _location);
	}
}