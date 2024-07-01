import React, { useEffect, useState } from 'react';

function Banner({ editing, setEditing, prevBudgets, setBudgets }) {
    const [bannerClass, setBannerClass] = useState('opacity-0 scale-y-0');

    useEffect(() => {
        if (editing) {
            setBannerClass('opacity-100 scale-y-100');
        } else {
            setBannerClass('opacity-0 scale-y-0');
        }
    }, [editing]);

    const handleSave = () => {
        setEditing(false);
    };

    const handleDiscard = () => {
        setEditing(false);
        setBudgets(prevBudgets);
    };

    return (
        <div
            className={`absolute top-0 w-full bg-primary shadow-md flex flex-wrap justify-center content-center transition-all duration-500 ${bannerClass} transform origin-top`}
        >
            <p className='text-lg text-white p-2'>You have started to plan your finances. When you are done, either save or discard your changes:</p>
            <div>
                <button className='bg-white m-2 p-1 rounded-md' onClick={handleDiscard}>Discard</button>
                <button className='bg-white m-2 p-1 rounded-md' onClick={handleSave}>Save</button>
            </div>
        </div>
    );
}

export default Banner;