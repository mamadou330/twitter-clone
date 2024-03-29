
import React from 'react'
import { Head, usePage, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import NavLink from '@/Components/NavLink';
import Create from './Create';



const Index = () => {

    const { tweets, auth, profileUser,  } = usePage().props;

    // console.log(profileUser);
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">
                Profil de {profileUser.name}
                {
                    profileUser.id !== auth.user.id && !profileUser.isFollowing &&
                        <div className=''>
                            <NavLink  as="button" href={route(`tweets.followings.store`, profileUser)}
                                method="POST" className="bg-white text-blue-500 cursor-pointer px-5 py-2 hover:text-white border border-blue-500 leading-tight hover:bg-blue-500 rounded-full font-extrabold transition-all duration-300"
                                >Suivre</NavLink>
                        </div>
                }

            </h2>}
        >
            <Head title="Tweets" />

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
                                                <Link  className="text-sm text-gray-900 font-bold hover:text-blue-400">
                                                    {profileUser.name}
                                                </Link>
                                                <span className="font-thin text-gray-400">· le {tweet.created_at}</span>
                                            </div>
                                            <div className="text-sm text-gray-400 font-thin">{tweet.content}</div>
                                            { profileUser.is_following_you && <p  className="text-blue-400 text-xs">Cet utilisateur vous suit</p> }

                                        </div>

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
