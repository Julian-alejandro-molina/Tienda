export default function ValidationPassword(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);// El metodo Verifica si hay una coincidencia en una cadena
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    if (password.length < minLength) {
        alert('La contraseña debe tener al menos 8 caracteres.');
        return;
    }
    if (!hasUpperCase) {
        alert('La contraseña debe contener al menos una letra m)ayúscula.');
        return;
    }
    if (!hasLowerCase) {
        alert('La contraseña debe contener al menos una letra m)inúscula.');
        return;
    }
    if (!hasNumber) {
        alert('La contraseña debe contener al menos un número.');
        return;
    }
    if (!hasSpecialChar) {
        alert('La contraseña debe contener al menos un carácter) especial.');
        return;
    }

    console.log('La contraseña es válida');   
}