

// ساخت یک شیء از رابط کاربری برنامه که شامل خدمات گفتار و نحوه بیان آن است 
// The SpeechSynthesisUtterance interface of the Web Speech API represents a speech request. It contains the content the speech service should read and information about how to read it (e.g. language, pitch and volume.)
// https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance
const msg = new SpeechSynthesisUtterance();

// ساخت متغیر برای ذخیره کردن مقادیر صدا در یک آرایه
// creating a variable for dumping The Voice values
let voices = [];

// Element Selection: The code selects the necessary elements from the DOM, such as the voice dropdown, options, speak button, and stop button.
// ساخت ثابت برای انتخاب المان‌ها با استفاده از مفهوم دام ساخت ثابت برای انتخاب المان‌ها با استفاده از مفهوم دام
const voicesDropdown = document.querySelector('[name="voice"]');


// Options: The code selects all range input elements and elements with the name "text" using querySelectorAll and assigns them to the options variable. These elements control the settings for speech synthesis, such as pitch and volume.
// انتخاب تمام المان‌های ورودی با نام تکست 
const options = document.querySelectorAll('[type="range"], [name="text"]');


// Buttons: The code selects the elements with the IDs "speak" and "stop" using querySelector and assigns them to the speakButton and stopButton variables, respectively. These buttons trigger the speech synthesis and stop the speech.
// انتخاب دو المان برای شروع و پایان عملیات
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');


// تعیین مقدار متن متغیر تعریف شده در بالا
msg.text = document.querySelector('[name="text"]').value


// This function populates the voice dropdown with available voices that include the language "en". It filters the voices based on the language and creates HTML options for each voice.
// تعریف تابعی که تگ‌های تولید با زبان انگلیسی فیلتر می‌کنه فیلتر می‌کنه
function populateVoices() {

    voices = this.getVoices();

    // دریافت لیست صداها از صداهای موجود 
    voicesDropdown.innerHTML = voices

    // فیلتر کردن مقادیر دریافتی با زبان انگلیسی 
        .filter(voice => voice.lang.includes('en') )
        // پیاده سازی متد مپ و فیلتر کردن صداهای موجود در لیست 
        .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`
        )
        // استفاده از متد جوین برای چسباندن تگ‌ها تگ‌ها
        .join('')
}

// تعریف تابع برای لغو و شروع گفتگو با استفاده از شی در بالا تعریف شده 
function toggle() {
    speechSynthesis.cancel(msg)
   
    speechSynthesis.speak(msg)
}





// This function stops speaking the text in the SpeechSynthesisUtterance object.
// تعریف تابع برای متوقف کردن گفتگو در متن در تابع رابط کاربری برنامه نویسی
function stop() {
    speechSynthesis.cancel(msg)
}




// تعریف تابع برای تنظیم صدا از رابط کاربری برنامه نویسی انتخاب شده در منو
// This function sets the voice for the SpeechSynthesisUtterance object to the voice that is currently selected in the dropdown menu.
function setVoice() {
    msg.voice = voices.find(elem => this.value === elem.name)
    toggle()
}


// This function updates the SpeechSynthesisUtterance object when a slider is changed. The slider can be used to control the pitch, rate, and volume of the speech.
// تعریف تابع برای به روز رسانی زیر مقادیر شی ساخته شده از رابط کاربری در بالا
function sliderChange() {
    msg[this.name] = this.value
    toggle()
}


// // This code adds event listeners to the necessary elements.
//  When the user changes the voice, clicks the speak or stop
//   button, or changes a slider, the corresponding function is called.

// اضافه کردن رخدادنگر هر موقع کاربر صدا رو تغییر داد صدا رو تغییر داد
speechSynthesis.addEventListener('voiceschanged', populateVoices)
voicesDropdown.addEventListener('change', setVoice)
speakButton.addEventListener('click', toggle)
stopButton.addEventListener('click', stop)
msg.addEventListener('change', null)

options.forEach(elem => {
    elem.addEventListener('change', sliderChange)
})
