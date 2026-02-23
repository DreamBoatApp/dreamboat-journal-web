import { permanentRedirect } from 'next/navigation';

export default function DictionaryIndex({ params }: { params: { locale: string } }) {
    permanentRedirect(`/${params.locale}/dictionary/a`);
}
