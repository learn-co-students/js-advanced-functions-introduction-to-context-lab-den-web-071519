const createEmployeeRecord = (employee) => {
    let employeeObject = {}

    employeeObject.firstName = employee[0]
    employeeObject.familyName = employee[1]
    employeeObject.title = employee[2]
    employeeObject.payPerHour = employee[3]
    employeeObject.timeInEvents = []
    employeeObject.timeOutEvents = []

    return employeeObject
    }

const createEmployees = (arrayOfEmployees) => {
    return arrayOfEmployees.map(employee => createEmployeeRecord(employee))
}

const createTimeInEvent = (employeeRecord, dateTimeString) => {
    let [date, time] = dateTimeString.split(' ')
    employeeRecord.timeInEvents.push({
        type: 'TimeIn',
        hour: parseInt(time, 10),
        date: date
    })
    return employeeRecord
}

const createTimeOutEvent = (employeeRecord, dateTimeString) => {
    let [date, time] = dateTimeString.split(' ')
    employeeRecord.timeOutEvents.push({
        type: 'TimeOut',
        hour: parseInt(time, 10),
        date: date
    })
    return employeeRecord
}

const hoursWorkedOnDate = (employeeRecord, date) => {
    let timeInDate = employeeRecord.timeInEvents.find(element=>{return element.date === date})
    let timeOutDate = employeeRecord.timeOutEvents.find(element=>{return element.date === date})

    let hoursWorked = (parseInt(timeOutDate.hour, 10) - parseInt(timeInDate.hour, 10)) / 100
    
    return hoursWorked
}

const wagesEarnedOnDate = (employeeRecord, date) => {
    let hoursWorked = hoursWorkedOnDate(employeeRecord, date)
    let earnedWagesOnDate = hoursWorked * employeeRecord.payPerHour

    return earnedWagesOnDate
}

const allWagesFor = (employeeRecord) => {
    let dates = employeeRecord.timeInEvents.map(element => {return element.date})
    let payable = dates.reduce((memo, date) => {return memo + wagesEarnedOnDate(employeeRecord, date)}, 0)

    return payable
}

const calculatePayroll = (arrayOfEmployees) => {
    return arrayOfEmployees.reduce((totalWages, record) => {
        return totalWages + allWagesFor(record)
    },0)
}

const createEmployeeRecords = (arrayOfEmployees) => {
    let employees = []
    arrayOfEmployees.map(element => {return employees.push(createEmployeeRecord(element))})
    return employees
}

const findEmployeebyFirstName = (employees, employeeFirstName) => {
    return employees.find(employee => {return employee.firstName === employeeFirstName})
}