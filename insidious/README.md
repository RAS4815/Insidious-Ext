# INSIDIOUS EXT
#### Video Demo: <https://www.youtube.com/watch?v=of7yLFqlltc>
## Description

Insidious Ext or Insidious, is a Chrome extension that discourages users from viewing websites when they should be focused on other things. Developers have invested a lot of resources into making websites as enticing and addictive as possible. I strive to do the opposite. 

While other apps simply block websites, my extension tries to make them unappealing in a more gentle, less obtrusive manner. That way users are less tempted to disable or uninstall the app and can still use the internet as a tool. 

Insidious makes pages unappealing by:

- Changing the font to Comic Sans
- Gradually increase the grayscale of the entire page
- Blur text to make it difficult to read but not completely illegible
- Blur images and videos until they become indiscernible

The user simply clicks the extension icon and then the "Blacklist Settings" button. They are then taken to the settings page where they can create their list of websites they would like the extension to work on. 

Whenever the user decides to stray from their work and visit a site on the blacklist the extension instantly gets to work modifying the webpage. I wanted to target elements of a webpage that designers use to entice users. That is why images and videos get a higher blur effect than text. Blurring the text to become totally unreadable would have been easy enough. I decided to blur it just enough that the user can still make out the words but struggle enough to find the task a bit strenuous. I also wanted to target any appealing colors used in the web design, especially the bright reds sites give to notifications and likes, hence the grayscale.  I am hoping that subconsciously the user ultimately associating the distracting website with enjoyment and will stop visiting the site on their own.

## Source Files

**app.js** - Allows the user to add and remove websites then displays them in options.html. Edits the input if the scheme and subdomain aren't included in the URL. Checks only for the domain name so any subdirectories/path are included in the blacklist. 

**background.js** - Checks if the website the user visits is on the blacklist. If so it executes the extension features in features.js. Additionally it changes the extension icon from gray to green when the extension is running on a website. So the default icon is gray and changes to green for any website on the blacklist.

**features.js** - Contains all the extension features that affect a given website. 

Changes the font of the entire page to Comic Sans MS. 
Incrementally increases the blur and grayscale value of the entire page at different rates.
Searches the entire document for

    - html elements labeled "img" or "video"
    - html elements with source files of types .jpg, .mp4 and .m3u8

Once html elements are found features.js incrementally increases the blur. 

An unexpected challenge was having the extension detect image and video elements in pages and change them, especially in complex pages with multiple nested elements and embedded video players. Hence, the redundancies in the searches and the use of "querySelectorAll". 

I also wanted a toggle button to have the extension run on all pages but found it difficult to run on pages already on the blacklist. I created another .js file to remove the features after the button is toggled off but was not able to get it to work. It took restarting the extension to turn off the features on sites not listed in the blacklist. 

Initially I wanted to allow the user to adjust these features such as choosing a font and adjusting the change rate of the blur/grayscale. But decided to minimize the decision making process for the user and make the experience as straightforward as possible. Hopefully this reduces the extended use of addictive websites because the rates of change were slowed down or removed. 

**manifest.json** - Required file for Chrome extensions, provides metadata such as name, version, permissions. Directs which files to use for options page, service worker, and default popup and icon image.

**options.html** - html page the user interacts with to add and remove websites to the blacklist. Accessed by clicking on the extension icon then "Blacklist settings". Displays blacklist as well. 

**popup.html** - Upon clicking the extension icon, displays a button that takes you to the options.html page

**styles.css** - CSS file that styles the options.html page and the popup.html button

## Implement Insidious on Chrome browser

Chrome extensions outside of the Chrome Web Store can still be installed manually.

1. Download the directory containing the Insidious source files

2. On the Chrome browser click on the Extension puzzle piece in the top right corner then click on **Manage Extensions**

3. Once in chrome://extensions/ enable **Developer mode**

4. Click on **Load unpacked** and select the Insidious directory. The extension has been installed

5. Click on the Extension puzzle piece again and pin the extension to begin using it. 



