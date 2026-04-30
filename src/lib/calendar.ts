export function getGoogleCalendarUrl(event: any, href: string) {
  const start = new Date(event.startDate).toISOString().replace(/-|:|\.\d\d\d/g, "");
  const endTime = event.endDate
    ? new Date(event.endDate).getTime() + 86400000
    : new Date(event.startDate).getTime() + 86400000;
  const end = new Date(endTime).toISOString().replace(/-|:|\.\d\d\d/g, "");

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    dates: `${start}/${end}`,
    details: `${event.description}\n\nLearn more: ${href}`,
    location: event.jurisdiction || 'India',
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
