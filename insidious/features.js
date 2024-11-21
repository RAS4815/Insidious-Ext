// webpage font
document.querySelectorAll('*').forEach(function(element) {
    element.style.fontFamily = 'Comic Sans MS';
});

// grayout and blur webpage
if (typeof grayscaleValue === 'undefined') {
    var grayscaleValue = 0;
    var textblurLevel = 0;
    const interval = setInterval(() => {
        if (grayscaleValue >= 100) {clearInterval(interval);
        } else {
            grayscaleValue += 1;
            document.body.style.filter = `blur(${textblurLevel}px) grayscale(${grayscaleValue}%)`;
        }
    }, 100);
    const textinterval = setInterval(() => {
        if (textblurLevel >= 0.5) {clearInterval(textinterval);
        } else {
            textblurLevel += 0.1;
            document.body.style.filter = `blur(${textblurLevel}px) grayscale(${grayscaleValue}%)`;
        }
    }, 5000);
};

// blur images and videos
if (typeof blurLevel === 'undefined') {
    var blurLevel = 0;
    setInterval(() => {
        if (blurLevel < 10) {
            blurLevel +=0.5;
            document.querySelectorAll('img, video, [src$=".jpg"], [src$=".mp4"], [src$=".m3u8"]').forEach(element => {
                element.style.filter = `blur(${blurLevel}px)`;
                if (element.tagName === 'SOURCE' || (element.src && element.src.endsWith('.mp4'))) {
                    element.parentElement.style.filter = `blur(${blurLevel}px)`;
                }
            });
            document.querySelectorAll('*').forEach(element => {
                if (element.src && element.src.includes('.m3u8')) {
                    element.style.filter = `blur(${blurLevel}px)`;
                }
            });
        }
    }, 2000);
};

document.addEventListener('DOMContentLoaded', () => {
    const allElements = document.querySelectorAll('*');
    allElements.forEach(element => {
        if (element.tagName === 'VIDEO' || element.querySelector('video')) {
            element.style.filter = 'blur(20px)';
        }
    });

    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                if (node.nodeType === 1 && (node.tagName === 'VIDEO' || node.querySelector('video'))) {
                    node.style.filter = 'blur(20px)';
                }
            });
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });
});