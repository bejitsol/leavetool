pragma solidity ^0.5.8;

contract LeaveTool {

	address public owner;

	uint8 power;
	// Employee model
	struct Employee {
		uint id;
		string username;
		string fullname;
		string location;
		uint16 leaveTotal;
	}

	// Read/Write Employees
	mapping(uint => Employee) public employees;

	//Employee count
	uint public employeeCount;


	modifier onlyOwner {
		require(msg.sender == owner, "Unauthorized");
		_;
	}

	constructor () public {
		owner = msg.sender;
		power = 10;
		addEmployee("joycbeva", "Bevan Joyce", "CPT");
	}


	//Can only be performed by the owner of the contract
	function setAllEmployeeLeave(uint8 _leaveAmount) public onlyOwner {
		require(employeeCount > 0);

		for(uint8 i=1; i <= employeeCount; i++){
			employees[i].leaveTotal = _leaveAmount;
		}
	}

	function addEmployee (string memory _username, string memory _fullname, string memory _location) private {
		employeeCount++;
		employees[employeeCount] = Employee(employeeCount, _username, _fullname, _location, 0);
	}
}