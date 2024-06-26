export const GA_TRACKING_ID = 'G-5JR818CX40';
export const ADSENSE_ID = 'ca-pub-3624541807279517';

declare global {
    interface Window {
        adsbygoogle: { [key: string]: unknown }[];
    }
}
// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string): void => {
    window.gtag('config', GA_TRACKING_ID, {
        page_path: url,
    });
};

type GTagEvent = {
    action: string;
    category?: string;
    label: string;
    value?: number;
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category = 'general', label, value = 1 }: GTagEvent): void => {
    window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value,
    });
};
