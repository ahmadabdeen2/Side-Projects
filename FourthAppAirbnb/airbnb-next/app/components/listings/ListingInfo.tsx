"use client";
import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import React from "react";
import { IconType } from "react-icons";
import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";
import dynamic from "next/dynamic";

const Map = dynamic(() => import ('../Map'), {
    ssr: false
})

interface ListingInfoProps {
  user: SafeUser;
  category: { icon: IconType; label: string; description: string } | undefined;
  description: string;
  roomCount: number;
  guestCount: number;
  bathroomCount: number;
  locationValue: string;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  category,
  description,
  roomCount,
  guestCount,
  bathroomCount,
  locationValue,
}) => {
  const { getByValue } = useCountries();

  const coordinates = getByValue(locationValue)?.latlng;
  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="text-xl font-light flex flex-row items-center gap-2">
          <div> Owner: {user?.name}</div>
          <Avatar image={user?.image} />
        </div>
        <div className='flex flex-row items-center gap-4 font-light text-neutral-500'>
            <div> {guestCount} guest(s)</div>
            <div> {roomCount} room(s)</div>
            <div> {bathroomCount} bathroom(s)</div>
    
        </div>
      </div>
      <hr/>
      {category && (
        <ListingCategory
        icon ={category.icon}
        label={category.label}
        categoryDescription={category.description}

        />
      )}
        
        <hr/>
            <p className='text-md leading-[2rem] font-light text-neutral-500'>
                {description}
            </p>
            <hr/>

            <Map center={coordinates} />
            

    </div>
  );
};

export default ListingInfo;
