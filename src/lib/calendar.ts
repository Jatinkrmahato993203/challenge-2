export function getGoogleCalendarUrl(event: any, href: string) {
  const start = new Date(event.startDate).toISOString().replace(/-|:|\.\d\d\d/g, "");
  const end = new Date(new Date(event.endDate || event.startDate).getTime() + (event.endDate ? 0 : 86400000)).toISOString().replace(/-|:|\.\d\d\d/g, "");

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    dates: `${start}/${end}`,
    details: `${event.description}\n\nLearn more: ${href}`,
    location: event.jurisdiction || 'India',
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
