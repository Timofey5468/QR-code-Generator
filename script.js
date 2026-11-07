
const qrInput = document.getElementById("qrInput");
const generateButton = document.getElementById("generate");
const downloadButton = document.getElementById("download");
const qrContainer = document.getElementById("qrcode");

// Generate QR Code
generateButton.addEventListener("click", function() {
    const text = qrInput.value.trim();

    if (text === "") {
        alert("Please enter a URL or text!");
        return;
    }

    // Remove previous QR Code
    qrContainer.innerHTML = "";
    downloadButton.hidden = true;

    // Check if library is loaded
    if (typeof QRCode === "undefined") {
        alert("QR library failed to load. Check your internet connection.");
        return;
    }

    // Create new QR Code
    try {
        new QRCode(qrContainer, {
            text: text,
            width: 200,
            height: 200,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });

        downloadButton.hidden = false;
    } catch (error) {
        console.error("QR generation failed:", error);
        alert("Could not generate QR Code. Try shorter text.");
    }
});

// Download QR as PNG
downloadButton.addEventListener("click", function() {
    const canvas = qrContainer.querySelector("canvas");
    const qrImage = qrContainer.querySelector("img");

    let imageData;

    if (canvas) {
        imageData = canvas.toDataURL("image/png");
    } else if (qrImage && qrImage.complete) {
        imageData = qrImage.src;
    } else {
        alert("Generate a QR Code first!");
        return;
    }

    const link = document.createElement("a");

    link.href = imageData;
    link.download = "qrcode.png";

    document.body.appendChild(link);
    link.click();
    link.remove();
});

// Hide old QR after changing input
qrInput.addEventListener("input", function() {
    qrContainer.innerHTML = "";
    downloadButton.hidden = true;
});
