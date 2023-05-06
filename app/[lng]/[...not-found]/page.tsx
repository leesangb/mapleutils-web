import { I18nPageProps } from '@/i18n/settings';

export default function NotFound({ params }: I18nPageProps) {
    return (
        <>
            <h2>Not Found {params.lng}</h2>
            <p>Could not find requested resource</p>
        </>
    );
}
