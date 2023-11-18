import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
const form = document.querySelector('.feedback-form');
form.addEventListener('input', throttle(onFormData, 500));
form.addEventListener('submit', onFormSubmit);

populateTextarea();
let formData = JSON.parse(localStorage.getItem(STORAGE_KEY)) ||{};

function onFormData(evt) {
    formData[evt.target.name] = evt.target.value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
};

function onFormSubmit(evt) {
    evt.preventDefault();
    console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
    localStorage.removeItem(STORAGE_KEY);
    evt.currentTarget.reset();
};

function populateTextarea() {
    const savedMessage = JSON.parse(localStorage.getItem(STORAGE_KEY));
    const email = document.querySelector('.feedback-form input');
    const message = document.querySelector('.feedback-form textarea');

    if(savedMessage) {
    email.value = savedMessage.email || '';
    message.value = savedMessage.message || '';
    }
};