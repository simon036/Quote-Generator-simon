## Quote Generator Project
 
 ## Project Overview
    The Zen Quote Generator is a web application designed to inspire and motivate users by providing random inspirational quotes. Users can generate new quotes, save their favorites, add notes, and toggle between light and dark themes. This project leverages the API provided by API Ninjas to fetch quotes dynamically.

## Features

a) Random Quote Generation:
    1.Fetch and display a new inspirational quote with the click of a button.
    2.Favorites Management: Save quotes to a favorites list for easy access later.
    3.Note-taking: Add personal notes to saved quotes for reflection or reminders.
    4.Dark Mode: Toggle between light and dark themes to suit user preferences.
    5.Copy and Share: Easily copy quotes to the clipboard or share them via the Web Share API.

b) Languages used were HTML5,CSS,JavaScript
c) A fetch API from API Ninjas and an API key to fetch the quotes API
c)API Data: By fetching quotes from the API, the application provides dynamic content that keeps users engaged and inspired. The fetched data is processed and displayed in the UI, making it responsive to user requests.

## Key Functions
1.generateQuote(): Fetches a new quote from the API and updates the display.
2.displayQuote(): Updates the quote and author in the UI.
3.saveQuote(): Saves the current quote to local storage.
4.loadFavorites(): Loads saved quotes from local storage and displays them.
5.toggleTheme(): Switches the application between light and dark modes.
6.showNotification(): Displays user notifications for actions taken

## Usage
By using event listeners the dollowing can be achieved:
1.Generate a Quote: Click the "New Quote" button to fetch a random inspirational quote.
2.Save a Quote: Click the "Save Quote" button to add the current quote to your favorites.
3.Add a Note: After saving a quote, type your thoughts in the note text area and click "Save Note."
4.View Favorites: Saved quotes will appear in the "Saved Quotes" section. You can delete quotes from this list.
5.Copy and Share: Use the "Copy" button to copy the quote to your clipboard, or share it using the "Share" button.
6.Toggle Theme: Click the sun/moon icon to switch between light and dark modes

 