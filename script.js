let fonts = [];
const fontExamples = document.getElementById('font-examples');
const customText = document.getElementById('custom-text');
const colorPicker = document.getElementById('color-picker');
const addFontsInput = document.getElementById('add-fonts');
const notFoundAlerts = document.getElementById('not-found-alerts');

function updateFonts() {
    let text = customText.value || 'The Mumbai Street Siblings';
    const color = colorPicker.value;
    fontExamples.innerHTML = fonts.map(font => `
        <div class="font-example">
            <div class="font-name">${font.name}</div>
            <div class="font-demo" style="font-family: '${font.name}', sans-serif; color: ${color};">${text}</div>
            <button class="delete-font" onclick="deleteFont('${font.name}')">Delete</button>
        </div>
    `).join('');
}

function addFonts() {
    const newFonts = addFontsInput.value.split(',').map(f => f.trim());
    newFonts.forEach(font => {
        const formattedFont = font.charAt(0).toUpperCase() + font.slice(1).toLowerCase(); // Capitalize font
        const formattedFontForURL = formattedFont.replace(/ /g, '+'); // Correct formatting for Google Fonts URL

        if (!fonts.some(f => f.name === formattedFont)) {
            const link = document.createElement('link');
            link.href = `https://fonts.googleapis.com/css2?family=${formattedFontForURL}`;
            link.rel = 'stylesheet';

            link.onload = () => {
                fonts.push({ name: formattedFont });
                updateFonts();
            };

            link.onerror = () => {
                showNotFoundAlert(formattedFont);
            };

            document.head.appendChild(link);
        }
    });
    addFontsInput.value = '';
}


function deleteFont(fontName) {
    fonts = fonts.filter(f => f.name !== fontName);
    updateFonts();
}

function showNotFoundAlert(fontName) {
    const alert = document.createElement('div');
    alert.className = 'not-found-alert';
    alert.innerHTML = `
        ${fontName} font not found
        <button class="close-alert" onclick="this.parentElement.remove()">×</button>
    `;
    notFoundAlerts.appendChild(alert);
}

function setTextCase(caseType) {
    let text = customText.value;
    switch(caseType) {
        case 'normal':
            break;
        case 'uppercase':
            text = text.toUpperCase();
            break;
        case 'capitalize':
            text = text.replace(/\b\w/g, l => l.toUpperCase());
            break;
    }
    customText.value = text;
    updateFonts();
}

customText.addEventListener('input', updateFonts);
colorPicker.addEventListener('input', updateFonts);
document.getElementById('normal-case').addEventListener('click', () => setTextCase('normal'));
document.getElementById('uppercase').addEventListener('click', () => setTextCase('uppercase'));
document.getElementById('capitalize').addEventListener('click', () => setTextCase('capitalize'));

addFontsInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        addFonts();
    }
});


updateFonts();