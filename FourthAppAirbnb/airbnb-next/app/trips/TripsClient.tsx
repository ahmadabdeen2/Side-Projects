"use client";
import { SafeReservation, SafeUser } from "../types";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import ListingCard from "../components/listings/ListingCard";


interface TripsClientProps {
  reservations: SafeReservation[] | null;
  currentUser?: SafeUser | null;
}

const TripsClient: React.FC<TripsClientProps> = ({
  reservations = [],
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
        title="Your Bookings"
        subtitle="Where you stayed and where you are going"
      />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">

    {reservations?.map((reservation) => {
        return (
            <ListingCard
                key={reservation.id}
                listing={reservation.listing}
                reservation={reservation}
                actionId= {reservation.id}
                onAction={onCancel}
                disabled={deletingId === reservation.id}
                actionLabel="Cancel Reservation"
                currentUser={currentUser}
             
             />
        )

})}

      </div>
    </Container>
  );
};

export default TripsClient;
