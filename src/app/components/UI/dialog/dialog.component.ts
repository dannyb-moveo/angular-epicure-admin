import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import RestaurantInterface from 'src/app/interfaces/restaurant.interface';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  restaurantsForm: FormGroup;
  actionBtn = 'Save';

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: RestaurantInterface,
    private restaurantService: RestaurantService
  ) {}

  ngOnInit(): void {
    this.restaurantsForm = this.formBuilder.group({
      restaurantName: ['', Validators.required],
      isPopular: [''],
    });

    if (this.editData) {
      this.actionBtn = 'Update';
      this.restaurantsForm.controls['restaurantName'].setValue(
        this.editData.name
      );
      this.restaurantsForm.controls['isPopular'].setValue(
        this.editData.isPopular ? 'true' : 'false'
      );
    }
  }

  addRestaurant() {
    // console.log(this.restaurantsForm.value);

    // create logic
    if (!this.editData) {
    } else {
      this.updateRestaurant();
    }

    this.restaurantsForm.reset();
    this.dialogRef.close();
  }

  async updateRestaurant() {
    const restaurant = {
      _id: this.editData._id,
      chef: this.editData.chef,
      name: this.restaurantsForm.value.restaurantName,
      image: this.editData.image,
      signatureDish: this.editData.signatureDish._id,
      isPopular: this.restaurantsForm.value.isPopular === 'true' ? true : false,
    };

    console.log(this.restaurantsForm.value.isPopular, 'rest');
    console.log(restaurant, 'rest');

    // console.log(this.editData.signatureDish, 'dish');

    // console.log(restaurant);
    // edit logic

    this.restaurantsForm.reset();
    this.dialogRef.close();
  }
}
