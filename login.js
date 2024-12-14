// Credenciales de ejemplo (en un caso real, esto estaría en el backend)
const MOCK_CREDENTIALS = {
    'admin@beauty.com': '123',
    'test@beauty.com': '123'
};

// Elementos del DOM
const loginForm = document.getElementById('loginForm');
const errorMessage = document.getElementById('errorMessage');
const successMessage = document.getElementById('successMessage');

// Función para mostrar mensajes
const showMessage = (element, show = true) => {
    element.classList.toggle('hidden', !show);
    if (show) {
        setTimeout(() => {
            element.classList.add('hidden');
        }, 3000);
    }
};

// Función para validar el email
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Función para verificar las credenciales
const verifyCredentials = (email, password) => {
    return MOCK_CREDENTIALS[email] === password;
};

// Función para guardar el token en localStorage
const saveAuthToken = () => {
    const token = Math.random().toString(36).substring(2) + Date.now().toString(36);
    localStorage.setItem('authToken', token);
    return token;
};

// Manejador del evento submit del formulario
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('remember-me').checked;

    // Validar email
    if (!isValidEmail(email)) {
        showMessage(errorMessage);
        return;
    }

    try {
        // Simular una llamada API con un pequeño delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (verifyCredentials(email, password)) {
            // Login exitoso
            const token = saveAuthToken();
            
            // Si "recordarme" está marcado, guardar email
            if (rememberMe) {
                localStorage.setItem('userEmail', email);
            }

            showMessage(successMessage);

            // Redireccionar después de un breve delay
            setTimeout(() => {
                window.location.href = 'admin.html';
            }, 2000);
        } else {
            showMessage(errorMessage);
        }
    } catch (error) {
        console.error('Error durante el login:', error);
        showMessage(errorMessage);
    }
});

// Verificar si hay un email guardado al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    const savedEmail = localStorage.getItem('userEmail');
    if (savedEmail) {
        document.getElementById('email').value = savedEmail;
        document.getElementById('remember-me').checked = true;
    }
});

// Función para cerrar sesión (puedes llamarla desde cualquier parte de tu aplicación)
const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
    window.location.href = 'login.html';
};