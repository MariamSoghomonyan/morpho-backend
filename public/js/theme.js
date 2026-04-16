document.addEventListener('DOMContentLoaded', function() {
    const theme = localStorage.getItem('theme-mode');
    const themeSwitch = document.querySelector('.theme-switch img');

    if (theme && theme === 'dark') {
        document.body.classList.add('active');
        themeSwitch.src = '/images/admin/sun.svg';
    }

    themeSwitch.addEventListener('click', function() {
        document.body.classList.toggle('active');
        
        if (document.body.classList.contains('active')) {
            localStorage.setItem('theme-mode', 'dark');
            themeSwitch.src = '/images/admin/sun.svg';
        } else {
            localStorage.setItem('theme-mode', 'light');
            themeSwitch.src = '/images/admin/moon.svg';
        }
    });
})