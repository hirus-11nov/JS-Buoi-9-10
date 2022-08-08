function isRequired(value, selectorError, name) {
    var selector = document.querySelector(selectorError);
    if (!value) {
        selector.style.display = "block";
        selector.innerHTML = name + " không được bỏ trống!";
        return false;
    }
    selector.style.display = "none";
    return true;
}

function isAllLetter(value, selectorError, name) {
    var selector = document.querySelector(selectorError);
    var letters = /^[a-z A-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$/;
    if (letters.test(value)) {
        selector.style.display = "none";
        return true;
    }
    selector.style.display = "block";
    selector.innerHTML = name + ' chỉ được chứa ký tự!';
    return false;
}

function isValidAccount(value, selectorError, name, minLength, maxLength) {
    var selector = document.querySelector(selectorError);
    selector.style.display = "block";
    var getListEmployee = JSON.parse(localStorage.getItem("arrEmp"));
    var numbers = /(?=^.{4,6}$)[0-9]*$/
    var isExist = getListEmployee.find(function (item) {
        return item.account === value;
    });

    if (numbers.test(value) && !isExist) {
        selector.style.display = "none";
        return true;
    }
    if (isExist) {
        selector.innerHTML = name + " đã tồn tại!";
        return false;
    }

    selector.innerHTML = name + ' từ ' + minLength + ' đến ' + maxLength + ' ký số và chỉ chứa số!';
    return false;
}

// function isAllNumeric(value, selectorError, name) {
//     var selector = document.querySelector(selectorError);
//     var numbers = /^[0-9]+$/;
//     if (numbers.test(value)) {
//         selector.style.display = 'none';
//         return true;
//     }
//     selector.style.display = 'block'
//     selector.innerHTML = name + ' chỉ được chứa số!';
//     return false;
// }

function checkEmail(value, selectorError, name) {
    var selector = document.querySelector(selectorError);
    var mailformat = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (mailformat.test(value)) {
        selector.style.display = 'none';
        return true;
    }
    selector.style.display = 'block';
    selector.innerHTML = name + ' không đúng định dạng!';
    return false;
}

function isValidDate(value, selectorError, name) {
    var selector = document.querySelector(selectorError);
    selector.style.display = "block";
    var dateFormat = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
    if (!dateFormat.test(value)) {
        selector.innerHTML = name + " không đúng định dạng mm/dd/yyyy!";
        return false;
    }
    var parts = value.split("/");
    var day = parseInt(parts[1], 10);
    var month = parseInt(parts[0], 10);
    var year = parseInt(parts[2], 10);
    if (year < 1000 || year > 3000 || month == 0 || month > 12) {
        selector.innerHTML = name + " không đúng định dạng mm/dd/yyyy!";
        return false;
    }
    var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) {
        monthLength[1] = 29;
    }
    if (day > 0 && day <= monthLength[month - 1]) {
        selector.style.display = "none";
        return true;
    }
}

function isValidPassword(value, selectorError, name, minLength, maxLength) {
    var selector = document.querySelector(selectorError);
    var passwordFormat = /(?=^.{6,10}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
    if (passwordFormat.test(value)) {
        selector.style.display = 'none';
        return true;
    }
    selector.style.display = 'block';
    selector.innerHTML = name + " từ " + minLength + ' đến ' + maxLength + ' ký tự, chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt!';
    return false;
}

function isValidValue(value, selectorError, name, minValue, maxValue) {
    var selector = document.querySelector(selectorError);
    var numbers = /^[0-9]+$/;
    if (value && numbers.test(value) && !(value > maxValue || value < minValue)) {
        selector.style.display = "none";
        return true;
    }
    selector.style.display = "block";
    selector.innerHTML = name + " từ " + minValue + " đến " + maxValue;
    return false;
}

function isValidPassword(value, selectorError, name, minLength, maxLength) {
    var selector = document.querySelector(selectorError);
    var passwordFormat = /(?=^.{6,10}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
    if (passwordFormat.test(value)) {
        selector.style.display = 'none';
        return true;
    }
    selector.style.display = 'block';
    selector.innerHTML = name + " từ " + minLength + ' đến ' + maxLength + ' ký tự, chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt!';
    return false;
}