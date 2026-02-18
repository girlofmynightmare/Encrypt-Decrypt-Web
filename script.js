lucide.createIcons();

const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノ";
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#0f0";
    ctx.font = fontSize + "px monospace";
    drops.forEach((y, i) => {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, y * fontSize);
        if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
    });
}
setInterval(drawMatrix, 35);

async function derive(pass, salt) {
    const enc = new TextEncoder();
    const keyMat = await crypto.subtle.importKey("raw", enc.encode(pass), "PBKDF2", false, ["deriveKey"]);
    return crypto.subtle.deriveKey(
        { name: "PBKDF2", salt, iterations: 100000, hash: "SHA-256" },
        keyMat, { name: "AES-GCM", length: 256 }, false, ["encrypt", "decrypt"]
    );
}

async function cipher(mode) {
    const text = document.getElementById('input').value;
    const pass = document.getElementById('passkey').value;
    const log = document.getElementById('log');
    if (!text || !pass) return;
    log.innerHTML += `[WAIT] ACCESSING BUFFER...<br>`;
    try {
        const enc = new TextEncoder();
        if (mode === 'lock') {
            const salt = crypto.getRandomValues(new Uint8Array(16));
            const iv = crypto.getRandomValues(new Uint8Array(12));
            const key = await derive(pass, salt);
            const crypted = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, enc.encode(text));
            const res = new Uint8Array(16 + 12 + crypted.byteLength);
            res.set(salt, 0); res.set(iv, 16); res.set(new Uint8Array(crypted), 28);
            document.getElementById('output').value = btoa(String.fromCharCode(...res));
        } else {
            const res = new Uint8Array(atob(text).split("").map(c => c.charCodeAt(0)));
            const key = await derive(pass, res.slice(0, 16));
            const dec = await crypto.subtle.decrypt({ name: "AES-GCM", iv: res.slice(16, 28) }, key, res.slice(28));
            document.getElementById('output').value = new TextDecoder().decode(dec);
        }
        document.getElementById('output-container').style.display = 'block';
        log.innerHTML += `[OK] TASK_COMPLETE.<br>`;
    } catch (e) {
        log.innerHTML += `[FAIL] CORRUPT_DATA_OR_KEY.<br>`;
    }
    log.scrollTop = log.scrollHeight;
}

function copyToClipboard() {
    const output = document.getElementById('output');
    output.select();
    document.execCommand('copy');
    document.getElementById('log').innerHTML += `[INFO] BUFFER_COPIED<br>`;
}