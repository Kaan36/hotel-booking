import { Component, OnInit } from '@angular/core';
import { Booking } from '../booking';
import { Router, ActivatedRoute } from '@angular/router';
import { BookingService } from '../booking.service';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.css']
})
export class CreateBookingComponent implements OnInit {

  bookings: Booking[] = []


  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private bookingService: BookingService,
    private formbuilder: FormBuilder) { }

  booking: Booking = {
    id: 100,
    name: 'Your Name',
    roomNumber: 100,
    startDate: new Date(),
    endDate: new Date()
  }

  bookingForm = this.formbuilder.group({
    id: ['', Validators.required],
    name: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
    roomNumber: ['', Validators.required],
    startDate: ['', Validators.required],
    endDate: ['', Validators.required]
  })


  ngOnInit(): void {
    this.generateBooking();
  }

  generateBooking(): void {
    if (this.router.url != '/create') {
      let id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
      // mit subscribe wartet man immer auf die vorherige funktion die den observation value returned um dann diese auszuführen
      this.bookingService.getBookingById(id).subscribe((result) => {

        this.bookingForm.setValue(
          {
            id: result.id,
            name: result.name,
            roomNumber: result.roomNumber,
            startDate: result.startDate,
            endDate: result.endDate
          }
        )
      });

    }
  }

  addBooking(): void {
    // mit subscribe wartet man immer auf die vorherige funktion die den observation value returned um dann diese auszuführen
    this.booking.id = this.bookingForm.get('id')?.value;
    this.booking.name = this.bookingForm.get('name')?.value;
    this.booking.roomNumber = this.bookingForm.get('roomNumber')?.value;
    this.booking.startDate = this.bookingForm.get('startDate')?.value;
    this.booking.endDate = this.bookingForm.get('endDate')?.value;

    this.bookingService.addBooking(this.booking).subscribe();
    this.router.navigate(['bookings']);
  }

  dateChanged(event: Event, isStart: boolean) {
    let val = (event.target as HTMLInputElement).value;

    if (isStart) {
      this.booking.startDate = new Date(val);
    } else {
      this.booking.endDate = new Date(val);
    }
  }

}
