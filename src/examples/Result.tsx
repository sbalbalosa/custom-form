type Props = {
    formData: FormData
}

export default function Result({ formData }: Props) {

    const result = Array.from(formData);

    return (
        <>
            <h1>Form Submitted!</h1>
            <p>Below are the data for the submitted form</p>
            <dl>
                {result.map(([key, value]) => (
                    <>
                        <dt>{key}</dt>
                        <dd>{value.toString()}</dd>
                    </>
                ))}
            </dl>
        </>
    )
}