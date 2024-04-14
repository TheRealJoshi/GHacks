// import ApiCalendar from 'react-google-calendar-api';
// const { google } = require('googleapis');
// const Config = require('./apiGoogleconfig.json');


// class ApiCalendar {
//     constructor() {
//         this.sign = false;
//         this.gapi = null;
//         this.onLoadCallback = null;
//         this.calendar = 'primary';
//         this.updateSigninStatus = this.updateSigninStatus.bind(this);
//         this.initClient = this.initClient.bind(this);
//         this.handleSignoutClick = this.handleSignoutClick.bind(this);
//         this.handleAuthClick = this.handleAuthClick.bind(this);
//         this.createEvent = this.createEvent.bind(this);
//         this.listUpcomingEvents = this.listUpcomingEvents.bind(this);
//         this.createEventFromNow = this.createEventFromNow.bind(this);
//         this.listenSign = this.listenSign.bind(this);
//         this.onLoad = this.onLoad.bind(this);
//         this.setCalendar = this.setCalendar.bind(this);
//         this.handleClientLoad();
//       }
  
//     initClient() {
//       this.gapi = window['gapi'];
//     this.gapi.client.init(Config).then(() => {
//             // Listen for sign-in state changes.
//             this.gapi.auth2
//               .getAuthInstance()
//               .isSignedIn.listen(this.updateSigninStatus);
//             // Handle the initial sign-in state.
//             this.updateSigninStatus(
//               this.gapi.auth2.getAuthInstance().isSignedIn.get(),
//             );
//             if (this.onLoadCallback) {
//               this.onLoadCallback();
//             }
//           });
//         }
  
//         handleClientLoad() {
//           const script = document.createElement('script');
//           script.src = 'https://apis.google.com/js/api.js';
//           document.body.appendChild(script);
//           script.onload = () => {
//             window.gapi.load('client:auth2', this.initClient);
//           };
//         }
  
//         handleAuthClick() {
//           if (this.gapi) {
//             this.gapi.auth2.getAuthInstance().signIn();
//           } else {
//             console.log('Error: this.gapi not loaded');
//           }
//         }
  
//         listUpcomingEvents(maxResults, calendarId = this.calendar) {
//           if (this.gapi) {
//             return this.gapi.client.calendar.events.list({
//               calendarId: calendarId,
//               timeMin: new Date().toISOString(),
//               showDeleted: false,
//               singleEvents: true,
//               maxResults: maxResults,
//               orderBy: 'startTime',
//             });
//           } else {
//             console.log('Error: this.gapi not loaded');
//             return false;
//           }
//         }
// }

// const apiCalendar = new ApiCalendar(Config);
// export default apiCalendar;