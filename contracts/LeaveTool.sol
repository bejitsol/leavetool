pragma solidity ^0.5.8;
//Practice safe math
import "./SafeMath.sol";
import "./SafeMath8.sol";

//TODO - Implement Proxy contract once all functionality is implemented
contract LeaveTool {

	using SafeMath8 for uint8;
	using SafeMath for uint256;

	address public owner;
	uint8 private power;
	uint private employeeCount;

	mapping(uint => Employee) public employees;
	mapping(address => uint8) public managers;

	// Employee model
	struct Employee {
		//Look at using keccak256 hash instead of uint
		uint id;
		string username;
		string fullname;
		string location;
		uint8 leaveTotal;
		address accountAddress;
	}

	/*
	 * Modifiers
	*/

	modifier onlyOwner {
		require(msg.sender == owner, "Unauthorized");
		_;
	}

	modifier onlyManager {
		require(managers[msg.sender] == 1, "Unauthorized");
		_;
	}

	/*
	 * Constructor
	*/

	constructor () public {
		owner = msg.sender;
		power = 10;
		managers[msg.sender] = 1;

		addEmployee("joycbeva", "Bevan Joyce", "CPT");
	}

	/*
	 * Get Methods
	*/

	function getEmployeeCount() public view returns (uint) {
		return employeeCount;
	}

	function getEmployeeAddress(uint _id) public view returns (address) {
		//Do some validation so it's not public
		return employees[_id].accountAddress;
	}

	function getEmployeeLeave(uint _id) public view returns (uint8) {
		return employees[_id].leaveTotal;
	}

	function getPower() public view returns (uint8) {
		return power;
	}

	/*
	 * Set Methods
	*/

	function setPower(uint8 _power) public onlyOwner {
		power = _power;
	}

	//Can only be performed by the owner of the contract
	function setAllEmployeeLeave(uint8 _leaveAmount) public onlyOwner {
		require(employeeCount > 0);

		for(uint i=1; i <= employeeCount; i++){
			employees[i].leaveTotal = _leaveAmount;
		}
	}

	function setEmployeeAddress(uint _id, address _address) public onlyManager {
		employees[_id].accountAddress = _address;
	}

	function setEmployeeLeave(uint _id, uint8 _leaveAmount) public onlyManager {
		employees[_id].leaveTotal = _leaveAmount;
	}
	

	function decreaseEmployeeLeave(uint _id, uint8 _decreaseAmount) public onlyManager {
		require(employees[_id].leaveTotal >= _decreaseAmount);

		employees[_id].leaveTotal = employees[_id].leaveTotal.sub(_decreaseAmount);
	}

	function addEmployee (string memory _username, string memory _fullname, string memory _location) private {
		employeeCount++;
		employees[employeeCount] = Employee(employeeCount, _username, _fullname, _location, 0, address(0x1));
	}
}