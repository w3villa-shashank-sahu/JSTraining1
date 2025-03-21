document.addEventListener("DOMContentLoaded", function () {

    if(getLocalStorage('email') != null)
        window.location.assign('/JSTraining1/index.html');
        
        

    const form = document.querySelector(".form");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form submission
        
        const email = document.querySelector("input[type='email']").value.trim();
        const password = document.querySelector("input[type='password']").value.trim();

        if (!email) {
            alert("Please enter an email.");
            return;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        if (!password) {
            alert("Please enter a password.");
            return;
        }

        if (password.length < 6) {
            alert("Password must be at least 6 characters long.");
            return;
        }

        alert("Form submitted successfully!");
        // form.submit(); // Submit the form if validation passes
        saveLocalStorage('email', email);
        saveCookie('email', email);
        window.location.assign('/JSTraining1/index.html');
        
    });
});


function saveLocalStorage(key, value) {
    localStorage.setItem(key, value);
}

function getLocalStorage(key){
    return localStorage.getItem(key)
}

function saveCookie(key, value){
    document.cookie = key + '=' + value;
}

function getCookie(key){
    let cookies = document.cookie.split(';')
    for(let cookie of cookies){
        const [ckey, value] = cookie.split('=');
        if(key == ckey){
            return value;
        }
    }
    return null;
}
