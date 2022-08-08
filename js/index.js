/**
 * Lớp khởi tạo đối tượng nhân viên
 * @param {*} account : Tài khoản
 * @param {*} fullName : Họ tên
 * @param {*} email : Email
 * @param {*} password : Mật khẩu
 * @param {*} workingDays : Ngày làm
 * @param {*} basicSalary : Lương cơ bản
 * @param {*} position : Chức vụ
 * @param {*} workingHours : Giờ làm
 */
function Employee(account, fullName, email, password, workingDays, basicSalary, position, positionText, workingHours) {
    this.account = account;
    this.fullName = fullName;
    this.email = email;
    this.password = password;
    this.workingDays = workingDays;
    this.basicSalary = basicSalary;
    this.position = position;
    this.positionText = positionText;
    this.workingHours = workingHours;
    this.calcTotalSalary = function () {
        if (this.position === "1") {
            return Number(this.basicSalary) * 3;
        } else if (this.position === "2") {
            return Number(this.basicSalary) * 2;
        } else if (this.position === "3") {
            return Number(this.basicSalary);
        }
    }
    this.classification = function () {
        if (Number(this.workingHours) >= 192) {
            return "Xuất Sắc";
        } else if (Number(this.workingHours) >= 176) {
            return "Giỏi"
        } else if (Number(this.workingHours) >= 160) {
            return "Khá"
        } else {
            return "Trung Bình";
        }
    };
}

var employeeList = [];
/**
 * Hàm thêm nhân viên mới
 */
function createEmployee() {
    var account = document.querySelector("#tknv").value;
    var fullName = document.querySelector("#name").value;
    var email = document.querySelector("#email").value;
    var password = document.querySelector("#password").value;
    var workingDays = document.querySelector("#datepicker").value;
    var basicSalary = document.querySelector("#luongCB").value;
    var position = document.querySelector("#chucvu");
    var workingHours = document.querySelector("#gioLam").value;

    var employee = new Employee(
        account,
        fullName,
        email,
        password,
        workingDays,
        basicSalary,
        position.value,
        position.options[position.selectedIndex].text,
        workingHours
    );
    var isValidate = isValid(true);
    if (!isValidate) return;

    employeeList.push(employee);
    renderEmployee(employeeList);
    saveLocalStorage(employeeList, "arrEmp");

    document.querySelector("#employee").reset();
}

/**
 * Hàm hiển thị nhân viên ra màn hình
 * @param {*} employee : Danh sách nhân viên
 */
function renderEmployee(employee) {
    var result = "";
    for (var item of employee) {
        result += `
        <tr>
            <td>${item.account}</td>
            <td>${item.fullName}</td>
            <td>${item.email}</td>
            <td>${item.workingDays}</td>
            <td>${item.positionText}</td>
            <td>${item.calcTotalSalary()}</td>
            <td>${item.classification()}</td>
            <td>
                <button class="btn btn-warning" onclick="editEmployee('${item.account}')" data-toggle="modal"
                data-target="#myModal"><i class="fa fa-pencil"></i></button>
                <button class="btn btn-danger" onclick="deleteEmployee('${item.account}')"><i class="fa fa-trash-o"></i></button>
			</td>
        </tr>
        `
    }
    document.querySelector("#tableDanhSach").innerHTML = result;
}

/**
 * Hàm lưu danh sách vào LS
 * @param {*} employeeList : Danh sách nhân viên
 * @param {*} key : Key Local storage
 */
function saveLocalStorage(employeeList, key) {
    var employeeListJSON = JSON.stringify(employeeList);
    localStorage.setItem(key, employeeListJSON);
}

/**
 * Lấy danh sách từ LS hiển thị ra màn hình
 * @param {*} key : key của LS
 * @returns
 */
function getLocalStorage(key) {
    var employeeListJSON = localStorage.getItem(key);
    if (!employeeListJSON) return;
    var employeeListParse = JSON.parse(employeeListJSON);
    employeeList = mapData(employeeListParse);
    renderEmployee(employeeList);
}

/**
 * Hàm copy danh sách cho việc lưu lại phương thức
 * @param {*} employeeListParse : Danh sách lấy từ LS
 * @returns : Danh sách đã copy
 */
function mapData(employeeListParse) {
    var output = [];
    for (var item of employeeListParse) {
        var copiedEmployee = new Employee(
            item.account,
            item.fullName,
            item.email,
            item.password,
            item.workingDays,
            item.basicSalary,
            item.position,
            item.positionText,
            item.workingHours,
        )
        output.push(copiedEmployee);
    }
    return output;
}

function editEmployee(account) {
    document.querySelector("#btnCapNhat").style.display = "block";
    document.querySelector("#btnThemNV").style.display = "none";
    document.querySelector("#tknv").disabled = true;
    for (var item of employeeList) {
        if (item.account == account) {
            document.querySelector("#tknv").value = item.account;
            document.querySelector("#name").value = item.fullName;
            document.querySelector("#email").value = item.email;
            document.querySelector("#password").value = item.password;
            document.querySelector("#datepicker").value = item.workingDays;
            document.querySelector("#luongCB").value = item.basicSalary;
            document.querySelector("#chucvu").value = item.position;
            document.querySelector("#gioLam").value = item.workingHours;
            break;
        }
    }
}

function deleteEmployee(account) {
    for (var i = employeeList.length - 1; i >= 0; i--) {
        if (employeeList[i].account == account) {
            employeeList.splice(i, 1);
            saveLocalStorage(employeeList, "arrEmp");
            renderEmployee(employeeList);
        }
    }
}

function updateEmployee() {
    var position = document.querySelector("#chucvu");
    var updateEmployee = new Employee();
    updateEmployee.account = document.querySelector("#tknv").value;
    updateEmployee.fullName = document.querySelector("#name").value;
    updateEmployee.email = document.querySelector("#email").value;
    updateEmployee.password = document.querySelector("#password").value;
    updateEmployee.workingDays = document.querySelector("#datepicker").value;
    updateEmployee.basicSalary = document.querySelector("#luongCB").value;
    updateEmployee.position = position.value;
    updateEmployee.positionText = position.options[position.selectedIndex].text;
    updateEmployee.workingHours = document.querySelector("#gioLam").value;

    var isValidate = isValid(false);
    if (!isValidate) return;
    for (var item of employeeList) {
        if (item.account === updateEmployee.account) {
            item.fullName = updateEmployee.fullName;
            item.email = updateEmployee.email;
            item.password = updateEmployee.password;
            item.workingDays = updateEmployee.workingDays;
            item.basicSalary = updateEmployee.basicSalary;
            item.position = updateEmployee.position;
            item.positionText = updateEmployee.positionText;
            item.workingHours = updateEmployee.workingHours;
        }
    }
    renderEmployee(employeeList);
    saveLocalStorage(employeeList, "arrEmp");
}

function searchEmployee() {
    var textSearch = document.querySelector("#searchName").value;
    textSearch = removeVietnameseTones(textSearch).toLowerCase();
    var result = [];
    for (var item of employeeList) {
        var classEmployee = removeVietnameseTones(item.classification()).toLowerCase();
        if (classEmployee.search(textSearch) != -1) {
            result.push(item);
        }
    }
    renderEmployee(result);
}

/**
 * Hàm loại bỏ dấu tiếng Việt
 * @param {*} str 
 * @returns : Kết quả sau khi bỏ dấu
 */
function removeVietnameseTones(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    // Remove extra spaces
    // Bỏ các khoảng trắng liền nhau
    str = str.replace(/ + /g, " ");
    str = str;
    // Remove punctuations
    // Bỏ dấu câu, kí tự đặc biệt
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, " ");
    return str;
}

function isValid(isCreate) {
    var account = document.querySelector("#tknv").value;
    var fullName = document.querySelector("#name").value;
    var email = document.querySelector("#email").value;
    var password = document.querySelector("#password").value;
    var workingDays = document.querySelector("#datepicker").value;
    var basicSalary = document.querySelector("#luongCB").value;
    var position = document.querySelector("#chucvu");
    var workingHours = document.querySelector("#gioLam").value;

    var employee = new Employee(
        account,
        fullName,
        email,
        password,
        workingDays,
        basicSalary,
        position.value,
        position.options[position.selectedIndex].text,
        workingHours
    );
    var isValid = true;
    isValid &= isRequired(employee.account, '#tbTKNV', 'Tài khoản')
        & isRequired(employee.fullName, '#tbTen', 'Tên nhân viên')
        & isRequired(employee.email, '#tbEmail', 'Email')
        & isRequired(employee.password, '#tbMatKhau', 'Mật khẩu')
        & isRequired(employee.workingDays, '#tbNgay', 'Ngày làm việc')
        & isRequired(employee.basicSalary, '#tbLuongCB', 'Lương cơ bản')
        & isRequired(employee.position, '#tbChucVu', 'Chức vụ')
        & isRequired(employee.workingHours, '#tbGiolam', 'Giờ làm');

    if (isCreate) {
        isValid &= isValidAccount(employee.account, '#tbTKNV', 'Tài khoản', 4, 6);
    }

    isValid &= isValidValue(employee.basicSalary, '#tbLuongCB', 'Lương cơ bản', 1000000, 20000000)
        & isValidValue(employee.workingHours, '#tbGiolam', 'Giờ làm', 80, 200);

    isValid &= isAllLetter(employee.fullName, '#tbTen', 'Tên nhân viên');

    isValid &= checkEmail(employee.email, '#tbEmail', 'Email');

    isValid &= isValidPassword(employee.password, '#tbMatKhau', 'Mật khẩu', 6, 10);

    isValid &= isValidDate(employee.workingDays, '#tbNgay', 'Ngày làm');
    return isValid;
}

$('.modal').on('hidden.bs.modal', function () {
    $('#employee').trigger("reset");
    document.querySelector("#tbTKNV").style.display = "none";
    document.querySelector("#tbTen").style.display = "none";
    document.querySelector("#tbEmail").style.display = "none";
    document.querySelector("#tbMatKhau").style.display = "none";
    document.querySelector("#tbNgay").style.display = "none";
    document.querySelector("#tbLuongCB").style.display = "none";
    document.querySelector("#tbChucVu").style.display = "none";
    document.querySelector("#tbGiolam").style.display = "none";
    document.querySelector("#tknv").disabled = false;
});

document.querySelector("#btnThem").onclick = function () {
    document.querySelector("#btnCapNhat").style.display = "none";
    document.querySelector("#btnThemNV").style.display = "block";
}
window.onload = function () {
    getLocalStorage("arrEmp");
}
