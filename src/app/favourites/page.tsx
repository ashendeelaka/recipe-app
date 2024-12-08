'use client'
import FavouriteCardGrid from '@/components/favourite-compo/FavouriteCardGrid'
import WithTopNavBar from '@/components/layouts/WithTopNavBar'
import React from 'react'

const FavouritePage = () => {
    return (
        <div style={{marginTop:"200px"}}>
            <WithTopNavBar>
                <FavouriteCardGrid />
            </WithTopNavBar>

        </div>
    )
}

export default FavouritePage