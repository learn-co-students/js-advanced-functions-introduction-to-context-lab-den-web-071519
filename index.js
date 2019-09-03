// Your code here
const createEmployeeRecord = (employeeInfo) => {
    return employeeInfo.reduce((record, info) => {
        record['firstName'] = employeeInfo[0]
        record['familyName'] = employeeInfo[1]
        record['title'] = employeeInfo[2]
        record['payPerHour'] = employeeInfo[3]
        record['timeInEvents'] = []
        record['timeOutEvents'] = []
        return record
    }, {})
}

const createEmployees = (employees) => {
    return employees.map(employee => createEmployeeRecord(employee))
}

const createTimeInEvent = (employee, date) => {
    let event = {
        type: "TimeIn",
        hour: parseInt(date.split(' ')[1]),
        date: date.split(' ')[0]
    }
    employee.timeInEvents.push(event)
    return employee
}

const createTimeOutEvent = (employee, date) => {
    let event = {
        type: "TimeOut",
        hour: parseInt(date.split(" ")[1]),
        date: date.split(" ")[0]
    };
    employee.timeOutEvents.push(event)
    return employee
}

const hoursWorkedOnDate = (employee, date) => {
    let end = employee.timeOutEvents.find(function(day) {
        return day.date === date
    });
    let beggining = employee.timeInEvents.find(function(day) {
        return day.date === date;
    });
    return (end.hour - beggining.hour) / 100;
}

const wagesEarnedOnDate = (employee, date) => {
    let hours = hoursWorkedOnDate(employee, date);
    let wageRate = employee['payPerHour']
    return hours * wageRate;
}

const allWagesFor = (employee) => {
    let wages = 0
    let dates = employee.timeOutEvents.map(event => event.date)
    dates.forEach(date => {
        wages += wagesEarnedOnDate(employee, date);
    })
    return wages
}

let createEmployeeRecords = function(src) {
    return src.map(function(row) {
        return createEmployeeRecord(row);
    });
};

let findEmployeebyFirstName = function(srcArray, firstName) {
    return srcArray.find(function(rec) {
        return rec.firstName === firstName;
    });
};

const calculatePayroll = (employees) => {
    let payroll = 0
    employees.forEach(employee => {
        payroll += allWagesFor(employee)
    })
    return payroll
}