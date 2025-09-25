const videos = [
    { id: 'lBagn--KERk', title: 'Employee Provident Fund (EPF)' },
    { id: '1xYdZu2y5qo', title: '2024 Income Tax Saving and Tax Planning Guide' },
    { id: 'qCfGsQYINKc', title: 'INDIAN TAX SYSTEM EXPLAINED' },
    { id: 'iTUv3GlFsds', title: 'Basic Concepts of Income Tax in India' },
    { id: 'ZprzYoTK-UM', title: 'Old v/s New Tax Regime' },
    { id: 'qvNsxuWeD-Y', title: 'New Tax Regime vs Old Tax Regime: Which Is Better?' }
];

const videoList = document.getElementById('videoList');
const nextButton = document.getElementById('next');
const prevButton = document.getElementById('prev');

let currentIndex = 0;
const videosPerPage = 3; // Number of videos to show at a time

// Function to display videos
function displayVideos() {
    videoList.innerHTML = ''; // Clear previous videos
    const start = currentIndex * videosPerPage;
    const end = start + videosPerPage;
    const videosToDisplay = videos.slice(start, end);

    videosToDisplay.forEach(video => {
        const resourceDiv = document.createElement('div');
        resourceDiv.className = 'video-item';
        
        const titleElement = document.createElement('h3');
        titleElement.innerText = video.title;
        
        const iframeElement = document.createElement('iframe');
        iframeElement.width = "320";
        iframeElement.height = "240";
        iframeElement.src = `https://www.youtube.com/embed/${video.id}`; 
        iframeElement.frameBorder = "0";
        iframeElement.allowFullscreen = true;
        
        resourceDiv.appendChild(titleElement);
        resourceDiv.appendChild(iframeElement);
        videoList.appendChild(resourceDiv);
    });

    // Disable/enable buttons based on current index
    prevButton.disabled = currentIndex === 0; // Disable prev button if on first page
    nextButton.disabled = (currentIndex + 1) * videosPerPage >= videos.length; // Disable next button if on last page
}

// Function to handle next button click
nextButton.addEventListener('click', () => {
    if ((currentIndex + 1) * videosPerPage < videos.length) {
        currentIndex++;
        displayVideos();
    }
});

// Function to handle previous button click
prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        displayVideos();
    }
});


displayVideos();
