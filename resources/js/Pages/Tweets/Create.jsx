import {useState} from 'react'
import PrimaryButton from '@/Components/PrimaryButton'
import { useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';

const Create = () => {
    const [contentLength, setContentLength] = useState(0);
    let disabledBtn = '';
    let danger = '';

    const { data, setData, post, processing, errors, reset } = useForm({
        content: '',
    });
    const lengthContent = (255 - data.content.length)
    if (lengthContent <= 0 ) {
        disabledBtn = 'disabled';
        danger = 'text-red-600';
    }
    const handleInputChange = e => {
        setData({...data, content: e.target.value});
        // setContentLength(data.content.length)
    }

    const submit = (e) => {
        e.preventDefault();
        post(route('tweet.store'), {
            onSuccess: () => reset(),
        });
    }

    return (
        <>
            <div className="py-6">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <form onSubmit={submit}>
                        <textarea onChange={ handleInputChange}  placeholder="Que se passe-t-il ?"
                            className="rounded-lg border border-gray-200 w-full p-2 font-semibold resize-none focus:outline-none"
                        ></textarea>
                        <InputError message={errors.content} className='mt-1'/>
                        <span className="my-5 text-red-500" >

                        </span>
                        <div className="flex items-center space-x-4 justify-end mt-3">
                            <p className={`text-sm text-gray-400 font-thin ${danger}`}>{ lengthContent } caractères restants</p>
                            <PrimaryButton  className={`bg-blue-500 hover:bg-blue-800 rounded-full font-extrabold ${disabledBtn}`}
                                disabled={processing || disabledBtn}>Tweet</PrimaryButton>
                            {/* <button className="bg-blue-500 hover:bg-blue-800 rounded-full font-extrabold">Tweet</button> */}
                        </div>
                    </form>
                </div>
            </div>

        </>
    )
}

export default Create
