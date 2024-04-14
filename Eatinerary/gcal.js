import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import * as AuthSession from 'expo-auth-session';
import LoginScreen from './auth/login'; 


const GOOGLE_CLIENT_ID = '896863488448-0a2oojn8nm6fdnfplt4jnknpcjgaqrrq.apps.googleusercontent.com';

const CalendarScreen = () => { const [userInfo, setUserInfo] = useState(null);
  const [calendarEvents, setCalendarEvents] = useState(null);
  const [busyTimes, setBusyTimes] = useState(null);
  const [loading, setLoading] = useState(false);

  response = LoginScreen.response;

  // Define the configuration for Google OAuth
  const discovery = AuthSession.useAutoDiscovery('https://accounts.google.com');
  const [request, response, promptAsync] = AuthSession.useAuthRequest({
    clientId: GOOGLE_CLIENT_ID,
    scopes: ['openid', 'email', 'https://www.googleapis.com/auth/calendar'],
    responseType: AuthSession.ResponseType.Token,
    redirectUri: 'https://localhost:19006/'
  }, discovery);
  console.log("HI")

  useEffect(() => {
    const fetchData = async () => {
      if (response?.type === 'success') {
        console.log("fetch gcal");
        const { access_token } = response.params;
        await fetchUserInfo(access_token);
        await fetchCalendarData(access_token);
      }
    };
  
    fetchData();
  }, [response]);
  
  const fetchUserInfo = async (accessToken) => {
    const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const data = await response.json();
    setUserInfo(data);
  };

  const fetchCalendarData = async (accessToken) => {
    setLoading(true);
    const response = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const data = await response.json();
    setCalendarEvents(data.items);
    setLoading(false);
  };

  useEffect(() => {
    if (calendarEvents) {
      const busyTimesString = calendarEvents.map(event => {
        const startTime = new Date(event.start.dateTime).toLocaleTimeString();
        const endTime = new Date(event.end.dateTime).toLocaleTimeString();
        const location = event.location || 'Unknown location';
        return `${startTime} - ${endTime}: ${location}`;
      }).join('\n');

      setBusyTimes(busyTimesString);
    }
  }, [calendarEvents]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View>
      <Text>User Info: {userInfo?.email}</Text>
      <Text>Busy Times and Locations: {busyTimes}</Text>
    </View>
  );
};

export default CalendarScreen;


