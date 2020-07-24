# google-calendar-booking-app

## Features

Users can make an appointment in the available time slots. After that, a Google Calendar event is created for the calendar owner.

## Built with

- javascript
- Node.js
- express
- React
- Sass

also uses:

- googleapis
- [Nodemailer](https://github.com/nodemailer/nodemailer)
- [react-bootstrap](https://github.com/react-bootstrap/react-bootstrap)

## Setting up the app

After cloning the repo use `yarn` to install dependencies.

The app needs a `.env` file with the following variables:

`NODE_ENV=xxxxx`<br>
`PORT=xxxxxx`<br>
`GOOGLE_EMAIL_FROM=xxxxx`<br>
`GOOGLE_EMAIL_PASSWORD=xxxxx`<br>
`GOOGLE_PRIVATE_KEY=xxxxx`<br>
`GOOGLE_CLIENT_EMAIL=xxxxx`<br>
`GOOGLE_CALENDAR_ID=xxxxx`<br>

To use Google Calendar API from nodejs server, you'll need a service account and service account key that can be created in Google Developers Console.

## Contact

Created by Maciej Sawiński macsawinski@gmail.com
