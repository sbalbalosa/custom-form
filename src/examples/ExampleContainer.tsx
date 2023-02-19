import { useState } from 'react';

import Result from './Result';


type Props = {
    children: (fn: (formData: FormData) => void) => JSX.Element
}

export default function ExampleContainer({ children }: Props) {
    const [formData, setFormData] = useState<FormData | null>(null);

    if (formData) return <Result formData={formData} />


    return children((formData: FormData) => setFormData(formData));
}