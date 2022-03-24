import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import DishInterface from 'src/app/interfaces/dish.interface';
import { DishService } from 'src/app/services/dish.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import RestaurantInterface from 'src/app/interfaces/restaurant.interface';
import { Observable } from 'rxjs';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-dishes-dialog',
  templateUrl: './dishes-dialog.component.html',
  styleUrls: ['./dishes-dialog.component.scss'],
})
export class DishesDialogComponent implements OnInit {
  restaurants$: Observable<RestaurantInterface[]>;
  dishesForm: FormGroup;
  actionBtn = 'Save';
  formTitle = 'Add dish form';
  ingredients: string[] = [];
  tags: string[] = ['spicy', 'vegan', 'vegetarian'];
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<DishesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private editData: DishInterface,
    private dishService: DishService,
    private restaurantService: RestaurantService
  ) {}

  ngOnInit(): void {
    this.restaurants$ = this.restaurantService.getRestaurants();
    this.dishesForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      ingredients: ['', Validators.required],
      tags: [''],
      restaurant: ['', Validators.required],
    });

    // user is editing
    if (this.editData) {
      this.actionBtn = 'Update';
      this.formTitle = 'Update dish form';
      const {
        name,
        price,
        ingredients,
        tags,
        restaurant: { _id },
      } = this.editData;

      this.dishesForm.controls['name'].setValue(name);
      this.dishesForm.controls['price'].setValue(price);
      this.dishesForm.controls['tags'].setValue(tags);
      this.ingredients = ingredients;
      this.dishesForm.controls['restaurant'].setValue(_id);
    }
  }
  async addDish() {
    if (this.editData) {
      this.updateDish();
    } else {
      const { name, price, tags, restaurant } = this.dishesForm.value;
      const dish = {
        name,
        price,
        image:
          'https://media.istockphoto.com/photos/portrait-of-handsome-man-in-kitchen-picture-id1299738603?k=20&m=1299738603&s=612x612&w=0&h=4G0_pkU8y-MDNUEtvfpYFQCJkn6CVAfcStrC0ymxfT8=',
        ingredients: this.ingredients,
        tags,
        restaurant,
      };
      await this.dishService.createDish(dish);

      this.dishesForm.reset();
      this.dialogRef.close();
    }
  }

  async updateDish() {
    const { name, price, tags } = this.dishesForm.value;
    const { image, _id } = this.editData;
    const dish = {
      _id,
      name,
      price,
      image,
      ingredients: this.ingredients,
      tags,
      restaurant: this.editData.restaurant._id,
    };
    await this.dishService.updateDish(dish);

    this.dishesForm.reset();
    this.dialogRef.close();
  }

  addIngredient(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our ingredient
    if (value) {
      this.ingredients.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  removeIngredient(ingredient: string): void {
    const index = this.ingredients.indexOf(ingredient);

    if (index >= 0) {
      this.ingredients.splice(index, 1);
    }
  }
}
