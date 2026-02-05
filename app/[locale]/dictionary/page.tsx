import { redirect } from 'next/navigation';

export default function DictionaryIndex({ params }: { params: { locale: string } }) {
    redirect(`/${params.locale}/dictionary/a`);
}
