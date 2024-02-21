function validateUsername(_, username) {
  // Chuỗi rỗng
  if (username.trim() === '') {
    return new Error('Vui lòng nhập tên người dùng!');
  }
  // Regex
  const regex = /^[a-z][a-z0-9]{3,15}$/;
  if (!regex.test(username)) {
    // Ký tự đầu tiên
    if (!username[0].match(/[a-z]/)) {
      return new Error('Ký tự đầu tiên phải là chữ cái thường!');
    }
    // Các ký tự còn lại
    for (let i = 1; i < username.length; i++) {
      if (!username[i].match(/[a-z0-9]/)) {
        return new Error('Chỉ được phép sử dụng chữ cái thường và chữ số!');
      }
    }
    // Chiều dài
    if (username.length < 4) {
      return new Error('Tên người dùng phải dài ít nhất 4 ký tự!');
    } else if (username.length > 16) {
      return new Error('Tên người dùng không được dài quá 16 ký tự!');
    }
    return new Error('Tên người dùng không hợp lệ!');
  }
  // username hợp lệ
  return true;
}

function validateEmail(_, email) {
  if (email.trim() === '') {
    return new Error('Vui lòng nhập địa chỉ email!');
  } else if (!/^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$/.test(email)) {
    return new Error('Email không đúng định dạng!');
  }
  return true;
}

function validatePassword(_, password) {
  // Chuỗi rỗng
  if (password.trim() === '') {
    return new Error('Vui lòng nhập mật khẩu!');
  }
  // Regex
  const regex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
  if (!regex.test(password)) {
    // Chữ cái
    if (!/[a-zA-Z]/.test(password)) {
      return new Error('Mật khẩu phải chứa ít nhất một chữ cái!');
    }
    // Chữ số
    if (!/\d/.test(password)) {
      return new Error('Mật khẩu phải chứa ít nhất một chữ số!');
    }
    // Chiều dài
    if (password.length < 6) {
      return new Error('Mật khẩu phải dài ít nhất 6 ký tự!');
    }
    return new Error('Mật khẩu không hợp lệ!');
  }
  // Mật khẩu hợp lệ
  return true;
}

function validateFullName(_, fullname) {
  if (fullname === null || typeof fullname === 'undefined') {
    return new Error('Vui lòng nhập họ tên!');
  }

  if (fullname.trim() === '') {
    return new Error('Vui lòng nhập họ tên!');
  }
}

function validateDOB(_, dob) {
  if (dob === null || typeof dob === 'undefined') {
    return new Error('Vui lòng nhập ngày tháng năm sinh theo định dạng yyyy-mm-dd!');
  }
}
function validataPhoneNumber(_, phoneNumber) {
  if (phoneNumber === null || typeof phoneNumber === 'undefined') {
    return new Error('Vui lòng nhập số điện thoại của bạn!');
  }
  if (phoneNumber.trim() === '') {
    return new Error("Vui lòng nhập số điện thoại của bạn!");
  }
  const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  if (!regex.test(phoneNumber)) {
    return new Error("Số điện thoại không được chứa kí tự chữ cái và ký tự đắc biệt!");
  }
}
export { validateUsername, validateEmail, validatePassword, validateFullName, validateDOB, validataPhoneNumber };
