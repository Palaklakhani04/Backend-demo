import { ProfileType } from '@/lib/Types'
import { api } from '@/services/services'
import React from 'react'
import Button from './Button'


export default function Profile({profileDetail}: {profileDetail : ProfileType}) {
  return (
    <div className='grid place-items-center justify-center min-h-dvh'>

    {profileDetail && (
        <div>
            <div className='max-w-40 max-h-40 rounded-full border-4 border-black'>
                {/* image */}
                <label >Profile</label>
                <img
                    src={`${api}${profileDetail.image}`}
                    alt={`${profileDetail.name}'s profile`}
                    className="w-32 h-32 object-cover rounded-full"
                />
            </div>
            <div className='text-gray-600 bg-white'>
                <h1 className='text-xl font-bold '>Profile Details</h1>
                <div>
                    <label>Name:</label>
                    <p>{profileDetail.name}</p>
                </div>
                <div>
                    <label>Email:</label>
                    <p>{profileDetail.email}</p>
                </div>
                <div>
                    <label>Gender:</label>
                    <p>{profileDetail.gender}</p>
                </div>
                <div>
                    <label>Phone:</label>
                    <p>{profileDetail.phone}</p>
                </div>
                <div>
                    <label>Address:</label>
                    <p>{profileDetail.address}</p>
                </div>
                <div>
                    <label>GrNumber:</label>
                    <p>{profileDetail.grNumber}</p>
                </div>
                <div>
                    <label>Department:</label>
                    <p>{profileDetail.department}</p>
                </div>
            </div>
        </div>
    )}
    <Button>Update</Button>

    </div>
  )
}
