// require('dotenv').config();
// console.log(process.env.API_KEY); 


let currentQuote = 0;
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
//It tries to retrieve any previously saved quotes from local storage. If none are found an empty array is initialized.

let isDarkMode = localStorage.getItem('darkMode') === 'true';

//selecting various html elements by their IDs assigning them to their variables

const quoteText = document.getElementById('quoteText');//where quote text will be displayed
const quoteAuthor = document.getElementById('quoteAuthor');
const newQuoteBtn = document.getElementById('newQuoteBtn');
const saveQuoteBtn = document.getElementById('saveQuoteBtn');
const copyQuoteBtn = document.getElementById('copyQuoteBtn');
const shareQuoteBtn = document.getElementById('shareQuoteBtn');
const favoriteQuotes = document.getElementById('favoriteQuotes');
const themeToggle = document.getElementById('themeToggle');
const loading = document.getElementById('loading');// loading animation
const notification = document.getElementById('notification');

 //event listeners that respond to user actions ie clicks
newQuoteBtn.addEventListener('click', generateQuote);
saveQuoteBtn.addEventListener('click', saveQuote);
copyQuoteBtn.addEventListener('click', copyQuote);
shareQuoteBtn.addEventListener('click', shareQuote);
themeToggle.addEventListener('click', toggleTheme);

import { API_KEY } from './config.js';

async function generateQuote() {//function for fetching a new quote
    showLoading(); //Shows loading animation while quote is being fetched
    try {
        const response = await fetch('https://api.api-ninjas.com/v1/quotes', {
            method: 'GET', // 
            //making request to API to get quote
            headers: {
                'X-Api-Key': API_KEY, //authentication for API key 
                'Content-Type': 'application/json' 
            }
            
        });

        //Checks if the response is ok.if not an error is displayed
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json(); //awaits for the response to be converted from JSON for use in code
        if (data.length > 0) {
            currentQuote = {
                text: data[0].quote, //Gets the quote text, author name and stored in currentQuote
                author: data[0].author
            };
            displayQuote(); //calling function to displays the quote
        } else {
            showNotification('No quotes found. Please try again.', 'error');
        }
    } catch (error) {
        showNotification(`Failed to fetch quote: ${error.message}`, 'error');
    } finally {
        hideLoading(); //Hides loading animation
    }
}

function displayQuote() { //updates displayed code and author from html elements
    if (currentQuote) { //checks if currentQuote is not null before displaying it
        quoteText.textContent = currentQuote.text;
        quoteAuthor.textContent = `- ${currentQuote.author}`;
    }
}

function saveQuote() { //user can save the current quote to local storage as favorites
    if (!currentQuote) {//checks if quote is there for saving
        showNotification('No quote to save!', 'error');
        return;
    }

    if (!favorites.find(q => q.text === currentQuote.text)) {//if no quotes in favorites isn't already there,it adds it and saves in local storage
        favorites.push({ ...currentQuote, note: '', timestamp: new Date().toISOString() });
        localStorage.setItem('favorites', JSON.stringify(favorites));
        loadFavorites();//refreshes displayed list of favorite quotes
        showNotification('Quote saved successfully!', 'success');
    } else {
        showNotification('Quote already saved!', 'info');
    }
}

function loadFavorites() {//repopulates the favorites list with saved quotes from local storage
    favoriteQuotes.innerHTML = '';
    favorites.forEach((quote, index) => {
        const quoteElement = document.createElement('div');
        quoteElement.className = 'favorite-quote';
        //creating a new html elements for favourite quotes, options to delete or add notes
        quoteElement.innerHTML = ` 
            <p>${quote.text}</p>
            <p>- ${quote.author}</p>
            <textarea class="note-input" placeholder="Add a note...">${quote.note}</textarea>
            <div class="btn-group">
                <button class="btn" onclick="updateNote(${index})">
                    <i class="fas fa-save"></i> Save Note
                </button>
                <button class="btn" onclick="deleteQuote(${index})">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        `;
        favoriteQuotes.appendChild(quoteElement);
    });
}

function updateNote(index) {
    const noteInput = document.querySelectorAll('.note-input')[index];
    favorites[index].note = noteInput.value;
    localStorage.setItem('favorites', JSON.stringify(favorites));
    showNotification('Note updated successfully!', 'success');
}

function deleteQuote(index) {
    favorites.splice(index, 1);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    loadFavorites();
    showNotification('Quote deleted successfully!', 'success');
}

async function copyQuote() {
    if (!currentQuote) {
        showNotification('No quote to copy!', 'error');
        return;
    }

    try {
        await navigator.clipboard.writeText(`"${currentQuote.text}" - ${currentQuote.author}`);
        showNotification('Quote copied to clipboard!', 'success');
    } catch (error) {
        showNotification('Failed to copy quote!', 'error');
    }
}

// Define an asynchronous function named shareQuote
async function shareQuote() {
    // Check if there is a current quote to share
    if (!currentQuote) {
        // If no quote is available, show a notification indicating the error
        showNotification('No quote to share!', 'error');
        // Exit the function early since there's nothing to share
        return;
    }

    const shareData = {
        title: 'Shared Quote', //Title of the shared content
        text: `"${currentQuote.text}" - ${currentQuote.author}`,
        url: window.location.href 
    };

    try {
        //Checks if the Web Share API is supported by the browser
        if (navigator.share) {
            //If supported, attempt to share the data
            await navigator.share(shareData);
            // If sharing is successful, show a success notification
            showNotification('Quote shared successfully!', 'success');
        } else {
            // If Web Share API is not supported, throw an error
            throw new Error('Web Share API not supported');
        }
    } catch (error) {
        copyQuote();
    }
}

function toggleTheme() {
    isDarkMode = !isDarkMode;
    localStorage.setItem('darkMode', isDarkMode);
    setTheme();
}

function setTheme() {
    document.body.classList.toggle('dark-mode', isDarkMode);
    themeToggle.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
}
 //display loading animation
function showLoading() {
    loading.classList.add('active');
}
//hides loading animation
function hideLoading() {
    loading.classList.remove('active');
}
//displays notification to user, sets notification background color
function showNotification(message, type) {
    notification.textContent = message;
    notification.className = 'notification show';
    
    switch(type) {
        case 'error':
            notification.style.backgroundColor = 'red';
            break;
        case 'success':
            notification.style.backgroundColor = '#81BFDA';
            break;
        case 'info':
            notification.style.backgroundColor = 'blue';
            break;
    }

    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

loadFavorites();
setTheme();
generateQuote();
