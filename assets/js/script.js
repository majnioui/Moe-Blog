function setTheme(theme) {
	document.documentElement.setAttribute('data-theme', theme);
	const modeSwitcher = document.getElementById('mode-switcher');
	if (modeSwitcher) {
		modeSwitcher.classList.toggle('active', theme === 'dark');
	}
	localStorage.setItem('theme', theme === 'dark' ? 'dark' : '');
}

function toggleNightMode() {
	const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
	setTheme(currentTheme === 'light' ? 'dark' : 'light');
}

document.addEventListener('DOMContentLoaded', () => {
	const theme = localStorage.getItem('theme') === 'dark' ? 'dark' : 'light';
	setTheme(theme);
});
