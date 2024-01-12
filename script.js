document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('blendedCanvas');
    const context = canvas.getContext('2d');
    const blendSlider = document.getElementById('blendSlider');
    const opacityLabel = document.getElementById('opacityLabel');
    const blendedLabel = document.getElementById('blendedLabel');

    const originalImage1 = new Image();
    const originalImage2 = new Image();

    originalImage1.src = 'original_image2.png';
    originalImage2.src = 'original_image3.png';

    originalImage1.onload = function () {
        updateBlendedImage();
    };

    blendSlider.addEventListener('input', function () {
        updateBlendedImage();
        updateOpacityLabel();
    });

    function updateBlendedImage() {
        const blendValue = 1 - blendSlider.value / 100;
        context.clearRect(0, 0, canvas.width, canvas.height);

        context.globalCompositeOperation = 'source-over';
        context.globalAlpha = 1 - blendValue;
        context.drawImage(originalImage1, 0, 0, canvas.width, canvas.height);

        context.globalCompositeOperation = 'multiply';
        context.globalAlpha = blendValue;
        context.drawImage(originalImage2, 0, 0, canvas.width, canvas.height);

        context.globalCompositeOperation = 'source-over';
        context.globalAlpha = 1.0;

        canvas.title = "Mixup Image";

        // Update the label with adjusted order and clipped opacity information
        const opacityValue = (1 - blendValue).toFixed(2);
        blendedLabel.textContent = `Label = [${opacityValue}, ${Number.parseFloat(1 - opacityValue).toFixed(2)}]`;
    }

    function updateOpacityLabel() {
        opacityLabel.textContent = 'λ = ' + (blendSlider.value / 100).toFixed(2);
    }
});
