import { Component, OnInit } from '@angular/core';
import { Booking } from '../booking';
import { BookingService } from '../booking.service';


@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {

  constructor(private bookingService: BookingService) { }

  bookings: Booking[] = [];

  ngOnInit(): void {
        // mit subscribe wartet man immer auf die vorherige funktion die den observation value returned um dann diese auszuführen
    this.bookingService.getBookings().subscribe((result) => {
      console.log(result)
      this.bookings = result;
    })
  }

  deleteBooking(booking: Booking): void {
        // mit subscribe wartet man immer auf die vorherige funktion die den observation value returned um dann diese auszuführen
    this.bookingService.deleteBooking(booking).subscribe();
    this.bookings = this.bookings.filter(b => b != booking);
  }
}
