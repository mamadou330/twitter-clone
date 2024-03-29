import React from 'react'
import { Head, usePage, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import NavLink from '@/Components/NavLink';
import Create from './Create';



const Index = () => {

    const { tweets, auth } = usePage().props;

    //    console.log(tweets);
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Les Derniers Tweets</h2>}
        >
            <Head title="Tweets" />
            <Create />

            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg"> */}
                    {/* <div className="p-6 text-gray-900">You're logged in!</div> */}
                    <div className="py-12">
                        <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                            {tweets.map((tweet) => {
                                return (
                                    <div key={tweet.id} className="flex items-center space-x-4 bg-white overflow-hidden rounded rounded-b-none border-b-2 border-gray-200 py-6 px-4">
                                        {/* <img className="h-16 w-16 object-cover rounded-full" src="{tweet.user.profile_photo_url}"> */}
                                        <div className="flex flex-col w-2/3">
                                            <div>
                                                <Link href={route('profile.show', tweet.user)} className="text-sm text-gray-900 font-bold hover:text-blue-400">
                                                    {tweet.user.name}
                                                </Link>
                                                <span className="font-thin text-gray-400">· le {tweet.created_at}</span>
                                            </div>
                                            <div className="text-sm text-gray-400 font-thin">{tweet.content}</div>
                                        </div>
                                        {
                                            tweet.user.id != auth.user.id
                                            &&
                                            <div className="w-40">
                                                {
                                                    !tweet.user.isFollowing ?
                                                        <NavLink href={route(`tweets.followings.store`, tweet.user)} as="button" method="POST"
                                                            className="bg-white text-blue-500 cursor-pointer px-5 py-2 hover:text-white border border-blue-500 leading-tight hover:bg-blue-500 rounded-full font-extrabold transition-all duration-300"
                                                        >Suivre</NavLink>
                                                        :
                                                        <NavLink href={route(`tweets.unfollowings.store`, tweet.user)} as="button" method="POST"
                                                            className="bg-white text-blue-500 cursor-pointer px-5 py-2 hover:text-white border border-blue-500 leading-tight hover:bg-blue-500 rounded-full font-extrabold transition-all duration-300"
                                                        >Ne plus Suivre</NavLink>
                                                }
                                            </div>
                                        }
                                    </div>
                                )
                            })
                            }
                        </div>
                    </div>
                    {/* </div> */}
                </div>
            </div>
        </AuthenticatedLayout>
    )
}

export default Index
