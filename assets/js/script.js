function setTheme(theme) {
	document.documentElement.setAttribute('data-theme', theme);
	const modeSwitcher = document.getElementById('mode-switcher');
	if (modeSwitcher) {
		modeSwitcher.classList.toggle('active', theme === 'dark');
	}
	localStorage.setItem('theme', theme === 'dark' ? 'dark' : '');
	updateGiscusTheme(theme);
}

function updateGiscusTheme(theme) {
	const giscusFrame = document.querySelector('iframe.giscus-frame');
	if (giscusFrame) {
		giscusFrame.contentWindow.postMessage({
			giscus: {
				setConfig: { theme }
			}
		}, 'https://giscus.app');
	}
}

function toggleNightMode() {
	const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
	setTheme(currentTheme === 'light' ? 'dark' : 'light');
}

document.addEventListener('DOMContentLoaded', () => {
	const theme = localStorage.getItem('theme') === 'dark' ? 'dark' : 'light';
	setTheme(theme);
});

window.addEventListener('message', event => {
	if (event.origin !== 'https://giscus.app') return;
	if (!(typeof event.data === 'object' && event.data.giscus)) return;

	if (event.data.giscus.resizeHeight) {
		const theme = localStorage.getItem('theme') === 'dark' ? 'dark' : 'light';
		updateGiscusTheme(theme);
	}
});
