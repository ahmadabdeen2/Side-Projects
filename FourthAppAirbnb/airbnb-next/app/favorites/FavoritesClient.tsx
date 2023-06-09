"use client";
import { SafeListing, SafeReservation, SafeUser } from "../types";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import ListingCard from "../components/listings/ListingCard";


interface FavoritesClientProps {
  listings: SafeListing[] | null;
  currentUser?: SafeUser | null;
}

const FavoritesClient: React.FC<FavoritesClientProps> = ({
  listings = [],
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string>('');

  const onCancel = useCallback((id: string) => {
    setDeletingId(id)

    axios.delete(`/api/reservations/${id}`)
        .then(() => {
            toast.success('Reservation cancelled')
            router.refresh()
            }
        )
        .catch(() => toast.error('Something went wrong'))
        .finally(() => setDeletingId(''))

    },[router])


  
  return (
    <Container>
      <Heading
        title="Your Reservations"
        subtitle="Places people reserved"
      />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">

    {listings?.map((listings) => {
        return (
            <ListingCard
                key={listings.id}
                listing={listings}
                currentUser={currentUser}
             
             />
        )

})}

      </div>
    </Container>
  );
};

export default FavoritesClient;
