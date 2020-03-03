// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * Adds a random greeting to the page.
 */
function addRandomGreeting() {
  const greetings =
      ['I have a twin brother.', 'I was born in Albuquerque, New Mexico', 'I was a gymnast.', 'I have never travelled out side of the country.'];

  // Pick a random greeting.
  const greeting = greetings[Math.floor(Math.random() * greetings.length)];

  // Add it to the page.
  const greetingContainer = document.getElementById('greeting-container');
  greetingContainer.innerText = greeting;
}

/**
 * Fetches a welcome message from the server and adds it to the DOM.
 */
function getWelcomeMessage() {
  console.log('Fetching welcome message.');

  // The fetch() function returns a Promise because the request is asynchronous.
  const responsePromise = fetch('/data');

  // When the request is complete, pass the response into handleResponse().
  responsePromise.then(handleResponse);
}

/**
 * Handles response by converting it to text and passing the result to
 * addQuoteToDom().
 */
function handleResponse(response) {
  console.log('Handling the response.');

  // response.text() returns a Promise, because the response is a stream of
  // content and not a simple variable.
  const textPromise = response.text();

  // When the response is converted to text, pass the result into the
  // addMessageToDom() function.
  textPromise.then(addMessageToDom);
}

/** Adds message to the DOM. */
function addMessageToDom(message) {
  console.log('Adding message to dom: ' + message);

  const messageContainer = document.getElementById('message-container');
  messageContainer.innerText = message;
}

/**
 * Fetches stats from the servers and adds them to the DOM.
 */
function getMessages() {
  fetch('/data').then(response => response.json()).then((messages) => {
    // stats is an object, not a string, so we have to
    // reference its fields to create HTML content

    const statsListElement = document.getElementById('message-container');
    statsListElement.innerHTML = '';
    statsListElement.appendChild(
        createListElement('Message 1: ' + messages.get(0)));
    statsListElement.appendChild(
        createListElement('Message 2: ' + messages.get(1)));
    statsListElement.appendChild(
        createListElement('Message 3: ' + messages.get(2)));
  });
}

/** Creates an <li> element containing text. */
function createListElement(text) {
  const liElement = document.createElement('li');
  liElement.innerText = text;
  return liElement;
}
