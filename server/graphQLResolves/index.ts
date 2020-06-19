import EventResolves from "./EventResolves";
import UserResolves from "./UserResolves";
import BookingResolves from "./BookingResolves";

export default {
   ...EventResolves,
   ...UserResolves,
   ...BookingResolves
}