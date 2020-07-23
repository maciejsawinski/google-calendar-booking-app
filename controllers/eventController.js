/* eslint-disable import/extensions */
/* eslint-disable node/no-unpublished-import */

import googleapis from "googleapis";
import moment from "moment";
import dotenv from "dotenv";
import Mailgun from "mailgun-js";

import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import AppErrorHandler from "../utils/appErrorHandler.js";

import googleApi from "../googleapi.json";

const { google } = googleapis;

dotenv.config({ path: "./.env" });

const googleAuthorize = async () => {
  const jwtClient = new google.auth.JWT(
    googleApi.client_email,
    null,
    googleApi.private_key,
    ["https://www.googleapis.com/auth/calendar"]
  );

  await jwtClient.authorize();

  return jwtClient;
};

const sendConfirmationEmail = async (data) => {
  const { firstName, lastName, email, message, date } = data;

  const mailgun = new Mailgun({
    apiKey: process.env.MAILGUN_API,
    domain: process.env.MAILGUN_DOMAIN,
  });
  const emailData = {
    from: process.env.MAILGUN_FROM,
    to: email,
    subject: "Potwierdzenie wizyty",
    html: `<b>Zarejestrowano wizytę</b><br /><br /><b>Data:</b> ${moment(
      date
    ).format(
      "HH:mm DD.MM.YYYY"
    )}<br /><b>Imię i nazwisko:</b> ${firstName} ${lastName}<br /><b>Email:</b> ${email}<br /><b>Wiadomość:</b> ${message}<br /><br /><b><i>Ten email jest tylko przykładem działania aplikacji integrującej system rezerwacji z kalendarzem Google. Zapraszam na mój profil <a href='https://github.com/maciejsawinski'>github</a></i></b>`,
  };

  await mailgun.messages().send(emailData);
};

export const createEvent = asyncErrorHandler(async (req, res, next) => {
  try {
    const { firstName, lastName, email, message, date } = req.body;

    const jwtClient = await googleAuthorize();
    const calendar = google.calendar("v3");

    const event = {
      start: { dateTime: date },
      end: { dateTime: moment(date).add(1, "h").format() },
      summary: `rezerwacja ${firstName} ${lastName}`,
      description: `Rezerwacja z aplikacji<br /><br />imię i nazwisko: ${firstName} ${lastName}<br />email: ${email}<br />wiadomość: ${message}`,
    };

    await calendar.events.insert({
      auth: jwtClient,
      calendarId: googleApi.calendarId,
      resource: event,
    });

    await sendConfirmationEmail(req.body);

    res.sendStatus(201);
  } catch (err) {
    return next(new AppErrorHandler(err, 500));
  }
});

export const getEvents = asyncErrorHandler(async (req, res, next) => {
  try {
    const jwtClient = await googleAuthorize();
    const calendar = google.calendar("v3");
    const response = await calendar.events.list({
      auth: jwtClient,
      calendarId: googleApi.calendarId,
      timeMin: moment().utc().startOf("day").toISOString(),
      timeMax: moment().utc().startOf("day").add(16, "days").toISOString(),
    });

    let googleCalendarEvents = [];
    if (response.data.items.length !== 0) {
      googleCalendarEvents = response.data.items.map(
        (event) => event.start.dateTime
      );
    }

    const dateTime = moment().set({
      hour: 8,
      minute: 0,
      second: 0,
      millisecond: 0,
    });

    const calendarEvents = [];
    for (let i = 0; i < 15; i += 1) {
      calendarEvents.push([]);
      for (let j = 0; j < 8; j += 1) {
        calendarEvents[i].push({
          time: dateTime.format(),
          isBooked: googleCalendarEvents.includes(dateTime.format()),
        });

        dateTime.add(1, "h");
      }

      dateTime.add(1, "d").subtract(8, "h");
    }

    res.status(200).json({
      status: "success",
      data: calendarEvents,
    });
  } catch (err) {
    return next(new AppErrorHandler(err, 500));
  }
});
