// XLSX Processing
var gk_isXlsx = false;
var gk_xlsxFileLookup = {};
var gk_fileData = {};

function filledCell(cell) {
    return cell !== '' && cell != null;
}

function loadFileData(filename) {
    if (gk_isXlsx && gk_xlsxFileLookup[filename]) {
        try {
            var workbook = XLSX.read(gk_fileData[filename], { type: 'base64' });
            var firstSheetName = workbook.SheetNames[0];
            var worksheet = workbook.Sheets[firstSheetName];

            // Convert sheet to JSON to filter blank rows
            var jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1, blankrows: false, defval: '' });
            // Filter out blank rows (rows where all cells are empty, null, or undefined)
            var filteredData = jsonData.filter(row => row.some(filledCell));

            // Heuristic to find the header row
            var headerRowIndex = filteredData.findIndex((row, index) =>
                row.filter(filledCell).length >= filteredData[index + 1]?.filter(filledCell).length
            );
            // Fallback
            if (headerRowIndex === -1 || headerRowIndex > 25) {
                headerRowIndex = 0;
            }

            // Convert filtered JSON back to CSV
            var csv = XLSX.utils.aoa_to_sheet(filteredData.slice(headerRowIndex));
            csv = XLSX.utils.sheet_to_csv(csv, { header: 1 });
            return csv;
        } catch (e) {
            console.error(e);
            return "";
        }
    }
    return gk_fileData[filename] || "";
}

// DOM Elements
const twitterLogo = document.getElementById('twitterLogo');
const sidebarTweetBtn = document.getElementById('sidebarTweetBtn');
const deleteBtn = document.getElementById('deleteBtn');
const tweetModal = document.getElementById('tweetModal');
const closeTweetModalBtn = document.getElementById('closeTweetModalBtn');
const tweetInput = document.getElementById('tweetInput');
const tweetSubmitBtn = document.getElementById('tweetSubmitBtn');
const modalTweetInput = document.getElementById('modalTweetInput');
const modalTweetSubmitBtn = document.getElementById('modalTweetSubmitBtn');
const tweetsContainer = document.getElementById('tweetsContainer');
const searchInput = document.getElementById('searchInput');

// Tweet storage
let tweets = JSON.parse(localStorage.getItem('tweets')) || [
    {
        id: 1,
        name: 'Twitter User',
        handle: '@twitteruser',
        time: '2h',
        text: 'This is a sample tweet in the Twitter clone UI. Just testing out the layout and design of the classic Twitter interface.',
        comments: 12,
        retweets: 45,
        likes: 128,
        isRetweeted: false,
        isLiked: false
    },
    {
        id: 2,
        name: 'Another User',
        handle: '@anotheruser',
        time: '4h',
        text: 'Check out this cool Twitter clone UI! It\'s using the classic blue branding and layout that we all know and love.',
        comments: 5,
        retweets: 22,
        likes: 87,
        isRetweeted: false,
        isLiked: false
    }
];

let followedUsers = JSON.parse(localStorage.getItem('followedUsers')) || [];
let isDeleteMode = false;

// Modal functionality
function openModal(modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    modal.querySelector('textarea')?.focus();
}

function closeModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    modal.querySelector('textarea').value = '';
}

// Tweet Modal Handlers
sidebarTweetBtn.addEventListener('click', () => {
    if (isDeleteMode) {
        toggleDeleteMode();
    }
    openModal(tweetModal);
});
closeTweetModalBtn.addEventListener('click', () => closeModal(tweetModal));
tweetModal.addEventListener('click', (e) => {
    if (e.target === tweetModal) {
        closeModal(tweetModal);
    }
});

// Twitter Logo Handler
twitterLogo.addEventListener('click', () => {
    window.location.reload();
});

// Delete Mode Toggle
function toggleDeleteMode() {
    isDeleteMode = !isDeleteMode;
    deleteBtn.classList.toggle('active');
    document.querySelectorAll('.tweet').forEach(tweet => {
        tweet.classList.toggle('deletable', isDeleteMode);
    });
}

deleteBtn.addEventListener('click', () => {
    toggleDeleteMode();
});

// Navigation content switching
document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', () => {
        if (isDeleteMode) {
            toggleDeleteMode();
        }
        document.querySelectorAll('.menu-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');

        const section = item.dataset.section;
        document.querySelectorAll('.content-section').forEach(sec => sec.classList.remove('active'));
        document.getElementById(section).classList.add('active');
    });
});

// Tweet submission
function postTweet(text) {
    if (!text.trim()) {
        alert('Please enter some text to tweet!');
        return;
    }

    const newTweet = {
        id: tweets.length + 1,
        name: 'Current User',
        handle: '@currentuser',
        time: 'Just now',
        text: text,
        comments: 0,
        retweets: 0,
        likes: 0,
        isRetweeted: false,
        isLiked: false
    };

    tweets.unshift(newTweet);
    localStorage.setItem('tweets', JSON.stringify(tweets));
    renderTweets();
}

tweetSubmitBtn.addEventListener('click', () => {
    postTweet(tweetInput.value);
    tweetInput.value = '';
});

modalTweetSubmitBtn.addEventListener('click', () => {
    postTweet(modalTweetInput.value);
    closeModal(tweetModal);
});

// Media icons
document.querySelectorAll('.media-icons i').forEach(icon => {
    icon.addEventListener('click', () => {
        const action = icon.dataset.action;
        alert(`Add ${action} feature coming soon!`);
    });
});

// Render tweets
function renderTweets(searchTerm = '') {
    tweetsContainer.innerHTML = '';

    const filteredTweets = tweets.filter(tweet =>
        tweet.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tweet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tweet.handle.toLowerCase().includes(searchTerm.toLowerCase())
    );

    filteredTweets.forEach(tweet => {
        const tweetElement = document.createElement('div');
        tweetElement.className = 'tweet';
        tweetElement.dataset.id = tweet.id;
        if (isDeleteMode) {
            tweetElement.classList.add('deletable');
        }
        tweetElement.innerHTML = `
            <div class="profile-photo"></div>
            <div class="tweet-content">
                <div class="tweet-header">
                    <span class="tweet-name">${tweet.name}</span>
                    <span class="tweet-handle">${tweet.handle}</span>
                    <span class="tweet-time">· ${tweet.time}</span>
                </div>
                <div class="tweet-text">
                    ${tweet.text}
                </div>
                <div class="tweet-actions">
                    <div class="tweet-action" data-action="comment">
                        <i class="far fa-comment"></i> <span>${tweet.comments}</span>
                    </div>
                    <div class="tweet-action ${tweet.isRetweeted ? 'retweeted' : ''}" data-action="retweet">
                        <i class="fas fa-retweet"></i> <span>${tweet.retweets}</span>
                    </div>
                    <div class="tweet-action ${tweet.isLiked ? 'liked' : ''}" data-action="like">
                        <i class="far fa-heart"></i> <span>${tweet.likes}</span>
                    </div>
                    <div class="tweet-action" data-action="share">
                        <i class="fas fa-share-square"></i>
                    </div>
                </div>
            </div>
        `;
        tweetsContainer.appendChild(tweetElement);
    });

    attachTweetListeners();
}

// Tweet action listeners
function attachTweetListeners() {
    document.querySelectorAll('.tweet').forEach(tweet => {
        const tweetId = parseInt(tweet.dataset.id);
        const tweetData = tweets.find(t => t.id === tweetId);

        tweet.addEventListener('click', (e) => {
            if (isDeleteMode) {
                if (confirm(`Are you sure you want to delete this tweet by ${tweetData.name}?`)) {
                    tweet.style.opacity = '0';
                    setTimeout(() => {
                        tweets = tweets.filter(t => t.id !== tweetId);
                        localStorage.setItem('tweets', JSON.stringify(tweets));
                        renderTweets(searchInput.value);
                    }, 300);
                }
            }
        });

        tweet.querySelectorAll('.tweet-action').forEach(action => {
            action.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent triggering delete when clicking actions
                const type = action.dataset.action;

                if (type === 'comment') {
                    alert(`This tweet has ${tweetData.comments} comments.`);
                } else if (type === 'retweet') {
                    tweetData.isRetweeted = !tweetData.isRetweeted;
                    tweetData.retweets += tweetData.isRetweeted ? 1 : -1;
                    localStorage.setItem('tweets', JSON.stringify(tweets));
                    renderTweets(searchInput.value);
                } else if (type === 'like') {
                    tweetData.isLiked = !tweetData.isLiked;
                    tweetData.likes += tweetData.isLiked ? 1 : -1;
                    localStorage.setItem('tweets', JSON.stringify(tweets));
                    renderTweets(searchInput.value);
                } else if (type === 'share') {
                    alert('Share this tweet via your preferred platform!');
                }
            });
        });
    });
}

// Search functionality
searchInput.addEventListener('input', () => {
    renderTweets(searchInput.value);
});

// Follow buttons
document.querySelectorAll('.follow-button').forEach(btn => {
    const user = btn.dataset.user;
    if (followedUsers.includes(user)) {
        btn.classList.add('following');
        btn.textContent = 'Following';
    }

    btn.addEventListener('click', () => {
        if (followedUsers.includes(user)) {
            followedUsers = followedUsers.filter(u => u !== user);
            btn.classList.remove('following');
            btn.textContent = 'Follow';
        } else {
            followedUsers.push(user);
            btn.classList.add('following');
            btn.textContent = 'Following';
        }
        localStorage.setItem('followedUsers', JSON.stringify(followedUsers));
    });
});

// Footer links
document.querySelectorAll('.footer-link').forEach(link => {
    link.addEventListener('click', () => {
        const page = link.dataset.link;
        alert(`Navigating to ${page.charAt(0).toUpperCase() + page.slice(1)} page...`);
    });
});

// Initialize
renderTweets();