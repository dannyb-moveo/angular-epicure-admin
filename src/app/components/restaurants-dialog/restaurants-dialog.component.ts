import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import ChefInterface from 'src/app/interfaces/chef.interface';
import DishInterface from 'src/app/interfaces/dish.interface';
import RestaurantInterface from 'src/app/interfaces/restaurant.interface';
import { ChefService } from 'src/app/services/chef.service';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-restaurants-dialog',
  templateUrl: './restaurants-dialog.component.html',
  styleUrls: ['./restaurants-dialog.component.scss'],
})
export class RestaurantsDialogComponent implements OnInit {
  chefs$: Observable<ChefInterface[]>;
  restaurantDishes: DishInterface[] = [];
  restaurantsForm: FormGroup;
  actionBtn = 'Save';
  formTitle = 'Add restaurant form';
  file: File;
  fileName = '';
  imageUrl = '';

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<RestaurantsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private editData: RestaurantInterface,
    private restaurantService: RestaurantService,
    private chefService: ChefService,
    private uploadService: UploadService
  ) {}

  ngOnInit(): void {
    this.chefService.fetchChefs();
    this.chefs$ = this.chefService.getChefs();
    this.restaurantsForm = this.formBuilder.group({
      name: ['', Validators.required],
      chef: ['', Validators.required],
      signatureDish: [null],
      isPopular: [false],
    });

    // user is editing
    if (this.editData) {
      const { _id, name, chef, signatureDish, isPopular, image } =
        this.editData;
      this.getRestaurantDishes(_id);
      this.imageUrl = image;
      this.actionBtn = 'Update';
      this.formTitle = 'Update restaurant form';
      this.restaurantsForm.controls['name'].setValue(name);
      this.restaurantsForm.controls['chef'].setValue(chef._id);
      this.restaurantsForm.controls['signatureDish'].setValue(
        signatureDish?._id || null
      );
      this.restaurantsForm.controls['isPopular'].setValue(isPopular);
    }
  }
  async addRestaurant() {
    if (this.editData) {
      this.updateRestaurant();
    } else {
      const { name, chef, signatureDish, isPopular } =
        this.restaurantsForm.value;
      const restaurant = {
        name,
        image: this.imageUrl,
        chef,
        signatureDish,
        isPopular,
      };
      await this.restaurantService.createRestaurant(restaurant);

      this.restaurantsForm.reset();
      this.dialogRef.close();
    }
  }

  async updateRestaurant() {
    const { name, chef, signatureDish, isPopular } = this.restaurantsForm.value;
    const { _id } = this.editData;
    const restaurant = {
      _id,
      name,
      image: this.imageUrl,
      chef,
      signatureDish,
      isPopular,
    };
    await this.restaurantService.updateRestaurant(restaurant);

    this.restaurantsForm.reset();
    this.dialogRef.close();
  }

  async selectFile($event: any) {
    this.file = $event.target.files[0];
    if (this.file) {
      this.fileName = this.file.name;
      this.imageUrl = await this.uploadService.fetchSecureURL(this.file);
    }
  }

  async getRestaurantDishes(id: string) {
    this.restaurantDishes = await this.restaurantService.getRestaurantDishes(
      id
    );
  }
}
